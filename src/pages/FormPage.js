import "../styles/pages/HomePage.css"
import "../styles/pages/FormPage.css"
import OrderDetailsComp from "../components/OrderDetailsComp";
import {useState} from "react";
import {ProgressBar} from "react-bootstrap";
import StaffInfoComp from "../components/StaffInfoComp";

export default function FormPage() {
  const [barStep$, setBarStep$] = useState(0);
  const title = [
    'Detalles del pedido',
    'Informacion personal'
  ];
  const form = [
    <OrderDetailsComp/>,
    <StaffInfoComp
    processTitle="cortado"
    setterParamsQuestion="¿Con cuantos cortadores dispone?"
    workingPeriodQuestion="¿Cuántas horas por dia y cuantas de las 12 semanas trabajara?"
    numberOfWorkers={3}
    />
  ];

  return (
      <article className="forms-container">
        <article className="forms-content">
          <section className="forms-title">
            <label className="os-txt os-txt-lg os-txt-bold">{title[barStep$]}</label>
            <ProgressBar now={(barStep$ / title.length) * 100}
                         label={`${(barStep$ / title.length) * 100}%`}/>
          </section>

          <section className="w-100">
            {form[barStep$]}
          </section>

          <section className="forms-buttons">
            <button className="btn btn-primary">
              <label className="os-txt">cancelar</label>
            </button>

            <button className="btn btn-primary">
              <label className="os-txt" onClick={() => setBarStep$(barStep$ + 1)}>siguiente</label>
            </button>
          </section>
        </article>
      </article>
  );
}