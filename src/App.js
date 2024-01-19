import './assets/App.css';
import "./assets/styles.css";
import React from "react";

import { SearchBar } from './components/SearchBar.jsx';
import { SearchResultsList } from './components/SearchResultsList.jsx';

import { useTable } from "react-table";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Races from "./pages/Races";
import Events from "./pages/Events";
import IndividualResults from './pages/IndividualResults';
import TeamResults from './pages/TeamResults';
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import RegionFilterPage from './pages/RegionFilterPage.js';

import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br/>
      <DisplayLocations />
    </div>
  );
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}







{/*
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/region" element = {<RegionFilterPage />} />
          <Route index element = {<Home />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/races" element = {<Races />} />
          <Route path="/events" element = {<Events />} />
          <Route path="/individual" element = {<IndividualResults />} />
          <Route path="/team" element = {<TeamResults />} />
          <Route path="*" element = {<NoPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
*/}



export default App;