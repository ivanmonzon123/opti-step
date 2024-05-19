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
      po debajo del ${PERCENTAGE_CRITERIA}% en relacion al maximo nivel de demanda.
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

export const changeMinConstraints = (modelData, value) => {
  const model = { ...modelData };
  for (const item in model.constraints) {
    if (item.includes("Min")) {
      model.constraints[item] = { min: value };
    }
  }
  return model;
};

export const changeMaxConstraints = (modelData, value) => {
  const model = { ...modelData };

  for (const item in model.constraints) {
    if (item.includes("Max")) {
      model.constraints[item] = { min: value };
    }
  }
  return model;
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
