import {
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export const PERCENTAGE_CRITERIA = 70;
export const MAX_VALUE_PRODUCTION = 10000;

export const HEADER_FEEDBACK_VALUES = Object.freeze({
  success: {
    icon: faCircleCheck,
    type: "success",
    title: "Felicitaciones!",
    description: `
      El resultado ha sido exitoso, con la cantidad de personal que cuenta usted 
      podra cumplir con la produccion de la demanda acual en mas de un ${PERCENTAGE_CRITERIA}% 
      en relacion al maximo nivel de demanda.
    `,
  },
  warning: {
    icon: faTriangleExclamation,
    type: "warning",
    title: "Atencion!",
    description: `
      El resultado se ve bien, con la cantidad de personal que cuenta usted podra cumplir con la demanda
      por debajo del ${PERCENTAGE_CRITERIA}% en relacion al maximo nivel de demanda.
    `,
  },
  error: {
    icon: faCircleExclamation,
    type: "error",
    title: "Error!",
    description: `
      Se reajusto la demanda minima de cada modelo de calzado para poder obetener la mayor ganacia
      segun la cantidad de personal con la que cuenta. 
    `,
  },
});

export const PROCESS_CHART_COLOR = Object.freeze({
  process: ['#1B3A4B', '#1B3A4B', '#D3D3D3', '#FF6F61'],
  weeks: ['#1B3A4B', '#1B3A4B', '#D3D3D3', '#FF6F61']
})

export const PROCESS_CHART_TITLES = Object.freeze({
  process: ['Cortado', 'Aparado', 'Solado', 'Terminado'],
  weeks: ['Cortado', 'Aparado', 'Solado', 'Terminado']
})

export const changeMinConstraints = (modelData, value) => {
  const newMinModel = cloneDeep(modelData);
  for (const item in newMinModel.constraints) {
    if (item.includes("Min")) {
      newMinModel.constraints[item] = { min: value };
    }
  }
  return newMinModel;
};

export const changeMaxConstraints = (modelData, value) => {
  const newMaxModel = cloneDeep(modelData);

  for (const item in newMaxModel.constraints) {
    if (item.includes("Max")) {
      newMaxModel.constraints[item] = { max: value };
    }
  }
  return newMaxModel;
};

export const getLiquitProfit = (model, solution) => {
  let liquitProfit = solution.result;
  for (let key in model.variables) {
    if (solution[key]) {
      liquitProfit = liquitProfit - solution[key] * model.variables[key].costo;
    }
  }
  return liquitProfit;
};

export const getTotalProfit = (model, solution) => {
  let totalProfit = 0;
  for (let key in model.variables) {
    if (solution[key]) {
      totalProfit = totalProfit + (solution[key] * model.variables[key].precio);
    }
  }
  return totalProfit;
};

export const cloneDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getBarCharTitles = (key) => {
  return PROCESS_CHART_TITLES[key]
}

export const getColors = (key) => {
  return PROCESS_CHART_COLOR[key]
}

export const getOccupancyPercentageByProcess = () => {
  return [30, 20, 30, 80]
}

