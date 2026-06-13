-- ============================================================
-- Schema do Supabase para oraculoai.cloud
-- Execute este SQL no SQL Editor do Supabase Dashboard
-- ============================================================

-- -----------------------------------------------------------
-- 1. Tabela de Leads
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  empresa TEXT,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  origem TEXT DEFAULT 'site'
);

-- Índice para consultas por data
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Row-Level Security: permitir INSERT anônimo, negar SELECT/UPDATE/DELETE
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_insert_anon" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Bloquear SELECT/UPDATE/DELETE para anon
CREATE POLICY "leads_no_select" ON leads
  FOR SELECT
  TO anon
  USING (false);

-- -----------------------------------------------------------
-- 2. Tabela de Rate Limiting
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS rate_limits (
  id TEXT PRIMARY KEY,
  count INT NOT NULL DEFAULT 1,
  reset_at BIGINT NOT NULL
);

-- RLS: ninguém acessa a tabela diretamente — tudo via RPC SECURITY DEFINER
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Bloquear todo acesso direto pela API (só a função RPC consegue ler/escrever)
CREATE POLICY "rate_limits_no_access" ON rate_limits
  FOR ALL
  TO anon
  USING (false);

-- -----------------------------------------------------------
-- 3. Função atômica de Rate Limit (executada via RPC)
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_identifier TEXT,
  p_limit INT DEFAULT 10,
  p_window_ms BIGINT DEFAULT 10000
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_now BIGINT;
  v_row RECORD;
BEGIN
  v_now := (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT;

  -- Lock row para evitar race conditions
  SELECT count, reset_at INTO v_row
  FROM rate_limits
  WHERE id = p_identifier
  FOR UPDATE;

  IF NOT FOUND OR v_now > v_row.reset_at THEN
    -- Primeira vez ou janela expirou: reseta
    INSERT INTO rate_limits (id, count, reset_at)
    VALUES (p_identifier, 1, v_now + p_window_ms)
    ON CONFLICT (id) DO UPDATE
    SET count = 1, reset_at = v_now + p_window_ms;

    RETURN jsonb_build_object('success', true, 'remaining', p_limit - 1);
  ELSE
    -- Dentro da janela: incrementa
    UPDATE rate_limits
    SET count = count + 1
    WHERE id = p_identifier;

    IF v_row.count + 1 <= p_limit THEN
      RETURN jsonb_build_object('success', true, 'remaining', p_limit - (v_row.count + 1));
    ELSE
      RETURN jsonb_build_object('success', false, 'remaining', 0);
    END IF;
  END IF;
END;
$$;
