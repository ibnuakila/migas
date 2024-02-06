import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Select, Option, Input, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { M as MSelect } from "./MSelect-b6ab6650.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "react-select";
function EditIndikatorPeriode() {
  const { auth, periodes, pics, indikators, indikator } = usePage().props;
  const defPic = indikator.data[0].indikator_periode_pic.map((pic) => {
    return { value: pic.pic_id, label: pic.nama_pic };
  });
  console.log(defPic);
  const { data, setData, put, errors, delete: destroy, processing } = useForm({
    id: indikator.data[0].id || "",
    periode_id: indikator.data[0].periode_id || "",
    indikator_id: indikator.data[0].indikator_id || "",
    target: indikator.data[0].target || "",
    pics: defPic
    //level_id: ''
  });
  console.log(usePage().props);
  const [optionPeriode, setOptionPeriode] = useState("");
  const [optionIndikator, setOptionIndikator] = useState("");
  useState([]);
  useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const handleSave = (e) => {
    e.preventDefault();
    console.log(data);
    put(route("indikator-periode.update", indikator.data[0].id));
  };
  const handlePeriodeChange = (e) => {
    setOptionPeriode({ selectValue: e });
    setData("periode_id", e);
  };
  const handleIndikatorChange = (e) => {
    setOptionIndikator({ selectValue: e });
    setData("indikator_id", e);
  };
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data indikator periode?")) {
      destroy(route("indikator-periode.destroy", indikator.data.id));
    }
  };
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Indikator Periode" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Periode",
                onChange: handlePeriodeChange,
                value: indikator.data[0].periode_id,
                error: errors.periode_id,
                children: periodes.map(({ id, periode, status }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: periode + " (" + status + ")" }, id))
              }
            ),
            errors.periode_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.periode_id }),
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Indikator",
                onChange: handleIndikatorChange,
                value: indikator.data[0].indikator_id,
                error: errors.indikator_id,
                children: indikators.map(({ id, nama_indikator }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: nama_indikator }, id))
              }
            ),
            errors.indikator_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indikator_id }),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Target",
                variant: "outlined",
                id: "target",
                onChange: (e) => {
                  setData("target", e.target.value);
                },
                defaultValue: indikator.data[0].target,
                error: errors.target
              }
            ),
            errors.target && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.target }),
            /* @__PURE__ */ jsx(
              MSelect,
              {
                options: optPic,
                defaultValue: defPic,
                onChange: (item) => {
                  setSelectedValue(item);
                  setData("pics", item);
                  console.log(selectedValue);
                }
              }
            ),
            errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id })
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
  EditIndikatorPeriode as default
};
