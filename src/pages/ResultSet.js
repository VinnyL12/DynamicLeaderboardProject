import Header from "../components/Header"
import '../assets/Events.css';
import * as React from "react";

function ResultSet() {


   

    return (
        <>
            <Header />
            <div>
                <table className="events">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Individual Result Set Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ResultSet;
