import React, { useState, useEffect } from "react";
import "./App.css";
import dict from "./cedict.json";
import DictList from "./DictList";
import dbRef from "./db";

const modes = {
  search: DictList,
};

function App() {
  const [mode, setMode] = useState("search");
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("data", Object.values(data?.vocab));
      // setVocab(data?.vocab||[])
      if (data?.vocab) {
        setVocab(Object.values(data?.vocab));
      }
    });
  }, []);

  return (
    <div>
      <div>
        {Object.keys(modes).map((m) => (
          <button key={m} onClick={() => setMode(m)}>
            {m}
          </button>
        ))}
      </div>
      {modes[mode]({ vocab })}
    </div>
  );
}

export default App;