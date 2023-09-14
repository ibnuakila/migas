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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-9200d8fe.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-2c2726fe.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-6b6494cd.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-f9940845.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-d67c3d59.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-373b8c0c.mjs"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-55e29b27.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-2a4878a6.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-cf4da83e.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-34d8a10d.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-dd76c62d.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-4be97099.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-9773a957.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-21efd6b6.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-da6abeb7.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-a2aab2db.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-ecd71bd1.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-de09a83d.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-b949abde.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-475e5f07.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-1723bab0.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-aa5d142d.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-0a25e3d9.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-2e30115a.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-767a55fb.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-66e056b0.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-e698109e.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-bb5456fe.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-89cbc5c3.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-a628f36a.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-5cc4aa87.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-c1b41e5e.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-a752e1a0.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-8d059823.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-0e6f2ced.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-43928343.mjs") })),
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
