import React, { useEffect } from "react";
import "./App.css";
import IFrame from "./iframe";
import Main from "./Main";


const inIframe = () => {
  // eslint-disable-next-line no-restricted-globals
  if(parent === window) {
    return false
  }
  return true
}

function App() {
  const isInIframe = inIframe()
  if(isInIframe) {
    return (<IFrame />)
  }

  return <Main />
}

export default App;
