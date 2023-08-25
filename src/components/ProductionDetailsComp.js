import {Card, Form, Table} from "react-bootstrap";
import "../styles/components/ProductionDetailsComp.css"

export default function ProductionDetailsComp() {
  return (
      <Card className="production-details-card">
        <Card.Body>
          <Card.Text className="text-center os-txt">
            ¿Cuánto tiempo en horas le toma cada proceso de producción por docena?
          </Card.Text>

          <Table responsive className="production-details-table">
            <thead>
            <tr>
              <th className="w-25">Modelo</th>
              <th>Cortado</th>
              <th>Solado</th>
              <th>Aparado</th>
              <th>Terminado</th>

            </tr>
            </thead>
            <tbody>
            <tr>
              <td key={1}>
                <Form.Control
                    required
                    type="text"
                    placeholder=""
                    defaultValue="Modelo 01"
                    readOnly
                /></td>
              {Array.from({length: 4}).map((_, index) => (
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
              <td key={2}>
                <Form.Control
                    required
                    type="text"
                    placeholder=""
                    defaultValue="Modelo 02"
                    readOnly
                /></td>
              {Array.from({length: 4}).map((_, index) => (
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
              <td key={3}>
                <Form.Control
                    required
                    type="text"
                    placeholder=""
                    defaultValue="Modelo 03"
                    readOnly
                /></td>
              {Array.from({length: 4}).map((_, index) => (
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