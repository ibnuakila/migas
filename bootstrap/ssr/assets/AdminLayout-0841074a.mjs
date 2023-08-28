import { j as jsxs, a as jsx } from "../app.mjs";
import React from "react";
import { Typography, Menu, MenuHandler, MenuList, MenuItem, Navbar, IconButton, Button, Avatar } from "@material-tailwind/react";
import { ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, InboxArrowDownIcon, LifebuoyIcon, PowerIcon } from "@heroicons/react/24/outline";
import { A as ApplicationLogo } from "./ApplicationLogo-42bf81ce.mjs";
function Header(auth) {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = /* @__PURE__ */ jsxs("ul", { className: "mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6", children: [
    /* @__PURE__ */ jsx(
      Typography,
      {
        as: "li",
        variant: "small",
        color: "blue-gray",
        className: "p-1 font-normal",
        children: /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center", children: "Dashboard" })
      }
    ),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(MenuHandler, { children: /* @__PURE__ */ jsx(
        Typography,
        {
          as: "li",
          variant: "small",
          color: "blue-gray",
          className: "p-1 font-normal",
          children: /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center", children: "Kinerja" })
        }
      ) }),
      /* @__PURE__ */ jsxs(MenuList, { children: [
        /* @__PURE__ */ jsx(MenuItem, { children: "Setup Indikator Periode" }),
        /* @__PURE__ */ jsx(MenuItem, { children: "Realisasi Capaian Kinerja" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(MenuHandler, { children: /* @__PURE__ */ jsx(
        Typography,
        {
          as: "li",
          variant: "small",
          color: "blue-gray",
          className: "p-1 font-normal",
          children: /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center", children: "Master" })
        }
      ) }),
      /* @__PURE__ */ jsxs(MenuList, { children: [
        /* @__PURE__ */ jsx(MenuItem, { children: "Setup Periode" }),
        /* @__PURE__ */ jsx(MenuItem, { children: "Master Indikator" }),
        /* @__PURE__ */ jsx(MenuItem, { children: "Master PIC" }),
        /* @__PURE__ */ jsx(MenuItem, { children: "Master Satuan" }),
        /* @__PURE__ */ jsx(MenuItem, { children: "Master Level" }),
        /* @__PURE__ */ jsx(MenuItem, { children: "Master Kategori Kinerja" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Typography,
      {
        as: "li",
        variant: "small",
        color: "blue-gray",
        className: "p-1 font-normal",
        children: /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center", children: auth.user })
      }
    )
  ] });
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon
    },
    {
      label: "Help",
      icon: LifebuoyIcon
    },
    {
      label: "Sign Out",
      icon: PowerIcon
    }
  ];
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    return /* @__PURE__ */ jsxs(Menu, { open: isMenuOpen, handler: setIsMenuOpen, placement: "bottom-end", children: [
      /* @__PURE__ */ jsx(MenuHandler, { children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "text",
          color: "blue-gray",
          className: "flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto",
          children: [
            /* @__PURE__ */ jsx(
              Avatar,
              {
                variant: "circular",
                size: "sm",
                alt: "tania andrew",
                className: "border border-gray-900 p-0.5",
                src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              }
            ),
            /* @__PURE__ */ jsx(
              ChevronDownIcon,
              {
                strokeWidth: 2.5,
                className: `h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(MenuList, { className: "p-1", children: profileMenuItems.map(({ label, icon }, key) => {
        const isLastItem = key === profileMenuItems.length - 1;
        return /* @__PURE__ */ jsxs(
          MenuItem,
          {
            onClick: closeMenu,
            className: `flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`,
            children: [
              React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2
              }),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  as: "span",
                  variant: "small",
                  className: "font-normal",
                  color: isLastItem ? "red" : "inherit",
                  children: label
                }
              )
            ]
          },
          label
        );
      }) })
    ] });
  }
  return /* @__PURE__ */ jsx(Navbar, { className: "sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-0 lg:px-8 lg:py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-blue-gray-900", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(ApplicationLogo, { width: "45", height: "45" }),
      /* @__PURE__ */ jsxs(
        Typography,
        {
          as: "a",
          href: "#",
          className: "mr-4 cursor-pointer py-1.5 text-2xl px-1 tracking-1",
          children: [
            "SI",
            /* @__PURE__ */ jsx("span", { class: "text-blue-600", children: "CAKI" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "mr-4 hidden lg:block", children: navList }),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "text",
          className: "ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden",
          ripple: false,
          onClick: () => setOpenNav(!openNav),
          children: openNav ? /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              className: "h-6 w-6",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 2,
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            }
          ) : /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2,
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M4 6h16M4 12h16M4 18h16"
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(ProfileMenu, {})
    ] })
  ] }) });
}
function AdminLayout({ props, content }) {
  console.log(props);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap h-screen w-screen", children: /* @__PURE__ */ jsxs("div", { className: "w-screen h-screen", children: [
    /* @__PURE__ */ jsx(Header, { auth: null }),
    content
  ] }) });
}
export {
  AdminLayout as A
};
