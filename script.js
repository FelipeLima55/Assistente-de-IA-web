async function askQuestion() {

    const apiKey = document.getElementById("apiKey").value;
    const question = document.getElementById("question").value;
    const button = document.getElementById("askButton");
    const responseSection = document.getElementById("responseSection");
    const responseText = document.getElementById("responseText");

    //Ocultar resposta anterior
    responseSection.classList.add('hidden');

    try {
        // Fazer requisição para API do Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: question
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            })
        });

        const data = await response.json();

        //Verificar se houve erro na resposta
        if(!response.ok) {
           throw new Error(data.error?.message || 'Erro na requisição'); 
        }

        responseText.textContent = data.candidates[0].content.parts[0].text;
        responseSection.classList.remove('hidden');

    } catch (error) {
        responseText.textContent = `Erro: ${error.message}`;
        responseSection.classList.remove('hidden');
    } finally {
        button.disabled = false;
        button.textContent = 'Perguntar';
    }
}