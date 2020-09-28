import gql from 'graphql-tag'

export const ORGS_LIST = gql`
  query (
    $jwt: String!,
    $searchQuery: String!,
    $orgType: Int
  ) {
    search_org (
      jwt_token: $jwt,
      search_query: $searchQuery,
      org_type: $orgType
    ) {
      result {
        index
        org_type
        name
      }
    }
  }
`

// Get org with submitter details
export const ORG_DETAIL = gql`
  query (
    $jwt: String!,
    $index: [Int]
  ) {
    get_org (
      jwt_token: $jwt,
      inspecting_org_indices: $index
    ) {
      result {
        org_type
        name
        address
        submitters {
          index
          title
          first_name
          last_name
        }
      }
    }
  }
`

// Create org
export const CREATE_ORG = gql`
  mutation (
    $jwt: String!,
    $orgType: Int!,
    $name: String!,
    $address: String!,
  ) {
    create_org (
      jwt_token: $jwt,
      new_org_org_type: $orgType,
      new_org_name: $name,
      new_org_address: $address,
    ) {
      statuscode
      status
      message
      result {
        index
        name
        address
      }
    }
  }
`