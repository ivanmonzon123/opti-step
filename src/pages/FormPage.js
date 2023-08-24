import "../styles/pages/HomePage.css"
import "../styles/pages/FormPage.css"
import {Card, Form, InputGroup, Table} from "react-bootstrap";

export default function FormPage() {
  return (
      <article className="forms-container">
        <article className="forms-order-details">
          <section className="forms-order-details-title">
            <label className="os-txt os-txt-lg os-txt-bold">Detalles del pedido</label>
          </section>

          <Card className="forms-order-details-card">
            <Card.Body>
              <Card.Text className="text-center os-txt">
                Ingrese los modelos, costo de producción, precio por unidad de calzado y tiempo máximo para producir en semanas
              </Card.Text>
              <Card.Text className="forms-order-details-card-parameters">
                <InputGroup>
                  <InputGroup.Text>Cant. modelos:</InputGroup.Text>

                  <Form.Control required type="number"/>
                </InputGroup>

                <InputGroup>
                  <InputGroup.Text>Periodo de prod:</InputGroup.Text>

                  <Form.Control required type="number"/>
                </InputGroup>
              </Card.Text>
              <Table responsive className="forms-order-details-table">
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

          <section className="forms-order-details-buttons">
            <button className="btn btn-primary">
              <label className="os-txt">cancelar</label>
            </button>

            <button className="btn btn-primary">
              <label className="os-txt">siguiente</label>
            </button>
          </section>
        </article>
      </article>
  );
}