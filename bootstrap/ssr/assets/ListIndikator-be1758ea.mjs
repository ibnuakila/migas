import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { A as AdminLayout } from "./AdminLayout-cebd89e1.mjs";
import { Card, Typography, Button } from "@material-tailwind/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@inertiajs/react";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function ListIndikator({ auth, indikators }) {
  const TABLE_HEAD = ["ID", "Nama Indikator", "Satuan", "Level", "Action"];
  const TABLE_ROWS = [
    {
      id: "1",
      nama: "Realisasi Produksi/Lifting Minyak",
      satuan: "BBL",
      level: "-"
    },
    {
      id: "2",
      nama: "Rekomendasi Ekspor Minyak Mentah",
      satuan: "BBL",
      level: "-"
    },
    {
      id: "3",
      nama: "Realisasi Ekspor Minyak Mentah",
      satuan: "BBL",
      level: "-"
    },
    {
      id: "4",
      nama: "Kebutuhan Kilang Minyak",
      satuan: "BBL",
      level: "-"
    },
    {
      id: "5",
      nama: "Realisasi Alokasi Gas Dom ",
      satuan: "BBL",
      level: "-"
    }
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    alert("OK");
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-screen-lg py-12", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-full overflow-scroll", children: [
        /* @__PURE__ */ jsxs(Typography, { variant: "h2", children: [
          "Data Indikator",
          /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", onClick: handleOpen, color: "blue", children: "Add" })
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
          /* @__PURE__ */ jsx("tbody", { children: TABLE_ROWS.map(({ id, nama, satuan, level }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: id }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: nama }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: satuan }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: level }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", variant: "small", color: "blue-gray", className: "font-medium", children: "Edit" }) })
          ] }, id)) })
        ] })
      ] }) })
    }
  );
}
export {
  ListIndikator as default
};
