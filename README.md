# Technical Assistance - Front-End

Esta é uma aplicação web front-end projetada para consumir e interagir com a **[Technical Assistance API](https://github.com/guilherme-eira/technical-assistance-api)**. A interface é focada no gerenciamento de Ordens de Serviço, permitindo que o usuário realize as principais operações de forma visual e intuitiva.

**⚠️ Importante:** Para que esta aplicação funcione, a API back-end deve estar em execução, pois a interface faz chamadas reais aos seus endpoints.

## ⚙️ Funcionalidades

Com base na integração com a API, a interface oferece as seguintes funcionalidades:

* **Criação e Atualização de Ordens de Serviço:** Um formulário dinâmico para cadastrar novas ordens ou atualizar informações de ordens existentes.
* **Listagem Dinâmica:** Exibição de todas as ordens de serviço em uma tabela que é atualizada em tempo real.
* **Busca por Cliente:** Um campo de busca para filtrar e encontrar rapidamente as ordens de serviço de um cliente específico.
* **Gerenciamento de Status:** Um menu de ações contextuais para cada ordem de serviço, permitindo **iniciar**, **completar**, **cancelar** ou **deletar** uma ordem, de acordo com seu status atual.
* **Notificações e Alertas:** Feedbacks visuais para o usuário, como toasts de sucesso e alertas de erro, melhorando a experiência de uso.

## 💻 Tecnologias Utilizadas

* **HTML5:** Para a estruturação semântica do conteúdo.
* **Bootstrap 5:** Para toda a estilização da interface, layout responsivo e componentes modernos (modais, drop-ups, toasts, etc.).
* **JavaScript (ES6+):** Para toda a lógica da aplicação, manipulação do DOM e comunicação com a API (utilizando `fetch` e Módulos).

## 🚀 Como Usar

Não há dependências de pacotes a serem instaladas. Para executar o projeto, você precisa apenas de um navegador e de um servidor local para servir os arquivos estáticos (isso é necessário para evitar problemas de CORS ao fazer requisições para a API).

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:guilherme-eira/technical-assistance-front-end.git
    cd technical-assistance-front-end
    ```

2.  **Inicie a API Back-end:**
    Certifique-se de que a **[Technical Assistance API](https://github.com/guilherme-eira/technical-assistance-api)** esteja rodando localmente (geralmente em `http://localhost:8080`).

3.  **Inicie um servidor local para o front-end:**
    A maneira mais fácil de fazer isso é usando a extensão **Live Server** no Visual Studio Code.
    -   Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.
    -   Abra a pasta do projeto no VS Code.
    -   Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.

4.  **Acesse a aplicação:**
    Seu navegador abrirá automaticamente a aplicação em um endereço como `http://127.0.0.1:5501/index.html`, que já estará pronta para interagir com a API.
