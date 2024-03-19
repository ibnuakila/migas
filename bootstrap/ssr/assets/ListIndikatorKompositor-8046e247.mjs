import { a as jsx, j as jsxs } from "../app.mjs";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import { Card, CardHeader, Typography, CardBody, Button, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePage, router, Link } from "@inertiajs/react";
import { P as Pagination } from "./Pagination-ad78d60f.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "./ApplicationLogo-2943efd8.mjs";
import "classnames";
function ListIndikatorKompositor({ auth }) {
  const { kompositors, indikator, kompositor_pics, flash } = usePage().props;
  console.log(usePage().props);
  useState(false);
  const [termIndeks, setTermIndeks] = useState("");
  const [termKompositor, setTermKompositor] = useState("");
  const queryString = {
    findeks: termIndeks,
    fkompositor: termKompositor
  };
  useState("");
  function handleChangeIndeks(e) {
    const value = e.target.value;
    setTermIndeks(value);
  }
  function handleChangeKompositor(e) {
    const value = e.target.value;
    setTermKompositor(value);
  }
  useEffect(() => {
    router.visit("/kompositor/index-indikator/" + indikator.id, {
      method: "get",
      data: queryString,
      replace: true,
      preserveState: true
    });
  }, [termIndeks, termKompositor]);
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "mt-12 mb-8 flex flex-col gap-12 bg-lime-50", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: indikator ? /* @__PURE__ */ jsxs(Typography, { variant: "h4", children: [
          "Kompositor/Parameter Indikator: ",
          indikator.nama_indikator
        ] }) : /* @__PURE__ */ jsx(Typography, { variant: "h4", children: "Kompositor/Parameter " }) }),
        /* @__PURE__ */ jsxs(CardBody, { className: "overflow-x-scroll px-2 pt-0 pb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex my-2", children: indikator ? /* @__PURE__ */ jsx(Link, { href: route("kompositor.create", indikator.id), children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", color: "blue", children: "Add" }) }) : null }),
          /* @__PURE__ */ jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
            /* @__PURE__ */ jsxs("thead", { children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Id" }) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Indeks" }) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Nama Kompositor" }) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Jenis Kompositor" }) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Satuan" }) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "PIC" }) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal leading-none opacity-70", children: "Action" }) })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b-2", children: [
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "outlined",
                    size: "md",
                    className: "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
                    onChange: handleChangeIndeks,
                    labelProps: {
                      className: "hidden"
                    },
                    placeholder: "Indeks",
                    icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "outlined",
                    size: "md",
                    className: "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
                    onChange: handleChangeKompositor,
                    labelProps: {
                      className: "hidden"
                    },
                    placeholder: "Kompositor",
                    icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {})
              ] })
            ] }),
            /* @__PURE__ */ jsx("tbody", { children: kompositors.map(({ id, nama_indikator, nama_kompositor, nama_jenis_kompositor, satuan, indeks_id, nama_indeks, jenis_kompositor_id, kompositor_pics: kompositor_pics2 }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: id }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_indeks }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "small",
                  color: "blue-gray",
                  className: "font-normal text-blue-600",
                  children: nama_kompositor
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: nama_jenis_kompositor == "Agregasi" ? /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-red-600", children: nama_jenis_kompositor }) : /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_jenis_kompositor }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: satuan }) }),
              /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("div", { className: "flex", children: kompositor_pics2.length > 0 ? kompositor_pics2.map(({ id: id2, nama_pic }) => /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600 ml-1", children: nama_pic }, id2)) : null }) }),
              /* @__PURE__ */ jsx("td", { className: "flex mt-2", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", variant: "small", color: "blue-gray", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("kompositor.edit", id), title: "Edit", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
            ] }, id)) })
          ] }),
          /* @__PURE__ */ jsx(Pagination, { links: kompositors.links })
        ] })
      ] }) })
    }
  );
}
export {
  ListIndikatorKompositor as default
};
