import React, { useState } from 'react';

/* global solver */
function App() {
  const [result, setResult] = useState(null);

  const solveProblem = () => {
    let model = {
      optimize: "precio",
      opType: "max",
      constraints: {
        "acabado": {"min": 100},
        "carpinteria": {"max": 80},
        "demanda": {"max": 40}
      },
      variables: {
        bus: {
          "precio": 3,
          "acabado": 2,
          "carpinteria": 1,
          "demanda": 1
        },
        tren: {
          "precio": 2,
          "acabado": 1,
          "carpinteria": 1,
          "demanda": 0
        }
      }
    }

    // Use 'Solver' from the global scope (CDN)
    const solution = solver.Solve(model);
    setResult(solution);
    console.log(solution)
  };

  return (
      <div>
        <h1>Linear Programming Solver</h1>
        <button onClick={solveProblem}>Solve Problem</button>
        {result && (
            <div>
              <h2>Results:</h2>
              <p>Maximized Value: {result.result}</p>
              <p>x: {result.bus}</p>
              <p>y: {result.tren}</p>
            </div>
        )}
      </div>
  );
}

export default App;
