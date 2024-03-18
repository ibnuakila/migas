import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormPeriode() {
  const { auth, errors } = usePage().props;
  const { data, setData, post, processing } = useForm({
    id: "",
    periode: "",
    status: ""
  });
  const [option, setOption] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    post(route("periode.store"));
  };
  function handleChange(e) {
    setOption({ selectValue: e });
    setData("status", e);
  }
  const optStatus = ["Closed", "Active"];
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Periode" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Periode",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("periode", e.target.value);
                  },
                  error: errors.periode
                }
              ),
              errors.periode && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.periode })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Select Status",
                  onChange: handleChange,
                  value: option.selectValue,
                  error: errors.status,
                  children: optStatus.map((opt) => /* @__PURE__ */ jsx(Option, { value: opt, children: opt }))
                }
              ),
              errors.status && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.status })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2 ", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] })
      ] }) })
    }
  );
}
export {
  FormPeriode as default
};
