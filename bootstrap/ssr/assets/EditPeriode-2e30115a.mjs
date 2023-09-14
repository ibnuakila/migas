import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-fb3358ec.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function EditPeriode() {
  const { periode, auth } = usePage().props;
  const { data, setData, put, delete: destroy, errors, processing, recentlySuccessful } = useForm({
    Id: periode.data.Id || "",
    Periode: periode.data.Periode || "",
    Status: periode.data.Status || ""
  });
  const [option, setOption] = useState("");
  useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("periode.update", periode.data.Id));
  };
  function handleChange(e) {
    setOption({ selectValue: e });
    setData("Status", e);
  }
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data periode?")) {
      destroy(route("periode.destroy", periode.data.Id));
    }
  };
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
                  setData("Periode", e.target.value);
                },
                defaultValue: periode.data.Periode,
                error: errors.Periode
              }
            ),
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Select Status",
                onChange: handleChange,
                defaultValue: periode.data.Status,
                error: errors.Status,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Closed", children: "Closed" }),
                  /* @__PURE__ */ jsx(Option, { value: "Active", children: "Active" })
                ]
              }
            )
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
