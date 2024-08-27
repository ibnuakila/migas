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
function FormIndeks() {
  const { auth, parents, indeks } = usePage().props;
  const { data, setData, put, errors, delete: destroy, processing } = useForm({
    id: "",
    nama_indeks: "",
    parent_id: "0"
  });
  useState("");
  const [optionParent, setOptionParent] = useState("");
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("indeks.update", indeks.data.id));
  };
  function handleChangeParent(e) {
    setOptionParent({ selectValue: e });
    setData("parent_id", e);
    console.log(optionParent);
  }
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data indikator?")) {
      destroy(route("indeks.destroy", indeks.data.id));
    }
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Edit Indeks" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Indeks",
                  variant: "outlined",
                  id: "indeks",
                  onChange: (e) => {
                    setData("nama_indeks", e.target.value);
                  },
                  defaultValue: indeks.data.nama_indeks,
                  error: errors.nama_indeks
                }
              ),
              errors.nama_indeks && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_indeks })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Select Parent",
                  onChange: handleChangeParent,
                  value: indeks.data.parent_id,
                  error: errors.parent_id,
                  children: parents.map(({ id, nama_indeks }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: id + " | " + nama_indeks }, id))
                }
              ),
              errors.parent_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.parent_id })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2 ", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(), children: "Delete" }),
            /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
          ] })
        ] })
      ] }) })
    }
  );
}
export {
  FormIndeks as default
};
