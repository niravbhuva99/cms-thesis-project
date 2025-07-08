import React, { useState } from "react";
import Button from "../button/button";
function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button
        className={`font-bold border block border-blue-500 py-2 rounded bg-blue-500 text-white my-4 hover:bg-white hover:text-blue-500 transition duration-300 shadow `}
        onClick={handleIncrement}
      >
        Increment
      </button>
    </div>
  );
}

export default Counter;
