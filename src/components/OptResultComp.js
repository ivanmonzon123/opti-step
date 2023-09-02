import {Card, Form, InputGroup} from "react-bootstrap";
import "../styles/components/OptimizationResultComp.css"
import {useEffect, useState} from "react";

/* global solver */
export default function OptResultComp(
  {
    optFormData$
  }
) {
  const [optResult, setOptResult] = useState({result: 0, customResult: 0});

  const setMinConstraintsToZero = (model) => {
    for (const item in model.constraints) {
      if (item.includes("Min")) {
        model.constraints[item] = {min: '0'};
      }
    }
  }

  const getCustomResult = (model, solution) => {
    let customResult = solution.result;
    for (let key in model.variables) {
      if(solution[key]){
        customResult = customResult - ((solution[key]) * model.variables[key].costo)
      }
    }
    return customResult;
  }

  useEffect(() => {
    let model = {...optFormData$}
    let solution = solver.Solve(model);

    if (!solution.feasible) {
      setMinConstraintsToZero(model);
      solution = solver.Solve(model);
    }

    let customResult = getCustomResult(model, solution);
    setOptResult({...solution, customResult});
    // eslint-disable-next-line
  }, [])

  return (
    <Card className="opt-result-card">
      <Card.Body>
        <section className="opt-result-card-production-models">
          {Object.entries(optFormData$.variables).map(([nombre, valores]) => (
            <InputGroup key={nombre}>
              <InputGroup.Text>{`${nombre} (pares):`}</InputGroup.Text>

              <Form.Control
                type="number"
                value={optResult[nombre] ? optResult[nombre] : 0}
                readOnly
              />
            </InputGroup>
          ))}
        </section>

        <section className="opt-result-card-total-benefit mt-4">
          <InputGroup>
            <InputGroup.Text>Max. total beneficio:</InputGroup.Text>

            <Form.Control
              type="number"
              value={optResult.result}
              readOnly
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>Max. total beneficio (líquido):</InputGroup.Text>

            <Form.Control
              type="number"
              value={optResult.customResult}
              readOnly
            />
          </InputGroup>
        </section>
      </Card.Body>
    </Card>

  );
}