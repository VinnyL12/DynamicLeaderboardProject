import { gql } from '@apollo/client'

export const GET_RACES = gql`
query fetchAllRaces {
    response {
      success
      errors
      result {
          race {
            race_id
            name
          }
        }
      }
    }
  
`



