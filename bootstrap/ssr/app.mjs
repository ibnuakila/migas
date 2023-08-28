var _a;
import * as jsxRuntime from "react/jsx-runtime";
import _ from "lodash";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
window._ = _;
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const app = "";
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
const appName = ((_a = window.document.getElementsByTagName("title")[0]) == null ? void 0 : _a.innerText) || "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-a8dbe69e.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-bd5ec3bf.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-59f422f8.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-f6235ff3.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-eca63ced.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-5be9b4ce.mjs"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-f62fd568.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-99ccbba8.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-a39b0c4f.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-ab2a7c39.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-a628f36a.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-5cc4aa87.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-c1b41e5e.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-43928343.mjs") })),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(App, { ...props }) }) })
    );
  },
  progress: {
    color: "#4B5563"
  }
});
export {
  Fragment as F,
  jsx as a,
  jsxs as j
};
