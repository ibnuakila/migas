import { a as jsx, j as jsxs } from "../app.mjs";
import { useEffect } from "react";
import { G as Guest } from "./GuestLayout-ff3e73c7.mjs";
import { T as TextInput, I as InputError } from "./TextInput-790407fc.mjs";
import { I as InputLabel } from "./InputLabel-e0da9aff.mjs";
import { useForm, Head, Link } from "@inertiajs/react";
import { Card, CardHeader, Typography, CardBody, CardFooter, Button } from "@material-tailwind/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "./ApplicationLogo-42bf81ce.mjs";
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === "checkbox" ? event.target.checked : event.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
      /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsxs(Typography, { variant: "h4", color: "white", children: [
        "Login SI",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "CAKI" })
      ] }) }),
      /* @__PURE__ */ jsxs(CardBody, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              type: "email",
              name: "email",
              value: data.email,
              className: "mt-1 block w-full",
              autoComplete: "username",
              isFocused: true,
              onChange: handleOnChange
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              type: "password",
              name: "password",
              value: data.password,
              className: "mt-1 block w-full",
              autoComplete: "current-password",
              onChange: handleOnChange
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Checkbox, { name: "remember", value: data.remember, onChange: handleOnChange }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Remember me" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(CardFooter, { className: "space-x-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4", children: [
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Forgot your password?"
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "blue", disabled: processing, children: "Log in" })
      ] }) })
    ] }) })
  ] });
}
export {
  Login as default
};
