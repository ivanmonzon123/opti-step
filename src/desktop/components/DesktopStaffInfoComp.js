import "../styles/components/DesktopStaffInfoComp.css"
import ProcessInfoComp from "./DesktopProcessInfoComp";
import {useEffect, useState} from "react";

export default function DesktopStaffInfoComp(
  {
    formStepChange$, setFormStepChange$,
    optFormData$, setOptFormData$,
    staffInfoFormData$, setStaffInfoFormData$,
  }
) {

  const [processToCheck$, setProcessToCheck$] = useState({
    formStep: -1,
    process: ["cortado", "aparado", "solado", "terminado"]
  });

  const [isValid$, setIsValid$] = useState({
    cortado: false,
    aparado: false,
    solado: false,
    terminado: false
  })

  const [cortadoProcessFormData, setCortadoProcessFormData] = useState(staffInfoFormData$.cortado);
  const [aparadoProcessFormData, setAparadoProcessFormData] = useState(staffInfoFormData$.aparado);
  const [soladoProcessFormData, setSoladoProcessFormData] = useState(staffInfoFormData$.solado);
  const [terminadoProcessFormData, setTerminadoProcessFormData] = useState(staffInfoFormData$.terminado);


  useEffect(() => {
    if (formStepChange$ === 2) {
      setProcessToCheck$({...processToCheck$, formStep: 0});
    }
    // eslint-disable-next-line
  }, [formStepChange$])


  function allFormsAreValid(value) {
    return value.cortado && value.aparado && value.solado && value.terminado
  }

  function saveFormsData() {
    setStaffInfoFormData$({
      cortado: [...cortadoProcessFormData],
      aparado: [...aparadoProcessFormData],
      solado: [...soladoProcessFormData],
      terminado: [...terminadoProcessFormData]
    });
  }

  useEffect(() => {
    if(formStepChange$ === 2) {
      if (allFormsAreValid(isValid$)) {
        saveFormsData();
        showErrorsAndNavigateTo(3);
      } else {
        showErrorsAndNavigateTo(1);
      }
    }
    // eslint-disable-next-line
  }, [isValid$])

  const showErrorsAndNavigateTo = (step) => {
    setFormStepChange$(step);
  };

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
        isValid$={isValid$} setIsValid$={setIsValid$}
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
        isValid$={isValid$} setIsValid$={setIsValid$}
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
        isValid$={isValid$} setIsValid$={setIsValid$}
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
        isValid$={isValid$} setIsValid$={setIsValid$}
      />
    </article>
  );
}