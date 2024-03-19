import { a as jsx, j as jsxs } from "../app.mjs";
import "react";
import { Card, CardHeader, Typography, CardBody, Select, Option, Input, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormIndikatorPeriode() {
  const { auth } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    Id: "",
    Periode: "",
    Status: ""
  });
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    post(route("indikator-periode.store"));
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Laporan Capaian" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Periode",
                onChange: "",
                defaultValue: "",
                error: errors.Status,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Select" }),
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "2017" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "2018" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Indikator",
                onChange: "",
                defaultValue: "",
                error: errors.Status,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Select" }),
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Realisasi Produksi/Lifting Minyak" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "Rekomendasi Ekspor Minyak Mentah" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Triwulan",
                onChange: "",
                defaultValue: "",
                error: errors.Status,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Select" }),
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "I" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "II" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "III" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "IV" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Target",
                variant: "outlined",
                id: "Periode",
                disabled: true,
                onChange: (e) => {
                  setData("Periode", e.target.value);
                },
                error: errors.Periode
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Realisasi",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("Periode", e.target.value);
                },
                error: errors.Periode
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Persentasi Kinerja",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("Periode", e.target.value);
                },
                error: errors.Periode
              }
            ),
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Kategori Kinerja",
                onChange: "",
                defaultValue: "",
                error: errors.Status,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Select" }),
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Minimize" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "Maximize" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Sumber Data",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("Periode", e.target.value);
                },
                error: errors.Periode
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] })
      ] }) })
    }
  );
}
export {
  FormIndikatorPeriode as default
};
