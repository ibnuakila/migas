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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-8845ee4a.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-df789701.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-c7226f7c.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-17fd31c6.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-8c15c276.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-f44bb5a7.mjs"), "./Pages/Beranda.jsx": () => import("./assets/Beranda-f7046aa0.mjs"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-a95afc07.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-c0c6091b.mjs"), "./Pages/EvaluasiAkip/FormUpload.jsx": () => import("./assets/FormUpload-b2bde065.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-b6a0f8d7.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-3b99e83c.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-e8e89a10.mjs"), "./Pages/HitungKompositor/FormHitungKompositor.jsx": () => import("./assets/FormHitungKompositor-60cfc6b5.mjs"), "./Pages/HitungKompositor/ListHitungKompositor.jsx": () => import("./assets/ListHitungKompositor-5f9752f6.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-48dd1664.mjs"), "./Pages/Indeks/EditIndeks.jsx": () => import("./assets/EditIndeks-fa6ebc00.mjs"), "./Pages/Indeks/FormIndeks.jsx": () => import("./assets/FormIndeks-2e0de4a1.mjs"), "./Pages/Indeks/ListIndeks.jsx": () => import("./assets/ListIndeks-9c7a26a5.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-280dc21b.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-6d82fcde.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-91a7584d.mjs"), "./Pages/IndikatorKompositor/EditKompositor.jsx": () => import("./assets/EditKompositor-64202a2d.mjs"), "./Pages/IndikatorKompositor/FormKompositor.jsx": () => import("./assets/FormKompositor-d244c85b.mjs"), "./Pages/IndikatorKompositor/ListIndikatorKompositor.jsx": () => import("./assets/ListIndikatorKompositor-42a0b199.mjs"), "./Pages/IndikatorPeriode/EditIndikatorPeriode.jsx": () => import("./assets/EditIndikatorPeriode-27d05df6.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-b0355d8f.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-01789355.mjs"), "./Pages/InputKinerja/EditKinerja.jsx": () => import("./assets/EditKinerja-bbc2cd31.mjs"), "./Pages/InputRealisasi/EditRealisasi.jsx": () => import("./assets/EditRealisasi-8228b0e4.mjs"), "./Pages/InputRealisasi/FormRealisasi.jsx": () => import("./assets/FormRealisasi-576c3195.mjs"), "./Pages/InputRealisasi/ListInputRealisasi.jsx": () => import("./assets/ListInputRealisasi-903d8e82.mjs"), "./Pages/InstrumentKinerja/FormKomponen.jsx": () => import("./assets/FormKomponen-91be4d21.mjs"), "./Pages/InstrumentKinerja/FormSubKomponen.jsx": () => import("./assets/FormSubKomponen-9b0fc862.mjs"), "./Pages/InstrumentKinerja/ListKomponen.jsx": () => import("./assets/ListKomponen-1fd5b3f3.mjs"), "./Pages/KategoriDokumen/ListKategoriDokumen.jsx": () => import("./assets/ListKategoriDokumen-d6c68224.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-88defe64.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-03cc857e.mjs"), "./Pages/LaporanCapaian/EditLaporanCapaian.jsx": () => import("./assets/EditLaporanCapaian-2ed7e430.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-2f7c7520.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-bc6c63ea.mjs"), "./Pages/Level/EditLevel.jsx": () => import("./assets/EditLevel-ee9cffa3.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-0be1356a.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-0519997d.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-5534b24c.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-08dd820c.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-e8daaa3d.mjs"), "./Pages/Pic/EditPic.jsx": () => import("./assets/EditPic-662eafac.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-35854cb0.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-bb850a26.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-00e70818.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-a628f36a.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-5cc4aa87.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-c1b41e5e.mjs"), "./Pages/Role/FormRole.jsx": () => import("./assets/FormRole-df2f7db1.mjs"), "./Pages/Role/ListRole.jsx": () => import("./assets/ListRole-cbcc53b8.mjs"), "./Pages/Satuan/EditSatuan.jsx": () => import("./assets/EditSatuan-8825b359.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-f3e9f1cf.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-b884ed85.mjs"), "./Pages/SubTable.jsx": () => import("./assets/SubTable-22a7cd89.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-f0577547.mjs"), "./Pages/User/EditUser.jsx": () => import("./assets/EditUser-b8f0a24f.mjs"), "./Pages/User/FormUser.jsx": () => import("./assets/FormUser-2d6d82f1.mjs"), "./Pages/User/ListUser.jsx": () => import("./assets/ListUser-e6bc2a2e.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-43928343.mjs") })),
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
