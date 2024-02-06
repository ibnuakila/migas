import { a as jsx, j as jsxs } from "../app.mjs";
import { useState, useEffect } from "react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { Alert, Card, CardHeader, Typography, CardBody, Button, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePage, router, Link } from "@inertiajs/react";
import { P as Pagination } from "./Pagination-ad78d60f.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "./ApplicationLogo-2943efd8.mjs";
import "classnames";
function ListIndikator({ auth }) {
  const { indikators, flash } = usePage().props;
  console.log(usePage().props);
  const [open, setOpen] = useState(true);
  const [termIndikator, setTermIndikator] = useState("");
  const [termPic, setTermPic] = useState("");
  useState("");
  const [termLevel, setTermLevel] = useState("");
  const queryString = {
    page: indikators.current_page,
    findikator: termIndikator,
    fpic: termPic,
    flevel: termLevel
  };
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
  useEffect(() => {
    if (termIndikator.length >= 3 || termPic.length >= 3 || termLevel.length >= 3) {
      router.visit("/indikator/index", {
        method: "get",
        data: queryString,
        replace: true,
        preserveState: true
      });
    }
  }, [termIndikator, termPic, termLevel]);
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
            onClose: () => setOpen(false),
            color: "black",
            className: "my-3 shadow-lg",
            children: flash.message
          }
        ),
        /* @__PURE__ */ jsxs(Card, { className: "mt-12 mb-8 flex flex-col gap-12 bg-lime-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Daftar Indikator" }) }),
          /* @__PURE__ */ jsxs(CardBody, { className: "overflow-x-scroll px-2 pt-0 pb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex my-2", children: /* @__PURE__ */ jsx(Link, { href: route("indikator.create"), children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "ml-2", onClick: () => setOpen(true), color: "blue", children: "Add" }) }) }),
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
                      children: "Numbering"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("th", { className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4", children: /* @__PURE__ */ jsx(
                    Typography,
                    {
                      variant: "small",
                      color: "blue-gray",
                      className: "font-normal leading-none opacity-70",
                      children: "Ordering"
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
                      children: "PIC"
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
                  /* @__PURE__ */ jsx("th", {})
                ] })
              ] }),
              /* @__PURE__ */ jsx("tbody", { children: indikators.data.map(({ id, nama_indikator, nama_satuan, nama_level, indikator_pics, ordering, numbering }) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal", children: id }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-green-600", children: numbering }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: ordering }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-blue-600", children: nama_indikator }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_level }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600", children: nama_satuan }) }),
                /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("div", { className: "flex", children: indikator_pics.map(({ id: id2, nama_pic }) => /* @__PURE__ */ jsx(Typography, { variant: "small", color: "blue-gray", className: "font-normal text-gray-600 ml-1", children: nama_pic })) }) }),
                /* @__PURE__ */ jsxs("td", { className: "flex mt-2", children: [
                  /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", variant: "small", color: "blue-gray", className: "font-medium pr-1 text-red-300", children: /* @__PURE__ */ jsx(Link, { href: route("indikator.edit", id), title: "Edit", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) }) }) }),
                  /* @__PURE__ */ jsx(Typography, { as: "a", href: "#", title: "Edit", variant: "small", color: "blue-gray", className: "font-normal pr-1 text-blue-gray-400", children: /* @__PURE__ */ jsx(Link, { href: route("kompositor.index-indikator", id), title: "Kompositor/Parameter Indikator", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLineJoin: "round", d: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" }) }) }) })
                ] })
              ] }, id)) })
            ] }),
            /* @__PURE__ */ jsx(Pagination, { links: indikators.links })
          ] })
        ] })
      ] })
    }
  );
}
export {
  ListIndikator as default
};
