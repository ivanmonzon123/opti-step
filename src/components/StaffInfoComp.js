
import {Card, Form, Row} from "react-bootstrap";
import "../styles/components/StaffInfoComp.css"

export default function StaffInfoComp({processTitle, setterParamsQuestion, workingPeriodQuestion, numberOfWorkers}) {
  const capitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
      <Card className="staff-info-card">
        <Card.Body>
          <Card.Title className="os-txt os-txt-bold">
            Proceso de {processTitle}:
          </Card.Title>

          <Card.Text className="staff-info-card-setting">
            <label className="os-txt">{setterParamsQuestion}</label>

            <Form.Group className="d-flex mb-3" controlId="formPlaintextPassword">
              <Form.Label className="staff-info-label">{capitalCase(processTitle)}res:</Form.Label>

              <Form.Control type="number" placeholder="" />
            </Form.Group>
          </Card.Text>

          <Card.Text className="staff-info-card-parameters">
            <label className="os-txt mb-1">{workingPeriodQuestion}</label>
            {Array.from({ length: numberOfWorkers }, (_, index) => (
                <Form.Group key={index} className="d-flex flex-wrap mb-3" controlId={`formPlaintextPassword${index}`}>
                  <Form.Label className="staff-info-label">{`Cortador ${index + 1}:`}</Form.Label>

                  <section className="staff-info-card-parameters-inputs">
                    <section>
                      <Form.Control type="number" placeholder="semanas"/><label>sem</label>
                    </section>

                    <section>
                      <Form.Control type="number" placeholder="hrs/día"/><label>hrs/día</label>
                    </section>
                  </section>
                </Form.Group>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>

  );
}