import {cloneDeep} from "../helpers/OptResultHelper";

export class OptResultRequestBuilder {
  static build(request = {model: {}, order: {}, staff: {}, production: {}}) {
    return {
      model: cloneDeep(request.model),
      order: cloneDeep(request.order),
      staff: cloneDeep(request.staff),
      production: cloneDeep(request.production),
    };
  }
}