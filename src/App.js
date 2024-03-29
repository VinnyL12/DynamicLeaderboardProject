import './assets/App.css';
import "./assets/styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Races from "./pages/Races";
import Events from "./pages/Events";
import ResultSet from './pages/ResultSet.js';
import IndividualResults from './pages/IndividualResults';
import TeamResults from './pages/TeamResults';

import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  HttpLink, 
  from, 
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

//Allows us to connect both the backend and frontend applications-------------------------
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" }),
]);
//----------------------------------------------------------------------------------------

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/races" element={<Races />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resultset" element={<ResultSet />} />
            <Route path="/individual/:id" element={<IndividualResults />} />
            <Route path="/team/:id" element={<TeamResults />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  )
}

export default App;
