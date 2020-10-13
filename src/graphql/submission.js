import gql from 'graphql-tag'

export const SUBMISSION_LIST = gql`
  query (
    $jwt: String!,
    $submissionStatus: String,
    $submitter: Int,
    $sampleOwnerOrg: Int,
    $searchQuery: String,
    $pageNumber: Int,
    $nPerPage: Int
  ) {
    search_submission (
      jwt_token: $jwt,
      submission_status: $submissionStatus,
      submitter: $submitter,
      sample_owner_org: $sampleOwnerOrg,
      search_query: $searchQuery,
      page_number: $pageNumber,
      n_per_page: $nPerPage
    ) {
      status
      statuscode
      message
      result {
        backend_key
        BestLIMS_key
        submission_type
        submission_status
        submit_date
        submitter {
          title
          first_name
          last_name
        }
        sample_owner_name
        submission_form_URL
      }
    }
  }
`

export const SUBMISSION_DETAIL = gql`
  query (
    $jwt: String!,
    $key: [String!]!
  ) {
    get_submission (
      jwt_token: $jwt,
      which_backend_keys: $key
    ) {
      status
      statuscode
      message
      result {
        backend_key
        BestLIMS_key
        submission_type
        submission_status
        submit_date
        submitter {
          title
          first_name
          last_name
          phone
          email
        }
        sample_owner_name
        sample_owner_org {
          index
          name
          address
        }
        sample_received_date
        submission_form_URL
        invoice {
          invoice_ID
        }
        invoice_to {
          index
          name
          address
        }
        final_price
        notification_email
        notification_phone
        submission_sent_to_BestLIMS
      }
    }
  }
`

export const SUBMISSION_FORM_DATA = gql`
  query (
    $jwt: String!,
    $key: [String!]!
  ) {
    get_submission (
      jwt_token: $jwt,
      which_backend_keys: $key
    ) {
      status
      statuscode
      message
      result {
        backend_key
        BestLIMS_key
        submission_type
        submitter {
          index
        }
        submit_date
        sample_owner_name
        sample_owner_org {
          index
        }
        invoice_to {
          index
        }
        notification_email
        notification_phone
        submission_data
      }
    }
  }
`

export const SEND_SUBMISSION = gql`
  mutation (
    $jwt: String!,
    $submissionType: String!,
    $submitter: Int,
    $notificationEmail: Boolean!,
    $notificationPhone: Boolean!,
    $sampleOwnerName: String!,
    $sampleOwnerOrg: Int,
    $invoiceTo: Int,
    $submissionData: String!
  ) {
    send_submission (
      jwt_token: $jwt,
      submission_type: $submissionType,
      on_behalf_of_backuser_index: $submitter,
      notification_email: $notificationEmail,
      notification_phone: $notificationPhone,
      sample_owner_name: $sampleOwnerName,
      sample_owner_org: $sampleOwnerOrg,
      invoice_to: $invoiceTo,
      submission_data: $submissionData
    ) {
      statuscode
      status
      message
      result {
        submission_backend_key
        submission_BestLIMS_key
      }
    }
  }
`