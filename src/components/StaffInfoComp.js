import "../styles/components/StaffInfoComp.css"
import ProcessInfoComp from "./ProcessInfoComp";
import {useEffect, useState} from "react";

export default function StaffInfoComp(
    {
        formStepChange$, setFormStepChange$,
        optFormData$, setOptFormData$,
        staffInfoFormData$, setStaffInfoFormData$,
        nextCompToRenderFn
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

    const [cortadoProcessFormData, setCortadoProcessFormData] = useState([]);


    useEffect(() => {
        console.log("formStepChange$: ",formStepChange$)
        if (formStepChange$ === 2) {
            setProcessToCheck$({...processToCheck$, formStep: 0});
        }
        // eslint-disable-next-line
    }, [formStepChange$])

    useEffect(() => {
        if(isValid$.cortado){
            console.log("Si es valido papau")
            nextCompToRenderFn();
        }else {
            setFormStepChange$(1);
        }
        // eslint-disable-next-line
    }, [isValid$])

    return (
        <article>
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
        </article>
    );
}