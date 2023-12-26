import React from "react";
import {
Navbar,
        Collapse,
        Typography,
        Button,
        IconButton,
        Card,
        Menu,
        MenuHandler,
        MenuList,
        MenuItem,
        Avatar,
        } from "@material-tailwind/react";
import {
CubeTransparentIcon,
        UserCircleIcon,
        CodeBracketSquareIcon,
        Square3Stack3DIcon,
        ChevronDownIcon,
        Cog6ToothIcon,
        InboxArrowDownIcon,
        LifebuoyIcon,
        PowerIcon,
        RocketLaunchIcon,
        Bars2Icon,
        } from "@heroicons/react/24/outline";
import ApplicationLogo from '../Components/ApplicationLogo';
import { useState, useEffect,  } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const [openNav, setOpenNav] = useState(false);
    const {auth} = usePage().props;
    //console.log(auth.user.name);
    useEffect(() => {
        window.addEventListener(
                "resize",
                () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                    >
                    <Link href="/home" className="flex items-center hover:text-amber-700">
                        Home
                    </Link>
                </Typography>
                <Menu>
                    <MenuHandler>
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                            >
                            <a href="#" className="flex items-center hover:text-amber-700">
                                Kinerja
                            </a>
                        </Typography>
                    </MenuHandler>
                    <MenuList>               
                        <MenuItem><Link href={route('laporan-capaian.index')}>Laporan Capaian Kinerja</Link></MenuItem>                        
                    </MenuList>
                </Menu>
                                            
                <Menu>
                    <MenuHandler>
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                            >
                            <a href="#" className="flex items-center hover:text-amber-700">
                                Master
                            </a>
                        </Typography>
                    </MenuHandler>
                    <MenuList>
                    <MenuItem><Link href={route('periode.index')}>Setup Periode</Link></MenuItem>
                    <MenuItem><Link href={route('indikator.index')}>Master Indikator</Link></MenuItem>
                    <MenuItem><Link href={route('pic.index')}>Master PIC</Link></MenuItem>
                    <MenuItem><Link href={route('satuan.index')}>Master Satuan</Link></MenuItem>
                    <MenuItem><Link href={route('level.index')}>Master Level</Link></MenuItem>
                    
                    
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuHandler>
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                            >
                            <a href="#" className="flex items-center hover:text-amber-700">
                                Settings
                            </a>
                        </Typography>
                    </MenuHandler>
                    <MenuList>
                    <MenuItem><Link href={route('user.index')}>Users</Link></MenuItem>
                    <MenuItem><Link href={route('role.index')}>Roles</Link></MenuItem>
                    </MenuList>
                </Menu>
                <Typography
                    as="li"
                    variant="small"
                    color="blue"
                    className="p-1 font-normal"
                    >
                    <a href="#" className="flex items-center">
                        
                    </a>
                </Typography>
            </ul>
            );

    // profile menu component
    const profileMenuItems = [
        {
            label: "Profile of " + auth.user.name ,
            icon: UserCircleIcon,
            link: 'profile.edit'
        },
        
        {
            label: "Sign Out",
            icon: PowerIcon,
            link: 'logout'
        },
    ];

    function ProfileMenu() {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);

        const closeMenu = (route) => {
            setIsMenuOpen(false);
            
        }

        return (
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                    <MenuHandler>
                        <Button
                            variant="text"
                            color="blue-gray"
                            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                            >
                            <Avatar
                                variant="circular"
                                size="sm"
                                alt="tania andrew"
                                className="border border-gray-900 p-0.5"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3 w-3 transition-transform ${
                                            isMenuOpen ? "rotate-180" : ""
                                            }`}
                                />
                        </Button>
                    </MenuHandler>
                    <MenuList className="p-1">
                        {profileMenuItems.map(({ label, icon, link }, key) => {
                                        const isLastItem = key === profileMenuItems.length - 1;
                                        return (
                                                <MenuItem
                                                    key={label}
                                                    
                                                    className={`flex items-center gap-2 rounded ${
                                                                        isLastItem
                                                                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                                                        : ""
                                                                        }`}
                                                    >
                                                {React.createElement(icon, {
                                                                        className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                                                        strokeWidth: 2,
                                                                    })}
                                                <Typography
                                                    as="span"
                                                    variant="small"
                                                    className="font-normal"
                                                    color={isLastItem ? "red" : "inherit"}
                                                    >
                                                    {link=='logout' ? (
                                                        <Link href={route(link)} method="post">{label}</Link>
                                                    ):(
                                                        <Link href={route(link)}>{label}</Link>
                                                    )}
                                                                                                        
                                                </Typography>
                                                </MenuItem>
                                                );
                                    })}
                    </MenuList>
                </Menu>
                );
    }

    return (
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-0 lg:px-8 lg:py-4">
                <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between text-blue-gray-900">
                    <div className="flex items-center">
                        <ApplicationLogo width="45" height="45" />
                        <Typography
                            as="a"
                            href="#"
                            className="mr-4 cursor-pointer py-1.5 text-2xl px-1 tracking-1"
                            >          
                            SI<span className="text-blue-600">CAKI</span>
                        </Typography>
                    </div>
            
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
            
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                            >
                            {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                                        )}
                        </IconButton>
                        <ProfileMenu />
                    </div>
                </div>
            
            </Navbar>


            );
}