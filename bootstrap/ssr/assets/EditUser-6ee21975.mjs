import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Alert, Card, CardHeader, Typography, CardBody, Input, Select, Option, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function EditUser() {
  console.log(usePage().props);
  const { auth, pics, roles, user, flash } = usePage().props;
  const { data, setData, put, delete: destroy, errors, processing } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
    role: user.roles[0].id || "",
    pic_id: user.pic.id || ""
  });
  useState(false);
  const [optionRole, setOptionRole] = useState(0);
  const [optionPic, setOptionPic] = useState(0);
  const [open, setOpen] = useState(true);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("user.update", user.id));
  };
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data User?")) {
      destroy(route("user.destroy", user.id));
    }
  };
  function handleChangeRole(e) {
    setOptionRole({ selectValue: e });
    setData("role", e);
  }
  function handleChangePic(e) {
    setOptionPic({ selectValue: e });
    setData("pic_id", e);
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
            onClose: () => setOpen(false),
            color: "black",
            className: "my-3 shadow-lg",
            children: flash.message
          }
        ),
        /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
          /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "New User" }) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
            /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    label: "Nama User",
                    variant: "outlined",
                    id: "name",
                    defaultValue: user.name,
                    onChange: (e) => {
                      setData("name", e.target.value);
                    },
                    error: errors.name
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    label: "Email",
                    variant: "outlined",
                    id: "email",
                    defaultValue: user.email,
                    onChange: (e) => {
                      setData("email", e.target.value);
                    },
                    error: errors.email
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    label: "Password",
                    variant: "outlined",
                    id: "password",
                    type: "password",
                    disabled: true,
                    defaultValue: user.password,
                    onChange: (e) => {
                      setData("password", e.target.value);
                    },
                    error: errors.password
                  }
                ),
                errors.password && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.password })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    label: "Select Role",
                    onChange: handleChangeRole,
                    value: user.roles[0].id,
                    error: errors.role,
                    children: roles.map(({ id, name }) => /* @__PURE__ */ jsx(Option, { value: id, children: name }, id))
                  }
                ),
                errors.role && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.role })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    label: "Select PIC",
                    onChange: handleChangePic,
                    value: user.pic_id,
                    error: errors.pic_id,
                    children: pics.map(({ id, nama_pic }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_pic }, id))
                  }
                ),
                errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2 ", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(), children: "Delete" }),
              /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  EditUser as default
};