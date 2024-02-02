import { SearchBar } from './SearchBar.jsx';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";

import "../assets/App.css";

export default function Navbar() {

    const [results, setResults] = useState([]);

    return (
    <nav className="nav">
        <div className="App">
            <div className="search-bar-container">
            <SearchBar setResults={setResults} />
         </div>
    </div>
        <ul>
            <li>
                <a href="/home"><FaHome /></a>
            </li>
        </ul>
    </nav>
    )
}