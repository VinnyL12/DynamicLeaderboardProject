import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Races.css';

import fakeData from "../assets/MOCK_RACE_DATA.json";
import * as React from "react";
import { useTable } from "react-table";
//import RegionFilter from "../components/RegionFilter";

import { GET_RACES } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { useWatchQueryOptions } from "@apollo/client/react/hooks/useSuspenseQuery";
import { useState } from "react";

//import { useQuery, gql } from "@apollo/client";
//import { GET_RACES } from '../GraphQL/Queries';
{/*
function getRaces(name) {

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

}
*/}

function Races() {
    //const searchQuery = urlParams.get("search");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const [data, setData] = useState(null);

    const { loading, error, rData} = useQuery(GET_RACES, {
        variables: {
            name
        },
        onCompleted: (data) => { setData(data); }
    });

    if(loading || !data) { return 'Loading...'; }
    if(error) { return 'Error!'; }

    // const asdf = React.useMemo(() => fakeData, []);
    // const columns = React.useMemo(
    //     () => [
    //         {
    //             Header: "ID",
    //             accessor: "race_id",
    //         },
    //         {
    //             Header: "Race",
    //             accessor: "name",
    //         },
    //     ],
    //     []
    // );

    return (
        <>
            <Header />
            <Navbar />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Race ID</th>
                            <th>Race Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.response.result.races.map((race) => {
                                console.log(race);
                                return <tr key={race.race.race_id}>
                                    <td>{race.race.race_id}</td>
                                    <td>{race.race.name}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Races;
