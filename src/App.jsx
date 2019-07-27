import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Auth, Dash } from "./layout";
import { DefaultInput } from "./components/Inputs";

function App() {
  return (
    <Auth>
      <DefaultInput />
    </Auth>
  );
}

export default App;
