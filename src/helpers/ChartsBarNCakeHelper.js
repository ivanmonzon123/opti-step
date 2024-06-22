export const DEFAULT_OPTIONS = {
  plugins: {
    legend: {
      display: true, // Display the legend
      position: "top", // Position of the legend (top, bottom, left, right)
      labels: {
        color: "rgb(255, 99, 132)", // Color of the legend labels
        font: {
          size: 18, // Font size of the legend labels
        },
        generateLabels: (chart) => {
          // Custom labels for the legend
          const datasets = chart.data.datasets;
          return datasets
            .map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              hidden: !chart.isDatasetVisible(i),
              lineCap: dataset.borderCapStyle,
              lineDash: dataset.borderDash,
              lineDashOffset: dataset.borderDashOffset,
              lineJoin: dataset.borderJoinStyle,
              lineWidth: dataset.borderWidth,
              strokeStyle: dataset.borderColor,
              pointStyle: dataset.pointStyle,
              rotation: dataset.rotation,
              datasetIndex: i,
            }))
            .concat([
              {
                text: "Custom", // Additional custom legend item
                fillStyle: "rgba(0, 0, 0, 0.1)",
                hidden: false,
                lineCap: "butt",
                lineDash: [],
                lineDashOffset: 0,
                lineJoin: "miter",
                lineWidth: 1,
                strokeStyle: "rgba(0, 0, 0, 0.1)",
                pointStyle: "circle",
                rotation: 0,
                datasetIndex: datasets.length,
              },
            ]);
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Process",
      },
    },
    y: {
      beginAtZero: true,
      max: 4,
      ticks: {
        stepSize: 1,
      },
      title: {
        display: true,
        text: "Weeks",
      },
    },
  },
};

export const DEFAULT_CHARS_DATA = {
  labels: ["one", "two"],
  datasets: [
    {
      label: "weeks",
      data: [1.8, 2],
      backgroundColor: ["red", "green"],
      borderWidth: 1,
    },
  ],
};
