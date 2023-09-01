import {Card, Form, InputGroup} from "react-bootstrap";
import "../styles/components/OptimizationResultComp.css"
import {useEffect, useState} from "react";

/* global solver */
export default function OptResultComp(
  {
    optFormData$
  }
) {
  const [optResult, setOptResult] = useState({});

  useEffect(() => {

    let copy = {...optFormData$}
    // eslint-disable-next-line
    // copy.constraints.aparado = {max: 2304}
    // copy.constraints.solado = {max: 2304}
    // copy.constraints.terminado = {max: 576}
    const solution = solver.Solve(copy);

    console.log("solution: ", solution);


    let customResult = solution.result;
    for (let key in copy.variables) {
      customResult = customResult - ((solution[key]) * copy.variables[key].costo)
    }

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