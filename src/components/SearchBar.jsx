import '../assets/SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
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