import gql from 'graphql-tag'

export const SUBMISSION_LIST = gql`
  query (
    $jwt: String!,
    $submission_status: String,
    $search_query: String,
    $contact: Int,
    $page_number: Int,
    $n_per_page: Int
  ) {
    search_submission (
      jwt: $jwt,
      submission_status: $submission_status,
      search_by_contact_index: $contact,
      search_query: $search_query,
      page_number: $page_number,
      n_per_page: $n_per_page
    ) {
      status
      statuscode
      message
      result {
        backend_key
        BestLIMS_key
        submission_type
        submission_status
        submission_submit_date
        backuser {
          name
        }
        submitter {
          name
        }
        sample_owner {
          name
        }
        invoice_to {
          name
        }
        invoice {
          invoice_status
        }
        reports {
          report_no
        }
      }
    }
  }
`

export const SUBMISSION_DETAIL = gql`
  query (
    $jwt: String!,
    $key: String!
  ) {
    get_submission (
      jwt: $jwt,
      key: $key
    ) {
      status
      statuscode
      message
      result {
        backend_key
        BestLIMS_key
        submission_type
        submission_status
        submission_submit_date
        sample_received_date
        english_report
        remarks
        backuser {
          index
        }
        submitter {
          index
        }
        sample_owner {
          index
        }
        invoice_to {
          index
        }
        invoice {
          invoice_no
          invoice_status
          invoice_amount
          invoice_file {
            S3_key
            file_name
          }
        }
        reports {
          report_no
          report_version
          report_date
          report_description
          report_file {
            S3_key
            file_name
          }
        }
        on_sent_record_submitter_name
        on_sent_record_submitter_address
        on_sent_record_owner_name
        on_sent_record_owner_address
        on_sent_record_invoice_to_name
        on_sent_record_invoice_to_address
        final_price
        notify_to_email
        notify_to_phone
        submission_sent_to_BestLIMS
        submission_data
      }
    }
  }
`

export const SEND_SUBMISSION = gql`
  mutation (
    $jwt: String!,
    $backuser: Int,
    $submission_type: String!,
    $english_report: Boolean!,
    $submitter: Int!,
    $sample_owner: Int!,
    $invoice_to: Int!,
    $notify_to_email: String,
    $notify_to_phone: String,
    $remarks: String,
    $submission_data: String!
  ) {
    send_submission (
      jwt: $jwt,
      backuser_index: $backuser,
      submission_type: $submission_type,
      english_report: $english_report,
      submitter: $submitter,
      sample_owner: $sample_owner,
      invoice_to: $invoice_to,
      notify_to_email: $notify_to_email,
      notify_to_phone: $notify_to_phone,
      remarks: $remarks,
      submission_data: $submission_data
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