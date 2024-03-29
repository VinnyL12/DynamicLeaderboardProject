import { SearchBar } from './SearchBar.jsx';
import AdvancedSearch from './AdvancedSearch.jsx';
import '../assets/AdvancedSearch.css';
import "../assets/App.css";
import { FaHome } from "react-icons/fa";
import { useState } from 'react';

export default function Navbar() {
    const [searchChoice, setSearchChoice] = useState(false);

    return (
        <nav className="nav">
            <div className="App">
                <div className="search-bar-container">
                    {searchChoice ?
                        <div>
                            <AdvancedSearch />
                            <button class='styled-button' onClick={(_e) => setSearchChoice(false)}>Close Advanced Search</button>
                        </div> :
                        <div>
                            <SearchBar />
                            <button class='styled-button' onClick={(_e) => setSearchChoice(true)}>Advanced Search</button>
                        </div>
                    }
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