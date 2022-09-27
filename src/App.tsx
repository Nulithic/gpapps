import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const USER = "Test";
const TIME_STAMP = new Date();
const socket = io("http://apps.gp:3001", {
  query: {
    user: USER,
    timeStamp: TIME_STAMP.toISOString(),
  },
});

function App() {
  const [count, setCount] = useState(0);

  const hello = async () => {
    console.log("hello");
  };

  return (
    <div className="App">
      <button onClick={hello}>Hello</button>
    </div>
  );
}

export default App;
