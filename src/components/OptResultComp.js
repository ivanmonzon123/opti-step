import { Card, Form, InputGroup } from "react-bootstrap";
import CollapsibleInfoComp from "./CollapsibleInfoComp";
import { useEffect, useState } from "react";
import "../styles/components/OptResultComp.css";

import * as optResultService from "../services/OptResultService";
import {OptResultRequestBuilder} from "../builders/OptResultRequestBuilder";
import Bar from "../charts/Bar";
import {CHART_TITLES} from "../helpers/FormPageHelper";

export default function OptResultComp({ optFormData$, orderDetFormData$, prodDetFormData$, staffInfoFormData$ }) {
  const [optResult$, setOptResult$] = useState({
    result: 0,
    customResult: 0,
    feedback: {},
    processConfig: undefined,
    weeksConfig: undefined,
  });
  const chartTitles = CHART_TITLES;

  const profit = [
    { title: "Max. Ingresos:", key: "totalProfit" },
    { title: "Max. Utilidad:", key: "result" },
  ];

  useEffect(() => {
    const optResultRequest = OptResultRequestBuilder.build({
      model: optFormData$,
      order: orderDetFormData$,
      production: prodDetFormData$,
      staff: staffInfoFormData$
    })
    setOptResult$(optResultService.getOptResult(optResultRequest));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(optResult$);
  }, [optResult$]);

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

      <section>
        { optResult$.processConfig && optResult$.weeksConfig ?
          <section className="w-100 dk-opt-result-charts">
            <Bar
              title={chartTitles.employees}
              data={optResult$.processConfig.data}
              options={optResult$.processConfig.options} />
            <Bar
              title={chartTitles.weeks}
              data={optResult$.weeksConfig.data}
              options={optResult$.weeksConfig.options} />
          </section>
          : <></>
        }
      </section>
    </article>
  );
}
