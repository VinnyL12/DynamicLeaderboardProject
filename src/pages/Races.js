import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Races.css';

import fakeData from "../assets/MOCK_RACE_DATA.json";
import * as React from "react";
import { useTable } from "react-table";
import RegionFilter from "../components/RegionFilter";

function Races() {

    const data = React.useMemo(() => fakeData, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Race",
                accessor: "race_name",
            },
            {
                Header: "Country",
                accessor: "country",
            },
            {
                Header: "State",
                accessor: "state",
            },
            {
                Header: "City",
                accessor: "city",
            },
            {
                Header: "Zipcode",
                accessor: "zip",
            },
            {
                Header: "Start Date",
                accessor: "start_date",
            },
            {
                Header: "End Date",
                accessor: "end_date",
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
            <RegionFilter />
            <div className="Races">
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

export default Races;
