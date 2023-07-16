# Kanban App 

[![Package - vue](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/vue?color=green)](https://www.npmjs.com/package/vue)
[![Package - @vueuse/core](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/@vueuse/core?color=green)](https://www.npmjs.com/package/@vueuse/core)
[![Package - vue-router](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/vue-router?color=green)](https://www.npmjs.com/package/vue-router)
[![Package - pinia](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/pinia?color=yellow)](https://www.npmjs.com/package/pinia)
[![Package - axios](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/axios?color=red)](https://www.npmjs.com/package/axios)
[![Package - tailwindcss](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/dev/tailwindcss?color=blue)](https://www.npmjs.com/package/tailwindcss)
[![Package - tailwind-scrollbar](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/dev/tailwind-scrollbar?color=blue)](https://www.npmjs.com/package/tailwind-scrollbar)
[![Package - daisyui](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/dev/daisyui?color=purple)](https://www.npmjs.com/package/daisyui)
[![Package - theme-change](https://img.shields.io/github/package-json/dependency-version/bpbastos/kanban-app/theme-change?color=orange)](https://www.npmjs.com/package/theme-change)

<img src="screenshot/board.jpg" alt="Tela principal">

> Pequena aplicação web de gestão de projetos utilizando Kanban. Desenvolvida com Vue 3, Tailwind CSS e DaisyUI. 

> Este frontend foi desenvolvido como trabalho de conclusão do segundo módulo - Desenvolvimento Frontend Avançado - da Pós-Graduação em Desenvolvimento FullStack da PUC-RIO. 

> Link para o [protótipo em alta fidelidade no Figma](https://www.figma.com/file/H1MaexkrCc6AknLQi43HqE/Kanban-App?type=design&node-id=0%3A1&mode=design&t=wljF02F4Yds8ZjUA-1)

## Funcionalidades

- [x] Listar quadros.
- [x] Criar tarefa.
- [x] Editar tarefa.
- [x] Excluir tarefa.
- [x] Adicionar sub tarefas.
- [x] Exibir informações do perfil de usuário.

## Todo
- [ ] Implementar backend real.
- [ ] Login de usuário.
- [ ] Registro de usuários.
- [ ] Criar/Editar/Arquivar quadros.
- [ ] Criar/Editar/Arquivar workflows|status.
- [ ] Arquivar tarefas.
- [ ] Associar usuários a tarefas.
- [ ] Associar usuários a sub tarefas.
- [ ] Reordenar tarefas.
- [ ] Reordenar sub tarefas.
- [ ] Arrastar tarefas entre workflows|status.
- [ ] Layout Responsivo no mobile.
- [ ] Validação nos formulários.
- [x] ~~Gerenciador de temas.~~
- [x] ~~Sistema de notificação.~~
- [x] ~~Implementar interface entre API e frontend via composables~~


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
