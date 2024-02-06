import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, Textarea, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormHasilEvaluasi() {
  const { auth, status } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    id: "",
    evaluasi_akip_id: "",
    file_path: "",
    keterangan: "",
    status: "",
    evaluator: ""
  });
  const [optionStatus, setOptionStatus] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    post(route("periode.store"));
  };
  function handleChange(e) {
    setOptionStatus({ selectValue: e });
    setData("status", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Upload Penilaian SAKIP" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
              Input,
              {
                type: "file",
                label: "File Excel",
                variant: "outlined",
                id: "Periode",
                error: errors.file_path
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsxs(
                Select,
                {
                  label: "Select Status",
                  onChange: handleChange,
                  value: optionStatus.selectValue,
                  error: errors.status,
                  children: [
                    /* @__PURE__ */ jsx(Option, { value: "", children: "Perbaikan" }),
                    /* @__PURE__ */ jsx(Option, { value: "", children: "Disetujui" })
                  ]
                }
              ),
              errors.status && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Evaluator",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("evaluator", e.target.value);
                  },
                  error: errors.evaluator
                }
              ),
              errors.evaluator && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.evaluator })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
              Textarea,
              {
                label: "Keterangan",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("keterangan", e.target.value);
                },
                error: errors.keterangan
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2 ", children: /* @__PURE__ */ jsx("div", { className: "flex place-content-center", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) }) })
        ] })
      ] }) })
    }
  );
}
export {
  FormHasilEvaluasi as default
};
