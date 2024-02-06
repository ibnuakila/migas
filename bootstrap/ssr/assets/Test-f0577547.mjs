import { a as jsx, F as Fragment, j as jsxs } from "../app.mjs";
import "react";
import { usePage } from "@inertiajs/react";
import "classnames";
import { Card, Typography } from "@material-tailwind/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
const Test = () => {
  const props = usePage().props;
  const data = usePage().props.data;
  console.log(props.data);
  const TABLE_HEAD = ["Id", "Location", "LocationType"];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-xl mx-4 my-4", children: [
      "Hello ",
      props.auth.user.name
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "mx-auto mx-4 p-4", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-max table-auto text-left", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: TABLE_HEAD.map((head) => /* @__PURE__ */ jsx(
        "th",
        {
          className: "border-b border-blue-gray-100 bg-blue-gray-50 p-4",
          children: /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "small",
              color: "blue-gray",
              className: "font-normal leading-none opacity-70",
              children: head
            }
          )
        },
        head
      )) }) }),
      /* @__PURE__ */ jsx("tbody", { children: data.map((object) => /* @__PURE__ */ jsxs("tr", { className: "even:bg-blue-gray-50/50", children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-normal",
            children: object.LevelId
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-normal",
            children: object.Location
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "small",
            color: "blue-gray",
            className: "font-normal",
            children: object.LocationType
          }
        ) })
      ] }, object.LevelId)) })
    ] }) })
  ] }) });
};
export {
  Test as default
};
