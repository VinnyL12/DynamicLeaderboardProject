import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Events.css';

import * as React from "react";
import { useTable } from "react-table";
import IndividualTeamHeader from "../components/IndividualTeamHeader";

function TeamResults() {


    return (
        <>
            <Header />
            <Navbar />
            <IndividualTeamHeader />
        </>
    );
}

export default TeamResults;
