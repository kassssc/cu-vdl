import gql from 'graphql-tag'

// For displaying users list for admin
export const USERS_LIST = gql`
  query (
    $jwt: String!,
    $search_query: String,
    $account_type: Int,
    $account_active: Boolean,
  ) {
    search_backuser (
      jwt: $jwt,
      search_query: $search_query,
      account_type: $account_type,
      account_active: $account_active,
    ) {
      status
      statuscode
      message
      result {
        index
        account_type
        default_contact {
          name
        }
      }
    }
  }
`

export const SUBMITTERS_LIST = gql`
  query (
    $jwt: String!
  ) {
    search_backuser (
      jwt: $jwt,
      account_type: 201,
      search_query: "",
      account_active: true,
    ) {
      status
      statuscode
      message
      result {
        index
        account_type
        default_contact {
          name
        }
      }
    }
  }
`

// Get user by ID
export const USER_DETAIL = gql`
  query (
    $jwt: String!,
    $index: Int,
  ) {
    get_backuser (
      jwt: $jwt,
      index: $index
    ) {
      status
      statuscode
      message
      result {
        index
        account_type
        account_active
        name
        email
        phone
        default_contact {
          index
          contact_type
          name
          address
          name_eng
          address_eng
        }
        contact_list {
          index
          contact_type
          name
          address
          name_eng
          address_eng
        }
      }
    }
  }
`

export const USER_CONTACTS = gql`
  query (
    $jwt: String!,
    $index: Int,
  ) {
    get_backuser (
      jwt: $jwt,
      querying_indices: [$index],
    ) {
      status
      statuscode
      message
      result {
        contact_list {
          index
          name
        }
      }
    }
  }
`

// Create user
export const CREATE_USER = gql`
  mutation (
    $jwt: String!,
    $account_type: Int!,
    $email: String!,
    $phone: String!,
    $contact_type: String!,
    $name: String!,
    $address: String!,
    $name_eng: String,
    $address_eng: String,
  ) {
    create_backuser (
      jwt: $jwt,
      new_user_account_type: $account_type,
      new_user_email: $email,
      new_user_phone: $phone,
      new_user_contact_type: $contact_type,
      new_user_name: $name,
      new_user_address: $address,
      new_user_name_eng: $name_eng,
      new_user_address_eng: $address_eng,
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

export const USER_UPDATE_PHONE = gql`
  mutation (
    $jwt: String!,
    $account_index: Int,
    $phone: String!
  ) {
    update_phone (
      jwt: $jwt,
      account_index: $account_index,
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
    $old_pass: String!,
    $new_pass: String!
  ) {
    change_pass_with_old_pass (
      jwt: $jwt,
      old_pass: $oldPass,
      new_pass: $newPass
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
    $user_index: Int,
    $account_active: Boolean
  ) {
    deactivate_account (
      jwt: $jwt,
      user_index: $user_index,
      account_active: $account_active
    ) {
      statuscode
      status
      message
    }
  }
`