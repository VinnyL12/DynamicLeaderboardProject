import React, {useEffect} from "react"
import { useQuery, gql } from "@apollo/client";
import { GET_RACES } from '../GraphQL/Queries'

function GetRaces() {

    const {error, loading, data} = useQuery(GET_RACES)

    useEffect(()=> {
        console.log();
    }, [data])

    return <div></div>;
}

export default GetRaces