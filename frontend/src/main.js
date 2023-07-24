import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:1337/graphql',
  headers: {
    "X-Parse-Application-Id": "kanbanapp",
    "X-Parse-Master-Key": "dev"
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(createPinia())

app.use(router)

app.mount('#app')
