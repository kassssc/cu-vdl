import gql from 'graphql-tag'

export const CONTACTS_LIST = gql`
  query (
    $search_query: String,
    $contact_type: String
  ) {
    search_contact (
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
    $index: Int!
  ) {
    get_contact (
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
    $user_index: Int,
    $contact_type: String!,
    $name: String!,
    $address: String!,
    $name_eng: String,
    $address_eng: String,
  ) {
    create_contact (
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
    $user_index: Int,
    $contact_index: Int!
  ) {
    modify_contact_list (
      backuser_index: $user_index,
      contact_index: $contact_index
    ) {
      statuscode
      status
      message
    }
  }
`

export const UPDATE_CONTACT_INFO = gql`
  mutation (
    $index: Int!,
    $name: String!,
    $address: String!,
  ) {
    update_contact (
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
    $index: Int!,
    $name_eng: String!,
    $address_eng: String!,
  ) {
    update_contact (
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