async function askQuestion() {
    const apiKey = document.getElementById("apiKey").value.trim();
    const question = document.getElementById("question").value.trim();
    const button = document.getElementById("askButton");
    const responseSection = document.getElementById("responseSection");
    const responseText = document.getElementById("responseText");

    if (!apiKey || !question) {
        alert("Preencha a chave da API e a pergunta.");
        return;
    }

    button.disabled = true;
    button.textContent = "Carregando...";
    responseSection.classList.add("hidden");
    responseText.textContent = "";

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": apiKey,
                },
                body: JSON.stringify({
                    contents: [
                        { parts: [{ text: question }] }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    },
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data?.error?.message || data?.message || "Erro na requisição";
            throw new Error(errorMsg);
        }

        const rawResponse = data.candidates[0].content.parts[0].text;
        responseText.innerHTML = formatResponse(rawResponse);

        // mostrar resposta com animação
        showResponse();

    } catch (error) {
        responseText.textContent = `Erro: ${error.message}`;
        showResponse();
    } finally {
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Perguntar';
    }
}

function showResponse() {
    const responseSection = document.getElementById("responseSection");
    responseSection.classList.remove("hidden");
    responseSection.style.animation = "fadeInResponse 0.5s ease";
}

document.getElementById("askButton").addEventListener("click", askQuestion);

// copiar resposta
function copyResponse() {
    const responseText = document.getElementById('responseText');
    const textToCopy = responseText.innerText || responseText.textContent;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('✅ Resposta copiada!');
        }).catch(() => {
            fallbackCopy(textToCopy);
        });
    } else {
        fallbackCopy(textToCopy);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification('✅ Resposta copiada!');
    } catch (err) {
        showNotification('❌ Erro ao copiar');
    }

    document.body.removeChild(textArea);
}

function clearResponse() {
    const responseSection = document.getElementById('responseSection');
    const responseText = document.getElementById('responseText');

    responseText.innerHTML = '';
    responseSection.classList.add('hidden');

    showNotification('🧹 Resposta limpa!');
}

function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const btnCopiar = document.getElementById('btnCopiar');
    if (btnCopiar) btnCopiar.addEventListener('click', copyResponse);

    const btnLimpar = document.getElementById('btnLimpar');
    if (btnLimpar) btnLimpar.addEventListener('click', clearResponse);
});

// validar api key
function validateApiKey(apiKey) {
    return apiKey && apiKey.trim().length > 0 && apiKey.startsWith('AIza');
}

function formatResponse(text) {
    return text
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^#{1,6}\s+(.*$)/gim, '<h3>$1</h3>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
}

// salvar e carregar api key
document.getElementById('apiKey').addEventListener('blur', function () {
    if (this.value.trim()) {
        localStorage.setItem('gemini_api_key', this.value);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
        document.getElementById('apiKey').value = savedApiKey;
    }
});

// Dark Mode toggle
document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});