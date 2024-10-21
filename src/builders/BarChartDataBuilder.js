export class BarChartDataBuilder {
  static build(config = {placeholder: '', labels: [], data: [], colors: []}) {
    return {
      labels: config.labels,
      datasets: [
        {
          label: config.placeholder,
          data: config.data,
          backgroundColor: config.colors,
          borderWidth: 1,
        },
      ],
    };
  }
}