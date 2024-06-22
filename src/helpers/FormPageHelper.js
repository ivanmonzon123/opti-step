export const DEFAULT_OPT_FORM_DATA = {
  optimize: "utility",
  opType: "max",
  productionPeriod: 0,
  numberOfModels: 0,

  constraints: {
    cortado: { max: 0 },
    aparado: { max: 0 },
    solado: { max: 0 },
    terminado: { max: 0 },
  },

  variables: {
    Modelo1: {},
  },
};

export const TITLE_STEPS = [
  "Detalles de pedido",
  "Informacion del personal",
  "Detalles de producción",
  "Resultados de optimizacion",
];

export const PROCCESES_DATA = {
  cortado: [],
  aparado: [],
  solado: [],
  terminado: [],
};

export const ORDER_DATA = {
  modelo: "Modelo1",
  precio: "",
  costo: "",
  cantMin: "",
  cantMax: "",
};

export const PRODUCTION_DATA = {};
