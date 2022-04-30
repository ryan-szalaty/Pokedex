import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from '@chakra-ui/react';

import Pokedex from './pages/Pokedex';
import Region from './pages/Region';
import Pokemon from './pages/Pokemon';

ReactDOM.render(
  <StrictMode>
  <ColorModeScript />
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/regions/:entry_number' element={<Region />} />
        <Route exact path='/regions/:entry_number/:pokemon' element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
