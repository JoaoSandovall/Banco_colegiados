# Sistema de Gestão de Colegiados - MIDR

Aplicação Full Stack desenvolvida para a organização, filtragem e gestão de instâncias de colegiados e seus respectivos representantes no âmbito do MIDR. O sistema permite o controle de vigência, âmbitos de atuação e classificação por etiquetas personalizadas.

## Tecnologias Utilizadas

### Backend
* **Python 3.11+**: Linguagem base do servidor.
* **FastAPI**: Framework de alta performance para a construção da API REST.
* **SQLAlchemy**: ORM para mapeamento e manipulação do banco de dados.
* **SQLite**: Banco de dados relacional para persistência dos colegiados e representantes.
* **Pydantic**: Validação de esquemas e tipagem de dados.
* **Uvicorn**: Servidor ASGI para execução do backend.

### Frontend
* **React 18+**: Biblioteca principal para construção da interface.
* **TypeScript**: Tipagem estática para maior segurança e manutenibilidade do código.
* **Vite**: Ferramenta de build e servidor de desenvolvimento ultra-rápido.
* **Tailwind CSS**: Framework de estilização utilitária para design responsivo.
* **Shadcn UI**: Componentes de interface de alta qualidade (Modais, Tabelas, Selects).
* **Lucide React**: Biblioteca de ícones vetoriais.
* **Axios / Fetch API**: Comunicação com o backend.

---

## Estrutura do Projeto

```text
/
├── backend/                 # Servidor e lógica de persistência
│   ├── main.py              # Endpoints da API e configuração do CORS
│   ├── models.py            # Modelos do SQLAlchemy (Tabelas: colegiados, representantes)
│   ├── schemas.py           # Modelos Pydantic para validação e resposta
│   └── database.py          # Configuração da conexão com o banco de dados
├── src/                     # Frontend da aplicação
│   ├── components/          # Componentes modulares
│   │   ├── ColegiadosTable.tsx     # Tabela de dados com ações (CRUD)
│   │   ├── FilterSection.tsx       # Painel de filtros avançados
│   │   ├── TagsManager.tsx         # Gestão de etiquetas coloridas
│   │   ├── Sidebar.tsx             # Navegação principal
│   │   └── ui/                     # Componentes base do Shadcn UI
│   ├── service/
│   │   └── api.ts           # Integração e chamadas para o backend
│   ├── App.tsx              # Orquestrador de estado e layout principal
│   └── main.tsx             # Ponto de entrada do React
├── package.json             # Dependências do frontend
└── vite.config.ts           # Configurações do ambiente Vite

## Instalação e Execução

### Pré-requisitos
* Python 3.11 ou superior.
* Node.js (v18+) e npm.

### 1. Configuração do Backend
**Bash**
```bash
# Entre na pasta do backend
cd backend

# Crie e ative o ambiente virtual
python -m venv venv

# Windows:
.\venv\Scripts\Activate.ps1

# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install fastapi uvicorn sqlalchemy

# Execute o servidor
uvicorn main:app --reload
```
A API estará disponível em: `http://127.0.0.1:8000`

### 2. Configuração do Frontend
**Bash**
```bash
# Na raiz do projeto
npm install

# Execute em modo de desenvolvimento
npm run dev
```
Acesse a aplicação em: `http://localhost:5173`

## Funcionalidades Implementadas
* **Painel de Filtros Funcional**: Filtragem por nome, status, coordenação, atuação MIDR e etiquetas.
* **Gestão de Etiquetas (Tags)**: Sistema dinâmico de labels coloridas persistidas no banco.
* **CRUD Completo**: Criação, edição e exclusão de colegiados com validação de campos.
* **Responsividade**: Interface adaptada para diferentes resoluções de tela.
* **Gestão de Representantes**: Visualização e controle dos membros vinculados a cada instância.
