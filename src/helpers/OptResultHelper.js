import {
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";

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
  process: ['#B556FF', '#56B7FF', '#78FFA9', '#FF6F61'],
  weeks: ['#B556FF', '#56B7FF', '#78FFA9', '#FF6F61']
})

export const PROCESS_CHART_TITLES = Object.freeze({
  process: ['Cortado', 'Aparado', 'Solado', 'Terminado'],
  weeks: ['Cortado', 'Aparado', 'Solado', 'Terminado']
})

export const PROCESSES = ['cortado', 'aparado', 'solado', 'terminado']

export const changeMinConstraints = (modelData, value) => {
  const newMinModel = cloneDeep(modelData);
  for (const item in newMinModel.constraints) {
    if (item.includes("Min")) {
      newMinModel.constraints[item] = {min: value};
    }
  }
  return newMinModel;
};

export const changeMaxConstraints = (modelData, value) => {
  const newMaxModel = cloneDeep(modelData);

  for (const item in newMaxModel.constraints) {
    if (item.includes("Max")) {
      newMaxModel.constraints[item] = {max: value};
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

export const getAvailableHours = (staffData) => {
  let availableHours = {};
  PROCESSES.forEach(process => {
    availableHours[process] = staffData[process].reduce((acc, current) => {
      acc = acc + ((current.semanas * 5.5) * current.horasDia)
      return acc;
    }, 0)
  })

  return availableHours;
}

export const getProductionTime = (prodData, optResult) => {
  const {bounded, feasible, result, ...models} = optResult;
  const prodDataObj = prodData?.reduce((acc, item) => {
    const {modelo, ...processes} = item;
    acc[item.modelo] = processes;
    return acc;
  }, {});

  return Object.entries(models).reduce((acc, [key, value]) => {
    const dozens = value / 12;
    const times = prodDataObj[key];

    return {
      cortado: acc.cortado + (dozens * times['cortado']),
      aparado: acc.aparado + (dozens * times['aparado']),
      solado: acc.solado + (dozens * times['solado']),
      terminado: acc.terminado + (dozens * times['terminado'])
    }
  }, {cortado: 0, aparado: 0, solado: 0, terminado: 0})
}

export const getOccupancyPercentageByProcess = ({order, production, staff, optResult}) => {
  const availableHours = getAvailableHours(staff);
  const prodTime = getProductionTime(production, optResult);
  console.log(availableHours, prodTime)

  return PROCESSES.map(process =>
    (prodTime[process] * 100) / availableHours[process]
  )
}

export const getWeeksToCompleteOrder = ({order, production, staff, optResult, prodPeriod}) => {
  const availableHours = getHoursArrayPeerWeek(staff, prodPeriod);
  const prodTime = getProductionTime(production, optResult);

  console.log(availableHours, prodTime);

  return PROCESSES.map((processKey) => getWeeksPercentage({
    requiredProdTime: prodTime[processKey],
    avHoursPeerWeeks: availableHours[processKey],
    index: 0
  }))
}

const getHoursArrayPeerWeek = (staff, prodPeriod) => {
  let availableHours = {
    cortado: [],
    aparado: [],
    solado: [],
    terminado: []
  }
  for (const process in staff) {
    for (let index = 1; index <= prodPeriod; index++) {
      const newWeekCalc = staff[process].reduce((acc, item) => {
        const weeks = parseInt(item.semanas);
        if (index <= weeks) {
          const totalHours = 5.5 * item.horasDia;
          return acc = [acc[0] + totalHours];
        }

        return acc;
      }, [0])

      availableHours[process].push(newWeekCalc);
    }
  }

  return availableHours;
}

const getWeeksPercentage = (data = {requiredProdTime: 0, avHoursPeerWeeks: [], index: 0}) => {
  const prodTime = data.requiredProdTime
  const avDayHours = data.avHoursPeerWeeks[data.index][0];
  const diff = prodTime - avDayHours;
  const nextIndex = data.index + 1;
  if(diff <= 0){
    return prodTime / avDayHours;
  }else {
    return 1 + getWeeksPercentage({...data, requiredProdTime: diff, index: nextIndex})
  }
}



