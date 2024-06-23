import "../styles/pages/DesktopFormPage.css";
import DesktopOrderDetailsComp from "../components/DesktopOrderDetailsComp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopProdDetailsComp from "../components/DesktopProdDetailsComp";
import DesktopOptResultComp from "../components/DesktopOptResultComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import DesktopStaffInfoComp from "../components/DesktopStaffInfoComp";
import Bar from "../../charts/Bar";
import {
  DEFAULT_OPT_FORM_DATA,
  TITLE_STEPS,
  PROCCESES_DATA,
  ORDER_DATA,
  PRODUCTION_DATA,
} from "../../helpers/FormPageHelper";
import {FormStep, FormView} from "../helper/DesktopFormPageHelper";
import * as optResultService from "../../services/OptResultService";

export default function DesktopFormPage({ handlePrintResultComp }) {
  const navigate = useNavigate();
  const { processBarChartConfig } = optResultService.getOptCharts();

  const title = TITLE_STEPS;

  // Step handlers
  const [formView$, setFormView$] = useState(FormView.CONFIG);
  const [formStep$, setFormStep$] = useState(FormStep.INIT);

  // Global object to send the request
  const [optFormData$, setOptFormData$] = useState(DEFAULT_OPT_FORM_DATA);

  // Steps data manager
  const [orderDetFormData$, setOrderDetFormData$] = useState([ORDER_DATA]);
  const [staffInfoFormData$, setStaffInfoFormData$] = useState(PROCCESES_DATA);
  const [prodDetFormData$, setProdDetFormData$] = useState([PRODUCTION_DATA]);

  const form = {
    [FormView.CONFIG]: (
      <section className="w-100 grid-container">
        <section className="area-1">
          <section className="forms-title">
            <label className="os-txt os-txt-lg os-txt-bold">{title[0]}</label>
          </section>

          <DesktopOrderDetailsComp
            optFormData$={optFormData$}
            setOptFormData$={setOptFormData$}
            orderDetFormData$={orderDetFormData$}
            setOrderDetFormData$={setOrderDetFormData$}
            formStep$={formStep$}
            setFormStep$={setFormStep$}
          />
        </section>

        <section className="area-2">
          <section className="forms-title">
            <label className="os-txt os-txt-lg os-txt-bold">{title[1]}</label>
          </section>

          <DesktopStaffInfoComp
            optFormData$={optFormData$}
            setOptFormData$={setOptFormData$}
            formStep$={formStep$}
            setFormStep$={setFormStep$}
            staffInfoFormData$={staffInfoFormData$}
            setStaffInfoFormData$={setStaffInfoFormData$}
            setFormView$={setFormView$}
          />
        </section>

        <section className="area-3">
          <section className="forms-title">
            <label className="os-txt os-txt-lg os-txt-bold">{title[2]}</label>
          </section>

          <DesktopProdDetailsComp
            optFormData$={optFormData$}
            setOptFormData$={setOptFormData$}
            formStep$={formStep$}
            setFormStep$={setFormStep$}
            prodDetFormData$={prodDetFormData$}
            setProdDetFormData$={setProdDetFormData$}
          />
        </section>
      </section>
    ),

  [FormView.RESULT]: (
      <section className="w-100 dk-opt-result-container">
        <section className="w-50 dk-opt-result-card-container">
          <section className="forms-title">
            <label className="os-txt os-txt-lg os-txt-bold">{title[3]}</label>
          </section>

          <section className="dk-opt-result-content">
            <DesktopOptResultComp optFormData$={optFormData$} />
          </section>
        </section>

        <section className="w-50 dk-opt-result-charts">
          {/*<Cake datos={data}/>*/}
          <Bar datos={processBarChartConfig.data} options={processBarChartConfig.options} />
          <Bar datos={processBarChartConfig.data} options={processBarChartConfig.options} />
          {/*<Bar datos={data} options={options} />*/}
        </section>
      </section>
    ),
  };

  function isFinalStep() {
    return formView$ === "end";
  }

  function previousView() {
    if (formView$ === FormView.RESULT) {
      setFormView$(FormView.CONFIG);
    }

    if (formView$ === FormView.CONFIG) {
      navigate("/");
    }
  }

  function nextView() {
    setFormStep$(FormStep.ORDER);
  }

  useEffect(() => {
    console.log(optFormData$);
  }, [optFormData$]);

  // useEffect(() => {
  //   console.log("formStepChange$: ", formStep$)
  // }, [formStep$])

  return (
    <article className="forms-container">
      <article className="dk-forms-content os-clr-margin-on-print">
        {/* <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[formView$]}
          </label>
        </section> */}

        <section>{form[formView$]}</section>

        <section className="dk-forms-buttons os-hide-on-print">
          <button className="btn btn-primary" onClick={previousView}>
            <label className="os-txt dk-forms-buttons-back">
              &nbsp;Anterior&nbsp;
            </label>
          </button>

          {!isFinalStep() ? (
            <button
              className="btn btn-primary" onClick={nextView}>
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
