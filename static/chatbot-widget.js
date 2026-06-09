// Chatbot Widget for Oráculo AI Site
(function () {
    // Configuration
    const config = window.ChatbotConfig || {};
    const triggerSelector = config.triggerSelector || 'a[aria-label="Falar no WhatsApp"]';
    const apiBase = config.apiBase || ''; // same origin if empty
    const widgetId = 'oraculo-chatbot-widget';
    const sessionIdKey = 'oraculo-chatbot-session-id';

    // State
    let sessionId = localStorage.getItem(sessionIdKey);
    if (!sessionId) {
        sessionId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem(sessionIdKey, sessionId);
    }
    let chatState = {}; // per session state stored in sessionStorage
    const getState = () => {
        const s = sessionStorage.getItem(`oraculo-chatbot-state-${sessionId}`);
        return s ? JSON.parse(s) : { step: 'initial' };
    };
    const setState = (state) => {
        sessionStorage.setItem(`oraculo-chatbot-state-${sessionId}`, JSON.stringify(state));
        chatState = state;
    };
    chatState = getState();

    // DOM elements
    let widgetContainer, chatBox, messagesArea, userInput, sendBtn;

    // Initialize
    function init() {
        createWidget();
        bindEvents();
        // If widget should start open? we keep closed until trigger clicked.
    }

    function createWidget() {
        // Remove if exists
        const existing = document.getElementById(widgetId);
        if (existing) existing.remove();

        widgetContainer = document.createElement('div');
        widgetContainer.id = widgetId;
        widgetContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 360px;
            max-width: 90%;
            height: 500px;
            max-height: 80vh;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.15);
            display: none; /* hidden by default */
            z-index: 10000;
            font-family: system-ui, sans-serif;
        `;
        widgetContainer.innerHTML = `
            <div style="height:100%; display:flex; flex-direction:column;">
                <div style="background:#0d6efd;color:white;padding:12px 16px;border-top-left-radius:12px;border-top-right-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                    <div>Oráculo AI Chatbot</div>
                    <button id="close-chat" style="background:transparent;border:none;color:white;font-size:18px;cursor:pointer;">&times;</button>
                </div>
                <div id="chat-messages" style="flex:1;overflow-y:auto;padding:12px;"></div>
                <div style="display:flex;border-top:1px solid #eee;">
                    <input id="user-input" type="text" placeholder="Digite sua mensagem..." style="flex:1;padding:10px;border:none;outline:none;font-size:14px;">
                    <button id="send-btn" style="background:#0d6efd;color:white;border:none;padding:0 16px;cursor:pointer;">Enviar</button>
                </div>
            </div>
        `;
        document.body.appendChild(widgetContainer);

        // References
        chatBox = widgetContainer;
        messagesArea = widgetContainer.querySelector('#chat-messages');
        userInput = widgetContainer.querySelector('#user-input');
        sendBtn = widgetContainer.querySelector('#send-btn');
        const closeBtn = widgetContainer.querySelector('#close-chat');

        closeBtn.addEventListener('click', closeChat);
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function bindEvents() {
        const trigger = document.querySelector(triggerSelector);
        if (!trigger) {
            console.warn('Chatbot trigger not found:', triggerSelector);
            return;
        }
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openChat();
        });
    }

    function openChat() {
        widgetContainer.style.display = 'flex';
        // If first time, add welcome message
        if (chatState.step === 'initial') {
            addMessage('bot', 'Olá! Seja bem-vindo(a). Como posso ajudar?');
            // Show options after a short delay
            setTimeout(() => {
                showOptions();
            }, 500);
        }
    }

    function closeChat() {
        widgetContainer.style.display = 'none';
    }

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            margin: 8px 0;
            max-width: 80%;
            clear: both;
        `;
        if (sender === 'user') {
            msgDiv.style.cssText += `
                margin-left: auto;
                background: #dcf8c6;
                border-radius: 16px;
                padding: 8px 12px;
            `;
            msgDiv.textContent = text;
        } else {
            msgDiv.style.cssText += `
                margin-right: auto;
                background: #f0f0f0;
                border-radius: 16px;
                padding: 8px 12px;
            `;
            msgDiv.textContent = text;
        }
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function showOptions() {
        const options = [
            { id: '1', text: '1. Solicitar orçamento' },
            { id: '2', text: '2. Conhecer nossos serviços' },
            { id: '3', text: '3. Falar no WhatsApp' },
            { id: '4', text: '4. Deixar meus dados para contato' },
        ];
        options.forEach(opt => {
            addMessage('bot', opt.text);
        });
        // Set state to awaiting option
        setState({ step: 'option_selected' });
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage('user', text);
        userInput.value = '';

        // Send to backend
        try {
            const resp = await fetch(`${apiBase}/api/chatbot/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, session_id: sessionId, origem: window.location.href })
            });
            const data = await resp.json();
            if (data.response) {
                addMessage('bot', data.response);
                // Handle bot response based on state
                handleBotResponse(data.response);
            }
        } catch (err) {
            console.error(err);
            addMessage('bot', 'Desculpe, ocorreu um erro. Tente novamente.');
        }
    }

    function handleBotResponse(botText) {
        const state = getState();
        // Simple state machine
        if (state.step === 'initial') {
            // Already handled in openChat
            return;
        }
        if (state.step === 'option_selected') {
            // User clicked an option (but we haven't captured yet)
            // Actually we need to capture user's option selection from their message.
            // We'll handle based on user's last message (text sent).
            // We'll need to look at the last user message; we can store last user message in state.
            // For simplicity, we'll check the botText? Not good.
            // Instead, we will handle in sendMessage before sending? Let's restructure.
        }
        // We'll implement a more robust flow in sendMessage after getting user input.
    }

    // We'll move state handling to sendMessage before sending to backend.
    // Let's rewrite sendMessage to handle state.

    // Override sendMessage
    const originalSend = sendMessage;
    sendMessage = async function () {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage('user', text);
        userInput.value = '';

        // State handling
        const state = getState();
        let botResponse = '';

        if (state.step === 'initial') {
            // Should not happen because we set options before user can type
            botResponse = 'Por favor, escolha uma opção.';
        } else if (state.step === 'option_selected') {
            // User selected an option
            const option = text.trim();
            if (option === '1') {
                botResponse = 'Qual é o seu nome?';
                setState({ step: 'ask_name', option: 'orcamento' });
            } else if (option === '2') {
                botResponse = 'Nossos serviços incluem desenvolvimento de sites, automação com IA e consultoria. Qual é o seu nome?';
                setState({ step: 'ask_name', option: 'servicos' });
            } else if (option === '3') {
                // WhatsApp
                botResponse = 'Clique abaixo para falar conosco pelo WhatsApp.\nhttps://wa.me/5500000000000';
                setState({ step: 'initial' }); // reset
            } else if (option === '4') {
                botResponse = 'Qual é o seu nome?';
                setState({ step: 'ask_name', option: 'contato' });
            } else {
                botResponse = 'Opção inválida. Por favor, escolha 1, 2, 3 ou 4.';
            }
        } else if (state.step === 'ask_name') {
            botResponse = 'Qual é o seu telefone?';
            setState({ ...state, step: 'ask_phone', nome: text });
        } else if (state.step === 'ask_phone') {
            botResponse = 'Qual é o seu e-mail? Se não quiser informar, digite pular.';
            setState({ ...state, step: 'ask_email', telefone: text });
        } else if (state.step === 'ask_email') {
            let email = text.trim();
            if (email.toLowerCase() === 'pular') email = '';
            botResponse = 'Escreva uma breve mensagem sobre o que você precisa.';
            setState({ ...state, step: 'ask_message', email: email });
        } else if (state.step === 'ask_message') {
            botResponse = 'Recebemos seus dados. Em breve entraremos em contato.';
            // Save lead
            const lead = {
                nome: state.nome,
                telefone: state.telefone,
                email: state.email,
                mensagem: text,
                origem: window.location.href,
            };
            try {
                await fetch(`${apiBase}/api/chatbot/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(lead)
                });
            } catch (e) {
                console.error('Failed to save lead', e);
            }
            setState({ step: 'initial' });
        } else {
            // default fallback
            botResponse = 'Desculpe, não entendi. Por favor, reinicie a conversa fechando e abrindo o chat.';
        }

        // Show bot response
        addMessage('bot', botResponse);
        // Optionally send to backend for logging
        try {
            await fetch(`${apiBase}/api/chatbot/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, session_id: sessionId, origem: window.location.href })
            });
            // Also send bot response? Not needed.
        } catch (e) {
            console.error('Failed to log message', e);
        }
    };

    // Expose init globally
    window.ChatbotWidget = { init };
    // Auto-init if document ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();