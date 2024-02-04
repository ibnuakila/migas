import { j as jsxs, F as Fragment, a as jsx } from "../app.mjs";
import "react";
import { usePage } from "@inertiajs/react";
import { P as Pagination } from "./Pagination-17e8eab5.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@material-tailwind/react";
import "classnames";
const Test = () => {
  const props = usePage().props;
  console.log(props.periodes.links);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h1", { children: [
      "Hello ",
      props.auth.user.name
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", {}),
        /* @__PURE__ */ jsx("tbody", { children: props.periodes.data.map((object) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: object.Periode }),
          /* @__PURE__ */ jsx("td", { children: object.Status })
        ] }, object.Id)) })
      ] }),
      /* @__PURE__ */ jsx(Pagination, { links: props.periodes.links })
    ] })
  ] });
};
export {
  Test as default
};
