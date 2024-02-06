import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Select, Option, Input, Textarea, Button, CardFooter } from "@material-tailwind/react";
import { usePage, useForm, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import FormUpload from "./FormUpload-b2bde065.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormEvaluasiAkip() {
  const { auth } = usePage().props;
  const { upload_files, periodes } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    id: "",
    periode: "",
    tanggal_ajuan: "",
    status: "",
    keterangan: ""
  });
  const [option, setOption] = useState("");
  const TABLE_HEAD = ["ID", "Nama Dokumen", "Kategori/Komponen", "Tgl Upload", "Deskripsi", "Revisi", "Action"];
  const [open, setOpen] = useState(false);
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    post(route("evaluasi-akip.store"));
  };
  function handleChange(e) {
    setOption({ selectValue: e });
    setData("periode", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Evaluasi Akip" }) }),
          /* @__PURE__ */ jsxs("form", { id: "hasil-evaluasi", onSubmit: handleSave, children: [
            /* @__PURE__ */ jsxs(CardBody, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    label: "Select Periode",
                    onChange: handleChange,
                    id: "opt-periode",
                    value: option.selectValue,
                    error: errors.periode,
                    children: periodes.map(({ id, periode, status }) => /* @__PURE__ */ jsx(Option, { value: id, children: periode + " (" + status + ")" }))
                  }
                ),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    label: "Tanggal",
                    variant: "outlined",
                    id: "tanggal",
                    onChange: (e) => {
                      setData("tanggal_ajuan", e.target.value);
                    },
                    error: errors.tanggal_ajuan
                  }
                ),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    label: "Keterangan",
                    variant: "outlined",
                    id: "keterangan",
                    onChange: (e) => {
                      setData("keterangan", e.target.value);
                    },
                    error: errors.keterangan
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex place-content-left mt-2", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between my-2", children: [
                /* @__PURE__ */ jsx(Typography, { variant: "h3", children: "Dokumen Evaluasi Akip" }),
                /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", color: "blue", onClick: () => setOpen(true), children: "Add" }) })
              ] }),
              /* @__PURE__ */ jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: TABLE_HEAD.map((head) => /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: head
                  }
                ) }, head)) }) }),
                /* @__PURE__ */ jsxs("tbody", { children: [
                  upload_files.data.map(({ id, nama_dokumen, kategori_dokumen_id, upload_date, deskripsi, revisi }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: id }) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: nama_dokumen }) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: kategori_dokumen_id }) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: upload_date }) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: deskripsi }) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: revisi }) }),
                    /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", title: "Edit", variant: "small", color: "blue-gray", className: "font-normal text-center", children: /* @__PURE__ */ jsx(Link, { href: route("periode.edit", id), children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
                  ] }, id)),
                  upload_files.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "No data found." }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx("div", {}) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(FormUpload, { open, action: () => setOpen(!open) })
      ] })
    }
  );
}
export {
  FormEvaluasiAkip as default
};
