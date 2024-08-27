import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, Button, CardFooter } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormHitungKompositor() {
  const props = usePage().props;
  const auth = props.auth;
  const indikator_kompositor = props.indikator_kompositor;
  const indikator_kompositors = props.indikator_kompositors;
  const hitung_kompositors = props.hitung_kompositors;
  const { data, setData, post, errors, processing } = useForm({
    field: "",
    f_type: "",
    p_field_id: "",
    indikator_kompositor_id: indikator_kompositor.data.id || ""
  });
  console.log(props);
  const [optionFtype, setOptionFtype] = useState("");
  const [optionPfieldId, setOptionPfieldId] = useState("");
  const [optionKompositor, setOptionKompositor] = useState("");
  const [optionOperator, setOptionOperator] = useState("");
  const [input, setInput] = useState(true);
  const [value, setValue] = useState(false);
  const [operator, setOperator] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    post(route("hitung-kompositor.store"));
  };
  function handleChangeFtype(e) {
    setOptionFtype({ selectValue: e });
    setData("f_type", e);
    console.log(e);
    if (e === "Input") {
      setInput(true);
      setOperator(false);
      setValue(false);
    } else if (e === "Operator") {
      setInput(false);
      setOperator(true);
      setValue(false);
    } else if (e === "Value") {
      setInput(false);
      setOperator(false);
      setValue(true);
    }
  }
  function handleChangePfieldId(e) {
    setOptionPfieldId({ selectValue: e });
    setData("p_field_id", e);
  }
  function handleChangeKompositor(e) {
    setOptionKompositor({ selectValue: e });
    setData("field", e);
  }
  function handleChangeOperator(e) {
    setOptionOperator({ selectValue: e });
    setData("field", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Hitung Kompositor/Parameter" }) }),
        /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx("form", { action: "", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Nama Indikator",
                variant: "outlined",
                id: "nama-indikator",
                defaultValue: indikator_kompositor.data.nama_kompositor,
                disabled: true,
                error: ""
              }
            ),
            errors.indikator_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indikator_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Field Type",
                id: "indeks",
                onChange: handleChangeFtype,
                value: optionFtype.selectValue,
                error: errors.f_type,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Operator", children: "Operator" }, "1"),
                  /* @__PURE__ */ jsx(Option, { value: "Input", children: "Input" }, "2"),
                  /* @__PURE__ */ jsx(Option, { value: "Value", children: "Value" }, "3")
                ]
              }
            ),
            errors.f_type && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.f_type })
          ] }),
          value ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Value",
                variant: "outlined",
                id: "nama-kompositor",
                onChange: (e) => {
                  setData("field", e.target.value);
                },
                error: errors.field
              }
            ),
            errors.field && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.field })
          ] }) : null,
          input ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Kompositor",
                id: "kompositor",
                className: "hide",
                onChange: handleChangeKompositor,
                value: optionKompositor.selectValue,
                error: errors.field,
                children: indikator_kompositors.map(({ id, nama_kompositor }) => /* @__PURE__ */ jsx(Option, { value: nama_kompositor, children: nama_kompositor }, id))
              }
            ),
            errors.field && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.field })
          ] }) : null,
          operator ? /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Operator",
                id: "indeks",
                onChange: handleChangeOperator,
                value: optionOperator.selectValue,
                error: errors.field,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "+", children: "+" }, "1"),
                  /* @__PURE__ */ jsx(Option, { value: "-", children: "-" }, "2"),
                  /* @__PURE__ */ jsx(Option, { value: "/", children: "/" }, "3"),
                  /* @__PURE__ */ jsx(Option, { value: "*", children: "*" }, "3")
                ]
              }
            ),
            errors.field && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.field })
          ] }) : null,
          /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Parent",
                id: "indeks",
                onChange: handleChangePfieldId,
                value: optionPfieldId.selectValue,
                error: errors.p_field_id,
                children: hitung_kompositors.length === 0 ? /* @__PURE__ */ jsx(Option, { value: "0", children: "0" }, "0") : hitung_kompositors.map(({ id, field }) => /* @__PURE__ */ jsx(Option, { value: id, children: field }, id))
              }
            ),
            errors.p_field_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.p_field_id })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2" })
      ] }) })
    }
  );
}
export {
  FormHitungKompositor as default
};
