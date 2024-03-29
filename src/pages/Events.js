import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import '../assets/Events.css';
import shoeIcon from '../images/Shoe-Icon1.jpg';
import * as React from "react";
import { GET_EVENTS } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Events() {

    const urlParams = new URLSearchParams(window.location.search);
    const race_id = urlParams.get("race_id");
    let { state } = useLocation();
    //console.log(state);

    const [raceEvents, setRaceEvents] = useState(null);

    const { loading, error, rData } = useQuery(GET_EVENTS, {
        variables: {
            race_id
        },
        onCompleted: (data) => { setRaceEvents(data); console.log(data) }
    });
    if (loading || !raceEvents) { return 'Loading...'; }
    if (error) { return 'Error!'; }

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Races', link: state.racesLink },
        { label: 'Events', link: "/events?race_id=" + race_id },
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
                            <th>Event</th>
                            <th>Start Time (Military)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            raceEvents.race_response.result.race.events.map((event) => {
                                console.log(event);
                                return <tr key={event.event_id}>
                                    <td><Link to={"/resultset?race_id=" + race_id + "&event_id=" + event.event_id} state={{ ...state, event_id: event.event_id, text: event.name }}>{event.name}</Link></td>
                                    <td>{event.start_time}</td>
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

export default Events;
