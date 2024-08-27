import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, Button, CardFooter } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import { M as MSelect } from "./MSelect-b6ab6650.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "react-select";
function FormIndikator() {
  const { auth, satuans, levels, pics, parents, indikator, indikator_kompositors, message } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    id: "",
    nama_indikator: "",
    satuan_id: "",
    level_id: "",
    parent_id: "0",
    ordering: "",
    numbering: "",
    pics: ""
  });
  const [optionSatuan, setOptionSatuan] = useState("");
  const [optionLevel, setOptionLevel] = useState("");
  const [optionParent, setOptionParent] = useState("");
  useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    post(route("indikator.store"));
  };
  function handleChangeSatuan(e) {
    setOptionSatuan({ selectValue: e });
    setData("satuan_id", e);
    console.log(optionSatuan);
  }
  function handleChangeLevel(e) {
    setOptionLevel({ selectValue: e });
    setData("level_id", e);
    console.log(optionLevel);
  }
  function handleChangeParent(e) {
    setOptionParent({ selectValue: e });
    setData("parent_id", e);
    console.log(optionParent);
  }
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Indikator" }) }),
        /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx("form", { onSubmit: handleSave, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Indikator",
                variant: "outlined",
                id: "Periode",
                onChange: (e) => {
                  setData("nama_indikator", e.target.value);
                },
                error: errors.nama_indikator
              }
            ),
            errors.nama_indikator && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_indikator })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Level",
                onChange: handleChangeLevel,
                value: optionLevel.selectValue,
                error: errors.level_id,
                children: levels.map(({ id, nama_level }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: nama_level }, id))
              }
            ),
            errors.level_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.level_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Satuan",
                onChange: handleChangeSatuan,
                value: optionSatuan.selectValue,
                error: errors.satuan_id,
                children: satuans.map(({ id, nama_satuan }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: nama_satuan }, id))
              }
            ),
            errors.satuan_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.satuan_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Parent",
                onChange: handleChangeParent,
                value: optionParent.selectValue,
                error: errors.parent_id,
                children: parents.map(({ id, numbering, nama_indikator }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: numbering + " | " + nama_indikator }, id))
              }
            ),
            errors.parent_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.parent_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Ordering",
                variant: "outlined",
                id: "Ordering",
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
                id: "Numbering",
                onChange: (e) => {
                  setData("numbering", e.target.value);
                },
                error: errors.numbering
              }
            ),
            errors.numbering && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.numbering })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              MSelect,
              {
                options: optPic,
                onChange: (item) => {
                  setSelectedValue(item);
                  setData("pics", item);
                  console.log(selectedValue);
                }
              }
            ),
            errors.pics && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pics })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), id: "save-indikator", children: "Save" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2 " })
      ] }) })
    }
  );
}
export {
  FormIndikator as default
};
