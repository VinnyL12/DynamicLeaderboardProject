import { SearchBar } from './SearchBar.jsx';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import AdvancedSearch from './AdvancedSearch';

import "../assets/App.css";

export default function Navbar() {
    const [searchChoice, setSearchChoice] = useState(false);
    // const [results, setResults] = useState([]);

    return (
        <nav className="nav">
            <div className="App">
                <div className="search-bar-container">
                {searchChoice ?
                <div>
                    <AdvancedSearch />
                    <button onClick={(_e) => setSearchChoice(false)}>Close Advanced Search</button>
                </div> :
                <div>
                    <SearchBar />
                    <button onClick={(_e) => setSearchChoice(true)}>Advanced Search</button>
                </div>
            }
                {/* <SearchBar setResults={setResults} /> */}
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