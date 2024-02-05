import { gql } from '@apollo/client'

export const GET_RACES = gql`
query fetchAllRaces($name: String!) {
    response {
      success
      errors
      result {
        races(filters: {name: $name}) {
          race {
            race_id
            name
          }
        }
      }
    }
  }
`



