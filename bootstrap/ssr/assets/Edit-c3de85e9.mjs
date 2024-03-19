import { a as jsx, j as jsxs } from "../app.mjs";
import "react";
import "./Dropdown-b38ae0ce.mjs";
import "@inertiajs/react";
import "./TextInput-790407fc.mjs";
import UpdatePasswordForm from "./UpdatePasswordForm-5cc4aa87.mjs";
import UpdateProfileInformation from "./UpdateProfileInformationForm-c1b41e5e.mjs";
import { A as AdminLayout } from "./AdminLayout-19edc1f0.mjs";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "@material-tailwind/react";
import "@headlessui/react";
import "./InputLabel-e0da9aff.mjs";
import "./PrimaryButton-91405085.mjs";
import "@heroicons/react/24/outline";
import "./ApplicationLogo-2943efd8.mjs";
function Edit({ props, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsx(
    AdminLayout,
    {
      props,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-screen-lg py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
          UpdateProfileInformation,
          {
            mustVerifyEmail,
            status,
            className: "max-w-xl"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) })
      ] }) })
    }
  );
}
export {
  Edit as default
};
