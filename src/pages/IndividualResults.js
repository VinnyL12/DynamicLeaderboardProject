import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Events.css';


import fakeData from "../assets/MOCK_INDIVIDUAL_DATA.json";
import * as React from "react";
import { useTable } from "react-table";
import IndividualTeamHeader from "../components/IndividualTeamHeader";

function IndividualResults() {

    const data = React.useMemo(() => fakeData, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Finish Place",
                accessor: "finish_place",
            },
            {
                Header: "Score",
                accessor: "score",
            },
            {
                Header: "Name",
                accessor: "racer_name",
            },
            {
                Header: "Grade",
                accessor: "grade",
            },
            {
                Header: "Bib",
                accessor: "bib",
            },
            {
                Header: "Team",
                accessor: "team",
            },
            {
                Header: "Finish Time",
                accessor: "finish_time",
            },
            {
                Header: "Pace",
                accessor: "pace",
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

export default IndividualResults;
