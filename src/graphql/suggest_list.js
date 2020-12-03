import gql from 'graphql-tag'

export const SUGGEST_LIST = gql`
  query {
    suggest_list {
      status
      statuscode
      message
      result {
        field_name
        suggest_list
      }
    }
  }
`