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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/AuditLogs/ListLog.jsx": () => import("./assets/ListLog-bfd5d3fc.mjs"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-8666510b.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-5bf6ab0e.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-bf7f84de.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-2adfd46a.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-fba64220.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-3d36e823.mjs"), "./Pages/Beranda.jsx": () => import("./assets/Beranda-33d51b8e.mjs"), "./Pages/Dashboard/dashboard.jsx": () => import("./assets/dashboard-a0947d6e.mjs"), "./Pages/Dashboard/home.jsx": () => import("./assets/home-c60b4361.mjs"), "./Pages/Dashboard/notifications.jsx": () => import("./assets/notifications-3915526d.mjs"), "./Pages/Dashboard/profile.jsx": () => import("./assets/profile-4ac43975.mjs"), "./Pages/Dashboard/tables.jsx": () => import("./assets/tables-241e52c0.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-bf8ef967.mjs"), "./Pages/EvaluasiAkip/FormUpload.jsx": () => import("./assets/FormUpload-dfb13ad7.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-4d145830.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-6fc1b504.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-7dd71b8b.mjs"), "./Pages/HitungKompositor/FormHitungKompositor.jsx": () => import("./assets/FormHitungKompositor-7b1423c8.mjs"), "./Pages/HitungKompositor/ListHitungKompositor.jsx": () => import("./assets/ListHitungKompositor-341d8685.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-76a11a77.mjs"), "./Pages/Indeks/EditIndeks.jsx": () => import("./assets/EditIndeks-769cc7a5.mjs"), "./Pages/Indeks/FormIndeks.jsx": () => import("./assets/FormIndeks-e855d4f4.mjs"), "./Pages/Indeks/ListIndeks.jsx": () => import("./assets/ListIndeks-fef0b566.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-55d2650f.mjs"), "./Pages/Indikator/FormFormula.jsx": () => import("./assets/FormFormula-811df4ce.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-822c6cd5.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-a7149795.mjs"), "./Pages/IndikatorKompositor/EditKompositor.jsx": () => import("./assets/EditKompositor-150b3166.mjs"), "./Pages/IndikatorKompositor/FormKompositor.jsx": () => import("./assets/FormKompositor-c2abea96.mjs"), "./Pages/IndikatorKompositor/ListIndikatorKompositor.jsx": () => import("./assets/ListIndikatorKompositor-a89cc538.mjs"), "./Pages/IndikatorPeriode/EditIndikatorPeriode.jsx": () => import("./assets/EditIndikatorPeriode-42018db6.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-7381490c.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-2114866e.mjs"), "./Pages/InputKinerja/EditKinerja.jsx": () => import("./assets/EditKinerja-92d0e4d9.mjs"), "./Pages/InputRealisasi/EditRealisasi.jsx": () => import("./assets/EditRealisasi-f38f3fc2.mjs"), "./Pages/InputRealisasi/FormRealisasi.jsx": () => import("./assets/FormRealisasi-f3596a52.mjs"), "./Pages/InputRealisasi/ListInputRealisasi.jsx": () => import("./assets/ListInputRealisasi-26238f81.mjs"), "./Pages/InstrumentKinerja/FormKomponen.jsx": () => import("./assets/FormKomponen-c12eec90.mjs"), "./Pages/InstrumentKinerja/FormSubKomponen.jsx": () => import("./assets/FormSubKomponen-03ff1765.mjs"), "./Pages/InstrumentKinerja/ListKomponen.jsx": () => import("./assets/ListKomponen-dda764c4.mjs"), "./Pages/KategoriDokumen/ListKategoriDokumen.jsx": () => import("./assets/ListKategoriDokumen-4c3f0cc1.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-922af804.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-f0a87705.mjs"), "./Pages/LaporanCapaian/EditLaporanCapaian.jsx": () => import("./assets/EditLaporanCapaian-e5edd21c.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-76a0ae7f.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-aae59109.mjs"), "./Pages/Level/EditLevel.jsx": () => import("./assets/EditLevel-1379f1ad.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-831ee056.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-83fe6e9d.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-e3a6f25a.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-2743af46.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-818e2748.mjs"), "./Pages/Pic/EditPic.jsx": () => import("./assets/EditPic-5e3e45b9.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-3b6e788f.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-8992c7ec.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-c8f8e76b.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-fb69349b.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-b6841f53.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-2af94056.mjs"), "./Pages/Role/FormRole.jsx": () => import("./assets/FormRole-d6b6e8a3.mjs"), "./Pages/Role/ListRole.jsx": () => import("./assets/ListRole-b7d16d00.mjs"), "./Pages/Satuan/EditSatuan.jsx": () => import("./assets/EditSatuan-d7305145.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-8a48d435.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-fd4c337c.mjs"), "./Pages/SubTable.jsx": () => import("./assets/SubTable-5a8a4e2c.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-fcdfa1f2.mjs"), "./Pages/User/EditUser.jsx": () => import("./assets/EditUser-f975105b.mjs"), "./Pages/User/FormUser.jsx": () => import("./assets/FormUser-a4fa8075.mjs"), "./Pages/User/ListUser.jsx": () => import("./assets/ListUser-df008a29.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-1104828c.mjs"), "./Pages/_Dashboard.jsx": () => import("./assets/_Dashboard-9442d034.mjs") })),
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
  jsxs as a,
  setOpenSidenav as b,
  setSidenavColor as c,
  setSidenavType as d,
  setFixedNavbar as e,
  jsx as j,
  setOpenConfigurator as s,
  useMaterialTailwindController as u
};
