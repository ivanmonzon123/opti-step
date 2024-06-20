import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const cake = ({datos}) => {
  
  return (
    <sectiondiv style={{width: 'auto', height: 'auto', margin:'auto', maxWidth:'350px'}}>
      <label className="text-center os-txt os-txt-lg os-txt-bold" >Gráficas de resultados: </label>
      <Pie data={datos} />
    </sectiondiv>
  )
}

export default cake
