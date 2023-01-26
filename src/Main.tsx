import React, {useEffect, useRef, useState } from 'react'
import { URLToOpen } from './constants'

const Main = () => {
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if(e.data === 'open') {
        window.location.href = URLToOpen
      }
    })
  }, [])
  const ref = useRef<any>()
  const [url, setUrl] = useState(URLToOpen)
  useEffect(() => {
    ref.current.contentWindow.postMessage(JSON.stringify({
      url: URLToOpen
    }))
  }, [ref])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const redirect = query.get('redirect')
    const open = query.get('open')
    if(redirect) {
      const decoded = decodeURI(redirect)
      console.log('open', open)
      if(open) {
        window.open(decoded)
      } else {
        window.location.href = decoded
      }
    }

  }, [])
  return (
    <div className="App">
      <main>
        <h1>App handovers</h1>
        <p>Assumes that you have the BankID app installed</p>
        <input type="url" value={url} onChange={(e) =>{
          setUrl(e.target.value)
          ref.current.contentWindow.postMessage(JSON.stringify({
            url: e.target.value
          }))
        }} />
        <section>
          <h2>1. Direct link press</h2>
          <a
            href={url}
          >
            Open
          </a>
        </section>
        <section>
          <h2>2. Button press with event handler</h2>
          <button onClick={() => {
            window.location.href = url
          }}>Open</button>
        </section>
        <section>
          <h2>3. Button press with event handler (window.open)</h2>
          <button onClick={() => {
            window.open(url) 
          }}>Open</button>
        </section>
        <section>
          <h2>4. Button press with async event handler</h2>
          <button onClick={async () => {
            await new Promise(r => setTimeout(r, 2000));
            window.location.href = url
          }}>Open</button>
        </section>
        <section>
          <h2>5. JS redirect on window load</h2>
          <a href={`${window.location.protocol}//${window.location.host}${window.location.pathname}?redirect=${encodeURI(url)}`}>
            Open
          </a>
        </section>
        <section>
          <h2>6. JS redirect on window with window.open</h2>
          <a href={`${window.location.protocol}//${window.location.host}${window.location.pathname}?redirect=${encodeURI(url)}&open=true`}>
            Open
          </a>
        </section>
        <section>
          <h2>7. Iframe embed</h2>
          <iframe style={{ width: '100%', height: 400}} ref={ref} sandbox='allow-forms allow-modals allow-orientation-lock allow-pointer-lock	allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation' title="iframe" src={window.location.href} />
        </section>
      </main>
    </div>
  );
}

export default Main
