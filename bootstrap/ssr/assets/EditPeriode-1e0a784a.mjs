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
function EditPeriode() {
  const { periode, auth } = usePage().props;
  const { data, setData, put, delete: destroy, errors, processing, recentlySuccessful } = useForm({
    id: periode.data.id || "",
    periode: periode.data.periode || "",
    status: periode.data.status || ""
  });
  const [option, setOption] = useState("");
  useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("periode.update", periode.data.id));
  };
  function handleChange(e) {
    setOption({ selectValue: e });
    setData("status", e);
  }
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data periode?")) {
      destroy(route("periode.destroy", periode.data.id));
    }
  };
  const optStatus = ["Closed", "Active"];
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Edit Periode" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { divider: "true", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Periode",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("periode", e.target.value);
                },
                defaultValue: periode.data.periode,
                error: errors.periode
              }
            ),
            errors.periode && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.periode }),
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Status",
                onChange: handleChange,
                value: periode.data.status,
                error: errors.status,
                children: optStatus.map((opt) => /* @__PURE__ */ jsx(Option, { value: opt, children: opt }))
              }
            ),
            errors.status && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.status })
          ] }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(), children: "Delete" }),
            /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
          ] })
        ] })
      ] }) })
    }
  );
}
export {
  EditPeriode as default
};
