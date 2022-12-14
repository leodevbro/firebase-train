import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
// import { db } from "./bridge-to-backend/db/firebase/config";
import { dbApi, dbApi0 } from "./bridge-to-backend/db/api";

import { serverTimestamp } from "firebase/firestore";

const App: React.FC = () => {
  //

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={async () => {
            try {
              const idOfAddedBook = await dbApi0.addDoc(
                // ["books", "custId---" + String(Date.now())],
                ["books"],
                // ["bookss", "custId---1659591717164", "myssikes", "iii001"],
                {
                  // author: "au---" + String(Date.now()),
                  // title: "ti---" + String(Date.now()),
                  // id: undefined,
                  author: null,
                  title: "hey",
                  createdAt: serverTimestamp(),
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

        <button
          onClick={async () => {
            try {
              const messageOfDeletedDoc = await dbApi0.deleteDoc(["books", "375otTIgWspS5n0Z8uCV"]);
              console.log(messageOfDeletedDoc);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Delete doc
        </button>

        <button
          onClick={async () => {
            try {
              const myItems = await dbApi.getBooksOfPatrick();
              console.log(myItems);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          get super docs
        </button>

        <button
          onClick={async () => {
            try {
              const myItems = await dbApi.getAllbooks();
              console.log(myItems);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          get all books
        </button>

        <button
          onClick={async () => {
            try {
              const theId = await dbApi.updateOneBook();
              console.log(theId);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          update one book
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
