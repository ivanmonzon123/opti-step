import "../styles/components/DesktopStaffInfoComp.css"
import ProcessInfoComp from "./DesktopProcessInfoComp";
import {useEffect, useState} from "react";
import {StaffSubFormStep} from "../helper/DesktopFormPageHelper"

export default function DesktopStaffInfoComp(
  {
    formStepChange$,
    setFormStepChange$,

    optFormData$,
    setOptFormData$,

    staffInfoFormData$,
    setStaffInfoFormData$,

    setFormView$,
  }
) {

  const [processToCheck$, setProcessToCheck$] = useState(StaffSubFormStep.INIT);

  const [cortadoProcessFormData, setCortadoProcessFormData] = useState(staffInfoFormData$.cortado);
  const [aparadoProcessFormData, setAparadoProcessFormData] = useState(staffInfoFormData$.aparado);
  const [soladoProcessFormData, setSoladoProcessFormData] = useState(staffInfoFormData$.solado);
  const [terminadoProcessFormData, setTerminadoProcessFormData] = useState(staffInfoFormData$.terminado);


  useEffect(() => {
    if (formStepChange$ === 'staff') {
      // If the form step is staff we are going to start validating for Cut process.
      setProcessToCheck$(StaffSubFormStep.CORTADO);
    }
    // eslint-disable-next-line
  }, [formStepChange$])

  function saveFormsData() {
    setStaffInfoFormData$({
      cortado: [...cortadoProcessFormData],
      aparado: [...aparadoProcessFormData],
      solado: [...soladoProcessFormData],
      terminado: [...terminadoProcessFormData]
    });
  }

  useEffect(() => {
    if(formStepChange$ === 'staff') {
      if (processToCheck$ === StaffSubFormStep.FINAL) {
        saveFormsData();
        setFormStepChange$('init')
        setFormView$('end');
      }
    }
    // eslint-disable-next-line
  }, [processToCheck$])

  return (
    <article className="staff-info-container">
      <ProcessInfoComp
        params={{
          processTitle: "cortado",
          setterParamsQuestion: "¿Con cuantos cortadores dispone?",
          workingPeriodQuestion: `¿Cuántas horas por dia y cuantas de las ${optFormData$.productionPeriod} semanas trabajara?`
        }}
        optFormData$={optFormData$} setOptFormData$={setOptFormData$}
        processInfoFormData$={cortadoProcessFormData} setProcessInfoFormData$={setCortadoProcessFormData}
        processToCheck$={processToCheck$} setProcessToCheck$={setProcessToCheck$}
        setFormStep$={setFormStepChange$}
      />

      <ProcessInfoComp
        params={{
          processTitle: "aparado",
          setterParamsQuestion: "¿Con cuantos aparadores dispone?",
          workingPeriodQuestion: `¿Cuántas horas por dia y cuantas de las ${optFormData$.productionPeriod} semanas trabajara?`
        }}
        optFormData$={optFormData$} setOptFormData$={setOptFormData$}
        processInfoFormData$={aparadoProcessFormData} setProcessInfoFormData$={setAparadoProcessFormData}
        processToCheck$={processToCheck$} setProcessToCheck$={setProcessToCheck$}
        setFormStep$={setFormStepChange$}
      />

      <ProcessInfoComp
        params={{
          processTitle: "solado",
          setterParamsQuestion: "¿Con cuantos soladores dispone?",
          workingPeriodQuestion: `¿Cuántas horas por dia y cuantas de las ${optFormData$.productionPeriod} semanas trabajara?`
        }}
        optFormData$={optFormData$} setOptFormData$={setOptFormData$}
        processInfoFormData$={soladoProcessFormData} setProcessInfoFormData$={setSoladoProcessFormData}
        processToCheck$={processToCheck$} setProcessToCheck$={setProcessToCheck$}
        setFormStep$={setFormStepChange$}
      />

      <ProcessInfoComp
        params={{
          processTitle: "terminado",
          setterParamsQuestion: "¿Con cuantos terminadores dispone?",
          workingPeriodQuestion: `¿Cuántas horas por dia y cuantas de las ${optFormData$.productionPeriod} semanas trabajara?`
        }}
        optFormData$={optFormData$} setOptFormData$={setOptFormData$}
        processInfoFormData$={terminadoProcessFormData} setProcessInfoFormData$={setTerminadoProcessFormData}
        processToCheck$={processToCheck$} setProcessToCheck$={setProcessToCheck$}
        setFormStep$={setFormStepChange$}
      />
    </article>
  );
}