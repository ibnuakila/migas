import { chartsConfig } from "@/configs/index.js";

const websiteViewsChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Realisasi",
      data: [50, 40, 100, 120],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["blue"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "TW 1",
        "TW 2",
        "TW 3",
        "TW 4",
      ],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Realisasi",
      data: [350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["red"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "TW 1",
        "TW 2",
        "TW 3",
        "TW 4",
        
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Realisasi",
      data: [ 120, 93, 100, 130],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["green"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "TW 1",
        "TW 2",
        "TW 3",
        "TW 4",
      ],
    },
  },
};
/*const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};*/

export const statisticsChartsData = [
  {
    color: "white",
    title: "Indeks Ketersediaan Migas",
    description: "Chart Indeks Ketersediaan Migas",
    footer: "updated 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Indeks Aksesibilitas",
    description: "Chart Indeks Aksesibilitas",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Indeks Keselamatan",
    description: "Chart Indeks Keselamatan",
    footer: "just updated",
    chart: completedTaskChart,
  },
];

export default statisticsChartsData;
