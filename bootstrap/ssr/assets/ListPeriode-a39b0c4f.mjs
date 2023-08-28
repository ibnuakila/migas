import { a as jsx, j as jsxs } from "../app.mjs";
import "react";
import { A as AdminLayout } from "./AdminLayout-0841074a.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@inertiajs/react";
import "@material-tailwind/react";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-42bf81ce.mjs";
function ListPeriode({ periodes }) {
  const tableHeader = ["ID", "Periode", "Status"];
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      props: null,
      content: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-screen-lg py-12 ", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: tableHeader.map((head, headID) => /* @__PURE__ */ jsx("th", { children: head }, headID)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: periodes.map(
          (Id, Periode, Status) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { children: Id }),
            /* @__PURE__ */ jsx("td", { children: Periode }),
            /* @__PURE__ */ jsx("td", { children: Status })
          ] }, Id)
        ) })
      ] }) }) })
    }
  );
}
export {
  ListPeriode as default
};
