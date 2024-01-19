import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Events.css';

import fakeData from "../assets/MOCK_TEAM_DATA.json";
import * as React from "react";
import { useTable } from "react-table";
import IndividualTeamHeader from "../components/IndividualTeamHeader";

function TeamResults() {

    const data = React.useMemo(() => fakeData, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Place",
                accessor: "place",
            },
            {
                Header: "Team Name",
                accessor: "team_name",
            },
            {
                Header: "Final Score",
                accessor: "final_score",
            },
            {
                Header: "Finisher 1",
                accessor: "finisher_1",
            },
            {
                Header: "Finisher 2",
                accessor: "finisher_2",
            },
            {
                Header: "Finisher 3",
                accessor: "finisher_3",
            },
            {
                Header: "Finisher 4",
                accessor: "finisher_4",
            },
            {
                Header: "Finisher 5",
                accessor: "finisher_5",
            },
            {
                Header: "Finisher 6",
                accessor: "finisher_6",
            },
            {
                Header: "Finisher 7",
                accessor: "finisher_7",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <>
            <Header />
            <Navbar />
            <IndividualTeamHeader />
            <div className="Events">
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        </>
    );
}

export default TeamResults;
