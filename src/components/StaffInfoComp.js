import "../styles/components/StaffInfoComp.css"
import ProcessInfoComp from "./ProcessInfoComp";
import {useEffect} from "react";

export default function StaffInfoComp(
    {
        formStepChange$, setFormStepChange$,
        optFormData$, setOptFormData$,
        staffInfoFormData$, setStaffInfoFormData$,
        nextCompToRenderFn
    }
) {

    useEffect(() => {
        if (formStepChange$ === 2) {
            console.log("Si se ejecuto papu")
            nextCompToRenderFn()
        }
        // eslint-disable-next-line
    }, [formStepChange$])

    return (
        <article>
            <ProcessInfoComp
                params={{
                    processTitle: "cortado",
                    setterParamsQuestion: "¿Con cuantos cortadores dispone?",
                    workingPeriodQuestion: `¿Cuántas horas por dia y cuantas de las ${optFormData$.productionPeriod} semanas trabajara?`
                }}
                optFormData$={optFormData$} setOptFormData$={setOptFormData$}
                formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
                processInfoFormData$={staffInfoFormData$} setProcessInfoFormData$={setStaffInfoFormData$}
                nextCompToRenderFn={nextCompToRenderFn}
            />
        </article>
    );
}