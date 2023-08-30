import {Card, Form} from "react-bootstrap";
import "../styles/components/StaffInfoComp.css"
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";
import {faCircleRight} from "@fortawesome/free-regular-svg-icons";

export default function StaffInfoComp({params}) {
  const capitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [numberOfWorkers$, setNumberOfWorkers$] = useState(0);
  const [isNumberOfWorkersSet$, setIsNumberOfWorkersSet$] = useState(false);
  // const [isReadOnly$, setIsReadOnly$] = useState(false);

  function handleSetNumberOfWorkers() {
    setIsNumberOfWorkersSet$((prevState) => !prevState);
  }

  return (
      <Card className="staff-info-card">
        <Card.Body>
          <Card.Title className="os-txt os-txt-bold">
            Proceso de {params.processTitle}:
          </Card.Title>

          <section className="staff-info-card-setter-question">
            <label className="os-txt">{params.setterParamsQuestion}</label>

            <Form.Group className="d-flex mb-3 align-items-center gap-2" controlId="formPlaintextPassword">
              <Form.Label className="staff-info-labels">{capitalCase(params.processTitle)}res:</Form.Label>

              <Form.Control
                  type="number"
                  onChange={(e) => {setNumberOfWorkers$(e.target.value)}}
                  readOnly={isNumberOfWorkersSet$} />

              <FontAwesomeIcon
                  className="os-txt os-txt-lg"
                  icon={!isNumberOfWorkersSet$ ?faCircleRight :faPenToSquare}
                  onClick={handleSetNumberOfWorkers}
              />
            </Form.Group>
          </section>

          <section className="staff-info-card-parameters">
            {isNumberOfWorkersSet$? <label className="os-txt mb-1">{params.workingPeriodQuestion}</label> : ""}
            {Array.from({ length: isNumberOfWorkersSet$? numberOfWorkers$: 0 }, (_, index) => (
                <Form.Group key={index} className="d-flex flex-wrap mb-3" controlId={`formPlaintextPassword${index}`}>
                  <Form.Label className="staff-info-labels">{`Cortador ${index + 1}:`}</Form.Label>

                  <section className="staff-info-card-params-input-group">
                    <section>
                      <Form.Control type="number" placeholder="semanas"/><label>sem</label>
                    </section>

                    <section>
                      <Form.Control type="number" placeholder="hrs/día"/><label>hrs/día</label>
                    </section>
                  </section>
                </Form.Group>
            ))}
          </section>
        </Card.Body>
      </Card>

  );
}