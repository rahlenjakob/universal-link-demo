import React from "react";
import { URLToOpen } from "./constants";

const IFrame = () => {
  const sendMessage = () => {
    window.parent.postMessage("open", "*");
  };
  return (
    <main>
      <section>
        <h2>Postmessage back</h2>
        <button onClick={sendMessage}>Open</button>
      </section>
      <section>
        <h2>Direct link press</h2>
        <a href={URLToOpen}>Open</a>
      </section>
      <section>
        <h2>Button press with event handler</h2>
        <button
          onClick={() => {
            window.location.href = URLToOpen;
          }}
        >
          Open
        </button>
      </section>
      <section>
        <h2>Button press with async event handler</h2>
        <button
          onClick={async () => {
            await new Promise((r) => setTimeout(r, 2000));
            window.location.href = URLToOpen;
          }}
        >
          Open
        </button>
      </section>
    </main>
  );
};

export default IFrame;
