import "../styles/pages/HomePage.css"
import "../styles/pages/FormPage.css"
import OrderDetailsComp from "../components/OrderDetailsComp";
import {useEffect, useState} from "react";
import {ProgressBar} from "react-bootstrap";
import ProdDetailsComp from "../components/ProdDetailsComp";
import OptResultComp from "../components/OptResultComp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import StaffInfoComp from "../components/StaffInfoComp";

export default function FormPage({handlePrintResultComp}) {
  const [compToRender$, setCompToRender$] = useState(0);
  const [formStepChange$, setFormStepChange$] = useState(0);

  const [optFormData$, setOptFormData$] = useState({
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

    variables: {},
  });

  const [orderDetFormData$, setOrderDetFormData$] = useState([
    { modelo: "", precio: "", costo: "", cantMin: "", cantMax: "" },
  ]);
  const [staffInfoFormData$, setStaffInfoFormData$] = useState({
    cortado: [],
    aparado: [],
    solado: [],
    terminado: [],
  });
  const [prodDetFormData$, setProdDetFormData$] = useState([]);

  const title = [
    "Detalles de pedido",
    "Informacion del personal",
    "Detalles de producción",
    "Resultados de optimizacion",
  ];
  const form = [
    <OrderDetailsComp
      optFormData$={optFormData$} setOptFormData$={setOptFormData$}
      orderDetFormData$={orderDetFormData$} setOrderDetFormData$={setOrderDetFormData$}
      formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
      nextCompToRenderFn={nextCompToRender}
    />,
    <StaffInfoComp
      optFormData$={optFormData$} setOptFormData$={setOptFormData$}
      formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
      staffInfoFormData$={staffInfoFormData$} setStaffInfoFormData$={setStaffInfoFormData$}
      nextCompToRenderFn={nextCompToRender}
    />,
    <ProdDetailsComp
      optFormData$={optFormData$} setOptFormData$={setOptFormData$}
      formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
      prodDetFormData$={prodDetFormData$} setProdDetFormData$={setProdDetFormData$}
      nextCompToRenderFn={nextCompToRender}
    />,
    <OptResultComp
      optFormData$={optFormData$}
    />
  ];

  function isFinalStep() {
    return compToRender$ + 1 === title.length;
  }

  function nextCompToRender() {
    if (!isFinalStep()) {
      setCompToRender$(compToRender$ + 1);
    }
  }

  function previousCompToRender() {
    if (compToRender$) {
      setFormStepChange$(formStepChange$ - 1);
      setCompToRender$(compToRender$ - 1);
    }
  }

  useEffect(() => {
    console.log(optFormData$);
  }, [optFormData$]);
  //
  // useEffect(() => {
  //   console.log("formStepChange$: ", formStepChange$)
  // }, [formStepChange$])

  return (
    <article className="forms-container">
      <article className="forms-content os-clr-margin-on-print">
        <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[compToRender$]}
          </label>

          <ProgressBar
            className="os-hide-on-print"
            now={((compToRender$ + 1) / title.length) * 100}
            label={`Paso: ${compToRender$ + 1}`}
          />
        </section>

        <section className="w-100">{form[compToRender$]}</section>

        <section className="forms-buttons mb-3 os-hide-on-print">
          <button
            className="btn btn-primary"
            disabled={!compToRender$}
            onClick={previousCompToRender}
          >
            <label className="os-txt forms-buttons-back">
              &nbsp;Anterior&nbsp;
            </label>
          </button>

          {!isFinalStep() ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setFormStepChange$(formStepChange$ + 1);
              }}
            >
              <label className="os-txt forms-buttons-nxt">Siguiente</label>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handlePrintResultComp}>
              <label className="os-txt">
                Guardar <FontAwesomeIcon className="fs-5" icon={faFloppyDisk} />
              </label>
            </button>
          )}
        </section>
      </article>
    </article>
  );
}