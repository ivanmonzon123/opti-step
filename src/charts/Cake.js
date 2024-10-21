import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const cake = ({data, title}) => {

  return (
    <>
      <section className="forms-title">
        <label className="os-txt os-txt-lg os-txt-bold">{title}</label>
      </section>

      <section style={{width: 'auto', height: 'auto', margin: 'auto', maxWidth: '350px'}}>
        <label className="text-center os-txt os-txt-lg os-txt-bold">Gráficas de resultados: </label>
        <Pie data={data}/>
      </section>
    </>
  )
}

export default cake
