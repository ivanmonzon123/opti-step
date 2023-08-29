import {Button, Card, Form, InputGroup, Table} from "react-bootstrap";
import "../styles/components/OrderDetailsComp.css"
import {useEffect, useState} from "react";

export default function OrderDetailsComp({formData$, setFormData$}) {

  const [inputRows, setInputRows] = useState([
    {
      modelo: "",
      precio: "",
      costo: "",
      cantMin: "",
      cantMax: "",
    },
  ]);

  const handleAddRow = () => {
    setInputRows([...inputRows, { modelo: "", precio: "", costo: "", cantMin: "", cantMax: "" }]);
  };

  const handleRemoveRow = (index) => {
    if(index <= inputRows.length) {
      const newInputRows = [...inputRows];
      newInputRows.splice(index, 1);
      setInputRows(newInputRows);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...inputRows];
    newInputRows[index][field] = value;
    setInputRows(newInputRows);
  };

  const updateFormData = () => {
    const newVariables = {};
    inputRows.forEach((row) => {
      if (row.modelo) {
        newVariables[row.modelo] = {
          precio: row.precio,
          costo: row.costo,
          cantMin: row.cantMin,
          cantMax: row.cantMax,
        };
      }
    });
    setFormData$((prevData) => ({
      ...prevData,
      variables: newVariables,
    }));
  };

// useEffect(() => {
//   console.log(formData$)
// }, [formData$])

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

              <Button onClick={() => handleRemoveRow(inputRows.length - 1)}>
                <label className="os-txt">-</label>
              </Button>
            </section>

            <InputGroup>
              <InputGroup.Text>Periodo de prod:</InputGroup.Text>

              <Form.Control required type="number" placeholder={"semanas"}/>
            </InputGroup>
          </section>

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
            {inputRows.map((row, index) => (
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
          <Button onClick={updateFormData}>Actualizar FormData</Button>
        </Card.Body>
      </Card>

  );
}