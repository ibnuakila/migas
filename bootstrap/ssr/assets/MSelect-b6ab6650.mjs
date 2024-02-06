import { a as jsx } from "../app.mjs";
import "react";
import Select from "react-select";
function MSelect({ defaultValue, value, options, onChange }) {
  return /* @__PURE__ */ jsx(
    Select,
    {
      defaultValue,
      value,
      onChange,
      isMulti: true,
      name: "colors",
      options,
      className: "basic-multi-select",
      classNamePrefix: "select",
      isClearable: true
    }
  );
}
export {
  MSelect as M
};
