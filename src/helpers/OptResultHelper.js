import {
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

/* global solver */

export const getOptResult = (optFormData) => {
  const model = { ...optFormData };
  let solution = solver.Solve(model);

  if (!solution.feasible) {
    setMinConstraintsToZero(model);
    solution = solver.Solve(model);
  }

  const customResult = getCustomResult(model, solution);

  return { ...solution, customResult };
};

const setMinConstraintsToZero = (model) => {
  for (const item in model.constraints) {
    if (item.includes("Min")) {
      model.constraints[item] = { min: "0" };
    }
  }
};

const getCustomResult = (model, solution) => {
  let customResult = solution.result;
  for (let key in model.variables) {
    if (solution[key]) {
      customResult = customResult - solution[key] * model.variables[key].costo;
    }
  }
  return customResult;
};

export const getFeedback = () => {
  return header.success;
};

const header = {
  success: {
    icon: faCircleCheck,
    type: "success",
    title: "Felicitaciones!",
    description: `
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
  terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
  labore wes anderson cred nesciunt sapiente ea proident.`,
  },
  warning: { icon: faTriangleExclamation, title: "Atencion!" },
  error: { icon: faCircleExclamation, title: "Error!" },
};
