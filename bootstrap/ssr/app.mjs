var _a;
import * as jsxRuntime from "react/jsx-runtime";
import _ from "lodash";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import PropTypes from "prop-types";
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
const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";
function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false
  };
  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );
  return /* @__PURE__ */ jsx(MaterialTailwind.Provider, { value, children });
}
function useMaterialTailwindController() {
}
MaterialTailwindControllerProvider.displayName = "/context/index.jsx";
MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired
};
const setOpenSidenav = (dispatch, value) => dispatch({ type: "OPEN_SIDENAV", value });
const setSidenavType = (dispatch, value) => dispatch({ type: "SIDENAV_TYPE", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const appName = ((_a = window.document.getElementsByTagName("title")[0]) == null ? void 0 : _a.innerText) || "Application";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-80913e1c.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-d133a86e.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-a0d75fbd.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-6ae7585d.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-35950052.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-d7014ad1.mjs"), "./Pages/Beranda.jsx": () => import("./assets/Beranda-de96582f.mjs"), "./Pages/Dashboard/dashboard.jsx": () => import("./assets/dashboard-ff7f45e6.mjs"), "./Pages/Dashboard/home.jsx": () => import("./assets/home-dc13bc81.mjs"), "./Pages/Dashboard/notifications.jsx": () => import("./assets/notifications-c756a25e.mjs"), "./Pages/Dashboard/profile.jsx": () => import("./assets/profile-2ced5d4a.mjs"), "./Pages/Dashboard/tables.jsx": () => import("./assets/tables-5224d04a.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-22ec535f.mjs"), "./Pages/EvaluasiAkip/FormUpload.jsx": () => import("./assets/FormUpload-c0027a0d.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-4261dfaf.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-f76a2550.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-411ced30.mjs"), "./Pages/HitungKompositor/FormHitungKompositor.jsx": () => import("./assets/FormHitungKompositor-09ccb5c6.mjs"), "./Pages/HitungKompositor/ListHitungKompositor.jsx": () => import("./assets/ListHitungKompositor-f3c9eb4c.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-1e001eaf.mjs"), "./Pages/Indeks/EditIndeks.jsx": () => import("./assets/EditIndeks-e63b3e60.mjs"), "./Pages/Indeks/FormIndeks.jsx": () => import("./assets/FormIndeks-f7472de9.mjs"), "./Pages/Indeks/ListIndeks.jsx": () => import("./assets/ListIndeks-823a2189.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-ed0fdadb.mjs"), "./Pages/Indikator/FormFormula.jsx": () => import("./assets/FormFormula-4fae8679.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-65e0b4ab.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-de81a53c.mjs"), "./Pages/IndikatorKompositor/EditKompositor.jsx": () => import("./assets/EditKompositor-fce779be.mjs"), "./Pages/IndikatorKompositor/FormKompositor.jsx": () => import("./assets/FormKompositor-e0145aea.mjs"), "./Pages/IndikatorKompositor/ListIndikatorKompositor.jsx": () => import("./assets/ListIndikatorKompositor-186864b4.mjs"), "./Pages/IndikatorPeriode/EditIndikatorPeriode.jsx": () => import("./assets/EditIndikatorPeriode-782620eb.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-8821a815.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-b11805fa.mjs"), "./Pages/InputKinerja/EditKinerja.jsx": () => import("./assets/EditKinerja-4366ee81.mjs"), "./Pages/InputRealisasi/EditRealisasi.jsx": () => import("./assets/EditRealisasi-929bf453.mjs"), "./Pages/InputRealisasi/FormRealisasi.jsx": () => import("./assets/FormRealisasi-0add364a.mjs"), "./Pages/InputRealisasi/ListInputRealisasi.jsx": () => import("./assets/ListInputRealisasi-301752fd.mjs"), "./Pages/InstrumentKinerja/FormKomponen.jsx": () => import("./assets/FormKomponen-48cfe56a.mjs"), "./Pages/InstrumentKinerja/FormSubKomponen.jsx": () => import("./assets/FormSubKomponen-4ce08467.mjs"), "./Pages/InstrumentKinerja/ListKomponen.jsx": () => import("./assets/ListKomponen-b7cb2dcc.mjs"), "./Pages/KategoriDokumen/ListKategoriDokumen.jsx": () => import("./assets/ListKategoriDokumen-aeb3bc6e.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-f5159006.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-c04b91a3.mjs"), "./Pages/LaporanCapaian/EditLaporanCapaian.jsx": () => import("./assets/EditLaporanCapaian-e99204cb.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-61a20727.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-1e9174ab.mjs"), "./Pages/Level/EditLevel.jsx": () => import("./assets/EditLevel-b54a40d6.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-5e3ae6b8.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-919c423c.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-3bbfd3d1.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-f74a0405.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-6991990d.mjs"), "./Pages/Pic/EditPic.jsx": () => import("./assets/EditPic-83a23968.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-7c381686.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-f618a05d.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-12136564.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-361b76a4.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-9a80e196.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-9b301d77.mjs"), "./Pages/Role/FormRole.jsx": () => import("./assets/FormRole-d976643c.mjs"), "./Pages/Role/ListRole.jsx": () => import("./assets/ListRole-2e2cc445.mjs"), "./Pages/Satuan/EditSatuan.jsx": () => import("./assets/EditSatuan-c42c1892.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-266e4565.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-b867a6b3.mjs"), "./Pages/SubTable.jsx": () => import("./assets/SubTable-ebc60172.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-00fd49de.mjs"), "./Pages/User/EditUser.jsx": () => import("./assets/EditUser-c2508970.mjs"), "./Pages/User/FormUser.jsx": () => import("./assets/FormUser-2c3aa38a.mjs"), "./Pages/User/ListUser.jsx": () => import("./assets/ListUser-d5f24489.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-4772f5f5.mjs"), "./Pages/_Dashboard.jsx": () => import("./assets/_Dashboard-14547b00.mjs") })),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(MaterialTailwindControllerProvider, { children: /* @__PURE__ */ jsx(App, { ...props }) }) }) })
    );
  },
  progress: {
    color: "#4B5563"
  }
});
export {
  Fragment as F,
  jsx as a,
  setOpenSidenav as b,
  setSidenavColor as c,
  setSidenavType as d,
  setFixedNavbar as e,
  jsxs as j,
  setOpenConfigurator as s,
  useMaterialTailwindController as u
};
