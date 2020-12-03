import gql from 'graphql-tag'

export const SUBMISSION_LIST = gql`
  query (
    $submission_status: String,
    $search_query: String,
    $contact: Int,
    $page_number: Int,
    $n_per_page: Int
  ) {
    search_submission (
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
  query ($key: String!) {
    get_submission (key: $key) {
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
        mail_invoice
        mail_report_to_submitter
        mail_report_to_sample_owner
        submission_sent_to_BestLIMS
        sample_details
        submission_batches
      }
    }
  }
`

export const SEND_SUBMISSION = gql`
  mutation (
    $backuser: Int,
    $submission_type: String!,
    $english_report: Boolean!,
    $submitter: Int!,
    $sample_owner: Int!,
    $invoice_to: Int!,
    $mail_invoice: Boolean!,
    $mail_report_to_submitter: Boolean!,
    $mail_report_to_sample_owner: Boolean!,
    $remarks: String,
    $sample_details: String
    $submission_batches: String!
  ) {
    send_submission (
      backuser: $backuser,
      submission_type: $submission_type,
      english_report: $english_report,
      submitter: $submitter,
      sample_owner: $sample_owner,
      invoice_to: $invoice_to,
      mail_invoice: $mail_invoice,
      mail_report_to_submitter: $mail_report_to_submitter,
      mail_report_to_sample_owner: $mail_report_to_sample_owner,
      remarks: $remarks,
      sample_details: $sample_details,
      submission_batches: $submission_batches
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

export const UPDATE_SUBMISSION = gql`
  mutation (
    $backend_key: String!,
    $english_report: Boolean!,
    $sample_owner: Int!,
    $invoice_to: Int!,
    $mail_invoice: Boolean!,
    $mail_report_to_submitter: Boolean!,
    $mail_report_to_sample_owner: Boolean!,
    $remarks: String,
    $sample_details: String
    $submission_batches: String!
  ) {
    update_submission (
      backend_key: $backend_key,
      english_report: $english_report,
      sample_owner: $sample_owner,
      invoice_to: $invoice_to,
      mail_invoice: $mail_invoice,
      mail_report_to_submitter: $mail_report_to_submitter,
      mail_report_to_sample_owner: $mail_report_to_sample_owner,
      remarks: $remarks,
      sample_details: $sample_details,
      submission_batches: $submission_batches
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
