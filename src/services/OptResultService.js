/* global solver */

import {
  changeMinConstraints,
  changeMaxConstraints,
  getTotalProfit,
  getBarCharTitles,
  getOccupancyPercentageByProcess,
  getWeeksToCompleteOrder,
  getColors,
  HEADER_FEEDBACK_VALUES,
  PERCENTAGE_CRITERIA,
  MAX_VALUE_PRODUCTION,
  cloneDeep,
} from "../helpers/OptResultHelper";
import {BarChartDataBuilder} from "../builders/BarChartDataBuilder";
import {BarChartOptionsBuilder} from "../builders/BarChartOptionsBuilder";

var _feedbackValues = HEADER_FEEDBACK_VALUES;
var _modelData = {};
var _optResult = {};
var _formData = {};

// Getters & Setters
export const setGlobalOptResult = (optResult) => {
  _optResult = cloneDeep(optResult);
};

export const getGlobalOptResult = (optResult) => {
  return _optResult;
};

export const setGlobalModelData = (modelData) => {
  _modelData = cloneDeep(modelData);
};

export const getGlobalModelData = (modelData) => {
  return _modelData;
};

export const setGlobalFormData = (order, production, staff) => {
  _formData = {
    order: cloneDeep(order),
    production: cloneDeep(production),
    staff: cloneDeep(staff),
  }
};

export const getGlobalFormData = () => {
  return _formData;
};

// Public Mehtods
export const getOptResult = ({model, order, production, staff}) => {
  let solution = solver.Solve(model);
  setGlobalOptResult(solution);
  setGlobalModelData(model);
  setGlobalFormData(order, production, staff);

  const resultType = evaluateOptResult();

  if (resultType === "error") {
    solution = solver.Solve(changeMinConstraints({ ...model }, 0));
    setGlobalOptResult(solution);
  }

  const totalProfit = getTotalProfit(model, solution);
  const feedback = getFeedback(resultType);
  const charts = getOptCharts();

  return { ...solution, ...charts, totalProfit, feedback };
};

export const getOptCharts = (prod, staff) => {
  const processBarChartConfig = getProcessBarChartConfig();
  const weeksBarChartConfig = getWeeksChartConfig();
  return { processConfig: processBarChartConfig , weeksConfig: weeksBarChartConfig}
}

export const getFeedback = (optimizationResult) => {
  const advice = generateAdviceByResult(optimizationResult);
  return { ..._feedbackValues[optimizationResult], advice };
};

export const getProcessBarChartConfig = () => {
  const titles = getBarCharTitles('process');
  const processesPercentage = getOccupancyPercentageByProcess({
    ..._formData,
    optResult: _optResult
  });
  const colors = getColors('process');

  const data = BarChartDataBuilder.build({
    placeholder: '%',
    labels: titles,
    data: processesPercentage,
    colors: colors
  });

  const options = BarChartOptionsBuilder.build({
    step: 10,
    yMax: 100,
    xTitle: 'Procesos',
    yTitle: 'Porcentaje',
    colors: colors,
    titles: titles
  });

  return {data, options};
}
export const getWeeksChartConfig = () => {
  const titles = getBarCharTitles('process');
  const prodPeriod = parseInt(_modelData.productionPeriod);
  const processesPercentage = getWeeksToCompleteOrder({
    ..._formData,
    optResult: _optResult,
    prodPeriod
  });
  const colors = getColors('process');

  const data = BarChartDataBuilder.build({
    placeholder: 'Semanas',
    labels: titles,
    data: processesPercentage,
    colors: colors
  });

  const options = BarChartOptionsBuilder.build({
    step: 1,
    yMax: prodPeriod,
    xTitle: 'Procesos',
    yTitle: 'Semanas',
    colors: colors,
    titles: titles
  });

  return {data, options};
}

export const evaluateOptResult = () => {
  if (!_optResult.feasible) {
    return "error";
  }

  if (meetsRequiredPercentage() && meetsMinDemand()) {
    return "success";
  }

  return "warning";
};

export const meetsMinDemand = () => {
  const modelKeys = getModelKeysFromData();

  return modelKeys.every((modelKey) => {
    const resultModelValue = getModelValueFromOptResult(modelKey);
    const modelMinDemand = getModelValueFromConstraints(modelKey, "min");

    return resultModelValue >= modelMinDemand;
  });
};

export const meetsRequiredPercentage = () => {
  const modelKeys = getModelKeysFromData();

  const totalModelValues = modelKeys.reduce((acc, modelKey) => {
    const resultModelValue = getModelValueFromOptResult(modelKey);
    const modelMaxDemand = getModelValueFromConstraints(modelKey, "max");

    return acc + (resultModelValue * 100) / modelMaxDemand;
  }, 0);

  return parseInt(totalModelValues / modelKeys.length) >= PERCENTAGE_CRITERIA;
};

// Private Mehtods
const getModelValueFromConstraints = (
  modelKey = "string",
  type = "string",
  obj = false
) => {
  const aditionalType = type === "min" ? "Min" : "Max";
  const result = _modelData.constraints[modelKey + aditionalType][type];
  return obj ? { [modelKey]: result } : result;
};

const getModelValueFromOptResult = (modelKey = "string", obj = false) => {
  return obj ? { [modelKey]: _optResult[modelKey] } : _optResult[modelKey];
};

const getModelKeysFromData = () => {
  return Object.entries(_modelData.variables).map(([key, value]) => key);
};

// eslint-disable-next-line
const getModelValuesFromConstraints = ({ type }) => {
  const aditionalType = type === "min" ? "Min" : "Max";
  const modelKeys = getModelKeysFromData();

  return modelKeys.map((modelKey) => ({
    [modelKey]: _modelData.constraints[modelKey + aditionalType][type],
  }));
};

// eslint-disable-next-line
const getModelValuesFromOptResult = ({ modelKeys }) => {
  return modelKeys.map((modelKey) => ({ [modelKey]: _optResult[modelKey] }));
};

const generateAdviceByResult = (optResult) => {
  let advice = { empty: true, message: "" };

  if (optResult === "success") {
    if (meetsMinDemand()) {
      const fbModel = changeMaxConstraints(_modelData, MAX_VALUE_PRODUCTION);
      const fbSolution = solver.Solve(fbModel);

      if (showFeedbackResult(fbSolution)) {
        advice = generateOptAdvice(fbModel, fbSolution);
      }
    }
  }

  if (optResult === "warning") {
    const fbModel = changeMinConstraints({ ..._modelData }, 0);
    const fbSolution = solver.Solve(fbModel);

    if (showFeedbackResult(fbSolution)) {
      advice = generateOptAdvice(fbModel, fbSolution);
    }
  }

  if (optResult === "error") {
    advice = { empty: true, message: "error" };
  }

  return advice;
};

const generateOptAdvice = (fbModel, fbSolution) => {
  const fbTotalProfit = getTotalProfit(fbModel, fbSolution);
  const fbModels = getModelKeysFromData().reduce(
    (acc, modelKey) =>
      (acc = { ...acc, [modelKey]: `${fbSolution[modelKey] ?? 0} pares` }),
    {}
  );

  const newOptAdvice = {
    ...fbModels,
    Ingresos: `${fbTotalProfit} bs`,
    Utilidad: `${fbSolution.result} bs`,
  };

  return {
    empty: false,
    message: newOptAdvice,
  };
};

const showFeedbackResult = (fbSolution) => {
  return fbSolution.result >= _optResult.result;
};
