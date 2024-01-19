import {gql} from '@apollo/client'

export const GET_RACES = gql`
    query {
        fetchAllRaces{
            name

        }
    }
`

