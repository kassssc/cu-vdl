import gql from 'graphql-tag'

// For displaying users list for admin
export const USERS_LIST = gql`
  query (
    $search_query: String,
    $account_type: Int,
    $account_active: Boolean,
  ) {
    search_backuser (
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
  query {
    search_backuser (
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
    $index: Int
  ) {
    get_backuser (
      index: $index
    ) {
      status
      statuscode
      message
      result {
        index
        account_type
        account_active
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

// Create user
export const CREATE_USER = gql`
  mutation (
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
      account_type: $account_type,
      email: $email,
      phone: $phone,
      contact_type: $contact_type,
      name: $name,
      address: $address,
      name_eng: $name_eng,
      address_eng: $address_eng,
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
    $user_index: Int,
    $phone: String!
  ) {
    update_phone (
      user_index: $user_index,
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
    $old_pass: String!,
    $new_pass: String!
  ) {
    change_password (
      old_pass: $old_pass,
      new_pass: $new_pass
    ) {
      statuscode
      status
      message
    }
  }
`

export const USER_DEACTIVATE_ACCOUNT = gql`
  mutation (
    $user_index: Int,
    $account_active: Boolean
  ) {
    deactivate_account (
      user_index: $user_index,
      account_active: $account_active
    ) {
      statuscode
      status
      message
    }
  }
`

export const USER_NOTIFICATIONS = gql`
  query {
    get_backuser {
      status
      statuscode
      message
      result {
        notifications {
          notification_id
          notification_type
          date
          target
          text
          seen
        }
      }
    }
  }
`

export const SET_NOTIFICATIONS_SEEN = gql`
  mutation (
    $notification_ids: [String!]!
  ) {
    set_notifications_seen (
      notification_ids: $notification_ids
    ) {
      statuscode
      status
      message
    }
  } 
`

export const CLEAN_NOTIFICATIONS = gql`
  mutation {
    clean_notifications {
      statuscode
      status
      message
    }
  } 
`