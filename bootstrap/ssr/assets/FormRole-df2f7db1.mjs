import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Checkbox, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function FormRole() {
  const { auth, permissions } = usePage().props;
  const arr = new Array();
  const [selectedValue, setSelectedValue] = useState({});
  const { data, setData, post, errors, processing } = useForm({
    //d: '',
    name: "",
    permission: ""
  });
  const handleSave = (e) => {
    var elements = document.querySelectorAll("input[type=checkbox]");
    elements.forEach(function(element) {
      let val = element.defaultValue;
      let isChecked = element.checked;
      if (isChecked) {
        const obj = { id: val, checked: isChecked };
        arr.push(obj);
        setSelectedValue({ ...selectedValue, obj });
      }
    });
    console.log(arr);
    console.log(data);
    if (data.permission === "")
      ;
    post(route("role.store"));
    e.preventDefault();
  };
  const handleChecked = (e) => {
    setSelectedValue({ ...selectedValue, [e.target.defaultValue]: e.target.checked });
    setData("permission", selectedValue);
    if (selectedValue === "") {
      setSelectedValue({ ...selectedValue, [e.target.defaultValue]: e.target.checked });
      setData("permission", selectedValue);
    }
    console.log(selectedValue);
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New Role" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Role",
                  variant: "outlined",
                  id: "name",
                  onChange: (e) => {
                    setData("name", e.target.value);
                  },
                  error: errors.name
                }
              ),
              errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-48", children: [
              /* @__PURE__ */ jsx(Typography, { variant: "h6", className: "font-normal", children: "Permission:" }),
              permissions.map(({ id, name }) => /* @__PURE__ */ jsx(
                Checkbox,
                {
                  label: name,
                  color: "blue",
                  defaultValue: id,
                  className: "my-checkbox",
                  onClick: handleChecked
                },
                id
              ))
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2 ", children: /* @__PURE__ */ jsx("div", { className: "flex place-content-center", children: /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), id: "save", children: "Oke" }) }) })
        ] })
      ] }) })
    }
  );
}
export {
  FormRole as default
};
