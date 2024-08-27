import { j as jsxs, a as jsx } from "../app.mjs";
import { A as ApplicationLogo } from "./ApplicationLogo-2943efd8.mjs";
import { Link } from "@inertiajs/react";
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-teal-50", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500", width: "70", height: "70" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden ", children })
  ] });
}
export {
  Guest as G
};
