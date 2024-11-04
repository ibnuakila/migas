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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-80913e1c.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-d133a86e.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-a0d75fbd.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-6ae7585d.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-35950052.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-d7014ad1.mjs"), "./Pages/Auth/sign-in.jsx": () => import("./assets/sign-in-719a7ea8.mjs"), "./Pages/Auth/sign-up.jsx": () => import("./assets/sign-up-3f7e1aed.mjs"), "./Pages/Beranda.jsx": () => import("./assets/Beranda-b91efb18.mjs"), "./Pages/Dashboard/dashboard.jsx": () => import("./assets/dashboard-c16a0d8a.mjs"), "./Pages/Dashboard/home.jsx": () => import("./assets/home-c3a59a32.mjs"), "./Pages/Dashboard/notifications.jsx": () => import("./assets/notifications-c756a25e.mjs"), "./Pages/Dashboard/profile.jsx": () => import("./assets/profile-c3864f65.mjs"), "./Pages/Dashboard/tables.jsx": () => import("./assets/tables-3cb4872b.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-e92b56f9.mjs"), "./Pages/EvaluasiAkip/FormUpload.jsx": () => import("./assets/FormUpload-c0027a0d.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-8fd85803.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-bf0dfcda.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-2d81ab77.mjs"), "./Pages/HitungKompositor/FormHitungKompositor.jsx": () => import("./assets/FormHitungKompositor-6da4bcda.mjs"), "./Pages/HitungKompositor/ListHitungKompositor.jsx": () => import("./assets/ListHitungKompositor-7544bfce.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-5dfc8a5c.mjs"), "./Pages/Indeks/EditIndeks.jsx": () => import("./assets/EditIndeks-6407c221.mjs"), "./Pages/Indeks/FormIndeks.jsx": () => import("./assets/FormIndeks-1e1e292a.mjs"), "./Pages/Indeks/ListIndeks.jsx": () => import("./assets/ListIndeks-dd725c4e.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-efa02382.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-b3fec201.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-57811543.mjs"), "./Pages/IndikatorKompositor/EditKompositor.jsx": () => import("./assets/EditKompositor-d4b9b4e2.mjs"), "./Pages/IndikatorKompositor/FormKompositor.jsx": () => import("./assets/FormKompositor-3cc672e9.mjs"), "./Pages/IndikatorKompositor/ListIndikatorKompositor.jsx": () => import("./assets/ListIndikatorKompositor-bfec9520.mjs"), "./Pages/IndikatorPeriode/EditIndikatorPeriode.jsx": () => import("./assets/EditIndikatorPeriode-33baab14.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-eaf99e2f.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-ce3cd61c.mjs"), "./Pages/InputKinerja/EditKinerja.jsx": () => import("./assets/EditKinerja-e802c6d6.mjs"), "./Pages/InputRealisasi/EditRealisasi.jsx": () => import("./assets/EditRealisasi-f2d3b091.mjs"), "./Pages/InputRealisasi/FormRealisasi.jsx": () => import("./assets/FormRealisasi-d04493b2.mjs"), "./Pages/InputRealisasi/ListInputRealisasi.jsx": () => import("./assets/ListInputRealisasi-7f7cdd72.mjs"), "./Pages/InstrumentKinerja/FormKomponen.jsx": () => import("./assets/FormKomponen-6a254bf9.mjs"), "./Pages/InstrumentKinerja/FormSubKomponen.jsx": () => import("./assets/FormSubKomponen-37b743f6.mjs"), "./Pages/InstrumentKinerja/ListKomponen.jsx": () => import("./assets/ListKomponen-15ef032c.mjs"), "./Pages/KategoriDokumen/ListKategoriDokumen.jsx": () => import("./assets/ListKategoriDokumen-63a1a389.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-91282516.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-df95f1ce.mjs"), "./Pages/LaporanCapaian/EditLaporanCapaian.jsx": () => import("./assets/EditLaporanCapaian-8f38a965.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-3738212d.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-bf018052.mjs"), "./Pages/Level/EditLevel.jsx": () => import("./assets/EditLevel-f11ee0b2.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-ba562b4b.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-f92917ed.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-c2f77bea.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-2c0d0721.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-3e70e39a.mjs"), "./Pages/Pic/EditPic.jsx": () => import("./assets/EditPic-48dd7739.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-9f5312af.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-46a19cd6.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-04e39d6e.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-361b76a4.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-9a80e196.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-9b301d77.mjs"), "./Pages/Role/FormRole.jsx": () => import("./assets/FormRole-5c515595.mjs"), "./Pages/Role/ListRole.jsx": () => import("./assets/ListRole-5cf4e6f6.mjs"), "./Pages/Satuan/EditSatuan.jsx": () => import("./assets/EditSatuan-40870614.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-8bbe62a1.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-515915f4.mjs"), "./Pages/SubTable.jsx": () => import("./assets/SubTable-ebc60172.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-00fd49de.mjs"), "./Pages/User/EditUser.jsx": () => import("./assets/EditUser-1c76c760.mjs"), "./Pages/User/FormUser.jsx": () => import("./assets/FormUser-f40cdfd6.mjs"), "./Pages/User/ListUser.jsx": () => import("./assets/ListUser-6f174064.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-4772f5f5.mjs"), "./Pages/_Dashboard.jsx": () => import("./assets/_Dashboard-14547b00.mjs") })),
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
