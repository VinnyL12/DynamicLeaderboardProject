import React, { useEffect, useState} from "react"
import { useQuery, gql } from "@apollo/client";
import { GET_RACES } from '../GraphQL/Queries'

function GetRaces() {

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    const {error, loading, data} = useQuery(GET_RACES, {
        variables: {
            name: searchQuery,
            country_code: searchQuery,
            state: searchQuery,
            city: searchQuery
        }
    })


    //const [races, setRaces] = useState([])

    useEffect(()=> {
        //setRaces(data.response[0])
        console.log(data);
    }, [data])

    return <div></div>;
}

export default GetRaces;