import { useState } from "react";
import "./App.css";

function App() {
  const [numberList, setNumberList] = useState<number[]>();
  const [sumToFind, setSumToFind] = useState<number>();

  const updateList = (event: React.FormEvent<HTMLInputElement>) =>
    setNumberList(
      (event.target.value as string)
        .trim()
        .split(",")
        .filter((str) => str)
        .map((str) => Number.parseInt(str.trim()))
        .filter((num) => !isNaN(num))
    );
  const updateSumToFind = (event: React.FormEvent<HTMLInputElement>) => {
    let input = Number.parseInt((event.target.value as string).trim());
    isNaN(input) ? setSumToFind(undefined) : setSumToFind(input);
  };

  return (
    <div className="App">
      <h1>Sum Pairs</h1>
      <div>
        Number list:
        <input
          type="text"
          name="numberListInput"
          id="numberListInput"
          onChange={updateList}
        />
      </div>
      <div>
        Sum to find:
        <input
          type="text"
          name="sumToFindInput"
          id="sumToFindInput"
          onChange={updateSumToFind}
        />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Find Pairs
        </button>
      </div>
      <p className="read-the-docs">numberList: {numberList?.toString()}</p>
      <p className="read-the-docs">sumToFind: {sumToFind}</p>
    </div>
  );
}

export default App;
