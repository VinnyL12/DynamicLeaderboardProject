import Header from "../components/Header"
import '../assets/Events.css';
import * as React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_INDIVIDUAL } from "../GraphQL/Queries";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function ResultSet() {

    const urlParams = new URLSearchParams(window.location.search);
    const race_id = urlParams.get("race_id");
    const event_id = urlParams.get("event_id");
    let { state } = useLocation();


    const [resultSets, setResultSets] = useState(null);

    const { loading, error, rData } = useQuery(GET_INDIVIDUAL, {
        variables: {
            race_id,
            event_id
        },
        onCompleted: (data) => { setResultSets(data); console.log(data) }
    });

    if (loading || !resultSets) { return 'Loading...'; }
    if (error) { return 'Error!'; }

    return (
        <>
            <Header />
            <div>
            <h2>{state.text}</h2>
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
                                    <td><Link to={`/individual/${btoa(`${race_id}+${event_id}+${result_sets.individual_result_set_id}`)}`} state={{eachResultSet: resultSets.individual_results.result.individual_results_sets}}>{result_sets.individual_result_set_name}</Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ResultSet;
