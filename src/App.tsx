import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
// import { db } from "./bridge-to-backend/db/firebase/config";
import { dbApi } from "./bridge-to-backend/db/api";

const App: React.FC = () => {
  //

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={async () => {
            try {
              const idOfAddedBook = await dbApi.addDoc(
                // ["books", "custId---" + String(Date.now())],
                ["books"],
                {
                  // author: "au---" + String(Date.now()),
                  // title: "ti---" + String(Date.now()),
                  // id: undefined,
                  author: null,
                  title: "hey",
                  // id: void,
                },
              );
              console.log("idOfAddedBook:", idOfAddedBook);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Add doc
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
};

export default App;
