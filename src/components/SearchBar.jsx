import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ results, setResults }) => {
    const [input, setInput] = useState("")

    const navigate = useNavigate();

    const handleChange = (value) => {
        setInput(value);
    };



    return (
        <div className="search">
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    placeholder="Search for a Race by name"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            navigate(`/races?name=${input}`)
                        }
                    }}
                />
            </div>
        </div>
    );
};