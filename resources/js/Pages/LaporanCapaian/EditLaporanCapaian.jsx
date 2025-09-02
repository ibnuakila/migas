import React, { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Textarea,
    Alert,
    Typography,
    Select, Option
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import MSelect from '../../Components/MSelect';
import NewAdminLayout from "@/layouts/NewAdminLayout";

export default function EditLaporanCapaian() {
    const { auth, laporan_capaian, indikators, indikator_periode, periodes, triwulans, pics, def_pics, kategori_kinerja } = usePage().props;
    let real = parseFloat(laporan_capaian.data[0].realisasi);
    const defPics = usePage().props.laporan_capaian.data[0].laporan_capaian_pic;
    const optPic = pics.map(pic => {
        return { value: pic.id, label: pic.nama_pic };
    })
    const optKategoriKinerja = kategori_kinerja.map((pic) => {
        return { value: pic.id, label: pic.name };
    })
    const { data, setData, put, errors, processing } = useForm({
        id: laporan_capaian.data[0].id || '',
        //indikator_periode_id: laporan_capaian.data.indikator_periode_id || '',
        triwulan_id: laporan_capaian.data[0].triwulan_id || '',
        realisasi: real.toFixed(2) || '',
        status_kinerja: laporan_capaian.data[0].status_kinerja || '',
        periode_id: laporan_capaian.data[0].periode_id || '',
        kategori_kinerja_id: laporan_capaian.data[0].kategori_kinerja_id || '',
        indikator_id: laporan_capaian.data[0].indikator_id || '',
        target: laporan_capaian.data[0].target || '',
        target_format: laporan_capaian.data[0].target_format || '',
        kinerja_tahunan: laporan_capaian.data[0].kinerja_tahunan || '',
        sumber_data: laporan_capaian.data[0].sumber_data || '',
        //file_path: laporan_capaian.data[0].file_path || '',
        laporan_capaian_pic: def_pics || '',
        //pics: optPic || ''
    });
    console.log(usePage().props);

    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');
    const [optionPic, setOptionPic] = useState([]);
    const [optionKategori, setOptionKategori] = useState([]);
    const [optionTriwulan, setOptionTriwulan] = useState([]);
    const [targetFormat, setTargetFormat] = useState([]);


    const handleSave = (e) => {
        e.preventDefault();
        put(route('laporan-capaian.update', laporan_capaian.data[0].id));
    };

    const handlePeriodeChange = (e) => {
        setOptionPeriode({ selectValue: e });
        setData('periode_id', e);
    }

    const handleIndikatorChange = (e) => {
        setOptionIndikator({ selectValue: e });
        setData('indikator_id', e);
    }

    const handleChangeKategori = (e) => {
        setOptionKategori({ selectValue: e });
        setData('kategori_kinerja_id', e);
    }

    const handleTriwulanChange = (e) => {
        setOptionTriwulan({ selectValue: e });
        setData('triwulan_id', e);
    }

    const handleTargetFormatChange = (e) => {
        setTargetFormat({ selectValue: e });
        setData('target_format', e);
    }



    function handleCalculate() {
        if (confirm('Apakah Anda ingin mengkalkulasi kinerja?')) {
            axios.post(route('laporan-capaian.calculate-kinerja'), { laporan_capaian_id: laporan_capaian.data[0].id })
                .then(res => {
                    console.log(res);
                    if (res.message != '') {
                        alert(res.data.kinerja);
                        let realisasi = document.getElementById('persentasi');
                        realisasi.value = res.data.kinerja;
                        //realisasi.setAttribute('value', res.data.result);
                        setData('kinerja', res.data.kinerja);
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        alert("Error: " + err.response.data.message);
                    } else if (err.request) {
                        alert(err.request);
                    } else {
                        alert(err.message);
                    }
                })

        }
    }

    return (
        <NewAdminLayout
            auth={auth}
            children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-45">

                        <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                                Edit Laporan Capaian
                            </Typography>
                        </CardHeader>

                        <form onSubmit={handleSave}>
                            <CardBody>
                                <div className="flex flex-col gap-4">
                                    <Select label="Select Periode" id="periode" onChange={handlePeriodeChange}
                                        value={laporan_capaian.data[0].periode_id}
                                        error={errors.periode_id}>
                                        {periodes.map(({ id, periode, status }) => <Option value={id} key={id}>{periode + " (" + status + ")"}</Option>)}
                                    </Select>
                                    {errors.periode_id &&
                                        <div className="text-red-400 mt-1">{errors.periode_id}</div>
                                    }
                                    <Input label="Indikator" variant="outlined" id="indikator" onChange={handleIndikatorChange}
                                        value={laporan_capaian.data[0].indikator.nama_indikator}
                                    />
                                    {errors.indikator_id &&
                                        <div className="text-red-400 mt-1">{errors.indikator_id}</div>
                                    }
                                    <MSelect options={optPic} defaultValue={def_pics} label="Pic"
                                        onChange={(item) => {
                                            setOptionPic(item);
                                            setData('laporan_capaian_pic', item)
                                        }}
                                    />
                                    {errors.pic_id &&
                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                    }
                                    <Input label="Target" variant="outlined" id="target"
                                        defaultValue={laporan_capaian.data[0].target}
                                        onChange={(e) => setData('target', e.target.value)}
                                        error={errors.target}
                                    />
                                    {errors.target &&
                                        <div className="text-red-400 mt-1">{errors.target}</div>
                                    }
                                    <Select label="Format Target" onChange={handleTargetFormatChange}
                                        value={laporan_capaian.data[0].target_format}
                                        error={errors.target_format}>
                                        <Option value="Decimal">Decimal</Option>
                                        <Option value="Persentase">Persentase</Option>
                                    </Select>
                                    {errors.target_format &&
                                        <div className="text-red-400 mt-1">{errors.target_format}</div>
                                    }
                                    <Select label="Kategori Kinerja" onChange={handleChangeKategori}
                                        value={laporan_capaian.data[0].kategori_kinerja_id}
                                        error={errors.kategori_kinerja_id}>
                                        {kategori_kinerja.map(({ id, name }) => (
                                            <Option value={id} key={id}>{name}</Option>
                                        ))}
                                    </Select>
                                    {errors.kategori_kinerja_id &&
                                        <div className="text-red-400 mt-1">{errors.kategori_kinerja_id}</div>
                                    }
                                    <Input label="Kinerja Tahunan" variant="outlined" id="kinerja-tahunan"
                                        defaultValue={laporan_capaian.data[0].kinerja_tahunan}
                                        onChange={e => {
                                            setData('kinerja_tahunan', e.target.value)
                                        }}
                                        error={errors.kinerja_tahunan} />
                                    {errors.kinerja_tahunan &&
                                        <div className="text-red-400 mt-1">{errors.kinerja_tahunan}</div>
                                    }
                                    <Input label="Status Kinerja" variant="outlined" id="status-kinerja"
                                        defaultValue={laporan_capaian.data[0].status_kinerja}
                                        onChange={e => {
                                            setData('status_kinerja', e.target.value)
                                        }}
                                        error={errors.status_kinerja} />
                                    {errors.status_kinerja &&
                                        <div className="text-red-400 mt-1">{errors.kinerja_tahunan}</div>
                                    }
                                    <Input label="Sumber Data" variant="outlined" id="periode"
                                        onChange={e => {
                                            setData('sumber_data', e.target.value)
                                        }}
                                        error={errors.sumber_data} />
                                    {errors.sumber_data &&
                                        <div className="text-red-400 mt-1">{errors.sumber_data}</div>
                                    }
                                </div>
                            </CardBody>
                            <CardFooter className="space-x-2">
                                <Button variant="outlined" color="red" onClick={(e) => handleDestroy(e)}>
                                    Delete
                                </Button>
                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                    Save
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            )}
        >

        </NewAdminLayout>
    );
}