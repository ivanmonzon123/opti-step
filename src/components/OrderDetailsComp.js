import {Card, Form, InputGroup, Table} from "react-bootstrap";
import "../styles/components/OrderDetailsComp.css"
export default function OrderDetailsComp() {
  return (
      <Card className="order-details-card">
        <Card.Body>
          <Card.Text className="text-center os-txt">
            Ingrese los modelos, costo de producción, precio por unidad de calzado y tiempo máximo para producir en semanas
          </Card.Text>

          <section className="order-details-card-parameters">
            <InputGroup>
              <InputGroup.Text>Cant. modelos:</InputGroup.Text>

              <Form.Control required type="number"/>
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>Periodo de prod:</InputGroup.Text>

              <Form.Control required type="number"/>
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
            <tr>
              {Array.from({length: 5}).map((_, index) => (
                  <td key={index}>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        defaultValue=""
                    /></td>
              ))}
            </tr>
            <tr>
              {Array.from({length: 5}).map((_, index) => (
                  <td key={index}>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        defaultValue=""
                    /></td>
              ))}
            </tr>
            <tr>
              {Array.from({length: 5}).map((_, index) => (
                  <td key={index}>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        defaultValue=""
                    /></td>
              ))}
            </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

  );
}