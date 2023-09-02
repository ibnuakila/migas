import { j as jsxs, a as jsx } from "../app.mjs";
import "react";
import { A as AdminLayout } from "./AdminLayout-cebd89e1.mjs";
import { Card, CardBody, Typography, CardFooter, Button, CardHeader } from "@material-tailwind/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@inertiajs/react";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function SimpleCard() {
  return /* @__PURE__ */ jsxs(Card, { className: "mt-6 w-45 my-5", children: [
    /* @__PURE__ */ jsxs(CardBody, { children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h5", color: "blue-gray", className: "mb-2", children: [
        "Jumlah Indikator ",
        /* @__PURE__ */ jsx("span", { className: "text-lg text-blue-600", children: "15" })
      ] }),
      /* @__PURE__ */ jsx(Typography, { className: "text-justify", children: "Indikator adalah satu set data yang digunakan untuk menilai capaian kinerja antara target dan realisasi" })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "pt-0", children: /* @__PURE__ */ jsx(Button, { color: "blue", children: "Detail" }) })
  ] });
}
function Home({ props }) {
  console.log(props);
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      props,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-screen-lg py-12", children: [
        /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsxs(Card, { className: "w-full flex-row", children: [
          /* @__PURE__ */ jsx(
            CardHeader,
            {
              shadow: false,
              floated: false,
              className: "m-0 w-2/5 shrink-0 rounded-r-none",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
                  alt: "card-image",
                  className: "h-full w-full object-cover"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(CardBody, { children: [
            /* @__PURE__ */ jsxs(Typography, { variant: "h5", color: "gray", className: "mb-4 uppercase", children: [
              "Si",
              /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "CaKi" })
            ] }),
            /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "blue-gray", className: "mb-2", children: "Sistem Informasi Capaian Kinerja" }),
            /* @__PURE__ */ jsx(Typography, { color: "gray", className: "mb-8 font-normal", children: "Direktorat Jenderal Minyak dan Gas Bumi Kementerian Energi dan Sumber Daya Mineral Republik Indonesia" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "inline-block", children: /* @__PURE__ */ jsxs(Button, { variant: "text", className: "flex items-center gap-2", children: [
              "Learn More",
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  className: "h-4 w-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    }
                  )
                }
              )
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
          /* @__PURE__ */ jsx(SimpleCard, {}),
          /* @__PURE__ */ jsx(SimpleCard, {}),
          /* @__PURE__ */ jsx(SimpleCard, {})
        ] })
      ] })
    }
  );
}
export {
  Home as default
};
