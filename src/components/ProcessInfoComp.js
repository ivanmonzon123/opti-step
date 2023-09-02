import {Card, Form} from "react-bootstrap";
import "../styles/components/StaffInfoComp.css"
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleRight, faPenToSquare} from "@fortawesome/free-regular-svg-icons";

export default function ProcessInfoComp(
  {
    params,
    processToCheck$, setProcessToCheck$,
    isValid$, setIsValid$,
    optFormData$, setOptFormData$,
    processInfoFormData$, setProcessInfoFormData$
  }
) {
  const capitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [numberOfWorkers$, setNumberOfWorkers$] = useState(processInfoFormData$.length);
  const [isNumberOfWorkersSet$, setIsNumberOfWorkersSet$] = useState(false);

  function createNewRow(size) {
    return Array.from({length: size}, () => ({semanas: "", horasDia: "",}));
  }

  const handleSetNumberOfWorkers = () => {
    setIsNumberOfWorkersSet$(true);

    if (processInfoFormData$.length === 0) {
      setProcessInfoFormData$(createNewRow(numberOfWorkers$));
    } else {
      if (numberOfWorkers$ > processInfoFormData$.length) {
        setProcessInfoFormData$([
          ...processInfoFormData$, ...createNewRow(numberOfWorkers$ - processInfoFormData$.length)
        ]);
      } else {
        setProcessInfoFormData$([...processInfoFormData$].slice(0, numberOfWorkers$));
      }
    }
  }

  function handleEditNumberOfWorkers() {
    setIsNumberOfWorkersSet$(false);
  }

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...processInfoFormData$];
    newInputRows[index][field] = value;
    setProcessInfoFormData$(newInputRows);
  };

  const updateFormData = () => {
    const totalValue = processInfoFormData$.reduce((total, item) => {
      const semanas = parseInt(item.semanas);
      const horasDia = parseInt(item.horasDia);
      return total + ((semanas * 6) * horasDia);
    }, 0);

    setOptFormData$((prevOptFormData) => ({
      ...prevOptFormData,
      constraints: {
        ...prevOptFormData.constraints,
        [params.processTitle]: {max: (totalValue * 12)}
      },
    }));
  }

  const setNumberOfWorkersIconRef = useRef(null);
  const staffInfoFormIsValid = () => {
    if (numberOfWorkers$ < 1) {
      return false;
    }

    if (!processInfoFormData$.length) {
      setNumberOfWorkersIconRef.current.click();
      return false;
    }

    return !processInfoFormData$.some((row) => row.semanas < 1 || row.horasDia < 1);
  };

  const formRef = useRef(null);
  useEffect(() => {
    const step = processToCheck$.formStep;
    const process = params.processTitle;

    if (processToCheck$.process[step] === process) {
      if (!staffInfoFormIsValid()) {
        formRef.current.click();
        setIsValid$({...isValid$, [process]: false});
        // setProcessToCheck$(1);
      } else {
        formRef.current.click();
        setIsValid$({...isValid$, [process]: true});
        setProcessToCheck$({
          ...processToCheck$, formStep: processToCheck$.formStep + 1
        });
      }
    }
    // eslint-disable-next-line
  }, [processToCheck$]);

  return (
    <Card className="staff-info-card">
      <Card.Body>

        <Card.Title className="os-txt os-txt-bold">
          Proceso de {params.processTitle}:
        </Card.Title>

        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <section className="staff-info-card-setter-question">
            <label className="os-txt">{params.setterParamsQuestion}</label>

            <Form.Group className="d-flex mb-3 align-items-center gap-2" controlId="formPlaintextPassword">
              <Form.Label
                className="staff-info-labels">{capitalCase(params.processTitle)}res:</Form.Label>

              <Form.Control
                type="number"
                required
                min={1}
                defaultValue={processInfoFormData$.length || ""}
                onChange={(e) => {
                  setNumberOfWorkers$(e.target.value)
                }}
                readOnly={isNumberOfWorkersSet$}
              />

              {!isNumberOfWorkersSet$
                ?
                <section onClick={handleSetNumberOfWorkers} ref={setNumberOfWorkersIconRef}>
                  <FontAwesomeIcon className="os-txt os-txt-lg" icon={faCircleRight}
                  />
                </section>

                :
                <section onClick={handleEditNumberOfWorkers}>
                  <FontAwesomeIcon className="os-txt os-txt-lg" icon={faPenToSquare}
                  />
                </section>
              }

            </Form.Group>
          </section>

          <section className="staff-info-card-parameters">
            {processInfoFormData$ ?
              <label className="os-txt mb-1">{params.workingPeriodQuestion}</label> : ""}
            {processInfoFormData$.map((row, index) => (
              <Form.Group key={index} className="d-flex flex-wrap mb-3"
                          controlId={`formPlaintextPassword${index}`}>
                <Form.Label className="staff-info-labels">{`Cortador ${index + 1}:`}</Form.Label>

                <section className="staff-info-card-params-input-group">
                  <section>
                    <Form.Control
                      type="number"
                      placeholder="semanas"
                      value={row.semanas}
                      min={1}
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
                      min={1}
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