import gql from 'graphql-tag'

export const GET_FILE_URL = gql`
  query (
    $jwt: String!,
    $S3_key: String!
  ) {
    get_file_url (
      jwt: $jwt,
      S3_key: $S3_key
    ) {
      status
      statuscode
      message
      result {
        signed_url
      }
    }
  }
`