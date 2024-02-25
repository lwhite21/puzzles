import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Pages
import ColorColapse from './Pages/Color Colapse/ColorColapse';
import HomePage from './Pages/Home Page/HomePage';
import Connect4 from './Pages/Connect 4/Connect4';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/puzzles" element={<HomePage />} />
        <Route path="/puzzles/color-colapse" element={<ColorColapse />} />
        <Route path="/puzzles/connect-4" element={<Connect4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
