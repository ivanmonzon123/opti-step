/* global solver */

import {
  changeMinConstraints,
  changeMaxConstraints,
  getLiquitProfit,
  HEADER_FEEDBACK_VALUES,
  PERCENTAGE_CRITERIA,
  MAX_VALUE_PRODUCTION,
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
  setGlobalOptResult({ ...solution });
  setGlobalModelData({ ...model });

  const resultType = evaluateOptResult();

  if (resultType === "error") {
    solution = solver.Solve(changeMinConstraints(model, 0));
    setGlobalOptResult(solution);
  }

  const liquitProfit = getLiquitProfit(model, solution);
  const feedback = getFeedback({ ...solution, liquitProfit, resultType });

  return { ...solution, liquitProfit, feedback };
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

  return (
    parseInt(totalModelValues / (modelKeys.length * 100)) >= PERCENTAGE_CRITERIA
  );
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
  const modelKeys = getModelKeysFromData({ _modelData });

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
      const model = changeMaxConstraints(_modelData, MAX_VALUE_PRODUCTION);
      const solution = solver.Solve(model);

      if (solution.result > optResult.result) {
        advice = { empty: true, message: JSON.stringify(solution, null, 2) };
      }
    }
  }

  if (optResult === "warning") {
    const model = changeMinConstraints(_modelData, 0);
    const solution = solver.Solve(model);

    if (solution.result > optResult.result) {
      advice = { empty: true, message: JSON.stringify(solution, null, 2) };
    }
  }

  if (optResult === "error") {
    advice = { empty: true, message: "error" };
  }

  return advice;
};
