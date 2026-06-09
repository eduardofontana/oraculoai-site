(function () {
  var config = window.ChatbotConfig || {};
  var triggerSelector = config.triggerSelector || 'a[aria-label="Falar no WhatsApp"]';
  var widgetId = "oraculo-chatbot-widget";
  var sessionIdKey = "oraculo-chatbot-session-id";

  function generateSessionId() {
    try {
      return crypto.randomUUID();
    } catch (_) {
      return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    }
  }

  var sessionId = localStorage.getItem(sessionIdKey);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(sessionIdKey, sessionId);
  }

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
      sessionStorage.setItem("oraculo-chatbot-state-" + sessionId, JSON.stringify(state));
    } catch (_) {}
  }

  var chatState = getState();
  var widgetContainer, messagesArea, userInput;

  function init() {
    createWidget();
    bindEvents();
  }

  function createWidget() {
    var existing = document.getElementById(widgetId);
    if (existing) existing.remove();

    widgetContainer = document.createElement("div");
    widgetContainer.id = widgetId;
    widgetContainer.style.cssText = "position:fixed;bottom:20px;right:20px;width:360px;max-width:90%;height:500px;max-height:80vh;background:white;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.15);display:none;z-index:10000;font-family:system-ui,sans-serif;";
    widgetContainer.innerHTML =
      '<div style="height:100%;display:flex;flex-direction:column;">' +
      '<div style="background:#0d6efd;color:white;padding:12px 16px;border-top-left-radius:12px;border-top-right-radius:12px;display:flex;justify-content:space-between;align-items:center;">' +
      "<div>Or\u00e1culo AI Chatbot</div>" +
      '<button id="close-chat" style="background:transparent;border:none;color:white;font-size:18px;cursor:pointer;">&times;</button>' +
      "</div>" +
      '<div id="chat-messages" style="flex:1;overflow-y:auto;padding:12px;"></div>' +
      '<div style="display:flex;border-top:1px solid #eee;">' +
      '<input id="user-input" type="text" placeholder="Digite sua mensagem..." style="flex:1;padding:10px;border:none;outline:none;font-size:14px;" autocomplete="off">' +
      '<button id="send-btn" style="background:#0d6efd;color:white;border:none;padding:0 16px;cursor:pointer;">Enviar</button>' +
      "</div></div>";
    document.body.appendChild(widgetContainer);

    messagesArea = widgetContainer.querySelector("#chat-messages");
    userInput = widgetContainer.querySelector("#user-input");
    var sendBtn = widgetContainer.querySelector("#send-btn");
    var closeBtn = widgetContainer.querySelector("#close-chat");

    closeBtn.addEventListener("click", closeChat);
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });
  }

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

  function openChat() {
    widgetContainer.style.display = "flex";
    if (chatState.step === "initial") {
      addMessage("bot", "Ol\u00e1! Seja bem-vindo(a). Como posso ajudar?");
      setTimeout(showOptions, 500);
    }
  }

  function closeChat() {
    widgetContainer.style.display = "none";
  }

  function addMessage(sender, text) {
    var msgDiv = document.createElement("div");
    var baseStyle = "margin:8px 0;max-width:80%;clear:both;";
    if (sender === "user") {
      msgDiv.style.cssText = baseStyle + "margin-left:auto;background:#dcf8c6;border-radius:16px;padding:8px 12px;";
    } else {
      msgDiv.style.cssText = baseStyle + "margin-right:auto;background:#f0f0f0;border-radius:16px;padding:8px 12px;";
    }
    msgDiv.textContent = text;
    messagesArea.appendChild(msgDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  function showOptions() {
    var options = [
      "1. Solicitar or\u00e7amento",
      "2. Conhecer nossos servi\u00e7os",
      "3. Falar no WhatsApp",
      "4. Deixar meus dados para contato",
    ];
    options.forEach(function (opt) {
      addMessage("bot", opt);
    });
    setState({ step: "option_selected" });
  }

  function sanitize(str) {
    return str.replace(/<[^>]*>/g, "").trim();
  }

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
        botResponse = "Qual \u00e9 o seu nome?";
        setState({ step: "ask_name", option: "orcamento" });
      } else if (opt === "2") {
        botResponse = "Nossos serviços incluem desenvolvimento de sites, automação com IA e consultoria. Qual é o seu nome?";
        setState({ step: "ask_name", option: "servicos" });
      } else if (opt === "3") {
        var wa = config.whatsappNumber || "5500000000000";
        botResponse = "Clique abaixo para falar conosco pelo WhatsApp.\nhttps://wa.me/" + wa;
        setState({ step: "initial" });
      } else if (opt === "4") {
        botResponse = "Qual \u00e9 o seu nome?";
        setState({ step: "ask_name", option: "contato" });
      } else {
        botResponse = "Op\u00e7\u00e3o inv\u00e1lida. Por favor, escolha 1, 2, 3 ou 4.";
      }
    } else if (state.step === "ask_name") {
      botResponse = "Qual \u00e9 o seu telefone?";
      setState({ step: "ask_phone", nome: text, option: state.option });
    } else if (state.step === "ask_phone") {
      botResponse = "Qual \u00e9 o seu e-mail? Se n\u00e3o quiser informar, digite pular.";
      setState({ step: "ask_email", nome: state.nome, telefone: text, option: state.option });
    } else if (state.step === "ask_email") {
      var email = text.toLowerCase() === "pular" ? "" : text;
      botResponse = "Escreva uma breve mensagem sobre o que voc\u00ea precisa.";
      setState({ step: "ask_message", nome: state.nome, telefone: state.telefone, email: email, option: state.option });
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
      botResponse = "Desculpe, n\u00e3o entendi. Por favor, reinicie a conversa fechando e abrindo o chat.";
    }

    if (botResponse) {
      addMessage("bot", botResponse);
    }

    try {
      await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId, origem: window.location.href }),
      });
    } catch (e) {
      console.error("Falha ao logar mensagem", e);
    }
  }

  window.ChatbotWidget = { init };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
