import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Alert, Card, CardHeader, Typography, CardBody, Input, Button, Select, Option, CardFooter } from "@material-tailwind/react";
import { usePage, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-7e633fb5.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function EditLaporanCapaian() {
  const { auth, laporan_capaian, indikator, kinerja, triwulans, data_format, flash } = usePage().props;
  console.log(usePage().props);
  const { data, setData, put, errors, processing } = useForm({
    id: kinerja.id || "",
    triwulan_id: kinerja.triwulan_id || "",
    kinerja: kinerja.kinerja || "",
    laporan_capaian_id: kinerja.laporan_capaian_id || "",
    kinerja_format: kinerja.kinerja_format || ""
  });
  const [open, setOpen] = useState(true);
  useState("");
  useState("");
  const [kinerjaFormat, setKinerjaFormat] = useState("");
  const [optionTriwulan, setOptionTriwulan] = useState([]);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("input-kinerja.update", kinerja.id));
  };
  const handleTriwulanChange = (e) => {
    setOptionTriwulan({ selectValue: e });
    setData("triwulan_id", e);
  };
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data kompositor?")) {
      destroy(route("input-kinerja.destroy", laporan_capaian.id));
    }
  };
  function handleCalculate() {
    if (confirm("Apakah Anda ingin mengkalkulasi kinerja?")) {
      axios.post(route("input-kinerja.calculate-kinerja"), { laporan_capaian_id: laporan_capaian.id, triwulan_id: kinerja.triwulan_id }).then((res) => {
        console.log(res);
        if (res.data.response !== "") {
          alert(res.data.kinerja);
          let kinerja2 = document.getElementById("kinerja");
          kinerja2.value = res.data.kinerja;
          setData("kinerja", res.data.kinerja);
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
  const handleChangeKinerjaFormat = (e) => {
    setKinerjaFormat({ selectValue: e });
    setData("kinerja_format", e);
  };
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
        /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
          /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Edit Kinerja" }) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
            /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Indikator",
                  variant: "outlined",
                  id: "indikator",
                  value: indikator.nama_indikator
                }
              ),
              errors.indikator_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.indikator_id }),
              errors.target_format && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.target_format }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex w-full", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    label: "Kinerja",
                    variant: "outlined",
                    id: "kinerja",
                    defaultValue: kinerja.kinerja,
                    onChange: "",
                    error: errors.kinerja,
                    className: "pr-20",
                    containerProps: {
                      className: "min-w-0"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    color: "blue",
                    className: "!absolute right-1 top-1 rounded",
                    onClick: handleCalculate,
                    children: "Get"
                  }
                ),
                errors.kinerja && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kinerja })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    label: "Kinerja Format",
                    onChange: handleChangeKinerjaFormat,
                    value: kinerja.kinerja_format,
                    error: errors.kinerja_format,
                    children: data_format.map(({ id, format }) => /* @__PURE__ */ jsx(Option, { value: id, children: format }, id))
                  }
                ),
                errors.kinerja_format && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.kinerja_format })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    label: "Triwulan",
                    id: "indeks",
                    onChange: handleTriwulanChange,
                    value: kinerja.triwulan_id,
                    error: errors.triwulan_id,
                    children: triwulans.map(({ id, triwulan }) => /* @__PURE__ */ jsx(Option, { value: id, children: triwulan }, id))
                  }
                ),
                errors.triwulan_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.triwulan_id })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(), children: "Delete" }),
              /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: handleSave, children: "Save" })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  EditLaporanCapaian as default
};
