import {Card, Form, InputGroup} from "react-bootstrap";
import "../styles/components/OptimizationResultComp.css"

export default function OptimizationResultComp() {
  return (
      <Card className="opt-result-card">
        <Card.Body>
          <section className="opt-result-card-parameters">
            <InputGroup>
              <InputGroup.Text>Oxford (pares):</InputGroup.Text>

              <Form.Control required type="number"/>
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>Mocasin (pares):</InputGroup.Text>

              <Form.Control required type="number"/>
            </InputGroup>

              <InputGroup>
                  <InputGroup.Text>Botín (pares):</InputGroup.Text>

                  <Form.Control required type="number"/>
              </InputGroup>
          </section>

            <section className="opt-result-card-parameters mt-4">
                <InputGroup>
                    <InputGroup.Text>Max.total beneficio:</InputGroup.Text>

                    <Form.Control required type="number"/>
                </InputGroup>

                <InputGroup>
                    <InputGroup.Text>Max.total beneficio (líquido):</InputGroup.Text>

                    <Form.Control required type="number"/>
                </InputGroup>
            </section>
        </Card.Body>
      </Card>

  );
}