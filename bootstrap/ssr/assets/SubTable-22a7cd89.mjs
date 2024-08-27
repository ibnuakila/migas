import { a as jsx, j as jsxs } from "../app.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@inertiajs/react";
import "react";
import "@material-tailwind/react";
React.createClass({
  render: function() {
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("tbody", { children: myList.map((item, i) => {
      return /* @__PURE__ */ jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsxs("tr", { onClick: toggleMobileOpen.bind(this, i), children: [
          /* @__PURE__ */ jsxs("td", { className: "toggler", children: [
            item.mobile_open && /* @__PURE__ */ jsx(ArrowUp, {}),
            !item.mobile_open && /* @__PURE__ */ jsx(ArrowDown, {})
          ] }),
          /* @__PURE__ */ jsx("td", { children: item.elem_one }),
          /* @__PURE__ */ jsx("td", { children: item.elem_two }),
          /* @__PURE__ */ jsx("td", { children: item.elem_three })
        ] }),
        item.mobile_open && /* @__PURE__ */ jsx("tr", { className: "test-td", children: /* @__PURE__ */ jsx("td", { children: "..." }) })
      ] }, i);
    }) }) });
  }
});
