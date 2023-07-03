# Kanban App 

[![Package - vue](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/vue?color=green)](https://www.npmjs.com/package/vue)
[![Package - tailwindcss](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/dev/tailwindcss?color=blue)](https://www.npmjs.com/package/tailwindcss)
[![Package - tailwind-scrollbar](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/dev/tailwind-scrollbar?color=blue)](https://www.npmjs.com/package/tailwind-scrollbar)
[![Package - daisyui](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/dev/daisyui?color=purple)](https://www.npmjs.com/package/daisyui)

<img src="screenshot/board.jpg" alt="Tela principal">

> Pequena aplicação web de gestão de tarefas através do Kanban desenvolvida com Vue 3, Tailwind CSS e DaisyUI. 

> Este frontend foi desenvolvido como trabalho de conclusão do módulo 2 do curso Desenvolvimento Frontend Avançado da Pós-Graduação em Desenvolvimento FullStack da PUC-RIO. 

## Funcionalidades

- Listar quadros.
- Criar tarefa.
- Editar tarefa.
- Adicionar sub tarefas as tarefas.
- Exibir informações do perfil de usuário.

## Todo
- Implementar backend real.
- Login de usuário.
- Registro de usuários.
- Criar/Editar/Arquivar quadros.
- Criar/Editar/Arquivar workflows|status.
- Arquivar tarefas.
- Associar usuários a tarefas.
- Associar usuários a sub tarefas.
- Reordenar tarefas.
- Reordenar sub tarefas.
- Arrastar tarefas entre workflows|status.
- Layout Responsivo no mobile.
- Gerenciador de temas.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->
* `NodeJS`

## 🚀 Instalando

Para instalar, siga estas etapas:

Clone o repositório :
```sh
git clone https://github.com/bpbastos/kanban-app.git
```

Após clonar, instale as dependências da aplicação.

```sh
npm install
```

## ☕ Usando

Primeiro inicie o fake backend:

```sh
npm run backend
```

Em outro terminal, execute:
```sh
npm run dev
```

Abra o endereço http://localhost:5173/board no seu navegador.
