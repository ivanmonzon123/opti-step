import {Card, Form, Table} from "react-bootstrap";
import "../styles/components/ProductionDetailsComp.css"
import {useEffect, useRef} from "react";

export default function ProdDetailsComp(
  {
    optFormData$, setOptFormData$,
    prodDetFormData$, setProdDetFormData$,
    formStepChange$, setFormStepChange$,
    nextCompToRenderFn
  }
) {
  useEffect(() => {
    const result = [];
    for (const modelo in optFormData$.variables) {
      result.push({modelo: modelo, cortado: "", solado: "", aparado: "", terminado: ""});
    }

    setProdDetFormData$([...result])
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (index, field, value) => {
    const newInputRows = [...prodDetFormData$];
    newInputRows[index][field] = value;
    setProdDetFormData$(newInputRows);
  };

  const prodDetailsFormIsValid = () => {
    let isValid = true;
    prodDetFormData$.forEach((row, index) => {
      if (!row.modelo || !row.cortado || !row.aparado || !row.solado || !row.terminado) {
        isValid = false;
      }
    });
    return isValid;
  };

  const formRef = useRef(null);
  useEffect(() => {
    if (formStepChange$ === 3) {
      if (!prodDetailsFormIsValid()) {
        formRef.current.click();
        setFormStepChange$(2);
      } else {
        formRef.current.click();
        nextCompToRenderFn();
      }
    }
    // eslint-disable-next-line
  }, [formStepChange$]);

  const updateFormData = () => {
    let newOptFormData = {...optFormData$}
    prodDetFormData$.forEach((item) => {
      const {modelo, ...prodDetails} = item
      newOptFormData.variables[modelo] = {
        ...(newOptFormData.variables[modelo]), ...prodDetails
      }
    })

    setOptFormData$(newOptFormData);
  }

  return (
    <Card className="production-details-card">
      <Card.Body>
        <Card.Text className="text-center os-txt">
          ¿Cuánto tiempo en horas le toma cada proceso de producción por docena?
        </Card.Text>

        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <Table responsive className="production-details-table">
            <thead>
            <tr>
              <th className="w-25">Modelo</th>
              <th>Cortado</th>
              <th>Aparado</th>
              <th>Solado</th>
              <th>Terminado</th>

            </tr>
            </thead>
            <tbody>
            {prodDetFormData$.map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    value={row.modelo}
                    readOnly
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "cortado", e.target.value)}
                    value={row.cortado}
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "aparado", e.target.value)}
                    value={row.aparado}
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "solado", e.target.value)}
                    value={row.solado}
                  />
                </td>

                <td>
                  <Form.Control
                    required
                    type="text"
                    placeholder=""
                    onChange={(e) => handleInputChange(index, "terminado", e.target.value)}
                    value={row.terminado}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
          <input ref={formRef} className="d-none" type="submit" value={"apply"} onClick={updateFormData}/>
        </form>
      </Card.Body>
    </Card>
  );
}