import {Button, Card, Form, InputGroup, Table} from "react-bootstrap";
import "../styles/components/OrderDetailsComp.css"
import {useEffect, useRef} from "react";

export default function OrderDetailsComp(
    {formData$, setFormData$,
      inputRowsOfOrderDet$, setInputRowsOfOrderDet$,
      nextStep$, setNextStep$,
      nextFormStepFn
    }
) {

  const handleAddRow = () => {
    setInputRowsOfOrderDet$([...inputRowsOfOrderDet$, { modelo: "", precio: "", costo: "", cantMin: "", cantMax: "" }]);
  };

  const handleRemoveRow = (index) => {
    if(index <= inputRowsOfOrderDet$.length) {
      const newInputRows = [...inputRowsOfOrderDet$];
      newInputRows.splice(index, 1);
      setInputRowsOfOrderDet$(newInputRows);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...inputRowsOfOrderDet$];
    newInputRows[index][field] = value;
    setInputRowsOfOrderDet$(newInputRows);
  };

  const updateFormData = () => {
    const newVariables = {};
    const newConstraints = {...formData$.constraints};
    inputRowsOfOrderDet$.forEach((row) => {
      if (row.modelo) {
        newVariables[row.modelo] = {
          precio: row.precio,
          costo: row.costo,
          cortado: 0,
          aparado: 0,
          solado: 0,
          terminado: 0,
          [row.modelo+"Min"]: row.cantMin,
          [row.modelo+"Max"]: row.cantMax,
        };

        newConstraints[row.modelo+"Max"] = { max: row.cantMax }
        newConstraints[row.modelo+"Min"] = { min: row.cantMin }
      }
    });
    setFormData$((prevData) => ({
      ...prevData,
      variables: newVariables, constraints: newConstraints
    }));
  };
  
  const orderDetailsFormIsValid = () => {
    let isValid = true;
    inputRowsOfOrderDet$.forEach((row, index) => {
      if (!row.modelo || !row.precio || !row.costo || !row.cantMin || !row.cantMax) {
        isValid = false;
      }
    });
    return isValid;
  };

  useEffect(() => {
    if (nextStep$ === 1) {
      if (!orderDetailsFormIsValid()) {
        formRef.current.click();
        setNextStep$(0);
      }else {
        formRef.current.click();
        nextFormStepFn();
      }
    }
    // eslint-disable-next-line
  }, [nextStep$]);

  const formRef = useRef(null);

  return (
      <Card className="order-details-card">
        <Card.Body>
          <Card.Text className="text-center os-txt">
            Ingrese los modelos, costo de producción, precio de venta por unidad de calzado y tiempo máximo para producir en semanas
          </Card.Text>

          <section className="order-details-card-parameters">
            <section className="order-details-card-parameters-buttons">
              <Button onClick={handleAddRow}>
                <label className="os-txt">+</label>
              </Button>

              <Button onClick={() => handleRemoveRow(inputRowsOfOrderDet$.length - 1)}>
                <label className="os-txt">-</label>
              </Button>
            </section>

            <InputGroup>
              <InputGroup.Text>Periodo de prod:</InputGroup.Text>

              <Form.Control required type="number" placeholder={"semanas"}/>
            </InputGroup>
          </section>

          <form onSubmit={(e) => {e.preventDefault()}}>
          <Table responsive className="order-details-table">
            <thead>
            <tr>
              <th className="w-25">Modelo</th>
              <th>Precio</th>
              <th>Costo</th>
              <th><span>Cant.</span> min</th>
              <th><span>Cant.</span> max</th>
            </tr>
            </thead>

            <tbody>
            {inputRowsOfOrderDet$.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        value={row.modelo}
                        onChange={(e) => handleInputChange(index, "modelo", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                        required
                        type="number"
                        placeholder=""
                        value={row.precio}
                        onChange={(e) => handleInputChange(index, "precio", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                        required
                        type="number"
                        placeholder=""
                        value={row.costo}
                        onChange={(e) => handleInputChange(index, "costo", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                        required
                        type="number"
                        placeholder=""
                        value={row.cantMin}
                        onChange={(e) => handleInputChange(index, "cantMin", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                        required
                        type="number"
                        placeholder=""
                        value={row.cantMax}
                        onChange={(e) => handleInputChange(index, "cantMax", e.target.value)}
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