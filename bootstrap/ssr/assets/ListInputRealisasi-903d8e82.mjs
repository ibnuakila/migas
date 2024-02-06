import { a as jsx, j as jsxs } from "../app.mjs";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { Alert, Card, CardHeader, Typography, CardBody, Button, Input } from "@material-tailwind/react";
import { usePage, router, Link } from "@inertiajs/react";
import "classnames";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "./ApplicationLogo-2943efd8.mjs";
function ListInputRealisasi({ auth }) {
  const TABLE_HEAD = ["ID", "Indeks", "Nama Kompositor", "Jenis", "Realisasi", "Satuan", "Triwulan", "PIC", "Action"];
  const { input_realisasis, indikator, laporan_capaian, triwulan, realisasi_kompositor_pics } = usePage().props;
  console.log(usePage().props);
  const [open, setOpen] = useState(true);
  const { flash } = usePage().props;
  useState("");
  const [termIndeks, setTermIndeks] = useState("");
  const [termKompositor, setTermKompositor] = useState("");
  const queryString = {
    findeks: termIndeks,
    fkompositor: termKompositor
  };
  function handleChangeIndeks(e) {
    const value = e.target.value;
    setTermIndeks(value);
  }
  function handleChangeKompositor(e) {
    const value = e.target.value;
    setTermKompositor(value);
  }
  useEffect(() => {
    router.visit("/input-realisasi/laporancapaiantriwulan/" + laporan_capaian.id + "/triwulan/" + triwulan.id, {
      method: "get",
      data: queryString,
      replace: true,
      preserveState: true
    });
  }, [termIndeks, termKompositor]);
  function handleImport() {
    if (confirm("Apakah Anda yakin akan mengimport data indikator?")) {
      router.visit("/input-realisasi/import-kompositor/", {
        method: "get",
        data: { laporan_capaian_id: laporan_capaian.id, triwulan_id: triwulan.id }
        /*onFinish: visit => {                    
            router.reload();
            },*/
      });
    }
  }
  function Icon() {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 2,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
        flash.message && /* @__PURE__ */ jsx(
          Alert,
          {
            open,
            icon: /* @__PURE__ */ jsx(Icon, {}),
            onClose: () => {
              setOpen(false);
              router.reload();
            },
            color: "black",
            className: "my-3 shadow-lg",
            children: flash.message
          }
        ),
        /* @__PURE__ */ jsxs(Card, { className: "mt-12 mb-8 flex flex-col gap-12", children: [
          /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-2 p-6", children: /* @__PURE__ */ jsxs(Typography, { variant: "h4", color: "white", children: [
            "Input Realisasi Kompositor/Parameter ",
            indikator.nama_indikator
          ] }) }),
          /* @__PURE__ */ jsxs(CardBody, { className: "overflow-x-scroll px-2 pt-0 pb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex my-2", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", onClick: handleImport, color: "green", children: "Import Kompositor" }) }),
            /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[640px] table-auto", children: [
              /* @__PURE__ */ jsxs("thead", { children: [
                /* @__PURE__ */ jsx("tr", { children: TABLE_HEAD.map((head) => /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: head
                  }
                ) }, head)) }),
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
                  /* @__PURE__ */ jsx("th", {}),
                  /* @__PURE__ */ jsx("th", {}),
                  /* @__PURE__ */ jsx("th", {})
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tbody", { children: [
                input_realisasis.map(({
                  id,
                  nama_indeks,
                  nama_kompositor,
                  kompositor_id,
                  nama_jenis_kompositor,
                  nilai,
                  satuan,
                  triwulan: triwulan2,
                  realisasi_kompositor_pics: realisasi_kompositor_pics2,
                  realisasi_kompositor_id
                }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: kompositor_id }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_indeks }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: nama_kompositor }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_jenis_kompositor }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-red-600 text-right", children: nilai ? parseFloat(nilai).toLocaleString(void 0, { maximumFractionDigits: 2 }) : 0 }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-green-600", children: satuan }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: triwulan2 }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("div", { className: "flex", children: realisasi_kompositor_pics2.map(({ id: id2, nama_pic }) => /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600 ml-1", children: nama_pic }, id2)) }) }),
                  /* @__PURE__ */ jsx("td", { className: "flex mt-2", children: /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", variant: "small", color: "blue-gray", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("input-realisasi.edit", { inputrealisasi: id, realisasikompositor: realisasi_kompositor_id }), title: "Edit", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
                ] }, kompositor_id)),
                input_realisasis.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "No data found." }) })
              ] })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  ListInputRealisasi as default
};
