import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-fb3358ec.mjs";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "@inertiajs/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function ListPic({ auth, pics }) {
  const TABLE_HEAD = ["ID", "Nama PIC", "Keterangan", "Action"];
  const TABLE_ROWS = [
    {
      id: "1",
      nama: "DMEP",
      keterangan: "Unit Kerja"
    },
    {
      id: "2",
      nama: "DMOO",
      keterangan: "Unit Kerja"
    },
    {
      id: "3",
      nama: "DMON",
      keterangan: "Unit Kerja"
    },
    {
      id: "4",
      nama: "DMBS",
      keterangan: "Unit Kerja"
    },
    {
      id: "5",
      nama: "DMOG",
      keterangan: "Unit Kerja"
    }
  ];
  useState(false);
  const [term, setTerm] = useState("");
  function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
    console.log(key + ", " + value);
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-screen-lg py-12", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-full overflow-scroll", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "h3", children: "Data PIC" }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Input, { variant: "outlined", size: "md", className: "w-45", label: "Search for periode", name: "periode", onChange: handleChange }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex my-2", children: /* @__PURE__ */ jsx(Link, { href: route("pic.create"), children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", color: "blue", children: "Add" }) }) }),
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
          /* @__PURE__ */ jsx("tbody", { children: TABLE_ROWS.map(({ id, nama, keterangan }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: id }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: nama }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: keterangan }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", variant: "small", color: "blue-gray", className: "font-medium", children: "Edit" }) })
          ] }, id)) })
        ] })
      ] }) })
    }
  );
}
export {
  ListPic as default
};
