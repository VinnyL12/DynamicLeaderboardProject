import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Races.css';
import * as React from "react";
import { GET_ADVANCED_RACES, GET_RACES } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { name } from "ejs";

//let name = null;

function Races() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    let formattedName = name.replace(/ /g, "+");
    //console.log(formattedName);

    let queryVars = { name: formattedName };
    const [data, setData] = useState(null);

    if (urlParams.get("start_date")) {
        const startDate = urlParams.get("start_date");
        queryVars = {
            ...queryVars,
            startDate
        }
    }
    if (urlParams.get("country")) {
        const country = urlParams.get("country");
        queryVars = {
            ...queryVars,
            country
        }
    }
    if (urlParams.get("state")) {
        const state = urlParams.get("state");
        queryVars = {
            ...queryVars,
            state
        }
    }
    if (urlParams.get("city")) {
        const city = urlParams.get("city");
        queryVars = {
            ...queryVars,
            city
        }
    }

    const { loading, error, _rdata } = useQuery(GET_ADVANCED_RACES, {
        skip: urlParams.size <= 1,
        variables: queryVars,
        onCompleted: (data) => { setData(data); }
    });

    const { loadingNormal, errorNormal, _data } = useQuery(GET_RACES, {
        skip: urlParams.size > 1,
        variables: {
            name: formattedName
        },
        onCompleted: (data) => { setData(data); }
    });

    if (loading || loadingNormal || !data) { return 'Loading...'; }
    if (error || errorNormal) { return 'Error!'; }

    return (
        <>
            <Header />
            <Navbar />
            <div>
                <table className="races">
                    <thead>
                        <tr>
                            <th>Race Name</th>
                            <th>State</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.response.result.races.map((race) => {
                                console.log(race);
                                return <tr key={race.race.race_id}>
                                    <td><Link to={"/events?race_id=" + race.race.race_id} state={{ text: race.race.name }}>{race.race.name}</Link></td>
                                    <td>{race.race.address.state}</td>
                                    <td>{race.race.address.city}</td>
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
