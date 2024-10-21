import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const bar = ({data, options, title}) => {
  
    return (
      <>
        <section className="forms-title">
          <label className="os-txt os-txt-lg os-txt-bold">{title}</label>
        </section>

        <div style={{width: '100%', height: 'auto', margin:'auto', maxWidth:'460px'}}>
          <Bar data={data} options={options}/>
        </div>
      </>

    )
  }

  export default bar
