import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Select, Option, Input, Textarea, Button, CardFooter } from "@material-tailwind/react";
import { usePage, useForm, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-fb3358ec.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function FormEvaluasiAkip() {
  const { auth } = usePage().props;
  const { upload_files } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    Id: "",
    Periode: "",
    TanggalAjuan: "",
    Status: "",
    Keterangan: ""
  });
  const [option, setOption] = useState("");
  const TABLE_HEAD = ["ID", "Nama Dokumen", "Kategori/Komponen", "Tgl Upload", "Deskripsi", "Revisi", "Action"];
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    post(route("evaluasi-akip.store"));
  };
  function handleChange(e) {
    setOption({ selectValue: e });
    setData("Periode", e);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Evaluasi Akip" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsxs(CardBody, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
              /* @__PURE__ */ jsxs(
                Select,
                {
                  label: "Select Periode",
                  onChange: handleChange,
                  value: option.selectValue,
                  error: errors.Status,
                  children: [
                    /* @__PURE__ */ jsx(Option, { value: "Closed", children: "2017" }),
                    /* @__PURE__ */ jsx(Option, { value: "Active", children: "2018" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Tanggal",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("TanggalAjuan", e.target.value);
                  },
                  error: errors.TanggalAjuan
                }
              ),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  label: "Keterangan",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("TanggalAjuan", e.target.value);
                  },
                  error: errors.TanggalAjuan
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex place-content-left mt-2", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between my-2", children: [
              /* @__PURE__ */ jsx(Typography, { variant: "h3", children: "Dokumen Evaluasi Akip" }),
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Link, { href: route("evaluasi-akip.create"), children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", color: "blue", children: "Add" }) }) })
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
                upload_files.data.map(({ Id, NamaDokumen, Komponen, UploadDate, Deskripsi, Revisi }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: Id }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: NamaDokumen }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: Komponen }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: UploadDate }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: Deskripsi }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: Revisi }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", title: "Edit", variant: "small", color: "blue-gray", className: "font-normal text-center", children: /* @__PURE__ */ jsx(Link, { href: route("periode.edit", Id), children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
                ] }, Id)),
                upload_files.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "No contacts found." }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardFooter, { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "h5", children: "Instruksi" }),
            /* @__PURE__ */ jsx(Typography, { varian: "small", children: 'Isikan data terlebih dahulu, kemudian klik "Save". Setelah itu klik "Add" untuk menambahkan dokumen.' })
          ] })
        ] })
      ] }) })
    }
  );
}
export {
  FormEvaluasiAkip as default
};
