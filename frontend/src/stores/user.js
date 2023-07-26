import { ref, inject } from 'vue'

import { defineStore } from 'pinia'

import { DefaultApolloClient } from '@vue/apollo-composable'

import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
mutation LogIn($username: String!, $password: String!){
  logIn(input: {
    username: $username
    password: $password
  }){
    viewer{
      user{
        id
        username
        firstName
        lastName
        email
        gender
        mobile
        occupation
        status
        address
        birthday
        biografy
        createdAt
        profilePicture {
          url
        }
      }
      sessionToken
    }
  }
}
`


export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const load = async (_username) => {
    const client = inject(DefaultApolloClient)
    
    //Login - temporary - move this code to login page
    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { username: _username, password: _username }
    })

    user.value = result?.data?.logIn?.viewer?.user ?? null
  }

  return { user, load }
})
