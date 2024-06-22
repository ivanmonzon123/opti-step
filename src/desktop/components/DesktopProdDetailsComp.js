import { Card, Form, Table } from "react-bootstrap";
import "../styles/components/DesktopProdDetailsComp.css";
import { useEffect, useRef } from "react";
import {FormStep} from "../helper/DesktopFormPageHelper";

export default function DesktopProdDetailsComp({
  optFormData$,
  setOptFormData$,

  prodDetFormData$,
  setProdDetFormData$,

  formStep$,
  setFormStep$,
}) {
  useEffect(() => {
    const result = [];
    Object.entries(optFormData$.variables).forEach(([key, value]) => {
      result.push({
        modelo: key,
        cortado: value.cortado ?? 0,
        solado: value.solado ?? 0,
        aparado: value.aparado ?? 0,
        terminado: value.terminado ?? 0,
      });
    });

    setProdDetFormData$([...result]);
    // eslint-disable-next-line
  }, [optFormData$]);

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...prodDetFormData$];
    newInputRows[index][field] = value;
    setProdDetFormData$(newInputRows);
    updateFormData();
  };

  const prodDetailsFormIsValid = () => {
    const isValidRow = (row) => {
      return (
        row.modelo &&
        row.cortado >= 1 &&
        row.aparado >= 1 &&
        row.solado >= 1 &&
        row.terminado >= 1
      );
    };

    return prodDetFormData$.every(isValidRow);
  };

  const formRef = useRef(null);
  useEffect(() => {
    if (formStep$ === FormStep.PRODUCTION) {
      showErrorsAndSaveData();

      if (!prodDetailsFormIsValid()) {
        setFormStep$(FormStep.INIT);
      } else {
        setFormStep$(FormStep.STAFF)
      }
    }
    // eslint-disable-next-line
  }, [formStep$]);

  const showErrorsAndSaveData = () => {
    formRef.current.click();
  };

  const updateFormData = () => {
    let newOptFormData = { ...optFormData$ };
    prodDetFormData$.forEach((item) => {
      const { modelo, ...prodDetails } = item;
      newOptFormData.variables[modelo] = {
        ...newOptFormData.variables[modelo],
        ...prodDetails,
      };
    });

    setOptFormData$(newOptFormData);
  };

  return (
    <Card className="production-details-card">
      <Card.Body>
        <Card.Text className="text-center os-txt">
          ¿Cuánto tiempo en horas le toma cada proceso de producción por docena?
        </Card.Text>

        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <Table responsive className="production-details-table">
            <thead>
            <tr>
              <th className="w-25">Modelo</th>
              <th>Cortado</th>
              <th>Aparado</th>
              <th>Solado</th>
              <th>Terminado</th>

            </tr>
            </thead>
            <tbody>
            {prodDetFormData$.map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={row.modelo}
                    readOnly
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    min={1}
                    type="number"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "cortado", e.target.value)}
                    value={row.cortado}
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    min={1}
                    type="number"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "aparado", e.target.value)}
                    value={row.aparado}
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    min={1}
                    type="number"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "solado", e.target.value)}
                    value={row.solado}
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    min={1}
                    type="number"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "terminado", e.target.value)}
                    value={row.terminado}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
          <input ref={formRef} className="d-none" type="submit" value={"apply"} onClick={updateFormData}/>
        </form>
      </Card.Body>
    </Card>
  );
}
