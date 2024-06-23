export class BarChartOptionsBuilder {
  static build(config = {step: 1, yMax: 10, xTitle: '', yTitle: '', titles: [], colors: []}) {
    if (config.titles.length !== config.colors.length) {
      throw new Error('Titles and colors arrays must be of the same length');
    }

    const customLegends = config.titles?.map((title, index) => ({
      text: title,
      fillStyle: config.colors[index]
    }));

    return {
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "rgb(255, 99, 132)",
            font: {
              size: 12,
            },
            generateLabels: (chart) => {
              return customLegends;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: config.xTitle,
          },
        },
        y: {
          beginAtZero: true,
          max: config.yMax,
          ticks: {
            stepSize: config.step,
          },
          title: {
            display: true,
            text: config.yTitle,
          },
        },
      },
    }
  }
}