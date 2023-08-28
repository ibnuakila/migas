import { j as jsxs, a as jsx } from "../app.mjs";
import { A as Authenticated } from "./AuthenticatedLayout-d307c1f3.mjs";
import DeleteUserForm from "./DeleteUserForm-a628f36a.mjs";
import UpdatePasswordForm from "./UpdatePasswordForm-5cc4aa87.mjs";
import UpdateProfileInformation from "./UpdateProfileInformationForm-c1b41e5e.mjs";
import { Head } from "@inertiajs/react";
import "react/jsx-runtime";
import "lodash";
import "axios";
import "react-dom/client";
import "react";
import "@material-tailwind/react";
import "./ApplicationLogo-42bf81ce.mjs";
import "@headlessui/react";
import "./TextInput-790407fc.mjs";
import "./InputLabel-e0da9aff.mjs";
import "./PrimaryButton-91405085.mjs";
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
