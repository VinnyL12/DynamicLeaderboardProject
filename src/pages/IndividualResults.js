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
    const individual_result_set_id = urlParams.get("individual_result_set_id");

    const race_id = urlParams.get("race_id");
    const event_id = urlParams.get("event_id");

    const [individualResults, setIndividualResultSets] = useState(null);

    const { loading, error, rData } = useQuery(GET_INDIVIDUAL, {
        variables: {
            race_id,
            event_id
        },
        onCompleted: (data) => { setIndividualResultSets(data); console.log(data) }
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
                            <th>Bib</th>
                            <th>Finish Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={individual_result_set_id}>
                            <td>{individual_result_set_id}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default IndividualResults;
