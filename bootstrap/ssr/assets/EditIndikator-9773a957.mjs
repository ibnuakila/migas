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
function EditIndikator() {
  const { auth, indikator, satuans } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    id: "",
    nama_indikator: "",
    satuan_id: ""
  });
  const [option, setOption] = useState("");
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    post(route("indikator.update"));
  };
  function handleChangeSatuan(e) {
    setOption({ selectValue: e });
    setData("satuan_id", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Update Indikator" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Indikator",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("nama_indikator", e.target.value);
                },
                defaultValue: indikator.data.nama_indikator,
                error: errors.NamaIndikator
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Satuan",
                onChange: handleChangeSatuan,
                defaultValue: indikator.data.satuan_id,
                error: errors.Status,
                children: satuans.map(({ id, nama_satuan }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: nama_satuan }, id))
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
  EditIndikator as default
};
