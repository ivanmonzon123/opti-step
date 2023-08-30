import "../styles/pages/HomePage.css"
import "../styles/pages/FormPage.css"
import OrderDetailsComp from "../components/OrderDetailsComp";
import {useEffect, useState} from "react";
import {ProgressBar} from "react-bootstrap";
import StaffInfoComp from "../components/StaffInfoComp";
import ProductionDetailsComp from "../components/ProductionDetailsComp";
import OptimizationResultComp from "../components/OptimizationResultComp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPrint} from "@fortawesome/free-solid-svg-icons"

export default function FormPage() {
  const [barStep$, setBarStep$] = useState(0);
  const [formData$, setFormData$] = useState({
    optimize: "precio",
    opType: "max",
    productionPeriod: 0,
    numberOfModels: 0,

    constraints: {
      cortado: { max: 0 },
      aparado: { max: 0 },
      solado: { max: 0 },
      terminado: { max: 0 },
    },

    variables: {
    }
  });

  const [inputRowsOfOrderDet$, setInputRowsOfOrderDet$] = useState([
    {modelo: "", precio: "", costo: "", cantMin: "", cantMax: "",},
  ]);

  const title = [
    'Detalles del pedido',
    'Informacion personal',
    'Detalles de producción',
    'Resultados de optimizacion'
  ];
  const form = [
    <OrderDetailsComp
        formData$={formData$} setFormData$={setFormData$}
        inputRowsOfOrderDet$={inputRowsOfOrderDet$} setInputRowsOfOrderDet$={setInputRowsOfOrderDet$}
    />,
    <StaffInfoComp
    processTitle="cortado"
    setterParamsQuestion="¿Con cuantos cortadores dispone?"
    workingPeriodQuestion="¿Cuántas horas por dia y cuantas de las 12 semanas trabajara?"
    numberOfWorkers={3}
    />,
    <ProductionDetailsComp/>,
    <OptimizationResultComp/>
  ];

  function isFinalStep(){
    return barStep$ + 1 === title.length;
  }

  function nextFormStep(){
    if(!isFinalStep()) {
      setBarStep$(barStep$ + 1);
    }
  }

  function previousFormStep(){
    if(barStep$) {
      setBarStep$(barStep$ - 1);
    }
  }

  useEffect(() => {
    console.log(formData$)
  }, [formData$])

  return (
      <article className="forms-container">
        <article className="forms-content">
          <section className="forms-title">
            <label className="os-txt os-txt-lg os-txt-bold">{title[barStep$]}</label>
            <ProgressBar now={((barStep$ + 1)/ title.length) * 100}
                         label={`Paso: ${barStep$ + 1}`}/>
          </section>

          <section className="w-100">
            {form[barStep$]}
          </section>

          {
            isFinalStep()
                ?
                <section className="forms-buttons">
                    <button className="btn btn-primary">
                        <label className="os-txt">
                            Imprimir <FontAwesomeIcon icon={faPrint}/>
                        </label>
                    </button>
                </section>
                :
                <section className="forms-buttons">
                  <button className="btn btn-primary" disabled={!barStep$}>
                    <label className="os-txt" onClick={previousFormStep}>&nbsp;Anterior&nbsp;</label>
                  </button>

                  <button className="btn btn-primary">
                      <label className="os-txt" onClick={nextFormStep}>Siguiente</label>
                  </button>
                </section>
          }
        </article>
      </article>
  );
}