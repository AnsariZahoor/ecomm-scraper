import './App.css';
import Home from './components/Home';
import Results from './components/Results';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index  path="/" element={<Home />} />
      <Route
        path='/amazon' 
        element={<Results key="amazon" source="amazon" />}
      />
      <Route
        path='/flipkart'
        element={<Results key="flipkart" source="flipkart" />}
      />
    </Routes>
    </>
  );
}

export default App;
