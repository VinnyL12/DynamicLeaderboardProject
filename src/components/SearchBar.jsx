import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from "@apollo/client";
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ results, setResults }) => {
    const [input, setInput] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        //console.log('Use Effect Hit', input);
    }, [input])
    const handleChange = (value) => {
        setInput(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <form onSubmit={(_e) => navigate(`/races?name=${input}`)}>
                <input
                    placeholder="Search for a Race"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </form>
        </div>
    );
};