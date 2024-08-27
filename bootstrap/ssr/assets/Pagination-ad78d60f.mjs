import { a as jsx } from "../app.mjs";
import "react";
import { Link } from "@inertiajs/react";
import classNames from "classnames";
const PageLink = ({ active, label, url }) => {
  const className = classNames(
    [
      "mr-1 mb-1",
      "px-1 py-1",
      "border border-solid border-blue-gray-100 rounded-sm shadow-sm",
      "text-sm text-gray-700",
      "hover:bg-teal-100",
      "focus:outline-none focus:border-indigo-700 focus:text-indigo-700"
    ],
    {
      "bg-yellow-200": active
    }
  );
  return /* @__PURE__ */ jsx(Link, { className, href: url, children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: label } }) });
};
const PageInactive = ({ label }) => {
  const className = classNames(
    "mr-1 mb-1 px-1 py-1 text-sm border rounded-sm border-solid border-gray-300 text-gray-700 bg-gray-200"
  );
  return /* @__PURE__ */ jsx("li", { className, dangerouslySetInnerHTML: { __html: label } });
};
function Pagination({ links = [] }) {
  if (links.length === 3)
    return null;
  return /* @__PURE__ */ jsx("nav", { className: "mt-4", children: /* @__PURE__ */ jsx("ul", { className: "flex", children: links.map(({ active, label, url }) => {
    return url === null ? /* @__PURE__ */ jsx(PageInactive, { label }, label) : /* @__PURE__ */ jsx(PageLink, { label, active, url }, label);
  }) }) });
}
export {
  Pagination as P
};
