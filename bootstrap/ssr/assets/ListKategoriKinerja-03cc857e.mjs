import { a as jsx, j as jsxs } from "../app.mjs";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { P as Pagination } from "./Pagination-ad78d60f.mjs";
import { usePage, router, Link } from "@inertiajs/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "classnames";
function ListLevel({ auth }) {
  const { kategori_kinerjas } = usePage().props;
  usePage().props;
  console.log(usePage().props);
  const {
    data,
    meta: { links }
  } = kategori_kinerjas;
  const TABLE_HEAD = ["ID", "Nama Kategori", "Action"];
  useState(false);
  useState(false);
  useState({
    //role: filters.role || '', // role is used only on users page
    //search: filter.search || '',
    //trashed: filters.trashed || ''
  });
  const [term, setTerm] = useState("");
  function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
    console.log(key + ", " + value);
  }
  useEffect(() => {
    router.visit("/kategori-kinerja", {
      method: "get",
      data: { search: term, page: kategori_kinerjas.current_page },
      replace: true,
      preserveState: true
    });
  }, [term]);
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-full overflow-scroll", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "h3", children: "Data Kategori Kinerja" }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Input, { variant: "outlined", size: "md", className: "w-45", label: "Search for kategori_kinerja", name: "kategori_kinerja", onChange: handleChange }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex my-2", children: /* @__PURE__ */ jsx(Link, { href: route("kategori-kinerja.create"), children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", color: "blue", children: "Add" }) }) }),
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
            kategori_kinerjas.data.map(({ Id, NamaKategoriKinerja }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: Id }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: NamaKategoriKinerja }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", title: "Edit", variant: "small", color: "blue-gray", className: "font-normal text-center", children: /* @__PURE__ */ jsx(Link, { href: route("kategori-kinerja.edit", Id), children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
            ] }, Id)),
            kategori_kinerjas.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "No contacts found." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Pagination, { links })
      ] }) })
    }
  );
}
export {
  ListLevel as default
};