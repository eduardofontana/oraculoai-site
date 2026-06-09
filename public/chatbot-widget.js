(function () {
  "use strict";

  var config = window.ChatbotConfig || {};
  var triggerSelector =
    config.triggerSelector || 'a[aria-label="Falar no WhatsApp"]';
  var widgetId = "oraculo-chatbot-widget";
  var sessionIdKey = "oraculo-chatbot-session-id";

  /* ── Session ID ── */
  function generateSessionId() {
    try {
      return crypto.randomUUID();
    } catch (_) {
      return (
        Math.random().toString(36).substring(2, 11) +
        Date.now().toString(36)
      );
    }
  }

  var sessionId = localStorage.getItem(sessionIdKey);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(sessionIdKey, sessionId);
  }

  /* ── Chat state (sessionStorage) ── */
  function getState() {
    try {
      var s = sessionStorage.getItem("oraculo-chatbot-state-" + sessionId);
      return s ? JSON.parse(s) : { step: "initial" };
    } catch (_) {
      return { step: "initial" };
    }
  }

  function setState(state) {
    try {
      sessionStorage.setItem(
        "oraculo-chatbot-state-" + sessionId,
        JSON.stringify(state)
      );
    } catch (_) {}
  }

  var chatState = getState();
  var widgetContainer, messagesArea, userInput;

  /* ── Greeting detection ── */
  var greetings = [
    "ol\u00E1", "ola", "oi", "hey", "bom dia", "boa tarde",
    "boa noite", "tudo bem", "tudo bom", "e a\u00ED", "e ai", "opa",
  ];

  function isGreeting(text) {
    var lower = text.toLowerCase().trim();
    /* strip common punctuation so "boa noite." matches "boa noite" */
    lower = lower.replace(/[!?,.;:]+/g, "");
    return greetings.some(function (g) {
      return lower === g || lower.startsWith(g + " ");
    });
  }

  /* ── Inject CSS (cached by browser after first load) ── */
  function injectCSS() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/chatbot-widget.css";
    document.head.appendChild(link);
  }

  /* ── Bootstrap ── */
  function init() {
    injectCSS();
    createWidget();
    bindEvents();
  }

  /* ── Build DOM (no innerHTML, all createElement + className) ── */
  function createWidget() {
    var existing = document.getElementById(widgetId);
    if (existing) existing.remove();

    widgetContainer = document.createElement("div");
    widgetContainer.id = widgetId;

    /* ── Header ── */
    var header = document.createElement("div");
    header.className = "chatbot-header";

    var title = document.createElement("span");
    title.textContent = "Oráculo AI Chatbot";

    var closeBtn = document.createElement("button");
    closeBtn.id = "close-chat";
    closeBtn.textContent = "\u00D7"; /* × symbol */
    closeBtn.setAttribute("aria-label", "Fechar chat");

    header.appendChild(title);
    header.appendChild(closeBtn);

    /* ── Messages area ── */
    messagesArea = document.createElement("div");
    messagesArea.id = "chat-messages";
    messagesArea.className = "chatbot-messages";

    /* ── Input area ── */
    var inputArea = document.createElement("div");
    inputArea.className = "chatbot-input-area";

    userInput = document.createElement("input");
    userInput.type = "text";
    userInput.id = "user-input";
    userInput.placeholder = "Digite sua mensagem...";
    userInput.setAttribute("autocomplete", "off");
    userInput.setAttribute("aria-label", "Digite sua mensagem");

    var sendBtn = document.createElement("button");
    sendBtn.id = "send-btn";
    sendBtn.textContent = "Enviar";

    inputArea.appendChild(userInput);
    inputArea.appendChild(sendBtn);

    /* ── Assemble ── */
    widgetContainer.appendChild(header);
    widgetContainer.appendChild(messagesArea);
    widgetContainer.appendChild(inputArea);
    document.body.appendChild(widgetContainer);

    /* ── Events ── */
    closeBtn.addEventListener("click", closeChat);
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  /* ── Bind trigger button ── */
  function bindEvents() {
    var trigger = document.querySelector(triggerSelector);
    if (!trigger) {
      console.warn("Chatbot trigger not found:", triggerSelector);
      return;
    }
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openChat();
    });
  }

  /* ── Open / Close ── */
  function openChat() {
    widgetContainer.classList.add("chatbot-visible");
    if (chatState.step === "initial") {
      addMessage("bot", "Ol\u00E1 \uD83D\uDC4B Seja bem-vindo(a) \u00E0 nossa empresa.\n\nPosso ajudar voc\u00EA de forma r\u00E1pida. Escolha uma op\u00E7\u00E3o:");
      setTimeout(showOptions, 500);
    }
  }

  function closeChat() {
    widgetContainer.classList.remove("chatbot-visible");
  }

  /* ── Add message bubble ── */
  function addMessage(sender, text) {
    var msgDiv = document.createElement("div");
    msgDiv.className =
      sender === "user" ? "chatbot-message-user" : "chatbot-message-bot";
    /* textContent is safe — no innerHTML with user data */
    msgDiv.textContent = text;
    messagesArea.appendChild(msgDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  /* ── Show options as clickable buttons ── */
  function showOptions() {
    var options = [
      { value: "orcamento", label: "Solicitar or\u00E7amento" },
      { value: "servicos", label: "Conhecer nossos servi\u00E7os" },
      { value: "whatsapp", label: "Falar pelo WhatsApp" },
      { value: "contato", label: "Deixar meus dados para contato" },
    ];

    var container = document.createElement("div");
    container.className = "chatbot-options";

    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "chatbot-option-btn";
      btn.textContent = "\uD83D\uDD39 " + opt.label;
      btn.addEventListener("click", function () {
        userInput.value = opt.value;
        sendMessage();
      });
      container.appendChild(btn);
    });

    messagesArea.appendChild(container);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    setState({ step: "option_selected" });
  }

  /* ── Show sub-options (for service type, site type, etc.) ── */
  function showSubOptions(items) {
    var container = document.createElement("div");
    container.className = "chatbot-options";
    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.className = "chatbot-option-btn";
      btn.textContent = "\uD83D\uDD39 " + item.label;
      btn.addEventListener("click", function () {
        userInput.value = item.value;
        sendMessage();
      });
      container.appendChild(btn);
    });
    messagesArea.appendChild(container);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  /* ── Sanitize input (strip HTML tags) ── */
  function sanitize(str) {
    return str.replace(/<[^>]*>/g, "").trim();
  }

  /* ── Send message flow ── */
  async function sendMessage() {
    var text = sanitize(userInput.value);
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    var state = getState();
    var botResponse = "";
    var subOpts = null; /* sub-options to show as buttons after response */

    /* ── Global greeting detection (any state) ── */
    if (state.step !== "initial" && isGreeting(text)) {
      botResponse = "Ol\u00E1! Tudo bem? \uD83D\uDE42";
      addMessage("bot", botResponse);
      botResponse = "";
      var prompts = {
        ask_name: "Qual \u00E9 o seu nome?",
        ask_phone: "Qual \u00E9 o seu telefone ou WhatsApp?\n\nExemplo: (11) 99999-0000",
        ask_email:
          "Qual \u00E9 o seu e-mail?\n\nSe preferir n\u00E3o informar, digite \"pular\".",
        ask_service:
          "Qual servi\u00E7o voc\u00EA deseja?",
        ask_site_type:
          "Qual tipo de site voc\u00EA precisa?",
        ask_domain:
          "Voc\u00EA j\u00E1 possui dom\u00EDnio e hospedagem?",
        ask_description:
          "Agora descreva brevemente o que voc\u00EA precisa.\n\nExemplo: \"Quero um site institucional com p\u00E1gina inicial, servi\u00E7os, sobre a empresa e formul\u00E1rio de contato.\"",
        ask_message:
          "Escreva uma breve mensagem sobre o que voc\u00EA precisa.",
      };
      if (prompts[state.step]) {
        addMessage("bot", prompts[state.step]);
        if (state.step === "ask_service") {
          showSubOptions(SERVICE_OPTIONS);
        } else if (state.step === "ask_site_type") {
          showSubOptions(SITE_TYPE_OPTIONS);
        } else if (state.step === "ask_domain") {
          showSubOptions(DOMAIN_OPTIONS);
        }
      }
      try {
        await fetch("/api/chatbot/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            session_id: sessionId,
            origem: window.location.href,
          }),
        });
      } catch (_) {}
      return;
    }

    /* ── Option value normalization ── */
    function normalizeOpt(val) {
      var map = {
        "1": "orcamento", "2": "servicos",
        "3": "whatsapp", "4": "contato",
      };
      return map[val] || val;
    }

    /* ── Sub-option definitions ── */
    var SERVICE_OPTIONS = [
      { value: "criacao-site", label: "Cria\u00E7\u00E3o de Site" },
      { value: "loja-virtual", label: "Loja Virtual" },
      { value: "landing-page", label: "Landing Page" },
      { value: "sistema-web", label: "Sistema Web" },
      { value: "automacao-ia", label: "Automa\u00E7\u00E3o com IA" },
      { value: "outro", label: "Outro" },
    ];

    var SITE_TYPE_OPTIONS = [
      { value: "institucional", label: "Site Institucional" },
      { value: "advogado", label: "Site para Advogado" },
      { value: "clinica", label: "Site para Cl\u00EDnica" },
      { value: "corretora", label: "Site para Corretora" },
      { value: "imobiliario", label: "Site Imobili\u00E1rio" },
      { value: "outro", label: "Outro" },
    ];

    var DOMAIN_OPTIONS = [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "N\u00E3o" },
      { value: "nao-sei", label: "N\u00E3o sei" },
    ];

    /* ── State machine ── */
    if (state.step === "option_selected") {
      var opt = normalizeOpt(text);

      if (opt === "orcamento") {
        botResponse = "\u00D3timo! Vou coletar algumas informa\u00E7\u00F5es para que nossa equipe entre em contato.\n\nQual \u00E9 o seu nome?";
        setState({ step: "ask_name", option: "orcamento" });
      } else if (opt === "servicos") {
        botResponse = "Nossos servi\u00E7os incluem desenvolvimento de sites, automa\u00E7\u00E3o com IA e consultoria. Qual \u00E9 o seu nome?";
        setState({ step: "ask_name", option: "servicos" });
      } else if (opt === "whatsapp") {
        var wa = config.whatsappNumber || "5500000000000";
        botResponse = "Clique abaixo para falar conosco pelo WhatsApp.\nhttps://wa.me/" + wa;
        setState({ step: "initial" });
      } else if (opt === "contato") {
        botResponse = "Qual \u00E9 o seu nome?";
        setState({ step: "ask_name", option: "contato" });
      } else if (isGreeting(text)) {
        botResponse = "Ol\u00E1! Como posso ajudar?";
        setTimeout(showOptions, 300);
        setState({ step: "option_selected" });
      } else {
        botResponse = "Op\u00E7\u00E3o inv\u00E1lida. Escolha uma das op\u00E7\u00F5es acima.";
      }

    } else if (state.step === "ask_name") {
      if (state.option === "orcamento") {
        botResponse = "Prazer, " + text + "!\n\nQual \u00E9 o seu telefone ou WhatsApp?\n\nExemplo: (11) 99999-0000";
      } else {
        botResponse = "Qual \u00E9 o seu telefone?";
      }
      setState({ step: "ask_phone", nome: text, option: state.option });

    } else if (state.step === "ask_phone") {
      if (state.option === "orcamento") {
        botResponse = "Perfeito.\n\nQual \u00E9 o seu e-mail?\n\nSe preferir n\u00E3o informar, digite \"pular\".";
      } else {
        botResponse = "Qual \u00E9 o seu e-mail? Se n\u00E3o quiser informar, digite pular.";
      }
      setState({
        step: "ask_email",
        nome: state.nome,
        telefone: text,
        option: state.option,
      });

    } else if (state.step === "ask_email") {
      var pulou = text.toLowerCase() === "pular";
      var email = pulou ? "" : text;

      if (state.option === "orcamento") {
        botResponse = pulou
          ? "Sem problemas \uD83D\uDC4D\n\nQual servi\u00E7o voc\u00EA deseja?"
          : "Qual servi\u00E7o voc\u00EA deseja?";
        subOpts = SERVICE_OPTIONS;
        setState({
          step: "ask_service",
          nome: state.nome,
          telefone: state.telefone,
          email: email,
          option: "orcamento",
        });
      } else {
        botResponse = pulou
          ? "Ok, sem problemas. Escreva uma breve mensagem sobre o que voc\u00EA precisa."
          : "Escreva uma breve mensagem sobre o que voc\u00EA precisa.";
        setState({
          step: "ask_message",
          nome: state.nome,
          telefone: state.telefone,
          email: email,
          option: state.option,
        });
      }

    } else if (state.step === "ask_service") {
      var servico = SERVICE_OPTIONS.find(function (s) {
        return s.value === text || text.toLowerCase().indexOf(s.label.toLowerCase()) !== -1;
      });
      if (servico) {
        if (servico.value === "criacao-site") {
          botResponse = "Excelente escolha.\n\nQual tipo de site voc\u00EA precisa?";
          subOpts = SITE_TYPE_OPTIONS;
          setState({
            step: "ask_site_type",
            nome: state.nome,
            telefone: state.telefone,
            email: state.email,
            servico: servico.label,
            option: "orcamento",
          });
        } else {
          botResponse = "Entendi.\n\nVoc\u00EA j\u00E1 possui dom\u00EDnio e hospedagem?";
          subOpts = DOMAIN_OPTIONS;
          setState({
            step: "ask_domain",
            nome: state.nome,
            telefone: state.telefone,
            email: state.email,
            servico: servico.label,
            option: "orcamento",
          });
        }
      } else {
        botResponse = "Por favor, escolha uma das op\u00E7\u00F5es de servi\u00E7o.";
        subOpts = SERVICE_OPTIONS;
      }

    } else if (state.step === "ask_site_type") {
      var tipo = SITE_TYPE_OPTIONS.find(function (s) {
        return s.value === text || text.toLowerCase().indexOf(s.label.toLowerCase()) !== -1;
      });
      if (tipo) {
        botResponse = "Entendi.\n\nVoc\u00EA j\u00E1 possui dom\u00EDnio e hospedagem?";
        subOpts = DOMAIN_OPTIONS;
        setState({
          step: "ask_domain",
          nome: state.nome,
          telefone: state.telefone,
          email: state.email,
          servico: state.servico,
          tipo_site: tipo.label,
          option: "orcamento",
        });
      } else {
        botResponse = "Por favor, escolha uma das op\u00E7\u00F5es.";
        subOpts = SITE_TYPE_OPTIONS;
      }

    } else if (state.step === "ask_domain") {
      var domainOpts = { sim: "Sim", nao: "N\u00E3o", "nao-sei": "N\u00E3o sei" };
      var dominio = domainOpts[text];
      if (dominio || text === "sim" || text === "nao" || text === "nao-sei") {
        var temDominio = text === "sim" ? "Sim" : text === "nao" ? "N\u00E3o" : "N\u00E3o sei";
        botResponse = temDominio === "N\u00E3o"
          ? "Sem problemas, podemos auxiliar com isso tamb\u00E9m.\n\nAgora descreva brevemente o que voc\u00EA precisa.\n\nExemplo: \"Quero um site institucional com p\u00E1gina inicial, servi\u00E7os, sobre a empresa e formul\u00E1rio de contato.\""
          : "Agora descreva brevemente o que voc\u00EA precisa.\n\nExemplo: \"Quero um site institucional com p\u00E1gina inicial, servi\u00E7os, sobre a empresa e formul\u00E1rio de contato.\"";
        setState({
          step: "ask_description",
          nome: state.nome,
          telefone: state.telefone,
          email: state.email,
          servico: state.servico,
          tipo_site: state.tipo_site || "",
          dominio: temDominio,
          option: "orcamento",
        });
      } else {
        botResponse = "Por favor, escolha Sim, N\u00E3o ou N\u00E3o sei.";
        subOpts = DOMAIN_OPTIONS;
      }

    } else if (state.step === "ask_description") {
      /* ── Summary ── */
      var s = state;
      var emailDisplay = s.email || "N\u00E3o informado";
      var tipoDisplay = s.tipo_site ? "\n\U0001F310 Tipo: " + s.tipo_site : "";
      botResponse =
        "Perfeito! \u2705\n\n" +
        "Resumo da solicita\u00E7\u00E3o:\n\n" +
        "\uD83D\uDC64 Nome: " + s.nome + "\n" +
        "\uD83D\uDCDE Telefone: " + s.telefone + "\n" +
        "\uD83D\uDCE7 E-mail: " + emailDisplay + "\n" +
        "\uD83D\uDCBC Servi\u00E7o: " + s.servico +
        tipoDisplay + "\n" +
        "\uD83D\uDCDD Descri\u00E7\u00E3o: " + text + "\n\n" +
        "Sua solicita\u00E7\u00E3o foi enviada com sucesso.\n\n" +
        "Nossa equipe analisar\u00E1 as informa\u00E7\u00F5es e entrar\u00E1 em contato o mais breve poss\u00EDvel.\n\n" +
        "Obrigado pelo seu interesse! \uD83D\uDE80";

      /* Save lead */
      var lead = {
        nome: s.nome,
        telefone: s.telefone,
        email: s.email,
        servico: s.servico,
        tipo_site: s.tipo_site || "",
        dominio: s.dominio || "",
        mensagem: text,
        origem: window.location.href,
      };
      try {
        await fetch("/api/chatbot/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (e) {
        console.error("Falha ao salvar lead", e);
      }

      addMessage("bot", botResponse);
      botResponse = "";

      /* Follow-up buttons */
      var followUps = [
        { value: "whatsapp", label: "Falar no WhatsApp" },
        { value: "orcamento", label: "Solicitar outro or\u00E7amento" },
        { value: "reinicio", label: "Voltar ao in\u00EDcio" },
      ];
      showSubOptions(followUps);
      setState({ step: "option_selected" });

      /* Log */
      try {
        await fetch("/api/chatbot/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            session_id: sessionId,
            origem: window.location.href,
          }),
        });
      } catch (e) {}
      return;

    } else if (state.step === "ask_message") {
      botResponse = "Recebemos seus dados. Em breve entraremos em contato.";
      var lead = {
        nome: state.nome,
        telefone: state.telefone,
        email: state.email,
        mensagem: text,
        origem: window.location.href,
      };
      try {
        await fetch("/api/chatbot/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (e) {
        console.error("Falha ao salvar lead", e);
      }
      setState({ step: "initial" });
    } else {
      botResponse =
        "Desculpe, n\u00E3o entendi. Por favor, reinicie a conversa fechando e abrindo o chat.";
    }

    /* ── Render response ── */
    if (botResponse) {
      addMessage("bot", botResponse);
    }
    if (subOpts) {
      showSubOptions(subOpts);
    }

    /* ── Log to backend ── */
    try {
      await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          origem: window.location.href,
        }),
      });
    } catch (e) {
      console.error("Falha ao logar mensagem", e);
    }
  }

  /* ── Public API ── */
  window.ChatbotWidget = { init: init };

  /* ── Auto-init ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
