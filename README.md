# 🕷️ Crawler Digesto Docs

Este projeto tem como objetivo realizar o *crawler* da documentação do site [Digesto API Docs](https://op.digesto.com.br/doc_api/intro.html) e salvar o conteúdo em arquivos **PDF**, com o propósito de enriquecer a base de conteúdo interna.

---

## 📂 Estrutura do Projeto

```
crawler-digesto/
├── digesto_pdf.js
├── package.json
└── README.md
```

---

## ⚙️ Passo a Passo para Execução

### 1. Entrar na pasta do projeto

```bash
cd ~/code/crawler-digesto/
```

### 2. Inicializar o projeto Node

```bash
npm init -y
```

> Isso criará o arquivo `package.json` com as configurações padrão.

### 3. Instalar as dependências necessárias

```bash
npm install puppeteer pdf-lib
```

> As dependências utilizadas são:
> - **[puppeteer](https://pptr.dev/)** — para automatizar a navegação e extração dos dados do site.
> - **[pdf-lib](https://pdf-lib.js.org/)** — para gerar e manipular os arquivos PDF resultantes.

### 4. Executar o script principal

```bash
node digesto_pdf.js
```

> O script irá acessar a documentação, capturar o conteúdo e gerar os PDFs automaticamente.

---

## 🔧 Configurando para Outras Fontes

Se você deseja usar este crawler para outras fontes de documentação, é necessário alterar a URL base no arquivo `digesto_pdf.js`.

### Como modificar a URL

1. **Abra o arquivo `digesto_pdf.js` em um editor de texto:**

   ```bash
   code digesto_pdf.js
   ```
   ou
   ```bash
   nano digesto_pdf.js
   ```

2. **Localize a variável de URL no início do arquivo:**

   Procure por uma linha semelhante a:
   ```javascript
   const BASE_URL = 'https://op.digesto.com.br/doc_api/intro.html';
   ```

3. **Substitua pela nova URL:**

   ```javascript
   const BASE_URL = 'https://exemplo.com/documentacao/';
   ```

4. **Ajuste os seletores CSS (se necessário):**

   Dependendo da estrutura HTML do novo site, pode ser necessário ajustar os seletores CSS que o script utiliza para navegar e extrair o conteúdo. Procure por:
   - `document.querySelector()` ou `document.querySelectorAll()`
   - Seletores como `.menu`, `.content`, `#main`, etc.

5. **Teste a execução:**

   ```bash
   node digesto_pdf.js
   ```

> **⚠️ Nota:** Diferentes sites podem ter estruturas HTML completamente diferentes. Você pode precisar revisar a lógica de navegação e extração de conteúdo do script para adaptá-lo à nova fonte.

---

## 💻 Instalando o Node.js no macOS

Caso ainda não tenha o **Node.js** instalado no seu Mac, siga um dos métodos abaixo.

### 🥇 Método Recomendado (via Homebrew)

1. **Verifique se o Homebrew está instalado:**

   ```bash
   brew --version
   ```

   - Se não estiver instalado, rode o comando abaixo e siga as instruções no terminal:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```

2. **Instale o Node.js:**

   ```bash
   brew install node
   ```

3. **Verifique se a instalação foi bem-sucedida:**

   ```bash
   node -v
   npm -v
   ```

   > O terminal deve mostrar algo como:
   > ```
   > v22.4.0
   > 10.7.0
   > ```

---

### 🧰 Método Alternativo (via Node Version Manager - NVM)

O **NVM** permite instalar e gerenciar várias versões do Node.js.

1. **Instalar o NVM:**

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
   ```

2. **Recarregar o terminal:**

   ```bash
   source ~/.bashrc
   ```
   ou, se usar zsh:
   ```bash
   source ~/.zshrc
   ```

3. **Instalar a versão mais recente do Node.js:**

   ```bash
   nvm install node
   ```

4. **Verificar se está tudo certo:**

   ```bash
   node -v
   npm -v
   ```

---

## 📘 Notas Importantes

- O **Node.js 16+** é recomendado.
- O **Puppeteer** baixa uma versão própria do Chrome Headless — a primeira execução pode demorar um pouco.
- Os PDFs serão gerados na pasta configurada dentro do script `digesto_pdf.js`.

---

## 🧑‍💻 Autor

**Rafael Grube**  

---

## 📄 Licença

Este projeto é de uso interno e não possui licença pública definida.
