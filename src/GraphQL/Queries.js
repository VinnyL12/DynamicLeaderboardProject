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
            address {
                state
                city
            }
          }
        }
      }
    }
  }
`

export const GET_ADVANCED_RACES = gql`
query fetchAllRaces($name: String!, $city: String, $state: String, $country_code: String, $start_date: date) {
  advancedResponse {
    success
    errors
    result {
      races(
        filters: {name: $name, city: $city, state: $state, country_code: $country_code, start_date: $start_date}
      ) {
        race {
          race_id
          name
          last_date
          last_end_date
          next_date
          next_end_date
          is_draft_race
          is_private_race
          is_registration_open
          created
          last_modified
          description
          url
          external_race_url
          external_results_url
          fb_page_id
          fb_event_id
          address {
            street
            street2
            city
            state
            zipcode
            country_code
          }
          timezone
          logo_url
          real_time_notifications_enabled
        }
      }
    }
  }
}
`

export const GET_EVENTS = gql`
  query fetchRace($race_id: long!) {
    race_response {
      success
      errors
      result {
        race(filters: {race_id: $race_id}) {
          events {
            event_id
            name
            start_time
          }
        }
      }
    }
  }
`

export const GET_INDIVIDUAL = gql`
  query fetchResult($race_id: long!, $event_id: long!) {
   individual_results {
      success
      errors
      result {
        individual_results_sets(filters: {race_id: $race_id, event_id: $event_id}) {
          individual_result_set_id
          individual_result_set_name
          results{
            place
            bib
            first_name
            last_name
            clock_time
            chip_time
            pace
          }
        }
      }
    }
  }
`




