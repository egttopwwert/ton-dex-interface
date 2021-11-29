import * as React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import "./App.css";

import SwapSection from "./features/swap/SwapSection";
import NavBar from "./features/navigation/NavBar";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route path="charts" element={<Charts />} />
          <Route path="swap" element={<SwapSection />} />
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
      <Outlet />
      <NavBar />
    </React.Fragment>
  );
}

function Charts() {
  return (
    <section>
      <h2>!!! Charts !!!</h2>
    </section>
  );
}

function Liquidity() {
  return (
    <section>
      <h2>!!! Liquidity !!!</h2>
    </section>
  );
}