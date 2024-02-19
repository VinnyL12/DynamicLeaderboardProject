import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Events.css';
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

    const [raceEvents, setRaceEvents] = useState(null);

    const { loading, error, rData } = useQuery(GET_EVENTS, {
        variables: {
            race_id
        },
        onCompleted: (data) => { setRaceEvents(data); console.log(data) }
    });

    if(loading || !raceEvents) { return 'Loading...'; }
    if(error) { return 'Error!'; }

    //Put this below the div when you finish getting Hill and Bale search figured out
    //<h2>{state.text}</h2>

    return (
        <>
            <Header />
            <div>
                <h2>{state.text}</h2>
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
                                    <td><Link to={"/resultset?race_id="+race_id+"&event_id="+event.event_id} state={{text: event.name}}>{event.name}</Link></td>
                                    <td>{event.start_time}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Events;
