import React, { useState, useEffect } from "react";

import Keypad from "./components/Keypad";

import "./App.css";
import "./css/Result.css";

function App() {
  //correctCombination: 1995

  const [result, setResult] = useState("");
  const [locked, setLocked] = useState("Locked");
  const [tries, setTries] = useState(0);
  const [hide, setHide] = useState(true);

  //Along with the maxLength property on the input,
  // this is also needed for the keypad
  useEffect(() => {
    (function () {
      if (result >= 4) {
        setResult(result.slice(0, 4));
      }
    })();
  }, [result]);

  const onClick = (button) => {
    switch (button) {
      case "unlock":
        checkCode();
        break;
      case "clear":
        clear();
        break;
      case "backspace":
        backspace();
        break;
      default:
        setResult(result + button);
        break;
    }
  };

  const checkCode = () => {
    if (result === "1995") {
      setLocked("Unlocked!");
      setTries(0);
    } else if (tries === 3) {
      setHide(false);
      setLocked("Too many incorrect attempts!");
      setTimeout(() => {}, 30000);
    } else {
      setLocked("Incorrect code!");
      setTries(tries + 1);
    }
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const handleChange = (event) => {
    setResult(event.target.value);
  };

  return (
    <div className="App">
      <div className="pin-body">
        <h1>Pin Pad</h1>
        <div className="status">
          <h2 data-testid="status">{locked}</h2>
        </div>
        <div className="result">
          <input
            maxLength={4}
            type="password"
            aria-label="input-code"
            data-testid="inputcode"
            placeholder="Enter code"
            onChange={handleChange}
            value={result}
          />
        </div>
        {<Keypad onClick={onClick} />}
      </div>
    </div>
  );
}

export default App;
