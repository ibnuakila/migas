import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormSubKomponen() {
  const { auth, errors, komponen } = usePage().props;
  const { data, setData, post, processing } = useForm({
    komponen_id: komponen.data.id || "",
    nama_sub_komponen: "",
    bobot: "",
    ordering: "",
    numbering: ""
  });
  useState("");
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    setData("komponen_id", komponen.data.id);
    post(route("instrument-kinerja.store-sub-komponen"));
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Sub Komponen" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Komponen",
                  variant: "outlined",
                  id: "Periode",
                  defaultValue: komponen.data.nama_komponen,
                  disabled: true,
                  error: errors.nama_komponen
                }
              ),
              errors.nama_komponen && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_komponen })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Sub Komponen",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("nama_sub_komponen", e.target.value);
                  },
                  error: errors.bobot
                }
              ),
              errors.bobot && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.bobot })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Bobot",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("bobot", e.target.value);
                  },
                  error: errors.bobot
                }
              ),
              errors.bobot && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.bobot })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Ordering",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("ordering", e.target.value);
                  },
                  error: errors.ordering
                }
              ),
              errors.ordering && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.ordering })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Numbering",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("numbering", e.target.value);
                  },
                  error: errors.numbering
                }
              ),
              errors.numbering && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.numbering })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2 ", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] })
      ] }) })
    }
  );
}
export {
  FormSubKomponen as default
};
