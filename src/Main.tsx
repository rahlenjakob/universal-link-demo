import React, { useEffect, useRef, useState } from "react";
import { CookieName, URLToOpen } from "./constants";
import { getCookie, setCookie } from "./cookies";


const isWebView = () => {
  var standalone = (window.navigator as any).standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);

  if (ios) {
    if (!standalone && safari) {
      //browser
      return false;
    } else if (standalone && !safari) {
      //standalone
      return true;
    } else if (!standalone && !safari) {
      //uiwebview
      return true;
    }
  } else {
    //not iOS
    return isAndroidWebView();
  }
};

export function isAndroidWebView() {
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
}

const Main = () => {
  const [url, setUrl] = useState(URLToOpen);
  const [cookie, setCookieValue] = useState(getCookie(CookieName))
  const ref = useRef<any>();
  const buttonRef = useRef<any>();
  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.data === "open") {
        window.location.href = url;
      }
    });
  }, [url]);

  useEffect(() => {
    ref.current.contentWindow.postMessage(
      JSON.stringify({
        url: URLToOpen,
      })
    );
  }, [ref]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const redirect = query.get("redirect");
    const open = query.get("open");
    if (redirect) {
      const decoded = decodeURI(redirect);
      console.log("open", open);
      if (open) {
        window.open(decoded);
      } else {
        window.location.href = decoded;
      }
    }
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      console.log("buttonRef", buttonRef.current);
      buttonRef.current.onclick = () => (window.location.href = url);
    }
  }, [buttonRef, url]);
  return (
    <div className="App">
      <main>
        <h1>App handovers</h1>
        <p>Assumes that you have the BankID app installed</p>
        <select
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            ref.current.contentWindow.postMessage(
              JSON.stringify({
                url: e.target.value,
              })
            );
          }}
        >
          <option
            selected={
              url ===
              "https://app.bankid.com/?autostarttoken=faketoken&redirect=https://google.com"
            }
            value={
              "https://app.bankid.com/?autostarttoken=faketoken&redirect=https://google.com"
            }
          >
            BankID universal link
          </option>
          <option selected={url === `bankid:///`} value={`bankid:///`}>
            BankID deep link
          </option>
          <option
            selected={url === `https://github.com/rahlenjakob`}
            value={`https://github.com/rahlenjakob`}
          >
            Github universal link
          </option>
          <option
            selected={url === `https:/app.klarna.com/settings/contact-details`}
            value={`https:/app.klarna.com/settings/contact-details`}
          >
            Klarna universal link
          </option>
          <option selected={url === `klarna://`} value={`klarna://`}>
            Klarna deep link
          </option>
        </select>
        <section>
          <h2>1. Direct link press</h2>
          <a href={url}>Open</a>
        </section>
        <section>
          <h2>2. Button press with event handler</h2>
          <button
            onClick={() => {
              window.location.href = url;
            }}
          >
            Open
          </button>
        </section>
        <section>
          <h2>3. Button press with event handler (window.open)</h2>
          <button
            onClick={() => {
              window.open(url);
            }}
          >
            Open
          </button>
        </section>
        <section>
          <h2>4. Button press with async event handler</h2>
          <button
            onClick={async () => {
              await new Promise((r) => setTimeout(r, 2000));
              window.location.href = url;
            }}
          >
            Open
          </button>
        </section>
        <section>
          <h2>5. JS redirect on window load</h2>
          <a
            href={`${window.location.protocol}//${window.location.host}${
              window.location.pathname
            }?redirect=${encodeURI(url)}`}
          >
            Open
          </a>
        </section>
        <section>
          <h2>6. JS redirect on window with window.open</h2>
          <a
            href={`${window.location.protocol}//${window.location.host}${
              window.location.pathname
            }?redirect=${encodeURI(url)}&open=true`}
          >
            Open
          </a>
        </section>
        <section>
          <h2>7. Iframe embed</h2>
          <iframe
            style={{ width: "100%", height: 1300 }}
            ref={ref}
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock	allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation"
            title="iframe"
            src={window.location.href}
          />
        </section>
        <section>
          <h2>8. Form</h2>
          <form>
            <input type="button" value="Open" ref={buttonRef} />
          </form>
        </section>
        <section>
          <h2>9. WebView detection</h2>
          {isWebView() ? <p>WebView</p> : <p>Not a WebView</p>}
        </section>
        <section>
          <h2>10. Cookies</h2>
          <input value={cookie} onChange={(e) => {
            setCookie(CookieName, e.target.value, 30)
            setCookieValue(e.target.value)
          }} />
        </section>
      </main>
    </div>
  );
};

export default Main;
