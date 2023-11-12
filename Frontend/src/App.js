import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import ChatGPT from "./components/chatGPT";
import React from "react";

function App() {


  return (
      <>
    <div className="App">
      <BrowserRouter >
        <Routes>
          {/*<Route path="/" element={<Login />}></Route>*/}
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>


      </>
  );
}

export default App;
