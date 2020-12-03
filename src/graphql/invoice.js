import gql from 'graphql-tag'

export const INVOICE_LIST = gql`
  query (
    $search_query: String,
    $invoice_status: String
  ) {
    search_invoice (
      search_query: $search_query,
      invoice_status: $invoice_status
    ) {
      status
      statuscode
      message
      result {
        invoice_no
        invoice_status
      }
    }
  }
`

export const INVOICE_DETAIL = gql`
  query (
    $invoice_no: String!
  ) {
    get_invoice (
      invoice_no: $invoice_no
    ) {
      status
      statuscode
      message
      result {
        invoice_no
        invoice_status
        invoice_date
        invoice_amount
        mail_invoice
        invoice_to {
          name
          address
        }
        invoice_file {
          S3_key
          file_name
        }
        submissions {
          BestLIMS_key
          submission_status
          submission_submit_date
          on_sent_record_submitter_name
          on_sent_record_owner_name
          submission_type
        }
      }
    }
  }
`
