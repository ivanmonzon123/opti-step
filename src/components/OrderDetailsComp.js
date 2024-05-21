import {Button, Card, Form, InputGroup, Table} from "react-bootstrap";
import "../styles/components/OrderDetailsComp.css"
import {useEffect, useRef} from "react";

export default function OrderDetailsComp(
  {
    optFormData$, setOptFormData$,
    orderDetFormData$, setOrderDetFormData$,
    formStepChange$, setFormStepChange$,
    nextCompToRenderFn
  }
) {

  const handleAddRow = () => {
    setOrderDetFormData$([...orderDetFormData$, {modelo: "", precio: "", costo: "", cantMin: "", cantMax: ""}]);
  };

  const handleRemoveRow = () => {
    if (orderDetFormData$.length > 1) {
      const newInputRows = [...orderDetFormData$];
      newInputRows.pop();
      setOrderDetFormData$(newInputRows);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...orderDetFormData$];
    newInputRows[index][field] = value;
    setOrderDetFormData$(newInputRows);
  };

  const handleProdPeriod = (value) => {
    setOptFormData$((prev) => ({
      ...prev,
      productionPeriod: value,
    }));
  };

  const updateFormData = () => {
    const newVariables = {};
    const newConstraints = { ...optFormData$.constraints };
    orderDetFormData$.forEach((row) => {
      if (row.modelo) {
        newVariables[row.modelo] = {
          precio: row.precio,
          costo: row.costo,
          cortado: 0,
          aparado: 0,
          solado: 0,
          terminado: 0,
          [row.modelo + "Min"]: 1,
          [row.modelo + "Max"]: 1,
        };

        newConstraints[row.modelo + "Max"] = { max: row.cantMax };
        newConstraints[row.modelo + "Min"] = { min: row.cantMin };
      }
    });
    setOptFormData$((prevData) => ({
      ...prevData,
      variables: newVariables,
      constraints: newConstraints,
    }));
  };

  const orderDetailsFormIsValid = () => {
    if (!optFormData$.productionPeriod) {
      return false;
    }

    const isValidRow = (row) => {
      const order = {
        model: row.modelo,
        price: parseInt(row.precio),
        cost: parseInt(row.costo),
        min: parseInt(row.cantMin),
        max: parseInt(row.cantMax),
      };
      return (
        order.model &&
        order.price >= 1 &&
        order.price >= order.cost &&
        order.min >= 0 &&
        order.max >= order.min
      );
    };

    return orderDetFormData$.every(isValidRow);
  };

  useEffect(() => {
    if (formStepChange$ === 1) {
      if (!orderDetailsFormIsValid()) {
        formRef.current.click();
        setFormStepChange$(0);
      } else {
        formRef.current.click();
        nextCompToRenderFn();
      }
    }
    // eslint-disable-next-line
  }, [formStepChange$]);

  const formRef = useRef(null);

  return (
    <Card className="order-details-card">
      <Card.Body>
        <Card.Text className="text-center os-txt">
          Ingrese los modelos, costo de producción, precio de venta por unidad
          de calzado y tiempo máximo para producir en semanas
        </Card.Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <section className="order-details-card-parameters">
            <section className="order-details-card-parameters-buttons">
              <Button onClick={handleAddRow}>
                <label className="os-txt">+</label>
              </Button>

              <Button onClick={() => handleRemoveRow()}>
                <label className="os-txt">-</label>
              </Button>
            </section>

            <InputGroup>
              <InputGroup.Text>Periodo de prod:</InputGroup.Text>

              <Form.Control
                type="number"
                placeholder={"semanas"}
                value={optFormData$.productionPeriod || ""}
                onChange={(e) => handleProdPeriod(e.target.value)}
                min={1}
                required
              />
            </InputGroup>
          </section>

          <Table responsive className="order-details-table">
            <thead>
            <tr>
              <th className="w-25">Modelo</th>
              <th>Costo</th>
              <th>Precio</th>
              <th><span>Cant.</span> min</th>
              <th><span>Cant.</span> max</th>
            </tr>
            </thead>

            <tbody>
            {orderDetFormData$.map((row, index) => (
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
                    value={row.costo}
                    min={1}
                    onChange={(e) => handleInputChange(index, "costo", e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    required
                    type="number"
                    placeholder=""
                    value={row.precio}
                    min={orderDetFormData$[index]['costo'] ?? 1}
                    onChange={(e) => handleInputChange(index, "precio", e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    required
                    type="number"
                    placeholder=""
                    value={row.cantMin}
                    min={0}
                    onChange={(e) => handleInputChange(index, "cantMin", e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    required
                    type="number"
                    placeholder=""
                    value={row.cantMax}
                    min={orderDetFormData$[index]['cantMin'] || 1}
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
