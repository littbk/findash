# 💰 FinDash - Dashboard Financeiro

Projeto Fullstack de controle financeiro desenvolvido para gerenciamento de entradas e saídas. O sistema conta com dashboard interativo, exclusão em massa e cálculos em tempo real.

![FinDash Preview](https://via.placeholder.com/800x400?text=Coloque+Um+Print+Do+Seu+Projeto+Aqui)
*(Dica: Edite o projeto no GitHub depois e cole o link da sua imagem real aqui)*

## 🚀 Tecnologias

Esse projeto foi desenvolvido utilizando as melhores práticas do mercado atual (2025/2026):

### Backend (API)
- **Node.js**: Runtime JavaScript.
- **Fastify**: Framework web focado em alta performance (substituto moderno do Express).
- **SQLite**: Banco de dados SQL leve e local.
- **CORS**: Configuração de segurança para acesso cross-origin.

### Frontend (Interface)
- **React**: Biblioteca para construção de interfaces.
- **TypeScript**: Superset JS para tipagem estática e segurança de código.
- **Vite**: Tooling de frontend de próxima geração.
- **Tailwind CSS v4**: Estilização utility-first moderna.
- **Lucide React**: Biblioteca de ícones leve e otimizada.

## ✨ Funcionalidades

- [x] **Dashboard:** Visualização rápida de Entradas, Saídas e Total.
- [x] **Listagem:** Tabela detalhada de transações.
- [x] **Criação:** Modal para adicionar novas receitas ou despesas.
- [x] **Exclusão:** Remover transações individualmente.
- [x] **Batch Delete:** Selecionar múltiplos itens e excluir em massa (UX avançada).
- [x] **Responsividade:** Layout adaptável.

## 📦 Como rodar o projeto

Clone o repositório e siga os passos abaixo:

### 1. Backend
```bash
cd server
npm install
node index.js
# O servidor rodará na porta 3333
2. Frontend
Abra um novo terminal:

Bash

cd web
npm install
npm run dev
# O front rodará na porta 5173
Desenvolvido para fins de estudo e portfólio.


---

### Passo 3: Comandos Git (Hora de subir)

Agora abra o seu terminal na **raiz do projeto** (`projeto-financas`).

Vamos transformar essa pasta num repositório Git:

```bash
# 1. Inicia o git
git init

# 2. Adiciona todos os arquivos (O .gitignore vai proteger o que não deve ir)
git add .

# 3. Cria o primeiro "save" do projeto
git commit -m "feat: initial commit - FinDash Fullstack Project"

# 4. Renomeia a branch principal para 'main' (padrão atual)
git branch -M main
Passo 4: Conectar com o GitHub
Acesse github.com/new.

Nome do repositório: findash-react-node (ou o que preferir).

Não marque "Add a README", "Add .gitignore". Deixe tudo vazio.

Clique em Create repository.

O GitHub vai te dar uma tela com vários comandos. Copie o bloco que diz "…or push an existing repository from the command line".

Deve ser algo parecido com isso (mas use o link do SEU repositório):

Bash

git remote add origin https://github.com/SEU_USUARIO/findash-react-node.git
git push -u origin main
Rode isso no seu terminal.