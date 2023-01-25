import React from "react";
import "./App.css";
const URL = "https://github.com/rahlenjakob"

function App() {

  return (
    <div className="App">
      <main>
        <h1>App handovers</h1>
        <p>Assumes that you have the Github app installed</p>
        <section>
          <h2>Direct link press</h2>
          <a
            href={URL}
          >
            Open
          </a>
        </section>
        <section>
          <h2>Button press with event handler</h2>
          <button onClick={() => {
            window.location.href = URL
          }}>Open</button>
        </section>
        <section>
          <h2>Button press with async event handler</h2>
          <button onClick={async () => {
            await new Promise(r => setTimeout(r, 2000));
            window.location.href = URL
          }}>Open</button>
        </section>
      </main>
    </div>
  );
}

export default App;
