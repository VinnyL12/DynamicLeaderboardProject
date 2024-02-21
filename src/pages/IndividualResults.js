import Header from "../components/Header"
import '../assets/Events.css';
import * as React from "react";
import IndividualTeamHeader from "../components/IndividualTeamHeader";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GET_INDIVIDUAL } from "../GraphQL/Queries";

function IndividualResults() {

    let { state } = useLocation();
    console.log(state);

    const urlParams = useParams();
    const race_event_id =  atob(urlParams.id);

    const race_id = race_event_id.split("+")[0];
    const event_id = race_event_id.split("+")[1];
    const first_clicked_result = race_event_id.split("+")[2];

    

    return (
        <>
            <Header />
            <IndividualTeamHeader />
            <div className="result-set-dropdown">
                <select>
                    {
                        state.eachResultSet.map((set) => {
                            <option value={set.individual_result_set_name} >
                                {set.individual_result_set_name}
                            </option>
                        })
                    }
                </select>
            </div>
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
                        <tr key={race_event_id}>
                            <td>{race_event_id}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default IndividualResults;
