# 🤖 Assistente de IA com Gemini

Uma interface web moderna e responsiva para interagir com a API do Google Gemini, permitindo conversas inteligentes de forma simples e elegante.

## ✨ Características

- **Interface limpa e moderna** - Design responsivo com gradientes e animações
- **Integração com Gemini 2.0 Flash** - Utiliza o modelo mais recente do Google
- **Formatação inteligente** - Respostas com markdown, código destacado e listas
- **Funcionalidades práticas** - Copiar, limpar e salvar API key
- **Notificações visuais** - Feedback em tempo real das ações
- **Validação automática** - Campos obrigatórios e tratamento de erros

## 🚀 Funcionalidades

### 📝 Interface Principal
- Campo para inserir API Key do Gemini com botão de visibilidade
- Área de texto expansível para perguntas
- Botão de envio com estado de carregamento
- Área de resposta com formatação rica

### 🛠️ Recursos Avançados
- **Copiar resposta** - Copia o texto limpo para área de transferência
- **Limpar resposta** - Remove a resposta atual da tela
- **Salvamento automático** - API Key salva no localStorage
- **Validação da API Key** - Verifica formato correto (AIza...)
- **Tratamento de erros** - Mensagens claras para problemas

### 🎨 Formatação de Respostas
- **Negrito**: `**texto**` → **texto**
- **Itálico**: `*texto*` → *texto*
- **Títulos**: `## Título` → Títulos estilizados
- **Listas**: `* item` → Listas organizadas
- **Código inline**: `` `código` `` → `código` destacado
- **Blocos de código**: ` ```código``` ` → Blocos formatados

## 📁 Estrutura do Projeto

```
projeto/
├── index.html      # Estrutura HTML principal
├── style.css       # Estilos CSS responsivos
├── script.js       # Lógica JavaScript
└── README.md       # Documentação
```

## 🔧 Como Usar

### 1. **Obter API Key do Gemini**
- Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
- Crie uma nova API Key
- Copie a chave (formato: `AIza...`)

### 2. **Configurar o Projeto**
```bash
# Clone ou baixe os arquivos
# Certifique-se de ter todos os 3 arquivos na mesma pasta
projeto/
├── index.html
├── style.css
└── script.js
```

### 3. **Executar a Aplicação**
- Abra o arquivo `index.html` no seu navegador
- Cole sua API Key no campo apropriado
- Digite sua pergunta e clique em "Perguntar"

- Caso queira apenas testar, pode utilizar o link do deploy: https://felipelima55.github.io/Assistente-de-IA-web/

## 💻 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com flexbox e grid
- **JavaScript ES6+** - Lógica da aplicação
- **Fetch API** - Requisições HTTP
- **Font Awesome** - Ícones dos botões
- **Google Gemini API** - Inteligência artificial

## 🎯 Principais Funcionalidades do JavaScript

### `askQuestion()`
Função principal que:
- Valida os campos obrigatórios
- Faz requisição para API do Gemini
- Formata e exibe a resposta
- Trata erros e estados de loading

### `formatResponse(text)`
Converte markdown em HTML:
```javascript
// Exemplos de formatação
**negrito** → <strong>negrito</strong>
*itálico* → <em>itálico</em>
## Título → <h3>Título</h3>
* lista → <li>lista</li>
```

### `copyResponse()` e `clearResponse()`
- **Copiar**: Extrai texto limpo e copia para clipboard
- **Limpar**: Remove resposta e oculta seção

### `showNotification(message)`
Sistema de notificações com:
- Animações de entrada/saída
- Auto-remoção após 3 segundos
- Prevenção de spam de notificações

## 🔒 Segurança

- **API Key local** - Armazenada apenas no navegador do usuário
- **HTTPS suportado** - Funciona com clipboard moderno
- **Fallback HTTP** - Método alternativo para cópia em HTTP
- **Validação de entrada** - Verifica formato da API Key

## 🎨 Personalização

### Modificar Cores
No arquivo `style.css`, altere as variáveis de gradiente:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Ajustar Modelo do Gemini
No arquivo `script.js`, linha 13:
```javascript
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
```

### Configurar Parâmetros de Geração
```javascript
generationConfig: {
    temperature: 0.7,        // Criatividade (0-1)
    maxOutputTokens: 1000,   // Tamanho máximo da resposta
}
```

## 🐛 Solução de Problemas

### Erro de API Key inválida
- Verifique se a chave começa com `AIza`
- Confirme se a API está ativada no Google Console
- Teste a chave diretamente na documentação

### Resposta não aparece
- Abra o console do navegador (F12)
- Verifique se há erros de CORS
- Confirme se todos os arquivos estão na mesma pasta

### Problemas de formatação
- Verifique se a função `formatResponse()` está sendo chamada
- Teste com respostas simples primeiro
- Confirme se o innerHTML está sendo usado

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões recentes)
- **Dispositivos**: Desktop, tablet e mobile
- **Protocolos**: HTTP e HTTPS (com funcionalidades adaptadas)

## 🤝 Contribuições

Sinta-se livre para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Compartilhar ideias

## 📄 Licença

Este projeto é de código aberto. Use, modifique e distribua livremente.

---

**Criado com ❤️ para facilitar o acesso à IA do Gemini**

## 👥 Equipe

Este projeto foi desenvolvido por:

### **Felipe da Silva Lima** 🛠️
- **Responsável pelo Backend**
- Integração com API do Gemini
- Lógica JavaScript e funcionalidades
- Tratamento de erros e validações

### **Renata Brito** 🎨
- **Responsável pelo Frontend** 
- Design da interface e experiência do usuário
- Estilos CSS e responsividade
- Animações e elementos visuais

**Trabalho em equipe que resultou em uma interface funcional e elegante!**

### 🔗 Links Úteis
- [Documentação do Gemini](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)
