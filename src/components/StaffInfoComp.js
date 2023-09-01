import {Card, Form} from "react-bootstrap";
import "../styles/components/StaffInfoComp.css"
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleRight, faPenToSquare} from "@fortawesome/free-regular-svg-icons";

export default function StaffInfoComp({
    formStepChange$, setFormStepChange$,
    nextCompToRenderFn, params,
    optFormData$, setOptFormData$,
                                        staffInfoFormData$, setStaffInfoFormData$
}) {
  const capitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [numberOfWorkers$, setNumberOfWorkers$] = useState(0);
  const [isNumberOfWorkersSet$, setIsNumberOfWorkersSet$] = useState(false);

  function createNewRow(size){
    return Array.from({length: size}, () => ({semanas: "", horasDia: "",}));
  }

  const handleSetNumberOfWorkers = () => {
    setIsNumberOfWorkersSet$(true);

    if (staffInfoFormData$.length === 0) {
      setStaffInfoFormData$(createNewRow(numberOfWorkers$));
    }else {
      if(numberOfWorkers$ > staffInfoFormData$.length){
        setStaffInfoFormData$([
            ...staffInfoFormData$,...createNewRow(numberOfWorkers$ - staffInfoFormData$.length)
        ]);
      }else {
        setStaffInfoFormData$([...staffInfoFormData$].slice(0, numberOfWorkers$));
      }
    }
  }

  function handleEditNumberOfWorkers() {
    setIsNumberOfWorkersSet$(false);
  }

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...staffInfoFormData$];
    newInputRows[index][field] = value;
    setStaffInfoFormData$(newInputRows);
  };

  const updateFormData = () => {
    const totalValue = staffInfoFormData$.reduce((total, item) => {
      const semanas = parseInt(item.semanas);
      const horasDia = parseInt(item.horasDia);
      return total + ((semanas * 6)* horasDia);
    }, 0);

    setOptFormData$((prevOptFormData) => ({
      ...prevOptFormData,
      constraints: {
        ...prevOptFormData.constraints,
        [params.processTitle]: { max: (totalValue * 12) }
      },
    }));
  }

  const staffInfoFormIsValid = () => {
    if(!numberOfWorkers$){
      return false
    }

    let isValid = true;
    staffInfoFormData$.forEach((row, index) => {
      if (!row.semanas || !row.horasDia) {
        isValid = false;
      }
    });
    return isValid;
  };

  const formRef = useRef(null);
  useEffect(() => {
    if (formStepChange$ === 2) {
      if (!staffInfoFormIsValid()) {
        formRef.current.click();
        setFormStepChange$(1);
      }else {
        formRef.current.click();
        nextCompToRenderFn();
      }
    }
    // eslint-disable-next-line
  }, [formStepChange$]);

  return (
      <Card className="staff-info-card">
        <Card.Body>

          <Card.Title className="os-txt os-txt-bold">
            Proceso de {params.processTitle}:
          </Card.Title>

          <form onSubmit={(e) => {e.preventDefault()}}>
          <section className="staff-info-card-setter-question">
            <label className="os-txt">{params.setterParamsQuestion}</label>

            <Form.Group className="d-flex mb-3 align-items-center gap-2" controlId="formPlaintextPassword">
              <Form.Label className="staff-info-labels">{capitalCase(params.processTitle)}res:</Form.Label>

              <Form.Control
                  type="number"
                  required
                  defaultValue={staffInfoFormData$.length > 0? staffInfoFormData$.length: " "}
                  onChange={(e) => {setNumberOfWorkers$(e.target.value)}}
                  readOnly={isNumberOfWorkersSet$}
              />

              {!isNumberOfWorkersSet$
                ? <FontAwesomeIcon className="os-txt os-txt-lg" icon={faCircleRight} onClick={handleSetNumberOfWorkers}/>
                : <FontAwesomeIcon className="os-txt os-txt-lg" icon={faPenToSquare} onClick={handleEditNumberOfWorkers}/>
              }

            </Form.Group>
          </section>

          <section className="staff-info-card-parameters">
            {staffInfoFormData$? <label className="os-txt mb-1">{params.workingPeriodQuestion}</label> : ""}
            {staffInfoFormData$.map((row, index) => (
                <Form.Group key={index} className="d-flex flex-wrap mb-3" controlId={`formPlaintextPassword${index}`}>
                  <Form.Label className="staff-info-labels">{`Cortador ${index + 1}:`}</Form.Label>

                  <section className="staff-info-card-params-input-group">
                    <section>
                      <Form.Control
                          type="number"
                          placeholder="semanas"
                          value={row.semanas}
                          required
                          onChange={(e) => handleInputChange(index, "semanas", e.target.value)}
                      /><label>sem</label>
                    </section>

                    <section>
                      <Form.Control
                          type="number"
                          placeholder="hrs/día"
                          value={row.horasDia}
                          required
                          onChange={(e) => handleInputChange(index, "horasDia", e.target.value)}
                      /><label>hrs/día</label>
                    </section>
                  </section>
                </Form.Group>
            ))}
          </section>

            <input ref={formRef} className="d-none" type="submit" value={"apply"} onClick={updateFormData}/>
          </form>
        </Card.Body>
      </Card>

  );
}