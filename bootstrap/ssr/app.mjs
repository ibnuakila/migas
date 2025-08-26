var _a;
import * as jsxRuntime from "react/jsx-runtime";
import _ from "lodash";
import axios from "axios";
/* empty css       */import { createRoot } from "react-dom/client";
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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-3148eab7.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-cb5ace9a.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-fe4db6f4.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-0d3d7363.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-cd98cdc5.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-641b9adb.mjs"), "./Pages/Beranda.jsx": () => import("./assets/Beranda-20d6d041.mjs"), "./Pages/Dashboard/dashboard.jsx": () => import("./assets/dashboard-6d77b952.mjs"), "./Pages/Dashboard/home.jsx": () => import("./assets/home-1f48aad7.mjs"), "./Pages/Dashboard/notifications.jsx": () => import("./assets/notifications-28b20685.mjs"), "./Pages/Dashboard/profile.jsx": () => import("./assets/profile-7685e40a.mjs"), "./Pages/Dashboard/tables.jsx": () => import("./assets/tables-66501782.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-3db11501.mjs"), "./Pages/EvaluasiAkip/FormUpload.jsx": () => import("./assets/FormUpload-073dc5c2.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-34676875.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-f79b5857.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-d0b87b38.mjs"), "./Pages/HitungKompositor/FormHitungKompositor.jsx": () => import("./assets/FormHitungKompositor-d31f1dd4.mjs"), "./Pages/HitungKompositor/ListHitungKompositor.jsx": () => import("./assets/ListHitungKompositor-d3d1e585.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-1e11b4a5.mjs"), "./Pages/Indeks/EditIndeks.jsx": () => import("./assets/EditIndeks-f6638d97.mjs"), "./Pages/Indeks/FormIndeks.jsx": () => import("./assets/FormIndeks-4be0b9d4.mjs"), "./Pages/Indeks/ListIndeks.jsx": () => import("./assets/ListIndeks-c2c0fe01.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-52e605da.mjs"), "./Pages/Indikator/FormFormula.jsx": () => import("./assets/FormFormula-1fabf2a9.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-a98234b7.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-ed3a4d7b.mjs"), "./Pages/IndikatorKompositor/EditKompositor.jsx": () => import("./assets/EditKompositor-fb2119af.mjs"), "./Pages/IndikatorKompositor/FormKompositor.jsx": () => import("./assets/FormKompositor-06abf971.mjs"), "./Pages/IndikatorKompositor/ListIndikatorKompositor.jsx": () => import("./assets/ListIndikatorKompositor-cf452290.mjs"), "./Pages/IndikatorPeriode/EditIndikatorPeriode.jsx": () => import("./assets/EditIndikatorPeriode-7675f1a8.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-ac3be214.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-67643a50.mjs"), "./Pages/InputKinerja/EditKinerja.jsx": () => import("./assets/EditKinerja-2e617062.mjs"), "./Pages/InputRealisasi/EditRealisasi.jsx": () => import("./assets/EditRealisasi-78f183e5.mjs"), "./Pages/InputRealisasi/FormRealisasi.jsx": () => import("./assets/FormRealisasi-3d6e98fd.mjs"), "./Pages/InputRealisasi/ListInputRealisasi.jsx": () => import("./assets/ListInputRealisasi-7cf06386.mjs"), "./Pages/InstrumentKinerja/FormKomponen.jsx": () => import("./assets/FormKomponen-0e191480.mjs"), "./Pages/InstrumentKinerja/FormSubKomponen.jsx": () => import("./assets/FormSubKomponen-1722cdea.mjs"), "./Pages/InstrumentKinerja/ListKomponen.jsx": () => import("./assets/ListKomponen-af94a19a.mjs"), "./Pages/KategoriDokumen/ListKategoriDokumen.jsx": () => import("./assets/ListKategoriDokumen-d67062b3.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-57f92539.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-b214ae8d.mjs"), "./Pages/LaporanCapaian/EditLaporanCapaian.jsx": () => import("./assets/EditLaporanCapaian-d16d50cd.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-a71ccd96.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-82111ef2.mjs"), "./Pages/Level/EditLevel.jsx": () => import("./assets/EditLevel-cbad62d7.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-680bec5c.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-d04234e8.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-3e0e364b.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-bcb6eaad.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-1ff629e0.mjs"), "./Pages/Pic/EditPic.jsx": () => import("./assets/EditPic-36d01131.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-c1e98c33.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-c0c1da08.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-9b253b55.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-1c05914e.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-718e0751.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-5e91625a.mjs"), "./Pages/Role/FormRole.jsx": () => import("./assets/FormRole-05e696b1.mjs"), "./Pages/Role/ListRole.jsx": () => import("./assets/ListRole-a9af892a.mjs"), "./Pages/Satuan/EditSatuan.jsx": () => import("./assets/EditSatuan-bc28a240.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-2a59556c.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-26aa25d6.mjs"), "./Pages/SubTable.jsx": () => import("./assets/SubTable-e17a5ae6.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-ae310737.mjs"), "./Pages/User/EditUser.jsx": () => import("./assets/EditUser-4782195a.mjs"), "./Pages/User/FormUser.jsx": () => import("./assets/FormUser-f1713e5e.mjs"), "./Pages/User/ListUser.jsx": () => import("./assets/ListUser-c48b42e3.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-7e85c0b6.mjs"), "./Pages/_Dashboard.jsx": () => import("./assets/_Dashboard-ce957f81.mjs") })),
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
