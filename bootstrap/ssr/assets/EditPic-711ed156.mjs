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
  const { auth, pic, parent } = usePage().props;
  const { data, setData, put, delete: destroy, errors, processing } = useForm({
    id: pic.data.id || "",
    nama_pic: pic.data.nama_pic || "",
    parent_id: pic.data.parent_id || "",
    keterangan: pic.data.keterangan || ""
  });
  useState("");
  const [optionParent, setOptionParent] = useState("");
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("pic.update", pic.data.id));
  };
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data Pic?")) {
      destroy(route("pic.destroy", pic.data.id));
    }
  };
  function handleChangeParent(e) {
    setOptionParent({ selectValue: e });
    setData("parent_id", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New PIC" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama PIC",
                  variant: "outlined",
                  id: "nama_pic",
                  onChange: (e) => {
                    setData("nama_pic", e.target.value);
                  },
                  defaultValue: pic.data.nama_pic,
                  error: errors.nama_pic
                }
              ),
              errors.nama_pic && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_pic })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Select Parent",
                  onChange: handleChangeParent,
                  value: pic.data.parent_id,
                  error: errors.satuan_id,
                  children: parent.map(({ id, nama_pic }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_pic }, id))
                }
              ),
              errors.satuan_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.satuan_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Keterangan",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("keterangan", e.target.value);
                  },
                  defaultValue: pic.data.keterangan,
                  error: errors.keterangan
                }
              ),
              errors.keterangan && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.keterangan })
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
  FormPeriode as default
};