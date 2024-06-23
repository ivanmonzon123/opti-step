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


const bar = ({data, options}) => {
  
    return (
      <div style={{width: '100%', height: 'auto', margin:'auto', maxWidth:'550px'}}>
        <Bar data={data} options={options}/>
      </div>
    )
  }

  export default bar
