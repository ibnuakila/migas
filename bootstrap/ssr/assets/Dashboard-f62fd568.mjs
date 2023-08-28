import { j as jsxs, a as jsx } from "../app.mjs";
import { A as Authenticated } from "./AuthenticatedLayout-d307c1f3.mjs";
import { Head } from "@inertiajs/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "react";
import "@material-tailwind/react";
import "./ApplicationLogo-42bf81ce.mjs";
import "@headlessui/react";
function Dashboard(props) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: props.auth,
      errors: props.errors,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
