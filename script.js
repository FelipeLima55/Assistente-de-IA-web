document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const perguntaTextarea = document.getElementById('pergunta');
    const btnPerguntar = document.getElementById('btnPerguntar');
    const responseSection = document.getElementById('response-section');
    const respostaDiv = document.getElementById('resposta');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnLimpar = document.getElementById('btnLimpar');
    const modeloSelect = document.getElementById('modelo');

    // Carrega a API Key do localStorage ao iniciar
    const savedApiKey = localStorage.getItem('ia-api-key');
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
    }
    
    // Salva a API Key no localStorage ao ser alterada 
    apiKeyInput.addEventListener('input', () => {
        localStorage.setItem('ia-api-key', apiKeyInput.value);
    });

    // Lida com o clique no botão "Perguntar"
    btnPerguntar.addEventListener('click', enviarPergunta);
    
    // Lida com o atalho Ctrl+Enter para enviar a pergunta 
    perguntaTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            enviarPergunta();
        }
    });

    // Lida com o clique no botão de copiar
    btnCopiar.addEventListener('click', () => {
        const respostaTexto = respostaDiv.innerText;
        navigator.clipboard.writeText(respostaTexto)
            .then(() => alert('Resposta copiada para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar: ', err));
    });

    // Lida com o clique no botão de limpar
    btnLimpar.addEventListener('click', () => {
        respostaDiv.innerHTML = '';
        responseSection.style.display = 'none';
        perguntaTextarea.value = '';
    });

    async function enviarPergunta() {
        const apiKey = apiKeyInput.value;
        const pergunta = perguntaTextarea.value.trim();
        const modelo = modeloSelect.value;
        
        // Validação de formulários 
        if (!apiKey) {
            alert('Por favor, insira sua API Key.');
            return;
        }
        if (!pergunta) {
            alert('Por favor, digite sua pergunta.');
            return;
        }

        // Estado de loading: desabilita o botão e mostra mensagem 
        btnPerguntar.disabled = true;
        btnPerguntar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Carregando...';
        respostaDiv.innerHTML = 'Aguardando resposta da IA...';
        respostaDiv.style.display = 'block';
        responseSection.style.display = 'block';

        let endpoint;
        if (modelo.startsWith('gpt')) {
            endpoint = 'https://api.openai.com/v1/chat/completions';
        } else if (modelo.startsWith('gemini')) {
            // Usando a URL compatível com OpenAI para Gemini [cite: 100]
            endpoint = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
        }

        try {
            // Faz a requisição POST para a API 
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: modelo,
                    messages: [{ role: 'user', content: pergunta }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Erro na API. Verifique sua chave.');
            }

            const data = await response.json();
            const textoResposta = data.choices[0].message.content;

            respostaDiv.innerHTML = textoResposta;

        } catch (error) {
            console.error('Erro:', error);
            // Tratamento de erros amigável [cite: 41]
            respostaDiv.innerHTML = `<p style="color:red;">Ocorreu um erro: ${error.message}</p>`;
        } finally {
            // Restaura o estado original do botão
            btnPerguntar.disabled = false;
            btnPerguntar.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Perguntar';
        }
    }
});