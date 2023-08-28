import { j as jsxs, a as jsx } from "../app.mjs";
import "react";
import { A as AdminLayout } from "./AdminLayout-0841074a.mjs";
import { Card, CardBody, Typography, CardFooter, Button } from "@material-tailwind/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@inertiajs/react";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function SimpleCard() {
  return /* @__PURE__ */ jsxs(Card, { className: "mt-6 w-45 my-5 sm:w-full md:w-full", children: [
    /* @__PURE__ */ jsxs(CardBody, { children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h5", color: "blue-gray", className: "mb-2", children: [
        "Jumlah Indikator ",
        /* @__PURE__ */ jsx("span", { class: "text-lg text-blue-600", children: "15" })
      ] }),
      /* @__PURE__ */ jsx(Typography, { class: "text-justify", children: "Indikator adalah satu set data yang digunakan untuk menilai capaian kinerja antara target dan realisasi" })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "pt-0", children: /* @__PURE__ */ jsx(Button, { color: "blue", children: "Detail" }) })
  ] });
}
function Home({ props }) {
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      props,
      content: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-screen-lg py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-x-10 gap-y-4 grid-cols-3", children: [
        /* @__PURE__ */ jsx(SimpleCard, {}),
        /* @__PURE__ */ jsx(SimpleCard, {}),
        /* @__PURE__ */ jsx(SimpleCard, {})
      ] }) })
    }
  );
}
export {
  Home as default
};
