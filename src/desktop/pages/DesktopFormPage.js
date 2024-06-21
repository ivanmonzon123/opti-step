import "../styles/pages/DesktopFormPage.css"
import DesktopOrderDetailsComp from "../components/DesktopOrderDetailsComp";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import DesktopProdDetailsComp from "../components/DesktopProdDetailsComp";
import DesktopOptResultComp from "../components/DesktopOptResultComp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import DesktopStaffInfoComp from "../components/DesktopStaffInfoComp";
import Bar from "../../charts/Bar";
import Cake from "../../charts/Cake";

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

  const title = [
    "Detalles de pedido",
    "Informacion del personal",
    "Detalles de producción",
    "Resultados de optimizacion",
  ];

  const data = {
    labels: ['one', 'two'],
    datasets: [
      {
        label: "weeks",
        data: [1.8, 2],
        backgroundColor: ['red', 'green'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true, // Display the legend
        position: 'top', // Position of the legend (top, bottom, left, right)
        labels: {
          color: 'rgb(255, 99, 132)', // Color of the legend labels
          font: {
            size: 18, // Font size of the legend labels
          },
          generateLabels: (chart) => {
            // Custom labels for the legend
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              hidden: !chart.isDatasetVisible(i),
              lineCap: dataset.borderCapStyle,
              lineDash: dataset.borderDash,
              lineDashOffset: dataset.borderDashOffset,
              lineJoin: dataset.borderJoinStyle,
              lineWidth: dataset.borderWidth,
              strokeStyle: dataset.borderColor,
              pointStyle: dataset.pointStyle,
              rotation: dataset.rotation,
              datasetIndex: i,
            })).concat([{
              text: 'Custom', // Additional custom legend item
              fillStyle: 'rgba(0, 0, 0, 0.1)',
              hidden: false,
              lineCap: 'butt',
              lineDash: [],
              lineDashOffset: 0,
              lineJoin: 'miter',
              lineWidth: 1,
              strokeStyle: 'rgba(0, 0, 0, 0.1)',
              pointStyle: 'circle',
              rotation: 0,
              datasetIndex: datasets.length,
            }]);
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Process',
        },
      },
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Weeks',
        },
      },
    },
  };

  const form = [
    <section className="w-100 grid-container">
      <section className="area-1">
      <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[0]}
          </label>
      </section>

        <DesktopOrderDetailsComp
          optFormData$={optFormData$} setOptFormData$={setOptFormData$}
          orderDetFormData$={orderDetFormData$} setOrderDetFormData$={setOrderDetFormData$}
          formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
          nextCompToRenderFn={nextCompToRender}
        />
      </section>


      <section className="area-2">
      <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[1]}
          </label>
      </section>

        <DesktopStaffInfoComp
          className="area-2"
          optFormData$={optFormData$} setOptFormData$={setOptFormData$}
          formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
          staffInfoFormData$={staffInfoFormData$} setStaffInfoFormData$={setStaffInfoFormData$}
          nextCompToRenderFn={nextCompToRender}
        />
      </section>
      

      <section className="area-3">
      <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[2]}
          </label>
      </section>

        <DesktopProdDetailsComp
          className="area-3"
          optFormData$={optFormData$} setOptFormData$={setOptFormData$}
          formStepChange$={formStepChange$} setFormStepChange$={setFormStepChange$}
          prodDetFormData$={prodDetFormData$} setProdDetFormData$={setProdDetFormData$}
          nextCompToRenderFn={nextCompToRender}
        />
      </section>
    </section>,

    <section className="w-100 dk-opt-result-container">
      <section className="w-50 dk-opt-result-card-container">
        <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">
            {title[3]}
          </label>
        </section>

        <section className="dk-opt-result-content">
          <DesktopOptResultComp
            optFormData$={optFormData$}
          />
        </section>
      </section>

      <section className="w-50 dk-opt-result-charts">
        {/*<Cake datos={data}/>*/}
        <Bar datos={data} options={options}/>
        <Bar datos={data} options={options}/>
      </section>
    </section>
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

        <section>{form[compToRender$]}</section>

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