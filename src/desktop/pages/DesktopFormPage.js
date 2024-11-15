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
  PROCESES_DATA,
  ORDER_DATA,
  PRODUCTION_DATA,
  CHART_TITLES,
} from "../../helpers/FormPageHelper";
import {FormStep, FormView} from "../helper/DesktopFormPageHelper";
import * as optResultService from "../../services/OptResultService";
import {OptResultRequestBuilder} from "../../builders/OptResultRequestBuilder";

export default function DesktopFormPage({ handlePrintResultComp }) {
  const [optResult$, setOptResult$] = useState({
    result: 0,
    customResult: 0,
    feedback: {},
    processConfig: undefined,
    weeksConfig: undefined,
  });

  const navigate = useNavigate();
  const title = TITLE_STEPS;
  const chartTitles = CHART_TITLES;

  // Step handlers
  const [formView$, setFormView$] = useState(FormView.CONFIG);
  const [formStep$, setFormStep$] = useState(FormStep.INIT);

  // Global object to send the request
  const [optFormData$, setOptFormData$] = useState(DEFAULT_OPT_FORM_DATA);

  // Steps data manager
  const [orderDetFormData$, setOrderDetFormData$] = useState([ORDER_DATA]);
  const [staffInfoFormData$, setStaffInfoFormData$] = useState(PROCESES_DATA);
  const [prodDetFormData$, setProdDetFormData$] = useState([PRODUCTION_DATA]);

  useEffect(() => {
    if(formView$ === FormView.RESULT){
      const optResultRquest = OptResultRequestBuilder.build({
        model: optFormData$,
        order: orderDetFormData$,
        production: prodDetFormData$,
        staff: staffInfoFormData$
      })
      const optimizationResult = optResultService.getOptResult(optResultRquest);
      console.log(optimizationResult);
      setOptResult$(optimizationResult);
    }
    // eslint-disable-next-line
  }, [formView$]);

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
            <DesktopOptResultComp optFormData$={optFormData$} optResult$={optResult$} />
          </section>
        </section>

        { optResult$.processConfig && optResult$.weeksConfig ?
          <section className="w-50 dk-opt-result-charts">
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
    ),
  };

  function isFinalStep() {
    return formView$ === FormView.RESULT;
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
