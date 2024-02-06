import { a as jsx, j as jsxs, F as Fragment } from "../app.mjs";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { Card, CardHeader, Typography, CardBody, Button, Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { P as Pagination } from "./Pagination-ad78d60f.mjs";
import { usePage, router, Link } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "./ApplicationLogo-2943efd8.mjs";
import "classnames";
function ListLaporanCapaian({ auth }) {
  const { laporan_capaians } = usePage().props;
  const {
    data
  } = laporan_capaians;
  usePage().props;
  console.log(usePage().props);
  useState(false);
  useState(false);
  useState([]);
  const [termIndikator, setTermIndikator] = useState("");
  const [termPic, setTermPic] = useState("");
  const [termPeriode, setTermPeriode] = useState("");
  const [termLevel, setTermLevel] = useState("");
  useState(0);
  const { flash } = usePage().props;
  const queryString = {
    page: laporan_capaians.current_page,
    findikator: termIndikator,
    fpic: termPic,
    fperiode: termPeriode,
    flevel: termLevel
  };
  useState("");
  function handleImport() {
    if (confirm("Apakah Anda yakin akan mengimport data indikator?")) {
      router.visit("/laporan-capaian/importindikator", {
        method: "get",
        data: { isImport: true },
        onFinish: (visit) => {
          if (flash.message) {
            alert(flash.message);
          }
          router.reload();
        }
      });
    }
  }
  function handleChangeIndikator(e) {
    const value = e.target.value;
    setTermIndikator(value);
  }
  function handleChangeLevel(e) {
    const value = e.target.value;
    setTermLevel(value);
  }
  function handleChangePic(e) {
    const value = e.target.value;
    setTermPic(value);
  }
  function handleChangePeriode(e) {
    const value = e.target.value;
    setTermPeriode(value);
  }
  useEffect(() => {
    router.visit("/laporan-capaian/index", {
      method: "get",
      data: queryString,
      replace: true,
      preserveState: true
    });
  }, [termIndikator, termPic, termLevel, termPeriode]);
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "mt-12 mb-8 flex flex-col gap-12 bg-lime-50", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Daftar Laporan Capaian Kinerja" }) }),
        /* @__PURE__ */ jsxs(CardBody, { className: "overflow-x-scroll px-2 pt-0 pb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex my-2", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", onClick: handleImport, color: "green", children: "Import Indikator" }) }),
          /* @__PURE__ */ jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
            /* @__PURE__ */ jsxs("thead", { children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "ID"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "No"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Nama Indikator"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Level"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Satuan"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Target"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "PIC"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", colspan: "4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70 text-center",
                    children: "Realisasi Triwulan"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", colspan: "4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70 text-center",
                    children: "Kinerja Triwulan"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Kinerja Tahunan"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Kategori Kinerja"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Status Kinerja"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Periode"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "Action"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b-2", children: [
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", { className: "p-2", children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "outlined",
                    size: "md",
                    className: "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
                    onChange: handleChangeIndikator,
                    labelProps: {
                      className: "hidden"
                    },
                    placeholder: "Indikator",
                    icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "outlined",
                    size: "md",
                    className: "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
                    onChange: handleChangeLevel,
                    labelProps: {
                      className: "hidden"
                    },
                    placeholder: "Level",
                    icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "outlined",
                    size: "md",
                    className: "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
                    onChange: handleChangePic,
                    labelProps: {
                      className: "hidden"
                    },
                    placeholder: "Pic",
                    icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW I"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW II"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW III"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW IV"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW I"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW II"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW III"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "border text-center p-1", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal leading-none opacity-70",
                    children: "TW IV"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", {}),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    variant: "outlined",
                    size: "md",
                    className: "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
                    onChange: handleChangePeriode,
                    labelProps: {
                      className: "hidden"
                    },
                    placeholder: "Periode",
                    icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("th", {})
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tbody", { children: [
              data.map(({
                id,
                indikator_id,
                numbering,
                nama_indikator,
                nama_level,
                nama_satuan,
                target,
                laporan_capaian_pic,
                input_realisasi,
                kinerja_triwulan,
                kinerja_tahunan,
                kategori_kinerja_id,
                status_kinerja,
                periode
              }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-500", children: indikator_id }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-gray-600", children: numbering }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: nama_indikator }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_level }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_satuan }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-red-400", children: target ? parseFloat(target).toLocaleString(void 0, { maximumFractionDigits: 2 }) : 0 }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: /* @__PURE__ */ jsx("div", { className: "flex", children: laporan_capaian_pic.map(({ id: id2, nama_pic }) => /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600 ml-1", children: nama_pic }, id2 + nama_pic)) }) }) }),
                input_realisasi.length > 0 ? input_realisasi.map(({ realisasi, triwulan_id }) => /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "small",
                    color: "blue-gray",
                    className: "font-normal text-red-600",
                    children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("input-realisasi.laporan-capaian-triwulan", { laporancapaian: id, triwulan: triwulan_id }),
                        title: "Realisasi Kompositor/Parameter",
                        onClick: null,
                        children: parseFloat(realisasi).toLocaleString(void 0, { maximumFractionDigits: 2 })
                      }
                    )
                  }
                ) }, id + triwulan_id)) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-red-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-realisasi.laporan-capaian-triwulan", { laporancapaian: id, triwulan: 1 }), title: "Realisasi Kompositor/Parameter", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-red-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-realisasi.laporan-capaian-triwulan", { laporancapaian: id, triwulan: 2 }), title: "Realisasi Kompositor/Parameter", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-red-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-realisasi.laporan-capaian-triwulan", { laporancapaian: id, triwulan: 3 }), title: "Realisasi Kompositor/Parameter", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-red-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-realisasi.laporan-capaian-triwulan", { laporancapaian: id, triwulan: 4 }), title: "Realisasi Kompositor/Parameter", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) })
                ] }),
                kinerja_triwulan.length > 0 ? kinerja_triwulan.map(({ triwulan_id, kinerja }) => /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: /* @__PURE__ */ jsx(Link, { href: route("input-kinerja.edit", { laporancapaian: id, triwulan: triwulan_id }), title: "Kinerja", children: parseFloat(kinerja).toLocaleString(void 0, { maximumFractionDigits: 2, style: "percent" }) }) }) }, id + triwulan_id)) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-blue-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-kinerja.edit", { laporancapaian: id, triwulan: 1 }), title: "Kinerja TW I", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-blue-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-kinerja.edit", { laporancapaian: id, triwulan: 2 }), title: "Kinerja TW II", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-blue-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-kinerja.edit", { laporancapaian: id, triwulan: 3 }), title: "Kinerja TW III", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-blue-300", children: /* @__PURE__ */ jsx(Link, { href: route("input-kinerja.edit", { laporancapaian: id, triwulan: 4 }), title: "Kinerja TW IV", children: /* @__PURE__ */ jsx(PencilIcon, { className: "h-4 w-4" }) }) }) })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: kinerja_tahunan }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: kategori_kinerja_id }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: status_kinerja }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: periode }) }),
                /* @__PURE__ */ jsx("td", { className: "flex mt-2", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-medium mr-1 text-red-300", children: /* @__PURE__ */ jsx(Link, { href: route("laporan-capaian.edit", id), title: "Edit", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }) })
              ] }, id + numbering)),
              data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "No data found." }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Pagination, { links: laporan_capaians.links })
        ] })
      ] }) })
    }
  );
}
export {
  ListLaporanCapaian as default
};
