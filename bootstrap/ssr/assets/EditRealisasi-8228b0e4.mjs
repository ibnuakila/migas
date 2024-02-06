import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Alert, Card, CardHeader, Typography, CardBody, Input, Select, Option, Button, CardFooter } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import { M as MSelect } from "./MSelect-b6ab6650.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
import "react-select";
function EditRealisasi(props) {
  console.log(props);
  const auth = props.auth;
  const input_realisasi = props.input_realisasi;
  const laporan_capaian = props.laporan_capaian;
  const kompositor = props.kompositor;
  const realisasi_kompositor = props.realisasi_kompositor;
  const triwulans = props.triwulans;
  const periodes = props.periodes;
  const pics = props.pics;
  const defPics = props.def_pics;
  const flash = props.flash;
  const data_format = props.data_format;
  const { data, setData, put, errors, processing } = useForm({
    id: input_realisasi.id || "",
    kompositor_id: kompositor.id || "",
    input_realisasi_id: input_realisasi.id || "",
    realisasi: input_realisasi.realisasi == 0 ? realisasi_kompositor.nilai : null,
    realisasi_format: input_realisasi.realisasi_format || "",
    //nilai: realisasi_kompositor.nilai || '',
    triwulan_id: input_realisasi.triwulan_id || "",
    periode_id: laporan_capaian.periode_id || "",
    laporan_capaian_id: input_realisasi.laporan_capaian_id || "",
    pics: defPics
  });
  console.log(data);
  const [optionTriwulan, setOptionTriwulan] = useState("");
  useState("");
  const [optionPeriode, setOptionPeriode] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [realisasFormat, setRealisasiFormat] = useState("");
  const [isAgregasi, setIsAgregasi] = useState(kompositor.jenis_kompositor_id == 2 ? true : false);
  const [isParameter, setIsParameter] = useState(kompositor.jenis_kompositor_id == 3 ? true : false);
  const [isOfKompositor, setIsOfKompositor] = useState(kompositor.jenis_kompositor_id == 4 ? true : false);
  const [open, setOpen] = useState(true);
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  const handleSave = (e) => {
    e.preventDefault();
    put(route("input-realisasi.update", input_realisasi.id));
  };
  function handleChangeTriwulan(e) {
    setOptionTriwulan({ selectValue: e });
    setData("triwulan_id", e);
    console.log(optionTriwulan);
  }
  function handleChangePeriode(e) {
    setOptionPeriode({ selectValue: e });
    setData("periode_id", e);
    console.log(optionPeriode);
  }
  function handleChangeRealisasi(e) {
    console.log("handleChangeRealisasi triggered");
    setData("realisasi", parseFloat(e.target.value).toFixed(2));
  }
  function handleCalculate() {
    if (confirm("Apakah Anda ingin mengkalkulasi realisasi?")) {
      if (isAgregasi) {
        axios.post(
          route("input-realisasi.calculate-realization"),
          { input_realisasi_id: input_realisasi.id, realisasi_kompositor_id: realisasi_kompositor.id }
        ).then((res) => {
          console.log(res);
          if (res.message != "") {
            alert(res.data.realisasi);
            let realisasi = document.getElementById("realisasi");
            realisasi.value = parseFloat(res.data.realisasi).toLocaleString(void 0, { maximumFractionDigits: 2 });
            setData("realisasi", parseFloat(res.data.realisasi).toLocaleString(void 0, { maximumFractionDigits: 2 }));
          }
        }).catch((err) => {
          if (err.response) {
            alert("Error: " + err.response.data.message);
          } else if (err.request) {
            alert(err.request);
          } else {
            alert(err.message);
          }
        });
      } else if (isParameter) {
        axios.get(
          route("kompositor.getparameter", kompositor.id),
          { kompositor_id: kompositor.id }
        ).then((res) => {
          if (res.data.response) {
            let realisasi = document.getElementById("realisasi");
            realisasi.value = parseFloat(res.data.value).toLocaleString(void 0, { maximumFractionDigits: 2 });
            setData("realisasi", parseFloat(res.data.realisasi).toLocaleString(void 0, { maximumFractionDigits: 2 }));
            console.log(data);
          }
        }).catch((err) => {
          if (err.response) {
            alert("Error: " + err.response.data.message);
          } else if (err.request) {
            alert(err.request);
          } else {
            alert(err.message);
          }
        });
      } else if (isOfKompositor) {
        axios.get(
          route("kompositor.getofkompositor", kompositor.id),
          { kompositor_id: kompositor.id }
        ).then((res) => {
          if (res.data.response) {
            let realisasi = document.getElementById("realisasi");
            realisasi.value = parseFloat(res.data.value).toLocaleString(void 0, { maximumFractionDigits: 2 });
            setData("realisasi", parseFloat(res.data.realisasi).toLocaleString(void 0, { maximumFractionDigits: 2 }));
            console.log(data);
          }
        }).catch((err) => {
          if (err.response) {
            alert("Error: " + err.response.data.message);
          } else if (err.request) {
            alert(err.request);
          } else {
            alert(err.message);
          }
        });
      }
    }
  }
  function Icon() {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 2,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          }
        )
      }
    );
  }
  const handleChangeRealisasiFormat = (e) => {
    setRealisasiFormat({ selectValue: e });
    setData("realisasi_format", e);
  };
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
        flash.message && /* @__PURE__ */ jsx(
          Alert,
          {
            open,
            icon: /* @__PURE__ */ jsx(Icon, {}),
            onClose: () => setOpen(false),
            color: "black",
            className: "my-3 shadow-lg",
            children: flash.message
          }
        ),
        /* @__PURE__ */ jsx(Card, { className: "p-5 h-full w-45", children: /* @__PURE__ */ jsxs("form", { action: "", children: [
          /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Input Realisasi" }) }),
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Kompositor",
                  variant: "outlined",
                  id: "nama-indikator",
                  defaultValue: kompositor.nama_kompositor
                }
              ),
              errors.kompositor_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kompositor_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Satuan",
                  variant: "outlined",
                  id: "satuan",
                  defaultValue: kompositor.satuan,
                  error: errors.satuan
                }
              ),
              errors.satuan && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.satuan })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Triwulan",
                  id: "indeks",
                  onChange: handleChangeTriwulan,
                  value: input_realisasi.triwulan_id,
                  error: errors.triwulan_id,
                  children: triwulans.map(({ id, triwulan }) => /* @__PURE__ */ jsx(Option, { value: id, children: triwulan }, id))
                }
              ),
              errors.triwulan_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.triwulan_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Realisasi",
                  variant: "outlined",
                  id: "realisasi",
                  defaultValue: realisasi_kompositor.nilai,
                  onChange: handleChangeRealisasi,
                  error: errors.realisasi,
                  className: "pr-20",
                  containerProps: {
                    className: "min-w-0"
                  }
                }
              ),
              kompositor.jenis_kompositor_id == 2 ? /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  color: "blue",
                  className: "!absolute right-1 top-1 rounded",
                  onClick: handleCalculate,
                  children: "Get Agregasi"
                }
              ) : "",
              kompositor.jenis_kompositor_id == 3 ? /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  color: "blue",
                  className: "!absolute right-1 top-1 rounded",
                  onClick: handleCalculate,
                  children: "Get Parameter"
                }
              ) : "",
              kompositor.jenis_kompositor_id == 4 ? /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  color: "blue",
                  className: "!absolute right-1 top-1 rounded",
                  onClick: handleCalculate,
                  children: "Get Value"
                }
              ) : "",
              errors.realisasi && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.realisasi })
            ] }),
            isAgregasi ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Realisasi Format",
                  onChange: handleChangeRealisasiFormat,
                  defaultValue: input_realisasi.realisasi_format,
                  error: errors.realisasi_format,
                  children: data_format.map(({ id, format }) => /* @__PURE__ */ jsx(Option, { value: id, children: format }, id))
                }
              ),
              errors.realisasi_format && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.realisasi_format })
            ] }) : null,
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                MSelect,
                {
                  id: "pic",
                  options: optPic,
                  defaultValue: defPics,
                  onChange: (item) => {
                    setSelectedValue(item);
                    setData("pics", item);
                    console.log(selectedValue);
                  }
                }
              ),
              errors.pic_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pic_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Periode",
                  id: "periode",
                  onChange: handleChangePeriode,
                  value: laporan_capaian.periode_id,
                  error: errors.periode_id,
                  children: periodes.map(({ id, periode }) => /* @__PURE__ */ jsx(Option, { value: id, children: periode }, id))
                }
              ),
              errors.periode_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.periode_id })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(e), children: "Delete" }),
            /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
          ] })
        ] }) })
      ] })
    }
  );
}
export {
  EditRealisasi as default
};
