import "../styles/pages/DesktopFormPage.css"
import DesktopOrderDetailsComp from "../components/DesktopOrderDetailsComp";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import DesktopProdDetailsComp from "../components/DesktopProdDetailsComp";
import OptResultComp from "../../components/OptResultComp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import DesktopStaffInfoComp from "../components/DesktopStaffInfoComp";

export default function DesktopFormPage({handlePrintResultComp}) {
  const navigate = useNavigate();

  const [compToRender$, setCompToRender$] = useState(0);
  const [formStepChange$, setFormStepChange$] = useState(0);

  const [optFormData$, setOptFormData$] = useState({
    optimize: "utility",
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
      Modelo1: {}
    },
  });

  const [orderDetFormData$, setOrderDetFormData$] = useState([
    { modelo: "Modelo1", precio: "", costo: "", cantMin: "", cantMax: "" },
  ]);

  const [staffInfoFormData$, setStaffInfoFormData$] = useState({
    cortado: [],
    aparado: [],
    solado: [],
    terminado: [],
  });
  const [prodDetFormData$, setProdDetFormData$] = useState([]);

  // const title = [
  //   "Detalles de pedido",
  //   "Informacion del personal",
  //   "Detalles de producción",
  //   "Resultados de optimizacion",
  // ];
  const form = [
    <>
      <section className="area-1">
        <DesktopOrderDetailsComp
          optFormData$={optFormData$} setOptFormData$={setOptFormData$}
          orderDetFormData$={orderDetFormData$} setOrderDetFormData$={setOrderDetFormData$}
          formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
          nextCompToRenderFn={nextCompToRender}
        />
      </section>


      <section className="area-2">
        <DesktopStaffInfoComp
          className="area-2"
          optFormData$={optFormData$} setOptFormData$={setOptFormData$}
          formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
          staffInfoFormData$={staffInfoFormData$} setStaffInfoFormData$={setStaffInfoFormData$}
          nextCompToRenderFn={nextCompToRender}
        />
      </section>
      

      <section className="area-3">
        <DesktopProdDetailsComp
          className="area-3"
          optFormData$={optFormData$} setOptFormData$={setOptFormData$}
          formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
          prodDetFormData$={prodDetFormData$} setProdDetFormData$={setProdDetFormData$}
          nextCompToRenderFn={nextCompToRender}
        />
      </section>
    </>,

    <OptResultComp
      optFormData$={optFormData$}
    />
  ];

  function isFinalStep() {
    return compToRender$ + 1 === form.length;
  }

  function nextCompToRender() {
    if (!isFinalStep()) {
      setCompToRender$(compToRender$ + 1);
    }
  }

  function previousCompToRender() {
    if (compToRender$ > 0) {
      setFormStepChange$(formStepChange$ - 1);
      setCompToRender$(compToRender$ - 1);
    }else {
      navigate('/');
    }
  }

  useEffect(() => {
    console.log(optFormData$);
    console.trace()
  }, [optFormData$]);
  //
  // useEffect(() => {
  //   console.log("formStepChange$: ", formStepChange$)
  // }, [formStepChange$])

  return (
    <article className="forms-container">
      <article className="dk-forms-content os-clr-margin-on-print">
        {/* <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[compToRender$]}
          </label>
        </section> */}

        <section className="w-100 grid-container">{form[compToRender$]}</section>

        <section className="dk-forms-buttons os-hide-on-print">
          <button
            className="btn btn-primary"
            onClick={previousCompToRender}
          >
            <label className="os-txt dk-forms-buttons-back">
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
              <label className="os-txt dk-forms-buttons-nxt">Siguiente</label>
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