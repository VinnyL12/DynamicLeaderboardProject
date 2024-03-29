import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import AutoScroll from "../components/AutoScroll";
import IndividualTeamHeader from "../components/IndividualTeamHeader";
import Footer from "../components/Footer";
import '../assets/Events.css';
import * as React from "react";
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
    //console.log(state);

    let endpoint;
    let team_result_set_name;
    const hasElements = state.eachTeam.length >= 1;

    const race_id = race_event_id.split("+")[0];
    const event_id = race_event_id.split("+")[1];
    const first_clicked_result = race_event_id.split("+")[2];

    if (hasElements) {
        const firstResult = state.eachTeam[0];
        team_result_set_name = firstResult.team_result_set_name;
        endpoint = btoa(`${race_id}+${firstResult.team_result_set_id}`);
    }

    const [resultSets, setResultSets] = useState(null);
    const [resultSet, setResultSet] = useState(null);
    const [isAutoScroll, setAutoScroll] = useState(false);

    let tempResultSet = null;

    const handleCompletion = (data) => {
        setResultSets(data);
        tempResultSet = data.individual_results.result.individual_results_sets.find(set => set.individual_result_set_id === parseInt(first_clicked_result));

        setResultSet(tempResultSet);
    }

    //console.log("Result Set:", resultSet);
    const { loading, error, rData, refetch } = useQuery(GET_INDIVIDUAL, {
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
        { label: 'Result Sets', link: '/resultset?race_id=' + race_id + "&event_id=" + event_id },
        { label: 'Results' }
    ];

    const disconnectHandler = () => {
        fetch('http://localhost:5000/disconnect', {
            method: "POST",
            body: {
                race_id,
                event_id
            }
        });
    }

    const handleCheckbox = (event) => {
        setAutoScroll(event.target.checked);
        console.log(isAutoScroll);
    }

    return (
        <div className="wrapper">
            <AutoScroll enabled={isAutoScroll} onBottom={() => refetch()} />
            <Header disconnectCallback={disconnectHandler} />
            <div className="race-name-sub-header">
                <img className="race-logo" src={shoeIcon} alt=""></img>
                <h2>{state.name}</h2>
            </div>
            <Breadcrumb disconnectCallback={disconnectHandler} items={breadcrumbItems} state={state} />

            {hasElements ?
                <IndividualTeamHeader state={{ ...state, team_result_set_name }} individualClass={'individualteamcolumnleft selected'} teamClass={'individualteamcolumnright'} teamLink={`/team/${endpoint}`} individualLink={state.individualLink} race_id={race_id} individual_result_set_id={urlParams.individual_result_set_id} team_result_set_id={urlParams.team_result_set_id} />
                :
                <IndividualTeamHeader state={state} individualClass={'individualteamcolumnleft selected'} teamClass={'individualteamcolumnright'} teamDisabled={true} individualLink={state.individualLink} race_id={race_id} individual_result_set_id={urlParams.individual_result_set_id} team_result_set_id={urlParams.team_result_set_id} />
            }
            <div className="autoscroll-wrapper">
                Enable Auto Scroll: <input type="checkbox" onChange={handleCheckbox}></input>
            </div>
            <body className="outer-layer">
                <div className="select-container">
                    <select className="select-box" value={first_clicked_result + "-" + state.name} onChange={(e) => { const result_set_data = e.target.value.split("-"); navigate(`./../${btoa(`${race_id}+${event_id}+${result_set_data[0]}`)}`, { state: { ...state, name: result_set_data[1] } }); window.location.reload(); }}>
                        {
                            resultSets.individual_results.result.individual_results_sets.map((set) => {
                                return <option value={set.individual_result_set_id + "-" + set.individual_result_set_name}>
                                    {set.individual_result_set_name}
                                </option>
                            })
                        }
                    </select>
                </div>
            </body>
            <div>
                <table className="events-results">
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
