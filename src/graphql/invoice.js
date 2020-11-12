import gql from 'graphql-tag'

export const INVOICE_LIST = gql`
  query (
    $jwt: String!,
    $search_query: String,
    $invoice_status: String
  ) {
    search_invoice (
      jwt: $jwt,
      search_query: $search_query,
      invoice_status: $invoice_status
    ) {
      status
      statuscode
      message
      result {
        invoice_ID
        invoice_status
      }
    }
  }
`

export const INVOICE_DETAIL = gql`
  query (
    $jwt: String!,
    $invoice_ID: String!
  ) {
    search_invoice (
      jwt: $jwt,
      invoice_ID: $invoice_ID
    ) {
      status
      statuscode
      message
      result {
        invoice_ID
        invoice_status
        invoice_date
        invoice_amount
        file_URL
        invoice_to {
          name
          address
        }
        submssions {
          backend_key
          BestLIMS_key
          on_sent_record_invoice_to_name
          on_sent_record_invoice_to_address
          submission_type 
        }
      }
    }
  }
`
