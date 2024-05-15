import { Card, Form, InputGroup } from "react-bootstrap";
import "../styles/components/OptResultComp.css";
import { useEffect, useState } from "react";
import { getFeedback, getOptResult } from "../helpers/OptResultHelper";
import CollapsibleInfoComp from "./CollapsibleInfoComp";

export default function OptResultComp({ optFormData$ }) {
  const [optResult, setOptResult] = useState({ result: 0, customResult: 0 });
  // const [feedback, setfeedback] = useState({title: 'Loading...'});

  const profit = [
    { title: "Max. total beneficio:", key: "result" },
    { title: "Max. total beneficio (líquido):", key: "customResult" },
  ];

  useEffect(() => {
    setOptResult(getOptResult({ ...optFormData$ }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(optResult);
  }, [optResult]);

  return (
    <article className="opt-result-container">
      <section className="opt-result-card">
        <CollapsibleInfoComp feedback={getFeedback()}/>
      </section>

      <Card className="opt-result-card">
        <Card.Body>
          <section className="opt-result-card-production-models">
            {Object.entries(optFormData$.variables).map(([nombre, values]) => (
              <InputGroup key={nombre}>
                <InputGroup.Text>{`${nombre} (pares):`}</InputGroup.Text>

                <Form.Control
                  type="number"
                  value={optResult[nombre] ?? 0}
                  readOnly
                />
              </InputGroup>
            ))}
          </section>

          <section className="opt-result-card-total-benefit mt-4">
            {profit.map(({ title, key }) => (
              <InputGroup>
                <InputGroup.Text>{title}</InputGroup.Text>

                <Form.Control type="number" value={optResult[key]} readOnly />
              </InputGroup>
            ))}
          </section>
        </Card.Body>
      </Card>
    </article>
  );
}
