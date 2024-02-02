import React, {useState, useEffect} from 'react'
import { useLazyQuery, gql } from "@apollo/client";

import {FaSearch} from 'react-icons/fa'
import './SearchBar.css';

export const SearchBar = ({ results, setResults }) => {
    const [input, setInput] = useState("")

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) =>response.json())
        .then((json) => {
            setResults(json)
            // const results = json.filter((user) => {
            //     return (
            //         value && 
            //         user && 
            //         user.name && 
            //         user.name.toLowerCase().includes(value)
            //         );
            //     });
                //setResults(results);
            });
    }, [input])
    const handleChange = (value) => {
        setInput(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" /> 
            <input
                placeholder="Search for a Race" 
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};