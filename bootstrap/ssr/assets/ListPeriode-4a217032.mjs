import { a as jsx, j as jsxs } from "../app.mjs";
import { A as AdminLayout } from "./AdminLayout-cebd89e1.mjs";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import FormPeriode from "./FormPeriode-7d741377.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@inertiajs/react";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function ListPeriode({ auth, periodes }) {
  const TABLE_HEAD = ["ID", "Periode", "Status", "Action"];
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [objPeriode, setObjPeriode] = useState([]);
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-screen-lg py-12", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-full overflow-scroll", children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "h2", children: [
            "Data Periode",
            /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", onClick: () => setOpen(true), color: "blue", children: "Add" })
          ] }),
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
            /* @__PURE__ */ jsx("tbody", { children: periodes.map((object) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-center", children: object.Id }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-center", children: object.Periode }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: object.Status == "Active" ? /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600 text-center", children: object.Status }) : /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-center", children: object.Status }) }),
              /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", title: "Edit", variant: "small", color: "blue-gray", className: "font-normal text-center", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: "1.5",
                  stroke: "currentColor",
                  className: "w-6 h-6",
                  onClick: () => {
                    setEdit(!edit);
                    setOpen(!open);
                    setObjPeriode(object);
                  },
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" })
                }
              ) }) })
            ] }, object.Id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(FormPeriode, { open, edit, objPeriode, action: () => setOpen(!open) })
      ] })
    }
  );
}
export {
  ListPeriode as default
};