import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CatalogPage from './pages/catalog/index';

import './App.css';

const App = () => (
  <Routes>
    <Route path="/" element={<CatalogPage/>} />
  </Routes>
);

export default App;
