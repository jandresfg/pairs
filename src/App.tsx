import { useState } from "react";
import "./App.css";

function App() {
  const [numberList, setNumberList] = useState<number[]>();
  const [sumToFind, setSumToFind] = useState<number>();
  const [error, setError] = useState<string>();
  const [foundPairs, setFoundPairs] = useState<number[][]>();

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

  const findSumPairs = () => {
    // reset foundPairs and error upon every exec
    setFoundPairs(undefined);
    setError(undefined);

    if (numberList === undefined || sumToFind === undefined) {
      setError("invalid input");
      return;
    }

    const result: number[][] = [];

    numberList.forEach((n1, i1) => {
      // create a sublist from current position onwards and look for a pair there
      let remainingList = numberList.slice(i1);
      remainingList.forEach((n2) => {
        if (n1 + n2 === sumToFind) {
          result.push([n1, n2]);
        }
      });
    });

    setFoundPairs(result);
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
      {error && <p className="read-the-docs">Error: {error}</p>}{" "}
      <div className="card">
        <button onClick={findSumPairs}>Find Pairs</button>
      </div>
      {foundPairs && foundPairs.length > 0 && (
        <p className="read-the-docs">
          Found pairs:
          {foundPairs.map((pair) => (
            <div>{`{${pair[0]},${pair[1]}}`}</div>
          ))}
        </p>
      )}
      {foundPairs && foundPairs.length === 0 && (
        <p className="read-the-docs">No found pairs :(</p>
      )}
    </div>
  );
}

export default App;
