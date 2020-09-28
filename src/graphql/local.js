import gql from 'graphql-tag'

export const AUTH_DATA = gql`{
  auth @client {
    loggedIn
    isAdmin
    userIndex
    userFullName
  }
}`

export const USER_INDEX = gql`{
  auth @client {
    userIndex
  }
}`

export const USER_FULL_NAME = gql`{
  auth @client {
    userFullName
  }
}`

export const LOGGED_IN = gql`{
  auth @client {
    loggedIn
  }
}`

export const IS_ADMIN = gql`{
  auth @client {
    isAdmin
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