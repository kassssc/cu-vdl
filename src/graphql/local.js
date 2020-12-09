import gql from 'graphql-tag'

export const AUTH_DATA = gql`{
  auth @client {
    logged_in
    is_admin
    user_index
    name
  }
}`

/* export const SET_AUTH = gql`
  mutation (
    $loggedIn: Boolean!,
    $isAdmin: Boolean!,
    $userIndex: Int!,
    $userFullName: String!
  ) {
    setAuth (
      loggedIn: $loggedIn,
      isAdmin: $isAdmin,
      userIndex: $userIndex,
      userFullName: $userFullName
    ) @client
  }
` */