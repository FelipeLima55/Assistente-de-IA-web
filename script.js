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
                        {
                            parts: [{ text: question }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    },
                }),
            }
        );

        const data = await response.json();

        //Verificar se houve erro na resposta
        if (!response.ok) {
            const errorMsg = data?.error?.message || data?.message || "Erro na requisição";
            throw new Error(errorMsg);
        }

        // Exibir a resposta do Gemini
        responseText.textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "Resposta vazia";
        responseSection.classList.remove("hidden");

    } catch (error) {
        responseText.textContent = `Erro: ${error.message}`;
        responseSection.classList.remove('hidden');
    } finally {
        button.disabled = false;
        button.textContent = 'Perguntar';
    }
}

document.getElementById("askButton").addEventListener("click", askQuestion);