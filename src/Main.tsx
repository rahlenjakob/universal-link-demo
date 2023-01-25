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
        <p>Assumes that you have the Github app installed</p>
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
          <h2>Button press with async event handler</h2>
          <button onClick={async () => {
            await new Promise(r => setTimeout(r, 2000));
            window.location.href = URLToOpen
          }}>Open</button>
        </section>
        <section>
          <h2>Iframe embed</h2>
          <iframe title="iframe" src={window.location.href} />
        </section>
      </main>
    </div>
  );
}

export default Main
