import React, { useState }
    from "react";
import {
    Typography,
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
    Select, Option
}
    from "@material-tailwind/react";
import {
    EllipsisVerticalIcon,
    ArrowUpIcon,
}
    from "@heroicons/react/24/outline";
import { StatisticsCard }
    from "@/widgets/cards";
import { StatisticsChart }
    from "@/widgets/charts";
import {
    statisticsCardsData,
    statisticsChartsData,
    projectsTableData,
    ordersOverviewData,
}
    from "@/data";
import {
    CheckCircleIcon, ClockIcon, PlusCircleIcon, BanknotesIcon,
    UserPlusIcon,
    UsersIcon,
    ChartBarIcon,
}
    from "@heroicons/react/24/solid";
import NewAdminLayout from "@/layouts/NewAdminLayout";
import { usePage } from "@inertiajs/react";
import axios from "axios";

export function Home({ props }
) {
    console.log(usePage().props);
    const { rerata_capaian_kinerja, capaian_pk, chards, capaian_iksp, pics } = usePage().props;
    const avgKinerja = rerata_capaian_kinerja.map(item => item.rerata_kinerja).reduce((sum, value) => sum + value, 0) / rerata_capaian_kinerja.length;
    const optPic = pics.map(pic => {
        return { value: pic.id, label: pic.nama_pic };
    })
    const [dataCapaian, setDataCapaian] = useState(capaian_iksp);
    const [iksk, setIksk] = useState();
    const [level, setLevel] = useState("IKSP");

    function handleIksk() {
        
    }
    const optLevel = [
        {label: 'IKSP', value: 'IKSP'},
        {label: 'IKSK-2', value: 'IKSK-2'}
    ];
    function handleChangeIksk(e) {
        setIksk(e);
        axios.get(route('dashboard.getiksk'), {
            params: {
                pic: e,
                level: level                
            },
            //responseType: "arraybuffer"
        }).then(response => {
            console.log(response);
            setDataCapaian(response.data);
        }).catch((error) => {
            console.error("There was an error downloading the file", error);
        });
        //console.log(optionJenisKompositor);
    }
    function handleChangeLevel(e){
        console.log(e);
        setLevel(e);
    }

    return (
        <NewAdminLayout props={props}
            children={(
                <div className="mt-12">
                    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                        {chards.map(({ icon, title, footer, ...rest }) => (
                            <StatisticsCard
                                key={title}
                                {...rest}
                                title={title}
                                icon={React.createElement(ChartBarIcon, {
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

                        {/*statisticsChartsData.map((props) => (
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
             ))*/}

                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="border border-blue-gray-100 shadow-sm">
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="m-0 p-6"
                            >
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Rerata Capaian Kinerja
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                                >
                                    <ArrowUpIcon
                                        strokeWidth={3}
                                        className="h-3.5 w-3.5 text-green-500"
                                    />
                                    Ditjen Migas: <strong>
                                        {(parseFloat(avgKinerja)).toLocaleString(undefined, { maximumFractionDigits: 2, style: 'percent' }
                                        )}
                                    </strong>
                                </Typography>
                            </CardHeader>
                            <CardBody className="pt-0">
                                {rerata_capaian_kinerja.map(
                                    ({ nama_pic, rerata_kinerja }, key) => (
                                        <div key={nama_pic} className="flex items-start gap-4 py-3">
                                            <div
                                                className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                                                    ? "after:h-0"
                                                    : "after:h-4/6"
                                                    }`}
                                            >
                                                {React.createElement(PlusCircleIcon, {
                                                    className: `!w-5 !h-5 text-blue-gray-300`,
                                                })}
                                            </div>
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="block font-medium"
                                                >
                                                    {nama_pic} :
                                                </Typography>


                                                <Typography
                                                    as="span"
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-500"
                                                >
                                                    {(parseFloat(rerata_kinerja)).toLocaleString(undefined, { maximumFractionDigits: 2, style: 'percent' })}
                                                </Typography>
                                            </div>

                                        </div>
                                    )
                                )}

                            </CardBody>
                        </Card>

                        <Card className="border border-blue-gray-100 shadow-sm">
                            <CardHeader
                                floated={false}
                                shadow={false}

                                color="transparent"
                                className="m-0 p-6"
                            >
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Capaian PK Dirjen Migas
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                                >
                                    <ArrowUpIcon
                                        strokeWidth={3}
                                        className="h-3.5 w-3.5 text-green-500"
                                    />
                                    Ditjen Migas: <strong>15 Indikator</strong>
                                </Typography>
                            </CardHeader>
                            <CardBody className="pt-0">

                                {capaian_pk.map(
                                    ({ label, value }, key) => (
                                        <div key={label} className="flex items-start gap-4 py-3">
                                            <div
                                                className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                                                    ? "after:h-0"
                                                    : "after:h-4/6"
                                                    }`}
                                            >
                                                {React.createElement(PlusCircleIcon, {
                                                    className: `!w-5 !h-5 text-blue-gray-300`,
                                                })}
                                            </div>
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="block font-medium"
                                                >
                                                    {label} :
                                                </Typography>


                                                <Typography
                                                    as="span"
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-500"
                                                >
                                                    {value}
                                                </Typography>
                                            </div>

                                        </div>
                                    )
                                )}

                            </CardBody>
                        </Card>
                        <Card className="border border-blue-gray-100 shadow-sm">
                        <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="m-0 flex items-center justify-between p-6"
                            >
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-1">
                                        Option Dashboard Capaian
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                                    >
                                        <ArrowUpIcon
                                        strokeWidth={3}
                                        className="h-3.5 w-3.5 text-green-500"
                                    />
                                        <strong>IKSK-2</strong>
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                            <div className="sm:w-full md:w-full lg:w-full">
                                <Select label="Select Level" id="level"
                                        onChange={handleChangeLevel}
                                        >                            
                                    {optLevel.map(({value, label}, key) => (
                                            <Option value={value} key={key}>{label}</Option>
                                                            ))}                           
                                </Select>                                
                            </div>
                            <div className="sm:w-full md:w-full lg:w-full">
                                <Select label="Select IKSK-2" id="iksk-2"
                                        onChange={handleChangeIksk}
                                        >                            
                                    {pics.map(({id, nama_pic}, key) => (
                                            <Option value={id} key={key}>{nama_pic}</Option>
                                                            ))}                           
                                </Select>                                
                            </div>
                            </div>
                            </CardBody>
                            
                        </Card>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                            <CardHeader
                                floated=

                                {false}
                                shadow={false}
                                color="transparent"
                                className="m-0 flex items-center justify-between p-6"
                            >
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-1">
                                        Dashboard Capaian
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                                    >
                                        <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                                        <strong>{level}</strong>
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {["No", "Indikator Kinerja", "Satuan", "Periode", "Target", "TW1", "TW2", "TW3", "TW4", "Capaian (%)"].map((el) => (
                                                <th
                                                    key={el}
                                                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                                                    >
                                                        {el}
                                                    </Typography>
                                                </th>
                                            )
                                            )}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataCapaian.map(
                                            ({ nama_indikator, nama_satuan, periode, target, input_realisasi, kinerja_triwulan, status_kinerja }, key) => {
                                                const className = `py-3 px-5 ${key === capaian_iksp.length - 1
                                                        ? ""
                                                        : "border-b border-blue-gray-50"
                                                    }`;
                                                return (
                                                    <tr key={name}>
                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {key + 1}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {nama_indikator}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {nama_satuan}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {periode}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {target}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        {
                                                            input_realisasi.map(
                                                                ({ id, realisasi, realisasi_format, triwulan_id }, key) => (
                                                                    <td className={className}>
                                                                        {(parseFloat(realisasi)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                                    </td>
                                                                )
                                                            )
                                                        }


                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {status_kinerja ? (parseFloat(status_kinerja)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>

                        
                    </div>


                </div>
            )}



        ></NewAdminLayout>
    );
}

export default Home;
