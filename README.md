# Portfolio de Carlos Henrique Farias Zehnder

Este é um portfolio profissional para Carlos, um desenvolvedor Full-Stack com experiência em Python, React e outras tecnologias.

## Características

- Design responsivo
- Tema claro/escuro
- Suporte bilíngue (Português/Inglês)
- Seções para habilidades, projetos, educação e contato
- Formulário de contato funcional (usando SendGrid)

## Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Express, Node.js
- **Formulário de Contato:** SendGrid API
- **Internacionalização:** i18next
- **Estilo e Componentes:** Tailwind CSS, Shadcn UI

## Instruções para Executar Localmente

1. **Clone o repositório**
   ```
   git clone [URL DO SEU REPOSITÓRIO]
   cd [NOME DO DIRETÓRIO]
   ```

2. **Instale as dependências**
   ```
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto usando `.env.example` como modelo
   - Adicione sua API key do SendGrid e os emails para o formulário de contato

4. **Execute o projeto**
   ```
   npm run dev
   ```

5. **Acesse o site**
   - Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Personalização

Você pode personalizar o conteúdo do portfolio editando os seguintes arquivos:

- `client/src/data/resume.ts` - Informações principais do currículo
- `client/src/data/translations/` - Traduções para português e inglês
- `client/src/index.css` - Estilos globais e cores

## Deployment

Este projeto pode ser facilmente implantado em plataformas como Vercel, Netlify ou GitHub Pages.

## Licença

MIT