import gql from 'graphql-tag'

export const CONTACTS_LIST = gql`
  query (
    $jwt: String!,
    $search_query: String,
    $contact_type: String
  ) {
    search_contact (
      jwt: $jwt,
      search_query: $search_query,
      contact_type: $contact_type
    ) {
      status
      statuscode
      message
      result {
        index
        contact_type
        name
        default_contact_of
      }
    }
  }
`

export const CONTACT_DETAIL = gql`
  query (
    $jwt: String!,
    $index: Int!
  ) {
    get_contact (
      jwt: $jwt,
      index: $index
    ) {
      status
      statuscode
      message
      result {
        index
        contact_type
        name
        address
        name_eng
        address_eng
        default_contact_of
      }
    }
  }
`

export const CREATE_CONTACT = gql`
  mutation (
    $jwt: String!,
    $user_index: Int,
    $contact_type: String!,
    $name: String!,
    $address: String!,
    $name_eng: String,
    $address_eng: String,
  ) {
    create_contact (
      jwt: $jwt,
      user_index: $user_index,
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

export const ADD_CONTACT_TO_USER = gql`
  mutation (
    $jwt: String!,
    $user_index: Int!,
    $contact_index: Int!
  ) {
    modify_contact_list (
      jwt: $jwt,
      backuser_index: $user_index,
      contact_index: $contact_index,
      remove: 0
    ) {
      statuscode
      status
      message
    }
  }
`

export const UPDATE_CONTACT_INFO = gql`
  mutation (
    $jwt: String!,
    $index: Int!,
    $name: String!,
    $address: String!,
  ) {
    update_contact (
      jwt: $jwt,
      contact_index: $index,
      name: $name,
      address: $address,
    ) {
      statuscode
      status
      message
    }
  }
`

export const UPDATE_CONTACT_ENG_INFO = gql`
  mutation (
    $jwt: String!,
    $index: Int!,
    $name_eng: String!,
    $address_eng: String!,
  ) {
    update_contact (
      jwt: $jwt,
      contact_index: $index,
      name_eng: $name_eng,
      address_eng: $address_eng,
    ) {
      statuscode
      status
      message
    }
  }
`