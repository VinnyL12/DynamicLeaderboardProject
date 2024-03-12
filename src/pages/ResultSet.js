import Header from "../components/Header"
import Footer from "../components/Footer"
import Breadcrumb from "../components/Breadcrumb";

import '../assets/Events.css';
import * as React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_INDIVIDUAL } from "../GraphQL/Queries";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import shoeIcon from '../images/Shoe-Icon1.jpg';

function ResultSet() {

    const urlParams = new URLSearchParams(window.location.search);
    const race_id = urlParams.get("race_id");
    const event_id = urlParams.get("event_id");

    let { state } = useLocation();
    console.log(state)
    const [resultSets, setResultSets] = useState(null);
    console.log(resultSets);

    const { loading, error, rData } = useQuery(GET_INDIVIDUAL, {
        variables: {
            race_id,
            event_id
        },
        onCompleted: (data) => { setResultSets(data); console.log(data) }
    });

    if (loading || !resultSets) { return 'Loading...'; }
    if (error) { return 'Error!'; }

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Races', link: state.racesLink },
        { label: 'Events', link: "/events?race_id=" + race_id },
        { label: 'Result Sets', link: '/resultset?race_id=' +race_id + "&event_id=" + event_id },
    ];

    return (
        <div className="wrapper">
            <Header />
            <div>
                <div className="race-name-sub-header">
                    <img className="race-logo" src={shoeIcon} alt=""></img>
                    <h2>{state.text}</h2>
                </div>
                <Breadcrumb items={breadcrumbItems} state={state} />
                <table className="events">
                    <thead>
                        <tr>
                            <th>Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resultSets.individual_results.result.individual_results_sets.map((result_sets) => {
                                return <tr key={result_sets.individual_result_set_id}>
                                    <td><Link to={`/individual/${btoa(`${race_id}+${event_id}+${result_sets.individual_result_set_id}`)}`} state={{ ...state, individualLink: `/individual/${btoa(`${race_id}+${event_id}+${result_sets.individual_result_set_id}`)}`, eachResultSet: resultSets.individual_results.result.individual_results_sets, eachTeam: resultSets.team_results_sets.result, name: result_sets.individual_result_set_name }}>{result_sets.individual_result_set_name}</Link></td>
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

export default ResultSet;
