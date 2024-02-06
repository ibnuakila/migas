import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Select, Option, Input, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormIndikatorPeriode() {
  const { auth, periodes, indikators, pics } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    id: "",
    periode_id: "",
    indikator_id: "",
    target: "",
    pic_id: ""
    //level_id: ''
  });
  console.log(usePage().props);
  const [optionPeriode, setOptionPeriode] = useState("");
  const [optionIndikator, setOptionIndikator] = useState("");
  const [optionPic, setOptionPic] = useState("");
  useState("");
  const handleSave = (e) => {
    e.preventDefault();
    post(route("indikator-periode.store"));
  };
  const handlePeriodeChange = (e) => {
    setOptionPeriode({ selectValue: e });
    setData("periode_id", e);
  };
  const handleIndikatorChange = (e) => {
    setOptionIndikator({ selectValue: e });
    setData("indikator_id", e);
  };
  const handlePicChange = (e) => {
    setOptionPic({ selectValue: e });
    setData("pic_id", e);
  };
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
                value: optionPeriode.selectValue,
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
                value: optionIndikator.selectValue,
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
                defaultValue: "",
                error: errors.target
              }
            ),
            errors.target && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.target }),
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select PIC",
                onChange: handlePicChange,
                value: optionPic.selectValue,
                error: errors.pic,
                children: pics.map(({ id, nama_pic }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: nama_pic }, id))
              }
            ),
            errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id })
          ] }) }),
          /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) })
        ] })
      ] }) })
    }
  );
}
export {
  FormIndikatorPeriode as default
};
