import { a as jsx, j as jsxs } from "../app.mjs";
import { useState } from "react";
import { Card, CardHeader, Typography, CardBody, Input, Select, Option, CardFooter, Button } from "@material-tailwind/react";
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
function EditIndikator() {
  const { auth, indikator, satuans, levels, parents, pics, def_pics } = usePage().props;
  const defPic = def_pics.map((pic) => {
    return { value: pic.pic_id, label: pic.nama_pic };
  });
  const { data, setData, put, errors, delete: destroy, processing } = useForm({
    id: indikator.data.id || "",
    indikator_id: indikator.data.id || "",
    nama_indikator: indikator.data.nama_indikator || "",
    satuan_id: indikator.data.satuan_id || "",
    level_id: indikator.data.level_id || "",
    parent_id: indikator.data.parent_id || "0",
    ordering: indikator.data.ordering || "",
    numbering: indikator.data.numbering || "",
    pics: defPic || ""
  });
  const [option, setOption] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  console.log(usePage().props);
  const handleSave = (e) => {
    e.preventDefault();
    put(route("indikator.update", indikator.data.id));
  };
  function handleChangeSatuan(e) {
    setOption({ selectValue: e });
    setData("satuan_id", e);
  }
  function handleChangeLevel(e) {
    setOption({ selectValue: e });
    setData("level_id", e);
  }
  function handleChangeParent(e) {
    setOption({ selectValue: e });
    setData("parent_id", e);
  }
  const handleDestroy = (e) => {
    if (confirm("Apakah Anda yakin akan menghapus data indikator?")) {
      destroy(route("indikator.destroy", indikator.data.id));
    }
  };
  const optPic = pics.map((pic) => {
    return { value: pic.id, label: pic.nama_pic };
  });
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      auth,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-5 h-full w-45", children: [
        /* @__PURE__ */ jsx(CardHeader, { variant: "gradient", color: "blue-gray", className: "mb-4 grid h-20 place-items-center", children: /* @__PURE__ */ jsx(Typography, { variant: "h4", color: "white", children: "Update Indikator" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, children: [
          /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap flex-col place-content-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Indikator",
                  variant: "outlined",
                  id: "Periode",
                  onChange: (e) => {
                    setData("nama_indikator", e.target.value);
                  },
                  defaultValue: indikator.data.nama_indikator,
                  error: errors.nama_indikator
                }
              ),
              errors.nama_indikator && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.nama_indikator })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Select Level",
                  onChange: handleChangeLevel,
                  value: indikator.data.level_id,
                  error: errors.level_id,
                  children: levels.map(({ id, nama_level }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_level }, id))
                }
              ),
              errors.level_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.level_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Select Satuan",
                  onChange: handleChangeSatuan,
                  value: indikator.data.satuan_id,
                  error: errors.satuan_id,
                  children: satuans.map(({ id, nama_satuan }) => /* @__PURE__ */ jsx(Option, { value: id, children: nama_satuan }, id))
                }
              ),
              errors.satuan_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.satuan_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Select,
                {
                  label: "Select Parent",
                  onChange: handleChangeParent,
                  value: indikator.data.parent_id,
                  error: errors.parent_id,
                  children: parents.map(({ id, numbering, nama_indikator }) => /* @__PURE__ */ jsx(Option, { value: id, children: numbering + " | " + nama_indikator }, id))
                }
              ),
              errors.parent_id && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.parent_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Ordering",
                  variant: "outlined",
                  id: "Ordering",
                  onChange: (e) => {
                    setData("ordering", e.target.value);
                  },
                  defaultValue: indikator.data.ordering,
                  error: errors.ordering
                }
              ),
              errors.ordering && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.ordering })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Numbering",
                  variant: "outlined",
                  id: "Numbering",
                  onChange: (e) => {
                    setData("numbering", e.target.value);
                  },
                  defaultValue: indikator.data.numbering,
                  error: errors.numbering
                }
              ),
              errors.numbering && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.numbering })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:w-full md:w-full lg:w-full", children: [
              /* @__PURE__ */ jsx(
                MSelect,
                {
                  options: optPic,
                  defaultValue: def_pics,
                  onChange: (item) => {
                    setSelectedValue(item);
                    setData("pics", item);
                    console.log(selectedValue);
                  }
                }
              ),
              errors.pics && /* @__PURE__ */ jsx("div", { className: "text-red-400 mt-1", children: errors.pics })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "space-x-2 ", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "red", onClick: (e) => handleDestroy(), children: "Delete" }),
            /* @__PURE__ */ jsx(Button, { variant: "gradient", type: "submit", color: "green", onClick: (e) => handleSave(e), children: "Save" })
          ] })
        ] })
      ] }) })
    }
  );
}
export {
  EditIndikator as default
};
