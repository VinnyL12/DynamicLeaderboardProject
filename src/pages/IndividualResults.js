import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Events.css';
import * as React from "react";
import IndividualTeamHeader from "../components/IndividualTeamHeader";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_INDIVIDUAL } from "../GraphQL/Queries";

function IndividualResults() {

    const urlParams = new URLSearchParams(window.location.search);
    const race_id = urlParams.get("race_id");
    const event_id = urlParams.get("event_id");

    let { state } = useLocation();

    const [individualResults, setIndividualResults] = useState(null);

    const { loading, error, rData } = useQuery(GET_INDIVIDUAL, {
        variables: {
            race_id,
            event_id
        },
        onCompleted: (data) => { setIndividualResults(data); console.log(data) }
    });

    if (loading || !individualResults) { return 'Loading...'; }
    if (error) { return 'Error!'; }

    return (
        <>
            <Header />
            <Navbar />
            <IndividualTeamHeader />
            <div>
                <table className="events">
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Grade</th>
                            <th>Bib</th>
                            <th>Team</th>
                            <th>Finish Time</th>
                            <th>Pace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            individualResults.individual_results.result.individual_results_sets.map((individual) => {
                                return <tr key={individual.individual_result_set_id}>
                                    <td>{individual.bib}</td>
                                    <td>{individual.chip_time}</td>
                                    <td>{individual.clock_time}</td>
                                    <td>{individual.first_name}</td>
                                    <td>{individual.last_name}</td>
                                    <td>{individual.pace}</td>
                                    <td>{individual.place}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default IndividualResults;
