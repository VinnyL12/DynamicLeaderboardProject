import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Breadcrumb from "../components/Breadcrumb";

import '../assets/Races.css';
import * as React from "react";
import { GET_ADVANCED_RACES, GET_RACES } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Races() {
    const state = useLocation();
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    //let formattedName = name.replace(/ /g, "+");
    //console.log(formattedName);

    let queryVars = { name };
    const [data, setData] = useState(null);

    if (urlParams.get("start_date")) {
        const start_date = urlParams.get("start_date");
        queryVars = {
            ...queryVars,
            start_date
        }
    }
    if (urlParams.get("country_code")) {
        const country_code = urlParams.get("country_code")
        queryVars = {
            ...queryVars,
            country_code
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
        onCompleted: (data) => { setData(data); console.log(data); }
    });

    const { loadingNormal, errorNormal, _data } = useQuery(GET_RACES, {
        skip: urlParams.size > 1,
        variables: {
            name
        },
        onCompleted: (data) => { setData(data); console.log(data); }
    });

    if (loading || loadingNormal || !data) { return 'Loading...'; }
    if (error || errorNormal) { return 'Error!'; }

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Races', link: state.racesLink },
    ];


    return (
        <div className="wrapper">
            <Header />
            <Navbar />
            <Breadcrumb items={breadcrumbItems} state={state} />
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
                            data.response ?
                                data.response.result.races.map((race) => {
                                    console.log(race);
                                    return <tr key={race.race.race_id}>
                                        <td><Link to={"/events?race_id=" + race.race.race_id} state={{ text: race.race.name, params: queryVars }}>{race.race.name}</Link></td>
                                        <td>{race.race.address.state}</td>
                                        <td>{race.race.address.city}</td>
                                    </tr>
                                }) :
                                data.advancedResponse.result.races.map((race) => {
                                    console.log(race);
                                    return <tr key={race.race.race_id}>
                                        <td><Link to={"/events?race_id=" + race.race.race_id} state={{ text: race.race.name, racesLink: window.location.href }}>{race.race.name}</Link></td>
                                        <td>{race.race.address.state}</td>
                                        <td>{race.race.address.city}</td>
                                    </tr>
                                })
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Races;
