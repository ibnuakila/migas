import { a as jsx, F as Fragment, j as jsxs } from "../app.mjs";
import "react";
import { Dialog, DialogHeader, DialogBody, Input, Alert, DialogFooter, Button } from "@material-tailwind/react";
import { useForm, router } from "@inertiajs/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
function FormPeriode(props) {
  const action = props.action;
  const open = props.open;
  const edit = props.edit;
  const objPeriode = props.objPeriode;
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    Id: objPeriode.Id || "",
    Periode: objPeriode.Periode || "",
    Status: objPeriode.Status || ""
  });
  console.log(objPeriode);
  const handleSave = (e) => {
    if (edit) {
      let _periode = document.getElementById("Periode").value;
      let _status = document.getElementById("Status").value;
      e.preventDefault();
      router.visit("/periode/update", {
        method: "post",
        data: {
          Id: objPeriode.Id,
          Periode: _periode,
          Status: _status
        },
        onSuccess: (page) => {
          console.log(page);
        }
      });
    } else {
      post(route("periode.create"));
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Dialog, { open, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: "Add/ Update Periode" }),
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
    /* @__PURE__ */ jsx(DialogBody, { divider: true, children: /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Periode",
          variant: "outlined",
          id: "Periode",
          onChange: (e) => {
            setData("Periode", e.target.value);
          },
          defaultValue: objPeriode.Periode,
          error: errors.Periode
        }
      ),
      errors.length >= 1 ? /* @__PURE__ */ jsx(Alert, { color: "red", children: errors.Periode }) : "",
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Status",
          variant: "outlined",
          id: "Status",
          onChange: (e) => {
            setData("Status", e.target.value);
          },
          defaultValue: objPeriode.Status,
          error: errors.Status
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "space-x-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: action, children: "Close" }),
      /* @__PURE__ */ jsx(Button, { variant: "gradient", color: "green", onClick: (e) => handleSave(e), children: "Save" })
    ] })
  ] }) });
}
export {
  FormPeriode as default
};
