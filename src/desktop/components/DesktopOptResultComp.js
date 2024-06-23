import { Card, Form, InputGroup } from "react-bootstrap";
import CollapsibleInfoComp from "../../components/CollapsibleInfoComp";
import "../styles/components/DesktopOptResultComp.css";

export default function DesktopOptResultComp({ optFormData$, optResult$ }) {

  const profit = [
    { title: "Max. Ingresos:", key: "totalProfit" },
    { title: "Max. Utilidad:", key: "result" },
  ];

  return (
    <article className="opt-result-container">
      <section className="opt-result-card">
        <CollapsibleInfoComp feedback={optResult$["feedback"]} />
      </section>

      <Card className="opt-result-card">
        <Card.Body>
          <section className="opt-result-card-production-models">
            {Object.entries(optFormData$.variables).map(
              ([shoeModelName, values]) => (
                <InputGroup key={shoeModelName}>
                  <InputGroup.Text>{`${shoeModelName}:`}</InputGroup.Text>

                  <Form.Control
                    type="number"
                    value={optResult$[shoeModelName] ?? 0}
                    readOnly
                  />

                  <label className="os-txt-sm ms-1">{"(Pares)"}</label>
                </InputGroup>
              )
            )}
          </section>

          <section className="opt-result-card-total-benefit mt-4">
            {profit.map(({ title, key }) => (
              <InputGroup>
                <InputGroup.Text>{title}</InputGroup.Text>

                <Form.Control type="number" value={optResult$[key]} readOnly />

                <label className="os-txt-sm ms-1">{"(Bs)"}</label>
              </InputGroup>
            ))}
          </section>
        </Card.Body>
      </Card>
    </article>
  );
}
