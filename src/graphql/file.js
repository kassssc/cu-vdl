import gql from 'graphql-tag'

export const GET_FILE_URL = gql`
  query (
    $S3_key: String!
  ) {
    get_file_url (
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