/* global solver */

import {
  changeMinConstraints,
  changeMaxConstraints,
  getTotalProfit,
  HEADER_FEEDBACK_VALUES,
  PERCENTAGE_CRITERIA,
  MAX_VALUE_PRODUCTION,
  cloneDeep,
} from "../helpers/OptResultHelper";

var _feedbackValues = HEADER_FEEDBACK_VALUES;
var _modelData = {};
var _optResult = {};

// Getters & Setters
export const setGlobalOptResult = (optResult) => {
  _optResult = optResult;
};

export const getGlobalOptResult = (optResult) => {
  return _optResult;
};

export const setGlobalModelData = (modelData) => {
  _modelData = modelData;
};

export const getGlobalModelData = (modelData) => {
  return _modelData;
};

// Public Mehtods
export const getOptResult = (model) => {
  let solution = solver.Solve(model);
  setGlobalOptResult(cloneDeep(solution));
  setGlobalModelData(cloneDeep(model));

  const resultType = evaluateOptResult();

  if (resultType === "error") {
    solution = solver.Solve(changeMinConstraints({ ...model }, 0));
    setGlobalOptResult(solution);
  }

  const totalProfit = getTotalProfit(model, solution);
  const feedback = getFeedback(resultType);

  return { ...solution, totalProfit, feedback };
};

export const getFeedback = (optimizationResult) => {
  const advice = generateAdviceByResult(optimizationResult);
  return { ..._feedbackValues[optimizationResult], advice };
};

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
