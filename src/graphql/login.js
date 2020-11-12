import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation (
    $email: String!,
    $password: String!
  ) {
    login (
      email: $email,
      password: $password
    ) {
      statuscode
      status
      message
      result {
        jwt
      }
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation (
    $token: String!,
    $new_pass: String!
  ) {
    change_password_with_token (
      token: $token,
      new_pass: $new_pass
    ) {
      statuscode
      status
      message
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation (
    $email: String!
  ) {
    forgot_password (
      email: $email
    ) {
      statuscode
      status
      message
    }
  }
`

export const JWT_REFRESH = gql`
  mutation (
    $jwt: String!
  ) {
    refresh_token (
      jwt: $jwt
    ) {
      statuscode
      status
      message
      result {
        jwt
      }
    }
  }
`