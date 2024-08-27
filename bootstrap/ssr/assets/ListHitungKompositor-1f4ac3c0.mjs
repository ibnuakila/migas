import { a as jsx, j as jsxs } from "../app.mjs";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { usePage, Link } from "@inertiajs/react";
import { P as Pagination } from "./Pagination-ad78d60f.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "classnames";
function ListHitungKompositor({ auth }) {
  const TABLE_HEAD = ["ID", "Nama Kompositor", "Field", "Nama Field", "Type Field", "Parent Id", "Action"];
  const { hitung_kompositors, indikator_kompositor } = usePage().props;
  console.log(usePage().props);
  useState(false);
  const [term, setTerm] = useState("");
  function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
  }
  useEffect(() => {
  }, [term]);
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-full overflow-scroll", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "h3", children: [
            "Hitung Kompositor ",
            indikator_kompositor.nama_kompositor
          ] }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Input, { variant: "outlined", size: "md", className: "w-45", label: "Search for Indikator", name: "namaIndikator", onChange: handleChange }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex my-2", children: /* @__PURE__ */ jsx(Link, { href: route("hitung-kompositor.create", indikator_kompositor.id), children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", color: "blue", children: "Add" }) }) }),
        /* @__PURE__ */ jsxs("table", { children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: TABLE_HEAD.map((head) => /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "small",
              color: "blue-gray",
              className: "font-normal leading-none opacity-70",
              children: head
            }
          ) }, head)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: hitung_kompositors.map(({ id, nama_kompositor, field, f_type, p_field_id }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: id }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_kompositor }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-green-600", children: field }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-green-600" }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: f_type }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: p_field_id }) }),
            /* @__PURE__ */ jsx("td", { className: "flex mt-2", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", variant: "small", color: "blue-gray", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("hitung-kompositor.edit", id), title: "Edit", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
          ] }, id)) })
        ] }),
        /* @__PURE__ */ jsx(Pagination, { links: hitung_kompositors.links })
      ] }) })
    }
  );
}
export {
  ListHitungKompositor as default
};
