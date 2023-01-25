import React, {useEffect} from 'react'
import { URLToOpen } from './constants'

const Main = () => {
  useEffect(() => {
    window.addEventListener('message', (e) => {
      console.log('e.data', e.data)
      if(e.data === 'open') {
        window.location.href = URLToOpen
      }
    })
  }, [])
  return (
    <div className="App">
      <main>
        <h1>App handovers</h1>
        <p>Assumes that you have the BankID app installed</p>
        <section>
          <h2>Direct link press</h2>
          <a
            href={URLToOpen}
          >
            Open
          </a>
        </section>
        <section>
          <h2>Button press with event handler</h2>
          <button onClick={() => {
            window.location.href = URLToOpen
          }}>Open</button>
        </section>
        <section>
          <h2>Button press with event handler (window.open)</h2>
          <button onClick={() => {
            window.open(URLToOpen) 
          }}>Open</button>
        </section>
        <section>
          <h2>Button press with async event handler</h2>
          <button onClick={async () => {
            await new Promise(r => setTimeout(r, 2000));
            window.location.href = URLToOpen
          }}>Open</button>
        </section>
        <section>
          <h2>Iframe embed</h2>
          <iframe sandbox='allow-forms allow-modals allow-orientation-lock allow-pointer-lock	allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation' title="iframe" src={window.location.href} />
        </section>
      </main>
    </div>
  );
}

export default Main
