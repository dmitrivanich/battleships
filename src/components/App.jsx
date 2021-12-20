import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import Game from './Game'
import Players from './Players'
import Fields from "./Fields";



function App() {
  return (
    <div className="app preview">
      <Routes>
        <Route path="/" element={
          <>
            <h1>МОРСКОЙ БОЙ</h1>
            <Link
              to="/players"
              className="toCreate players">СОЗДАТЬ ИГРОКОВ</Link>
          </>
        } />

        <Route path="/players" element={<Players />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;