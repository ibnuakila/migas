import { a as jsx, F as Fragment, j as jsxs } from "../app.mjs";
import "react";
import { Dialog, DialogHeader, DialogBody, Input, Select, Option, Textarea, DialogFooter, Button } from "@material-tailwind/react";
import "@inertiajs/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
function FormUpload(props) {
  const action = props.action;
  const open = props.open;
  const handleSave = (e) => {
    console.log("hell no");
  };
  const handleLoad = (e) => {
    e.preventDefault();
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Dialog, { open, onLoad: handleLoad, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: "Add/ Update File" }),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "currentColor",
          className: "mr-3 h-5 w-5",
          onClick: action,
          children: /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",
              clipRule: "evenodd"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx("form", { id: "upload-file", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Nama Dokumen",
          variant: "outlined",
          id: "nama_dokumen"
        }
      ),
      /* @__PURE__ */ jsxs(
        Select,
        {
          label: "Select Kategori",
          id: "opt-kategori",
          children: [
            /* @__PURE__ */ jsx(Option, { value: "1", children: "Perencanaan Kinerja" }),
            /* @__PURE__ */ jsx(Option, { value: "2", children: "Pengukuran Kinerja" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "File",
          type: "file",
          variant: "outlined",
          id: "file"
        }
      ),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          label: "Deskripsi",
          variant: "outlined",
          id: "deskripsi"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "space-x-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: action, children: "Close" }),
      /* @__PURE__ */ jsx(Button, { variant: "gradient", color: "green", onClick: (e) => handleSave(), children: "Save" })
    ] })
  ] }) });
}
export {
  FormUpload as default
};