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
    //Login
    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { username: _username, password: _username }
    })
    user.value = result?.data?.logIn?.viewer?.user ?? null
    /*const sessionToken = result.data?.logIn?.viewer?.sessionToken
    result = await client.query({
      query: CURRENT_USER_QUERY,
      context: {
        headers: { 'X-Parse-Session-Token': sessionToken }
      }
    })*/

  }

  return { user, load }
})
