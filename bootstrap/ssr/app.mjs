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
const appName = ((_a = window.document.getElementsByTagName("title")[0]) == null ? void 0 : _a.innerText) || "Application";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-8845ee4a.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-df789701.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-c7226f7c.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-17fd31c6.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-8c15c276.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-f44bb5a7.mjs"), "./Pages/Beranda.jsx": () => import("./assets/Beranda-5ef1c7fc.mjs"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-a95afc07.mjs"), "./Pages/EvaluasiAkip/FormEvaluasiAkip.jsx": () => import("./assets/FormEvaluasiAkip-a6ca791a.mjs"), "./Pages/EvaluasiAkip/FormUpload.jsx": () => import("./assets/FormUpload-b2bde065.mjs"), "./Pages/EvaluasiAkip/ListEvaluasiAkip.jsx": () => import("./assets/ListEvaluasiAkip-c5df707f.mjs"), "./Pages/HasilEvaluasi/FormHasilEvaluasi.jsx": () => import("./assets/FormHasilEvaluasi-6822c1b9.mjs"), "./Pages/HasilEvaluasi/ListHasilEvaluasi.jsx": () => import("./assets/ListHasilEvaluasi-3c469964.mjs"), "./Pages/HitungKompositor/FormHitungKompositor.jsx": () => import("./assets/FormHitungKompositor-8b2f7b39.mjs"), "./Pages/HitungKompositor/ListHitungKompositor.jsx": () => import("./assets/ListHitungKompositor-1f4ac3c0.mjs"), "./Pages/Home.jsx": () => import("./assets/Home-3de42f52.mjs"), "./Pages/Indeks/EditIndeks.jsx": () => import("./assets/EditIndeks-126979dc.mjs"), "./Pages/Indeks/FormIndeks.jsx": () => import("./assets/FormIndeks-056e9752.mjs"), "./Pages/Indeks/ListIndeks.jsx": () => import("./assets/ListIndeks-11875928.mjs"), "./Pages/Indikator/EditIndikator.jsx": () => import("./assets/EditIndikator-bf9cb229.mjs"), "./Pages/Indikator/FormIndikator.jsx": () => import("./assets/FormIndikator-f68a3fb4.mjs"), "./Pages/Indikator/ListIndikator.jsx": () => import("./assets/ListIndikator-3aa1db41.mjs"), "./Pages/IndikatorKompositor/EditKompositor.jsx": () => import("./assets/EditKompositor-942c709d.mjs"), "./Pages/IndikatorKompositor/FormKompositor.jsx": () => import("./assets/FormKompositor-486584dd.mjs"), "./Pages/IndikatorKompositor/ListIndikatorKompositor.jsx": () => import("./assets/ListIndikatorKompositor-8046e247.mjs"), "./Pages/IndikatorPeriode/EditIndikatorPeriode.jsx": () => import("./assets/EditIndikatorPeriode-69334a31.mjs"), "./Pages/IndikatorPeriode/FormIndikatorPeriode.jsx": () => import("./assets/FormIndikatorPeriode-a904fa8f.mjs"), "./Pages/IndikatorPeriode/ListIndikatorPeriode.jsx": () => import("./assets/ListIndikatorPeriode-99fcb3a4.mjs"), "./Pages/InputKinerja/EditKinerja.jsx": () => import("./assets/EditKinerja-bef7c767.mjs"), "./Pages/InputRealisasi/EditRealisasi.jsx": () => import("./assets/EditRealisasi-dfbfe406.mjs"), "./Pages/InputRealisasi/FormRealisasi.jsx": () => import("./assets/FormRealisasi-83d749b3.mjs"), "./Pages/InputRealisasi/ListInputRealisasi.jsx": () => import("./assets/ListInputRealisasi-e037e598.mjs"), "./Pages/InstrumentKinerja/FormKomponen.jsx": () => import("./assets/FormKomponen-4d4dda23.mjs"), "./Pages/InstrumentKinerja/FormSubKomponen.jsx": () => import("./assets/FormSubKomponen-9d9674db.mjs"), "./Pages/InstrumentKinerja/ListKomponen.jsx": () => import("./assets/ListKomponen-5358b337.mjs"), "./Pages/KategoriDokumen/ListKategoriDokumen.jsx": () => import("./assets/ListKategoriDokumen-0cebcc55.mjs"), "./Pages/KategoriKinerja/FormKategoriKinerja.jsx": () => import("./assets/FormKategoriKinerja-7562f998.mjs"), "./Pages/KategoriKinerja/ListKategoriKinerja.jsx": () => import("./assets/ListKategoriKinerja-72807660.mjs"), "./Pages/LaporanCapaian/EditLaporanCapaian.jsx": () => import("./assets/EditLaporanCapaian-8540506e.mjs"), "./Pages/LaporanCapaian/FormLaporanCapaian.jsx": () => import("./assets/FormLaporanCapaian-ffa67d0e.mjs"), "./Pages/LaporanCapaian/ListLaporanCapaian.jsx": () => import("./assets/ListLaporanCapaian-8e6ecc13.mjs"), "./Pages/Level/EditLevel.jsx": () => import("./assets/EditLevel-2ee8ad97.mjs"), "./Pages/Level/FormLevel.jsx": () => import("./assets/FormLevel-c4a6805f.mjs"), "./Pages/Level/ListLevel.jsx": () => import("./assets/ListLevel-e7d730ab.mjs"), "./Pages/Periode/EditPeriode.jsx": () => import("./assets/EditPeriode-1e0a784a.mjs"), "./Pages/Periode/FormPeriode.jsx": () => import("./assets/FormPeriode-c49fbbb0.mjs"), "./Pages/Periode/ListPeriode.jsx": () => import("./assets/ListPeriode-81161826.mjs"), "./Pages/Pic/EditPic.jsx": () => import("./assets/EditPic-711ed156.mjs"), "./Pages/Pic/FormPic.jsx": () => import("./assets/FormPic-dae6ced2.mjs"), "./Pages/Pic/ListPic.jsx": () => import("./assets/ListPic-bb5d7d6f.mjs"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-c3de85e9.mjs"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-a628f36a.mjs"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-5cc4aa87.mjs"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-c1b41e5e.mjs"), "./Pages/Role/FormRole.jsx": () => import("./assets/FormRole-8463fee1.mjs"), "./Pages/Role/ListRole.jsx": () => import("./assets/ListRole-2c9d7600.mjs"), "./Pages/Satuan/EditSatuan.jsx": () => import("./assets/EditSatuan-4a96ecef.mjs"), "./Pages/Satuan/FormSatuan.jsx": () => import("./assets/FormSatuan-b747ba8d.mjs"), "./Pages/Satuan/ListSatuan.jsx": () => import("./assets/ListSatuan-1e79aeaa.mjs"), "./Pages/SubTable.jsx": () => import("./assets/SubTable-22a7cd89.mjs"), "./Pages/Test.jsx": () => import("./assets/Test-f0577547.mjs"), "./Pages/User/EditUser.jsx": () => import("./assets/EditUser-6ee21975.mjs"), "./Pages/User/FormUser.jsx": () => import("./assets/FormUser-afd7805c.mjs"), "./Pages/User/ListUser.jsx": () => import("./assets/ListUser-b64ac480.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-43928343.mjs") })),
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
