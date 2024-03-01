import Header from "../components/Header"
import '../assets/Events.css';
import * as React from "react";
import IndividualTeamHeader from "../components/IndividualTeamHeader";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

function TeamResults() {
    const state = useLocation();

    return (
        <>
            <Header />
            <IndividualTeamHeader state={state.state} individual_id={state.state.individual_id} />
            <Footer />
        </>
    );
}

export default TeamResults;
