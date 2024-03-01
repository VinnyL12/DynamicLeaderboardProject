import Header from "../components/Header"
import Footer from "../components/Footer"
import Breadcrumb from "../components/Breadcrumb";

import '../assets/Events.css';
import * as React from "react";
import IndividualTeamHeader from "../components/IndividualTeamHeader";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GET_INDIVIDUAL } from "../GraphQL/Queries";
import shoeIcon from '../images/Shoe-Icon1.jpg';


function IndividualResults() {

    const urlParams = useParams();
    const race_event_id = atob(urlParams.id);
    const navigate = useNavigate();
    let { state } = useLocation();
    console.log(state);

    const race_id = race_event_id.split("+")[0];
    const event_id = race_event_id.split("+")[1];
    const first_clicked_result = race_event_id.split("+")[2];

    const [resultSets, setResultSets] = useState(null);
    const [resultSet, setResultSet] = useState(null);

    let tempResultSet = null;

    const handleCompletion = (data) => {
        setResultSets(data);
        tempResultSet = data.individual_results.result.individual_results_sets.find(set => set.individual_result_set_id === parseInt(first_clicked_result));

        setResultSet(tempResultSet);
    }

    console.log("Result Set:", resultSet);
    const { loading, error, rData } = useQuery(GET_INDIVIDUAL, {
        variables: {
            race_id,
            event_id
        },
        onCompleted: (data) => { handleCompletion(data); }
    });

    if (loading || !resultSets || !resultSet) { return 'Loading...'; }
    if (error) { return 'Error!'; }

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Races', link: state.racesLink },
        { label: 'Events', link: "/events?race_id=" + race_id },
        { label: 'Result Sets', link: '/resultset?race_id=' +race_id + "&event_id=" + event_id },
        { label: 'Individual Results', link: '/individual' }
    ];

    return (
        <div className="wrapper">
            <Header />
            <div className="race-name-sub-header">
                <img className="race-logo" src={shoeIcon} alt=""></img>
                <h2>{ state.name }</h2>
            </div>
            <Breadcrumb items={breadcrumbItems} state={state}/>
            <IndividualTeamHeader state={state} individual={true} individual_id={urlParams.id}/>

            <div className="result-set-dropdown">
                <select value={first_clicked_result + "-" + state.name} onChange={(e) => { const result_set_data = e.target.value.split("-"); navigate(`./../${btoa(`${race_id}+${event_id}+${result_set_data[0]}`)}`, { state: { name: result_set_data[1] }}); window.location.reload(); }}>
                    {
                        resultSets.individual_results.result.individual_results_sets.map((set) => {
                            return <option value={set.individual_result_set_id + "-" + set.individual_result_set_name}>
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
                        {
                            resultSet ?
                                resultSet.results.map((set, index) => {
                                    return <tr key={index}>
                                        <td value={set.place}>
                                            {set.place}
                                        </td>
                                        <td value={set.first_name}>
                                            {set.first_name}
                                        </td>
                                        <td value={set.last_name}>
                                            {set.last_name}
                                        </td>
                                        <td value={set.bib}>
                                            {set.bib}
                                        </td>
                                        <td value={set.clock_time}>
                                            {set.clock_time}
                                        </td>
                                    </tr>
                                }) :
                                <></>
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default IndividualResults;
