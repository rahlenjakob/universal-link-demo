import React, { useEffect, useState } from "react";
import { URLToOpen } from "./constants";

const IFrame = () => {
  const [url, setUrl] = useState(URLToOpen)
  const sendMessage = () => {
    window.parent.postMessage("open", "*");
  };

  useEffect(() => {
    window.addEventListener('message', (e) => {
      const json = JSON.parse(e.data)
      if(json && json.url) {
        console.log('updating url')
        setUrl(json.url)
      }
    })
  }, [])
  return (
    <main>
      <section>
        <h3>Postmessage back</h3>
        <button onClick={sendMessage}>Open</button>
      </section>
      <section>
        <h3>Direct link press</h3>
        <a rel="noreferrer" target="_blank" href={url}>Open</a>
      </section>
      <section>
        <h3>Button press with event handler</h3>
        <button
          onClick={() => {
            window.open(url);
          }}
        >
          Open
        </button>
      </section>
      <section>
        <h3>Button press with async event handler</h3>
        <button
          onClick={async () => {
            await new Promise((r) => setTimeout(r, 2000));
            window.open(url);
          }}
        >
          Open
        </button>
      </section>
    </main>
  );
};

export default IFrame;
