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
      addMessage("bot", "Ol\u00E1! Seja bem-vindo(a). Como posso ajudar?");
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

  /* ── Show numbered options ── */
  function showOptions() {
    var options = [
      "1. Solicitar or\u00E7amento",
      "2. Conhecer nossos servi\u00E7os",
      "3. Falar no WhatsApp",
      "4. Deixar meus dados para contato",
    ];
    options.forEach(function (opt) {
      addMessage("bot", opt);
    });
    setState({ step: "option_selected" });
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

    if (state.step === "option_selected") {
      var opt = text;
      if (opt === "1") {
        botResponse = "Qual \u00E9 o seu nome?";
        setState({ step: "ask_name", option: "orcamento" });
      } else if (opt === "2") {
        botResponse =
          "Nossos servi\u00E7os incluem desenvolvimento de sites, automa\u00E7\u00E3o com IA e consultoria. Qual \u00E9 o seu nome?";
        setState({ step: "ask_name", option: "servicos" });
      } else if (opt === "3") {
        var wa = config.whatsappNumber || "5500000000000";
        botResponse =
          "Clique abaixo para falar conosco pelo WhatsApp.\nhttps://wa.me/" +
          wa;
        setState({ step: "initial" });
      } else if (opt === "4") {
        botResponse = "Qual \u00E9 o seu nome?";
        setState({ step: "ask_name", option: "contato" });
      } else {
        botResponse =
          "Op\u00E7\u00E3o inv\u00E1lida. Por favor, escolha 1, 2, 3 ou 4.";
      }
    } else if (state.step === "ask_name") {
      botResponse = "Qual \u00E9 o seu telefone?";
      setState({ step: "ask_phone", nome: text, option: state.option });
    } else if (state.step === "ask_phone") {
      botResponse =
        "Qual \u00E9 o seu e-mail? Se n\u00E3o quiser informar, digite pular.";
      setState({
        step: "ask_email",
        nome: state.nome,
        telefone: text,
        option: state.option,
      });
    } else if (state.step === "ask_email") {
      var email = text.toLowerCase() === "pular" ? "" : text;
      botResponse =
        "Escreva uma breve mensagem sobre o que voc\u00EA precisa.";
      setState({
        step: "ask_message",
        nome: state.nome,
        telefone: state.telefone,
        email: email,
        option: state.option,
      });
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

    if (botResponse) {
      addMessage("bot", botResponse);
    }

    /* Log the message to the backend (fire-and-forget) */
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
