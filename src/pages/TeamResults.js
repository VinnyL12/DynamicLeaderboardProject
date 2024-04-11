import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import AutoScroll from "../components/AutoScroll";
import IndividualTeamHeader from "../components/IndividualTeamHeader";
import Footer from "../components/Footer";
import '../assets/Events.css';
import * as React from "react";
import { useLocation } from "react-router-dom";
import { GET_TEAM } from "../GraphQL/Queries";
import { GET_UPDATED_TEAM } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import shoeIcon from '../images/Shoe-Icon1.jpg';

function TeamResults() {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log("state", JSON.stringify(state));

    //const urlParams = new URLSearchParams(window.location.search);
    const urlParams = useParams();
    const race_team_id = atob(urlParams.id);
    //const team_result_set_id = urlParams.get("team_result_set_id");

    const race_id = race_team_id.split("+")[0];
    const team_result_set_id = race_team_id.split("+")[1];

    const [team, setTeam] = useState(null);
    const [isAutoScroll, setAutoScroll] = useState(false);

    let [isLoaded, setIsLoaded] = useState(false);
    const [isOnBottom, setIsOnBottom] = useState(false);

    const { loading, error, rData } = useQuery(GET_TEAM, {
        variables: {
            race_id,
            team_result_set_id
        },
        onCompleted: (data) => { setIsLoaded(true); setTeam(data.team_scores); console.log("team", data) },
        skip: isLoaded
    });

    const { refetch } = useQuery(GET_UPDATED_TEAM, {
        variables: {
            race_id,
            team_result_set_id
        },
        onCompleted: (data) => { setTeam(data.team_frontend_call); console.log(data) },
        skip: !isLoaded || !isOnBottom
    });

    if (loading || !team) { return 'Loading...'; }
    if (error) { return 'Error!'; }

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Races', link: state.racesLink },
        { label: 'Events', link: "/events?race_id=" + race_id },
        { label: 'Result Sets', link: '/resultset?race_id=' + race_id + "&event_id=" + state.event_id },
        { label: 'Results' }
    ];

    const handleCheckbox = (event) => {
        setAutoScroll(event.target.checked);
        console.log(isAutoScroll);
    }

    return (
        <div className="wrapper">
            <AutoScroll enabled={isAutoScroll} onBottom={() => { setIsOnBottom(true); refetch() }} />
            <Header />
            <div className="race-name-sub-header">
                <img className="race-logo" src={shoeIcon} alt=""></img>
                <h2>{state.team_result_set_name}</h2>
            </div>
            <div className="combined-headers">
                <Breadcrumb items={breadcrumbItems} state={state} />
                <IndividualTeamHeader individualClass={'individualteamcolumnleft'} teamClass={'individualteamcolumnright selected'} state={state} individualLink={state.individualLink} />
            </div>
            <div className="autoscroll-wrapper">
                Enable Auto Scroll <input type="checkbox" onChange={handleCheckbox}></input>
            </div>
            <body className="outer-layer">
                <div className="select-container">
                    <select className="select-box" value={team_result_set_id + "+" + state.team_result_set_name} onChange={(e) => { const result_set_data = e.target.value.split('+'); navigate(`./../${btoa(`${race_id}+${result_set_data[0]}`)}`, { state: { ...state, team_result_set_name: result_set_data[1] } }); window.location.reload(); }}>
                        {
                            state.eachTeam.map((set) => {
                                return <option value={set.team_result_set_id + '+' + set.team_result_set_name}>
                                    {set.team_result_set_name}
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
                            <th>Team Name</th>
                            <th>Final Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            team.result.map((team) => {
                                console.log(team);
                                return <tr key={team.results_team_id}>
                                    <td>{team.place}</td>
                                    <td>{team.results_team_name}</td>
                                    <td>{team.score}</td>
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

export default TeamResults;
