import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, Button, CardFooter } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormRealisasi(props) {
  const auth = props.auth;
  const triwulan = props.triwulan;
  const periode = props.periode;
  props.pic;
  const { data, setData, post, errors, processing } = useForm({
    kompositor_id: "",
    realisasi: "",
    pic_id: "",
    satuan: "",
    triwulan_id: "",
    periode_id: ""
  });
  console.log(props);
  const [optionIndeks, setOptionIndeks] = useState("");
  useState("");
  const handleSave = (e) => {
    e.preventDefault();
    post(route("indikator.store-indikator-kompositor"));
  };
  function handleChangeIndeks(e) {
    setOptionIndeks({ selectValue: e });
    setData("indeks_id", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Input Realisasi" }) }),
        /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx("form", { action: "", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Indikator",
                variant: "outlined",
                id: "nama-indikator",
                defaultValue: "",
                disabled: true,
                error: ""
              }
            ),
            errors.indikator_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indikator_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Triwulan",
                id: "indeks",
                onChange: handleChangeIndeks,
                value: optionIndeks.selectValue,
                error: errors.indeks_id,
                children: triwulan.map(({ id, triwulan: triwulan2 }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: triwulan2 }, id))
              }
            ),
            errors.indeks_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indeks_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Realisasi",
                variant: "outlined",
                id: "realisasi",
                onChange: (e) => {
                  setData("realisasi", e.target.value);
                },
                error: errors.realisasi
              }
            ),
            errors.realisasi && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.realisasi })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
            Select,
            {
              label: "Periode",
              onChange: "",
              defaultValue: "",
              error: errors.Status,
              children: periode.map(({ id, periode: periode2 }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: periode2 }, id))
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2" })
      ] }) })
    }
  );
}
export {
  FormRealisasi as default
};
