import { j as jsxs, a as jsx, F as Fragment } from "../app.mjs";
import React from "react";
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import { UsersIcon, UserPlusIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import "react/jsx-runtime";
import Chart from "react-apexcharts";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import { usePage, Head } from "@inertiajs/react";
import "lodash";
import "axios";
import "react-dom/client";
import "./ApplicationLogo-2943efd8.mjs";
function StatisticsCard({ color, icon, title, value, footer }) {
  return /* @__PURE__ */ jsxs(Card, { className: "border border-blue-gray-100 bg-lime-50 shadow-md", children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        variant: "gradient",
        color,
        floated: false,
        shadow: false,
        className: "absolute grid h-12 w-12 place-items-center",
        children: icon
      }
    ),
    /* @__PURE__ */ jsxs(CardBody, { className: "p-4 text-right", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "small", className: "font-normal text-blue-gray-600", children: title }),
      /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "blue-gray", children: value })
    ] }),
    footer && /* @__PURE__ */ jsx(CardFooter, { className: "border-t border-blue-gray-50 p-4", children: footer })
  ] });
}
StatisticsCard.defaultProps = {
  color: "blue",
  footer: null
};
StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red"
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node
};
StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";
({
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object
});
({
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  action: PropTypes.node
});
function StatisticsChart({ color, chart, title, description, footer }) {
  return /* @__PURE__ */ jsxs(Card, { className: "border border-blue-gray-100 bg-amber-50 shadow-sm", children: [
    /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color, floated: false, shadow: false, children: /* @__PURE__ */ jsx(Chart, { ...chart }) }),
    /* @__PURE__ */ jsxs(CardBody, { className: "px-6 pt-0", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h6", color: "blue-gray", children: title }),
      /* @__PURE__ */ jsx(Typography, { variant: "small", className: "font-normal text-blue-gray-600", children: description })
    ] }),
    footer && /* @__PURE__ */ jsx(CardFooter, { className: "border-t border-blue-gray-50 px-6 py-5", children: footer })
  ] });
}
StatisticsChart.defaultProps = {
  color: "blue",
  footer: null
};
StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red"
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node
};
StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";
const chartsConfig = {
  chart: {
    toolbar: {
      show: false
    }
  },
  title: {
    show: ""
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300
      }
    }
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true
      }
    },
    padding: {
      top: 5,
      right: 20
    }
  },
  fill: {
    opacity: 0.8
  },
  tooltip: {
    theme: "dark"
  }
};
({
  type: "line",
  height: 220,
  series: [
    {
      name: "Realisasi",
      data: [50, 40, 100, 120]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ["blue"],
    stroke: {
      lineCap: "round"
    },
    markers: {
      size: 5
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "TW 1",
        "TW 2",
        "TW 3",
        "TW 4"
      ]
    }
  }
});
({
  type: "line",
  height: 220,
  series: [
    {
      name: "Realisasi",
      data: [350, 200, 230, 500]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ["red"],
    stroke: {
      lineCap: "round"
    },
    markers: {
      size: 5
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "TW 1",
        "TW 2",
        "TW 3",
        "TW 4"
      ]
    }
  }
});
({
  type: "line",
  height: 220,
  series: [
    {
      name: "Realisasi",
      data: [120, 93, 100, 130]
    }
  ],
  options: {
    ...chartsConfig,
    colors: ["green"],
    stroke: {
      lineCap: "round"
    },
    markers: {
      size: 5
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "TW 1",
        "TW 2",
        "TW 3",
        "TW 4"
      ]
    }
  }
});
function Beranda({ props }) {
  console.log(usePage().props);
  const {
    periode,
    indikator_count,
    user_count,
    pic_count,
    indeks_migas,
    indeks_aksesibilitas,
    indeks_keselamatan
  } = usePage().props;
  const last_periode = periode.periode - 1;
  const statisticsCardsData = [
    {
      color: "blue",
      icon: CalendarIcon,
      title: "Current Periode",
      value: periode.periode,
      footer: {
        color: "text-grey-500",
        value: "Last Periode",
        label: last_periode
      }
    },
    {
      color: "amber",
      icon: UsersIcon,
      title: "PICS",
      value: pic_count,
      footer: {
        color: "text-grey-500",
        value: "PICS",
        label: pic_count
      }
    },
    {
      color: "pink",
      icon: UserPlusIcon,
      title: "Users",
      value: user_count,
      footer: {
        color: "text-grey-500",
        value: "Active Users",
        label: user_count
      }
    },
    {
      color: "green",
      icon: ChartBarIcon,
      title: "Total Indikator",
      value: indikator_count,
      footer: {
        color: "text-blue-grey-500",
        value: "Total Indikator",
        label: indikator_count
      }
    }
  ];
  const indeksMigas = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Realisasi",
        data: indeks_migas
      }
    ],
    options: {
      ...chartsConfig,
      colors: ["blue"],
      stroke: {
        lineCap: "round"
      },
      markers: {
        size: 5
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "TW 1",
          "TW 2",
          "TW 3",
          "TW 4"
        ]
      }
    }
  };
  const indeksAksesibilitas = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Realisasi",
        data: indeks_aksesibilitas
      }
    ],
    options: {
      ...chartsConfig,
      colors: ["red"],
      stroke: {
        lineCap: "round"
      },
      markers: {
        size: 5
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "TW 1",
          "TW 2",
          "TW 3",
          "TW 4"
        ]
      }
    }
  };
  const indeksKeselamatan = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Realisasi",
        data: indeks_keselamatan
      }
    ],
    options: {
      ...chartsConfig,
      colors: ["green"],
      stroke: {
        lineCap: "round"
      },
      markers: {
        size: 5
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "TW 1",
          "TW 2",
          "TW 3",
          "TW 4"
        ]
      }
    }
  };
  const statisticsChartsData = [
    {
      color: "white",
      title: "Indeks Ketersediaan Migas",
      description: "Chart Indeks Ketersediaan Migas",
      footer: "updated 2 days ago",
      chart: indeksMigas
    },
    {
      color: "white",
      title: "Indeks Aksesibilitas",
      description: "Chart Indeks Aksesibilitas",
      footer: "updated 4 min ago",
      chart: indeksAksesibilitas
    },
    {
      color: "white",
      title: "Indeks Keselamatan",
      description: "Chart Indeks Keselamatan",
      footer: "just updated",
      chart: indeksKeselamatan
    }
  ];
  return /* @__PURE__ */ jsx(AdminLayout, { props, children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Home" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4", children: statisticsCardsData.map(({ icon, title, footer, ...rest }) => /* @__PURE__ */ jsx(
        StatisticsCard,
        {
          ...rest,
          title,
          icon: React.createElement(icon, {
            className: "w-6 h-6 text-white"
          }),
          footer: /* @__PURE__ */ jsxs(Typography, { className: "font-normal text-blue-gray-600", children: [
            /* @__PURE__ */ jsx("strong", { className: footer.color, children: footer.value }),
            " ",
            footer.label
          ] })
        },
        title
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3", children: statisticsChartsData.map((props2) => /* @__PURE__ */ jsx(
        StatisticsChart,
        {
          ...props2,
          footer: /* @__PURE__ */ jsxs(
            Typography,
            {
              variant: "small",
              className: "flex items-center font-normal text-blue-gray-600",
              children: [
                /* @__PURE__ */ jsx(ClockIcon, { strokeWidth: 2, className: "h-4 w-4 text-blue-gray-400" }),
                " ",
                props2.footer
              ]
            }
          )
        },
        props2.title
      )) })
    ] })
  ] }) });
}
export {
  Beranda as default
};
