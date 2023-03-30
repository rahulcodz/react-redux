import React, { useState, useMemo } from "react";

function ReactUseMemo() {
  const [num, setNum] = useState(0);
  const [dark, setDark] = useState(false);
  const doubleNum = useMemo(() => {
    return slowFunction(num);
  }, [num]);
  const themeStyle = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };

  return (
    <>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value))}
      />
      <button onClick={(e) => setDark((preDark) => !preDark)}>
        Theme Change
      </button>
      <div style={themeStyle}>{doubleNum}</div>
    </>
  );
}

const HIGH_NUM = 1000000000;

function slowFunction(num) {
  console.log("slow function running");
  for (let i = 0; i <= HIGH_NUM; i++) {}
  return num * 2;
}

export default ReactUseMemo;
