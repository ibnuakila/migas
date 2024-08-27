import { a as jsx, j as jsxs, F as Fragment } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, CardFooter, Button } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import { M as MSelect } from "./MSelect-b6ab6650.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "react-select";
function EditKompositor(props) {
  console.log(props);
  const kompositor = props.kompositor;
  const parameter = props.parameter;
  const kompositors = props.kompositors;
  const auth = props.auth;
  const jenis_kompositor = props.jenis_kompositor;
  const indikator = props.indikator;
  const indeks = props.indeks;
  const parameters = props.parameters;
  const sumber_kompositor = props.sumber_kompositor;
  const pics = props.pics;
  const defPics = props.def_pics;
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  const { data, setData, put, errors, delete: destroy, processing } = useForm({
    indikator_id: indikator.data.id || "",
    nama_kompositor: kompositor.data.nama_kompositor || "",
    kalkulasi: parameter ? parameter.kalkulasi : null,
    satuan: kompositor.data.satuan || "",
    indeks_id: kompositor.data.indeks_id || "0",
    jenis_kompositor_id: kompositor.data.jenis_kompositor_id || "",
    sumber_kompositor_id: kompositor.data.sumber_kompositor_id || "",
    kompositor_id: kompositor.data.id,
    value: parameter ? parameter.value : null,
    parameter_id: parameter ? parameter.id : null,
    pics: defPics
  });
  const [optionIndeks, setOptionIndeks] = useState("");
  const [optionJenisKompositor, setOptionJenisKompositor] = useState("");
  const [isParameter, setIsParameter] = useState(kompositor.data.jenis_kompositor_id == 3 ? true : false);
  const [newKompositor, setNewKompositor] = useState(kompositor.data.sumber_kompositor_id == 1 ? true : false);
  const [existingIndikator, setExistingIndikator] = useState(kompositor.data.sumber_kompositor_id == 2 ? true : false);
  const [existingKompositor, setExistingKompositor] = useState(kompositor.data.sumber_kompositor_id == 3 ? true : false);
  const [existingParameter, setExistingParameter] = useState(kompositor.data.sumber_kompositor_id == 4 ? true : false);
  const [selectedValue, setSelectedValue] = useState([]);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("kompositor.update", kompositor.data.id));
  };
  function handleChangeIndeks(e) {
    setOptionIndeks({ selectValue: e });
    setData("indeks_id", e);
  }
  function handleChangeJenisKompositor(e) {
    setOptionJenisKompositor({ selectValue: e });
    setData("jenis_kompositor_id", e);
  }
  function handleChangeKompositor(e) {
    setData("kompositor_id", e);
  }
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data kompositor?")) {
      destroy(route("kompositor.destroy", kompositor.data.id));
    }
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Edit Kompositor/Parameter" }) }),
        /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx("form", { action: "", id: "form-kompositor", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Indikator",
                variant: "outlined",
                id: "nama-indikator",
                defaultValue: indikator.data.nama_indikator,
                disabled: true,
                error: ""
              }
            ),
            errors.indikator_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indikator_id })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
            Select,
            {
              label: "Sumber Kompositor",
              id: "type-kompositor",
              disabled: true,
              value: kompositor.data.sumber_kompositor_id,
              onChange: (e) => {
                if (e === 1) {
                  setNewKompositor(true);
                  setExistingIndikator(false);
                  setExistingKompositor(false);
                  setExistingParameter(false);
                } else if (e === 2) {
                  setNewKompositor(false);
                  setExistingIndikator(true);
                  setExistingKompositor(false);
                  setExistingParameter(false);
                } else if (e === 3) {
                  setNewKompositor(false);
                  setExistingIndikator(false);
                  setExistingKompositor(true);
                  setExistingParameter(false);
                } else if (e === 4) {
                  setNewKompositor(false);
                  setExistingIndikator(false);
                  setExistingKompositor(false);
                  setExistingParameter(true);
                }
                setData("sumber_kompositor_id", e);
              },
              children: sumber_kompositor.map(({ id, nama_sumber_kompositor }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_sumber_kompositor }, id))
            }
          ) }),
          newKompositor ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Kompositor",
                variant: "outlined",
                id: "nama-kompositor",
                defaultValue: kompositor.data.nama_kompositor,
                onChange: (e) => {
                  setData("nama_kompositor", e.target.value);
                },
                error: errors.nama_kompositor
              }
            ),
            errors.nama_kompositor && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_kompositor })
          ] }) : null,
          existingKompositor ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Kompositor",
                id: "indeks",
                onChange: handleChangeKompositor,
                error: errors.kompositor_id,
                children: kompositors.map(({ id, nama_kompositor, jenis_kompositor_id }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_kompositor + " | " + jenis_kompositor_id }, id))
              }
            ),
            errors.kompositor_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kompositor_id })
          ] }) : null,
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Indeks",
                id: "indeks",
                onChange: handleChangeIndeks,
                value: kompositor.data.indeks_id,
                error: errors.indeks_id,
                children: indeks.map(({ id, nama_indeks }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_indeks }, id))
              }
            ),
            errors.indeks_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indeks_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Satuan",
                variant: "outlined",
                id: "satuan",
                defaultValue: kompositor.data.satuan,
                onChange: (e) => {
                  setData("satuan", e.target.value);
                },
                error: ""
              }
            ),
            errors.ordering && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.ordering })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Jenis Kompositor",
                id: "jenis-kompositor",
                onChange: handleChangeJenisKompositor,
                value: kompositor.data.jenis_kompositor_id,
                error: errors.indeks_id,
                children: jenis_kompositor.map(({ id, nama_jenis_kompositor }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_jenis_kompositor }, id))
              }
            ),
            errors.parent_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.parent_id })
          ] }),
          isParameter ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
              Select,
              {
                label: "Parameter",
                id: "parameter",
                onChange: (e) => {
                  setData("parameter_id", e);
                },
                value: parameter.id,
                children: parameters.map(({ id, nama_parameter, nama_indeks }) => /* @__PURE__ */ jsx(Option, { value: id, label: nama_parameter, children: nama_parameter + " (" + nama_indeks + ")" }, id))
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Kalkulasi",
                  variant: "outlined",
                  id: "kalkulasi",
                  onChange: (e) => {
                    setData("kalkulasi", e.target.value);
                  },
                  defaultValue: parameter.kalkulasi,
                  error: errors.kalkulasi
                }
              ),
              errors.kalkulasi && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kalkulasi })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Value",
                  variant: "outlined",
                  id: "value",
                  defaultValue: parameter.value,
                  onChange: (e) => {
                    setData("value", e.target.value);
                  },
                  error: errors.value
                }
              ),
              errors.value && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.value })
            ] })
          ] }) : null,
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              MSelect,
              {
                id: "pic",
                options: optPic,
                defaultValue: defPics,
                onChange: (item) => {
                  setSelectedValue(item);
                  setData("pics", item);
                  console.log(selectedValue);
                }
              }
            ),
            errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(), children: "Delete" }),
          /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
        ] })
      ] }) })
    }
  );
}
export {
  EditKompositor as default
};
