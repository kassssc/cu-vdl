import gql from 'graphql-tag'

export const GENERAL_TEST_METHODS = gql`
  query {
    test_method_general_get {
      result {
        department_name
        front_key {
          test_name
          category_name
          min
          max
        }
        BestLIMS_key
        price
      }
    }
  }
`
export const BACTERIA_ANTIBIOTICS = gql`
  query {
    test_method_bacteria_antibiotic_get {
      result {
        json
      }
    }
  }
`

export const DISINFECTANT_TEST_METHODS = gql`
  query {
    test_method_disinfectant_get {
      result {
        department_name
        microbe
        dilution
        toxic
      }
    }
  }
`