import * as React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import "./App.css";

import NavBar from "./features/navigation/NavBar";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route path="charts" element={<Charts />} />
          <Route path="swap" element={<Swap />} />
          <Route path="liquidity" element={<Liquidity />} />

          <Route index element={<Navigate to="/swap" replace={true} />}/>
          <Route path="*" element={<Navigate to="/swap" replace={true} />}/>
    
        </Route>
      </Routes>
    </div>
    
  );
}

function Layout() {
  return (
    <React.Fragment>
      <section>
        <Outlet />
      </section>
      
      <NavBar />
    </React.Fragment>
  );
}




function Charts() {
  return (
    <div>
      <h2>!!! Charts !!!</h2>
    </div>
  );
}

function Swap() {
  return (
    <div>
      <h2>!!! Swap !!!</h2>
    </div>
  );
}

function Liquidity() {
  return (
    <div>
      <h2>!!! Liquidity !!!</h2>
    </div>
  );
}