import { a as jsx, j as jsxs, F as Fragment } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, Button, CardFooter } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { M as MSelect } from "./MSelect-b6ab6650.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "react-select";
function FormKompositor(props) {
  const auth = props.auth;
  const kompositors = props.kompositors;
  const jenis_kompositor = props.jenis_kompositor;
  const indikator = props.indikator;
  const indikators = props.indikators;
  const indeks = props.indeks;
  const parameters = props.parameters;
  const sumber_kompositor = props.sumber_kompositor;
  const { data, setData, post, errors, processing } = useForm({
    indikator_id: indikator.data.id || "",
    nama_kompositor: "",
    kalkulasi: "",
    satuan: "",
    indeks_id: "1",
    jenis_kompositor_id: "",
    sumber_kompositor_id: "",
    kompositor_id: "",
    parameter_id: "",
    value: ""
  });
  console.log(props);
  const [optionIndeks, setOptionIndeks] = useState("");
  const [optionJenisKompositor, setOptionJenisKompositor] = useState("");
  const [isParameter, setIsParameter] = useState(false);
  const [namaKompositor, setNamaKompositor] = useState("");
  const [newKompositor, setNewKompositor] = useState(true);
  const [existingIndikator, setExistingIndikator] = useState(false);
  const [existingKompositor, setExistingKompositor] = useState(false);
  const [existingParameter, setExistingParameter] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const pics = props.pics;
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  const handleSave = (e) => {
    e.preventDefault();
    post(route("kompositor.store", indikator.id));
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Kompositor/Parameter" }) }),
        /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx("form", { action: "", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
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
              onChange: (e) => {
                console.log(e);
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
                  setIsParameter(true);
                }
                setData("sumber_kompositor_id", e);
              },
              children: sumber_kompositor.map(({ id, nama_sumber_kompositor }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_sumber_kompositor }, id))
            }
          ) }),
          newKompositor ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Jenis Kompositor",
                id: "jenis-kompositor",
                onChange: (e) => {
                  setOptionJenisKompositor({ selectValue: e });
                  setData("jenis_kompositor_id", e);
                  if (e === "3") {
                    setIsParameter(true);
                  } else {
                    setIsParameter(false);
                  }
                },
                value: optionJenisKompositor.selectValue,
                error: errors.jenis_kompositor_id,
                children: jenis_kompositor.map(({ id, nama_jenis_kompositor }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: nama_jenis_kompositor }, id))
              }
            ),
            errors.jenis_kompositor_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.jenis_kompositor_id })
          ] }) : null,
          isParameter ? existingParameter ? /* @__PURE__ */ jsx("div", { className: "sm:w-full md:w-full lg:w-full", children: /* @__PURE__ */ jsx(
            Select,
            {
              label: "Parameter",
              id: "parameter",
              onChange: (e) => {
                setData("parameter_id", e);
              },
              children: parameters.map(({ id, nama_parameter, nama_indeks }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), label: nama_parameter, children: nama_parameter + " (" + nama_indeks + ")" }, id))
            }
          ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
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
                  onChange: (e) => {
                    setData("value", e.target.value);
                  },
                  error: errors.value
                }
              ),
              errors.value && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.value })
            ] })
          ] }) : null,
          newKompositor || existingParameter ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Kompositor",
                variant: "outlined",
                id: "nama-kompositor",
                onChange: (e) => {
                  setData("nama_kompositor", e.target.value);
                },
                onFocus: (e) => {
                  if (existingParameter) {
                    let param = document.getElementById("parameter").textContent;
                    e.target.value = param;
                    setData("nama_kompositor", param);
                  }
                },
                defaultValue: namaKompositor,
                error: errors.nama_kompositor
              }
            ),
            errors.nama_kompositor && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_kompositor })
          ] }) : null,
          existingIndikator ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Indikator",
                id: "indeks",
                onChange: (e) => {
                  setData("kompositor_id", e);
                  console.log(e);
                },
                error: errors.kompositor_id,
                children: indikators.map(({ id, nama_indikator, level, kompositor_id }) => /* @__PURE__ */ jsx(Option, { value: kompositor_id, children: nama_indikator + " (" + level.nama_level + ")" }, kompositor_id))
              }
            ),
            errors.kompositor_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kompositor_id })
          ] }) : null,
          existingKompositor ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Kompositor",
                id: "indeks",
                onChange: (e) => {
                  setData("kompositor_id", e);
                },
                error: errors.kompositor_id,
                children: kompositors.map(({ id, nama_kompositor, jenis_kompositor: jenis_kompositor2 }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_kompositor + " (" + jenis_kompositor2.nama_jenis_kompositor + ")" }, id))
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
                onChange: (e) => {
                  setOptionIndeks({ selectValue: e });
                  setData("indeks_id", e);
                },
                value: optionIndeks.selectValue,
                error: errors.indeks_id,
                children: indeks.map(({ id, nama_indeks }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_indeks }, id))
              }
            ),
            errors.indeks_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indeks_id })
          ] }),
          newKompositor || existingKompositor || existingParameter ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Satuan",
                variant: "outlined",
                id: "satuan",
                onChange: (e) => {
                  setData("satuan", e.target.value);
                },
                error: errors.satuan
              }
            ),
            errors.satuan && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.satuan })
          ] }) : null,
          !isParameter ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              MSelect,
              {
                id: "pic",
                options: optPic,
                defaultValue: null,
                onChange: (item) => {
                  setSelectedValue(item);
                  setData("pics", item);
                  console.log(selectedValue);
                }
              }
            ),
            errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id })
          ] }) : null,
          /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2" })
      ] }) })
    }
  );
}
export {
  FormKompositor as default
};
