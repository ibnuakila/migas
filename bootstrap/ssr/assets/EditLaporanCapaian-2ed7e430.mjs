import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Select, Option, Input, CardFooter, Button } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { M as MSelect } from "./MSelect-b6ab6650.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "react-select";
function EditLaporanCapaian() {
  const { auth, laporan_capaian, indikators, indikator_periode, periodes, triwulans, pics } = usePage().props;
  let real = parseFloat(laporan_capaian.data[0].realisasi);
  const defPics = usePage().props.laporan_capaian.data[0].laporan_capaian_pic;
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  const defPic = defPics.map((pic) => {
    return { value: pic.pic_id, label: pic.nama_pic };
  });
  const { data, setData, put, errors, processing } = useForm({
    id: laporan_capaian.data[0].id || "",
    //indikator_periode_id: laporan_capaian.data.indikator_periode_id || '',
    triwulan_id: laporan_capaian.data[0].triwulan_id || "",
    realisasi: real.toFixed(2) || "",
    kinerja: laporan_capaian.data[0].kinerja || "",
    periode_id: laporan_capaian.data[0].periode_id || "",
    kategori_kinerja_id: laporan_capaian.data[0].kategori_kinerja_id || "",
    indikator_id: laporan_capaian.data[0].indikator_id || "",
    target: laporan_capaian.data[0].target || "",
    target_format: laporan_capaian.data[0].target_format || "",
    persentasi_kinerja: laporan_capaian.data[0].persentasi_kinerja || "",
    sumber_data: laporan_capaian.data[0].sumber_data || "",
    file_path: laporan_capaian.data[0].file_path || "",
    laporan_capaian_pic: defPics || ""
    //pics: optPic || ''
  });
  console.log(usePage().props);
  const [optionPeriode, setOptionPeriode] = useState("");
  const [optionIndikator, setOptionIndikator] = useState("");
  const [optionPic, setOptionPic] = useState([]);
  useState([]);
  useState([]);
  const [targetFormat, setTargetFormat] = useState([]);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("laporan-capaian.update", laporan_capaian.data[0].id));
  };
  const handlePeriodeChange = (e) => {
    setOptionPeriode({ selectValue: e });
    setData("periode_id", e);
  };
  const handleIndikatorChange = (e) => {
    setOptionIndikator({ selectValue: e });
    setData("indikator_id", e);
  };
  const handleTargetFormatChange = (e) => {
    setTargetFormat({ selectValue: e });
    setData("target_format", e);
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Edit Laporan Capaian" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx(
              Select,
              {
                label: "Select Periode",
                id: "periode",
                onChange: handlePeriodeChange,
                value: laporan_capaian.data[0].periode_id,
                error: errors.periode_id,
                children: periodes.map(({ id, periode, status }) => /* @__PURE__ */ jsx(Option, { value: id, children: periode + " (" + status + ")" }, id))
              }
            ),
            errors.periode_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.periode_id }),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Indikator",
                variant: "outlined",
                id: "indikator",
                onChange: handleIndikatorChange,
                value: laporan_capaian.data[0].indikator.nama_indikator
              }
            ),
            errors.indikator_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indikator_id }),
            /* @__PURE__ */ jsx(
              MSelect,
              {
                options: optPic,
                defaultValue: defPic,
                label: "Pic",
                onChange: (item) => {
                  setOptionPic(item);
                  setData("laporan_capaian_pic", item);
                }
              }
            ),
            errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id }),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Target",
                variant: "outlined",
                id: "target",
                defaultValue: laporan_capaian.data[0].target,
                onChange: (e) => setData("target", e.target.value),
                error: errors.target
              }
            ),
            errors.target && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.target }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Format Target",
                onChange: handleTargetFormatChange,
                defaultValue: laporan_capaian.data[0].target_format,
                error: errors.target_format,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "Decimal", children: "Decimal" }),
                  /* @__PURE__ */ jsx(Option, { value: "Persentase", children: "Persentase" })
                ]
              }
            ),
            errors.target_format && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.target_format }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                label: "Kategori Kinerja",
                onChange: "",
                defaultValue: "",
                error: errors.kategori_kinerja_id,
                children: [
                  /* @__PURE__ */ jsx(Option, { value: "undefined", children: "Undefined" }),
                  /* @__PURE__ */ jsx(Option, { value: "Minimize", children: "Minimize" }),
                  /* @__PURE__ */ jsx(Option, { value: "Maximize", children: "Maximize" })
                ]
              }
            ),
            errors.kategori_kinerja_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kategori_kinerja_id }),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Kinerja Tahunan",
                variant: "outlined",
                id: "kinerja-tahunan",
                onChange: (e) => {
                  setData("kinerja", e.target.value);
                },
                error: errors.kinerja
              }
            ),
            errors.kinerja && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kinerja }),
            /* @__PURE__ */ jsx(
              Input,
              {
                label: "Sumber Data",
                variant: "outlined",
                id: "periode",
                onChange: (e) => {
                  setData("Periode", e.target.value);
                },
                error: errors.sumber_data
              }
            ),
            errors.sumber_data && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.sumber_data })
          ] }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(e), children: "Delete" }),
            /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
          ] })
        ] })
      ] }) })
    }
  );
}
export {
  EditLaporanCapaian as default
};
