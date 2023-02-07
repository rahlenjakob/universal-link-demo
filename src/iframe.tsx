import React, { useEffect, useState } from "react";
import { URLToOpen } from "./constants";

const IFrame = () => {
  const [delay, setDelay] = useState(3000)
  const [statusCode, setStatusCode] = useState(302)
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

  useEffect(() => {
    const query = new URLSearchParams(document.location.search)
    console.log('query', query)
    const redirect = query.get('redirect')
    const open = query.get('open')
    if(redirect) {
      const decoded = decodeURI(redirect)
      console.log('open', open)
      if(open) {
        window.open(decoded)
      } else {
        // eslint-disable-next-line no-restricted-globals
        if(!top) {
          alert("Top window not found")
          return
        }
        // eslint-disable-next-line no-restricted-globals
        top.location.href = decoded
      }
    }

  }, [])
  return (
    <main>
      <section>
        <h3>7.1 Postmessage back</h3>
        <button onClick={sendMessage}>Open</button>
      </section>
      <section>
        <h3>7.2 Direct link press</h3>
        <a rel="noreferrer" target="_blank" href={url}>Open</a>
      </section>
      <section>
        <h3>7.3 Button press with event handler</h3>
        <button
          onClick={() => {
            window.open(url);
          }}
        >
          Open
        </button>
      </section>
      <section>
        <h3>7.4 Button press with event handler, modifying window.location</h3>
        <button
          onClick={() => {
            window.location.href = url;
          }}
        >
          Open
        </button>
      </section>
      <section>
        <h3>7.5 Button press with event handler, modifying top.lcaton</h3>
        <button
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if(!top) {
              alert("No top window")
              return
            }
            // eslint-disable-next-line no-restricted-globals
            top.location.href = url;
          }}
        >
          Open
        </button>
      </section>
      <section>
        <h3>7.6 Button press with async event handler</h3>
        <button
          onClick={async () => {
            await new Promise((r) => setTimeout(r, 2000));
            window.open(url);
          }}
        >
          Open
        </button>
      </section>
      <section>
          <h3>7.7 JS redirect on window load with top.location</h3>
          <a href={`${window.location.protocol}//${window.location.host}${window.location.pathname}?redirect=${encodeURI(url)}`}>
            Open
          </a>
        </section>
        <section>
          <h3>7.8 JS redirect on window with window.open</h3>
          <a href={`${window.location.protocol}//${window.location.host}${window.location.pathname}?redirect=${encodeURI(url)}&open=true`}>
            Open
          </a>
        </section>
        <section>
          <h3>7.9 Async JS redirect on window load with top.location</h3>
          <button onClick={async () => {
            await new Promise(r => setTimeout(r, 2000));
            document.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?redirect=${encodeURI(url)}`
          }}>
            Open
          </button>
        </section>
        <section>
          <h3>7.10 Async JS redirect on window with window.open</h3>
          <button onClick={async () => {
            await new Promise(r => setTimeout(r, 2000));
            document.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?redirect=${encodeURI(url)}?open=true`
          }}>
            Open
          </button>
        </section>
        <section>
          <h3>7.11  Direct link press, redirect to backend with 302</h3>
          <input value={delay} type="number" onChange={(e) => setDelay(parseInt(e.target.value))} />
          <input value={statusCode} type="number" onChange={(e) => setStatusCode(parseInt(e.target.value))} />
          <a rel="noreferrer" target="_blank" href={`https://handover-backend-b3vp765qsa-uc.a.run.app?timeout=${delay}&redirect=${encodeURI(url)}`}>Open</a>
        </section>
        <section>
          <h3>7.12 Button press with event handler, modifying top.lcaton, redirect to backend with 302</h3>
          <input value={delay} type="number" onChange={(e) => setDelay(parseInt(e.target.value))} />
          <input value={statusCode} type="number" onChange={(e) => setStatusCode(parseInt(e.target.value))} />
        <button
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if(!top) {
              alert("No top window")
              return
            }
            // eslint-disable-next-line no-restricted-globals
            top.location.href = `https://handover-backend-b3vp765qsa-uc.a.run.app?timeout=${delay}&redirect=${encodeURI(url)}`;
          }}
        >
          Open
        </button>
        </section>
        <section>
          <h3>
            7.13 top.open
          </h3>
          <button onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            top?.open(url)
          }}>
            Open
          </button>
        </section>
        <section>
          <h3>
            7.14 window.open top
          </h3>
          <button onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            window.open(url, '_top')
          }}>
            Open
          </button>
        </section>
        <section>
          <h3>
            7.15 window.open top on a div
          </h3>
          <div onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            window.open(url, '_top')
          }}>
            Open
          </div>
        </section>
        <section>
          <h3>
            7.15 window.open top on a div, with an async button
          </h3>
          <div onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            window.open(url, '_top')
          }}>
            <button onClick={async() => {
              await new Promise(r => setTimeout(r, 2000));
            }}>
              Open
            </button>
          </div>
        </section>
    </main>
  );
};

export default IFrame;
