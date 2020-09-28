import gql from 'graphql-tag'

// For displaying users list for admin
export const USERS_LIST = gql`
  query (
    $jwt: String!,
    $searchQuery: String,
    $accountActive: Boolean!,
    $accountType: Int
  ) {
    search_backuser (
      jwt_token: $jwt,
      search_query: $searchQuery,
      account_active: $accountActive,
      account_type: $accountType
    ) {
      result {
        index
        account_type
        title
        first_name
        last_name
      }
    }
  }
`

export const DEACTIVATED_USERS_LIST = gql`
  query (
    $jwt: String!,
    $searchQuery: String
  ) {
    search_backuser (
      jwt_token: $jwt,
      search_query: $searchQuery,
      account_active: false
    ) {
      result {
        index
        account_type
        title
        first_name
        last_name
      }
    }
  }
`

// Get user by ID
export const USER_DETAIL = gql`
  query (
    $jwt: String!,
    $index: [Int]
  ) {
    get_backuser (
      jwt_token: $jwt,
      querying_indices: $index
    ) {
      result {
        index
        account_type
        account_active
        title
        first_name
        last_name
        email
        phone
        submitter_of {
          index
          name
          org_type
          address
        }
      }
    }
  }
`

export const USER_ORGS = gql`
  query (
    $jwt: String!,
    $index: [Int]
  ) {
    get_backuser (
      jwt_token: $jwt,
      querying_indices: $index
    ) {
      result {
        submitter_of {
          index
          name
          org_type
        }
      }
    }
  }
`

// Create user
export const CREATE_USER = gql`
  mutation (
    $jwt: String!,
    $password: String!,
    $submitterOf: [Int],
    $title: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $phone: String!,
  ) {
    create_backuser (
      jwt_token: $jwt,
      new_user_account_type: 201,
      new_user_password: $password,
      new_user_submitter_of: $submitterOf,
      new_user_title: $title,
      new_user_first_name: $firstName,
      new_user_last_name: $lastName,
      new_user_email: $email,
      new_user_phone: $phone,
    ) {
      statuscode
      status
      message
      result {
        index
      }
    }
  }
`

// Change contact
export const USER_CHANGE_PHONE = gql`
  mutation (
    $jwt: String!,
    $index: Int!,
    $phone: String!
  ) {
    change_contact_info (
      jwt_token: $jwt,
      account_index: $index,
      phone: $phone
    ) {
      statuscode
      status
      message
    }
  }
`

export const USER_CHANGE_PASSWORD = gql`
  mutation (
    $jwt: String!,
    $oldPass: String!,
    $newPass: String!
  ) {
    change_pass_with_old_pass (
      jwt_token: $jwt,
      old_pass: $oldPass,
      new_pass: $newPass
    ) {
      statuscode
      status
      message
    }
  }
`

export const USER_UPDATE_SUBMISSION_PERMISSION = gql`
  mutation (
    $jwt: String!,
    $index: Int!,
    $submitterOf: [Int]
  ) {
    update_submitter (
      jwt_token: $jwt,
      backuser_index: $index,
      submitter_of: $submitterOf
    ) {
      statuscode
      status
      message
    }
  }
`

export const USER_REMOVE_SELF_SUBMISSION_PERMISSION = gql`
  mutation (
    $jwt: String!,
    $index: [Int]!
  ) {
    remove_self_from_being_submitter (
      jwt_token: $jwt,
      indices_to_be_removed: $index
    ) {
      statuscode
      status
      message
    }
  }
`

export const USER_DEACTIVATE_ACCOUNT = gql`
  mutation (
    $jwt: String!,
    $index: Int!,
    $accountActive: Boolean!
  ) {
    deactivate_user_account (
      jwt_token: $jwt,
      index_to_deactivate: $index,
      account_active: $accountActive
    ) {
      statuscode
      status
      message
    }
  }
`