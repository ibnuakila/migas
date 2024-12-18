import React from "react";
import {
Typography,
        Button,
        Card,
        CardHeader,
        CardBody,
        IconButton,
        Menu,
        MenuHandler,
        MenuList,
        MenuItem,
        Avatar,
        Tooltip,
        Progress,
        } from "@material-tailwind/react";
import {
EllipsisVerticalIcon,
        ArrowUpIcon,
        BanknotesIcon,
        UserPlusIcon,
        UsersIcon,
        ChartBarIcon,
        } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards/index.js";
import { StatisticsChart } from "@/widgets/charts/index.js";
import {
//statisticsCardsData,
//statisticsChartsData,
projectsTableData,
        ordersOverviewData,
        } from "@/data";
import { CheckCircleIcon,
        ClockIcon,
        CalendarIcon} from "@heroicons/react/24/solid";
import AdminLayout from '@/layouts/AdminLayout';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import { chartsConfig } from "@/configs/index.js";

export default function Beranda( {props}) {
    console.log(usePage().props);
    const {periode, indikator_count,
        user_count, pic_count,
        indeks_migas, indeks_aksesibilitas,
        indeks_keselamatan} = usePage().props;

    const last_periode = periode.periode - 1;
    const statisticsCardsData = [
        {
            color: "blue",
            icon: CalendarIcon,
            title: "Current Periode",
            value: periode.periode,
            footer: {
                color: "text-grey-500",
                value: "Last Periode",
                label: last_periode,
            },
        },
        {
            color: "amber",
            icon: UsersIcon,
            title: "PICS",
            value: pic_count,
            footer: {
                color: "text-grey-500",
                value: "PICS",
                label: pic_count,
            },
        },
        {
            color: "pink",
            icon: UserPlusIcon,
            title: "Users",
            value: user_count,
            footer: {
                color: "text-grey-500",
                value: "Active Users",
                label: user_count,
            },
        },
        {
            color: "green",
            icon: ChartBarIcon,
            title: "Total Indikator",
            value: indikator_count,
            footer: {
                color: "text-blue-grey-500",
                value: "Total Indikator",
                label: indikator_count,
            },
        },
    ];
    const indeksMigas = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Realisasi",
                data: indeks_migas,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["blue"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: [
                    "TW 1",
                    "TW 2",
                    "TW 3",
                    "TW 4",
                ],
            },
        },
    };

    const indeksAksesibilitas = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Realisasi",
                data: indeks_aksesibilitas,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["red"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: [
                    "TW 1",
                    "TW 2",
                    "TW 3",
                    "TW 4",
                ],
            },
        },
    };

    const indeksKeselamatan = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Realisasi",
                data: indeks_keselamatan,
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["green"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: [
                    "TW 1",
                    "TW 2",
                    "TW 3",
                    "TW 4",
                ],
            },
        },
    };

    const statisticsChartsData = [
        {
            color: "white",
            title: "Indeks Ketersediaan Migas",
            description: "Chart Indeks Ketersediaan Migas",
            footer: "updated 2 days ago",
            chart: indeksMigas,
        },
        {
            color: "white",
            title: "Indeks Aksesibilitas",
            description: "Chart Indeks Aksesibilitas",
            footer: "updated 4 min ago",
            chart: indeksAksesibilitas,
        },
        {
            color: "white",
            title: "Indeks Keselamatan",
            description: "Chart Indeks Keselamatan",
            footer: "just updated",
            chart: indeksKeselamatan,
        },
    ];
    return (
            <AdminLayout props = {props} children={(
                                <>
                                <Head title="Home" />
                       <div className="container mx-auto">
                           <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                               {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                                                                    <StatisticsCard
                                                                        key={title}
                                                                        {...rest}
                                                                        title={title}
                                                                        icon={React.createElement(icon, {
                                                                                                    className: "w-6 h-6 text-white",
                                                                                                })}
                                                                        footer={
                                                                                <Typography className="font-normal text-blue-gray-600">
                                                                                    <strong className={footer.color}>{footer.value}</strong>
                                                                                    &nbsp;{footer.label}
                                                                                </Typography>
                                                                        }
                                                                        />
                                                                        ))}
                           </div>
                           <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                               {statisticsChartsData.map((props) => (
                                                            <StatisticsChart
                                                                key={props.title}
                                                                {...props}
                                                                footer={
                                                                                        <Typography
                                                                                            variant="small"
                                                                                            className="flex items-center font-normal text-blue-gray-600"
                                                                                            >
                                                                                            <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                                                                                            &nbsp;{props.footer}
                                                                                        </Typography>
                                                                }
                                                                />
                                                                ))}
                           </div>                            
                       </div>
                       </>
                                )}>
            
            </AdminLayout>
            );
}