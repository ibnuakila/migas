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
import NewAdminLayout from '@/layouts/NewAdminLayout';
import MSelect from '../../Components/MSelect';
import SSelect from "@/Components/SSelect";
import axios from "axios";

export default function EditIndikator() {
    const { auth, indikator, satuans, levels, parents, parent, pics, def_pics } = usePage().props;
    
    const { data, setData, put, errors, delete: destroy, processing } = useForm({
        id: indikator.data.id || '',
        indikator_id: indikator.data.id || '',
        nama_indikator: indikator.data.nama_indikator || '',
        satuan_id: indikator.data.satuan_id || '',
        level_id: indikator.data.level_id || '',
        parent_id: indikator.data.parent_id || '0',
        ordering: indikator.data.ordering || '',
        numbering: indikator.data.numbering || '',
        pics: def_pics || ''
    });
    const [option, setOption] = useState('');
    const [optionLevel, setOptionLevel] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    const [isIksp, setIsIksp] = useState(false);
    const [optsParent, setOptsParent] = useState([]);

    console.log(parents);
    const defPic = def_pics.map(pic => {
        return { value: pic.id, label: pic.nama_pic };
    })

    const handleSave = (e) => {
        e.preventDefault();
        put(route('indikator.update', indikator.data.id));
    };

    function handleChangeSatuan(e) {
        setOption({ selectValue: e });
        setData('satuan_id', e);
    }

    function handleChangeLevel(e) {
        setOptionLevel({ selectValue: e });
        if (e == 1) {
            setIsIksp(true);
            setData('parent_id', 0);
        } else {
            setIsIksp(false);
            //setData('parent_id', e);
        }
        setData('level_id', e);
        getParent(e);
        console.log(optionLevel);
    }

    function handleChangeParent(e) {
        //setOptionParent({selectValue: e});
        setData('parent_id', e.value);
        console.log(e.value);
    }

    function getParent(level) {
        axios.get(route('indikator.get-parent'), { params: { level_id: level } }
        ).then(result => {
            console.log(result)
            setOptsParent(result.data.map(({ id, nama_indikator, parent_id, numbering, level }) => {
                return { value: id, label: nama_indikator + " (" + level.nama_level + ")" };
            }))
            // let parent = document.getElementById('opt-parent');
            // parent.options = optParent;
        }).catch((error) => {
            console.error("There was an error downloading the file", error);
        });
    }

    const optPic = pics.map(pic => {
        return { value: pic.id, label: pic.nama_pic };
    })

    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data indikator?')) {
            destroy(route('indikator.destroy', indikator.data.id));
        }
    }
    const optParent = parent.map(indikator => {
        return {value: indikator.parent_id, label: indikator.nama_indikator + " (" + indikator.level.nama_level + ")"}
    })

    return (
        <NewAdminLayout
            auth={auth}
            children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-45">
                        <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                                Sunting Indikator
                            </Typography>
                        </CardHeader>

                        <form onSubmit={handleSave}>
                            <CardBody>

                                <div className="flex flex-wrap flex-col place-content-center gap-4">
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Input label="Nama Indikator" variant="outlined" id="Periode"
                                            onChange={e => {
                                                setData('nama_indikator', e.target.value)
                                            }}
                                            defaultValue={indikator.data.nama_indikator}
                                            error={errors.nama_indikator} />
                                        {errors.nama_indikator && <div className="text-red-400 mt-1">{errors.nama_indikator}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Select label="Pilih Tingkatan" onChange={handleChangeLevel}
                                            value={indikator.data.level_id}
                                            error={errors.level_id}>
                                            {levels.map(({ id, nama_level }) => (
                                                <Option value={id} key={id}>{nama_level}</Option>
                                            ))}
                                        </Select>
                                        {errors.level_id && <div className="text-red-400 mt-1">{errors.level_id}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Select label="Select Satuan" onChange={handleChangeSatuan}
                                            value={indikator.data.satuan_id}
                                            error={errors.satuan_id}>
                                            {satuans.map(({ id, nama_satuan }) => (
                                                <Option value={id} key={id}>{nama_satuan}</Option>
                                            ))}
                                        </Select>
                                        {errors.satuan_id && <div className="text-red-400 mt-1">{errors.satuan_id}</div>}
                                    </div>
                                    
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        {!isIksp ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            <SSelect label="Pilih Atasan" id="opt-parent" options={optsParent}
                                                onChange={handleChangeParent} defaultValue={optParent}
                                                error={errors.parent_id}>
                                            </SSelect>
                                            {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                        </div>
                                    ) : (null)}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Input label="Pengurutan" variant="outlined" id="Ordering"
                                            onChange={e => {
                                                setData('ordering', e.target.value)
                                            }}
                                            defaultValue={indikator.data.ordering}
                                            error={errors.ordering} />
                                        {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Input label="Penomoran" variant="outlined" id="Numbering"
                                            onChange={e => {
                                                setData('numbering', e.target.value)
                                            }}
                                            defaultValue={indikator.data.numbering}
                                            error={errors.numbering} />
                                        {errors.numbering && <div className="text-red-400 mt-1">{errors.numbering}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <MSelect options={optPic} defaultValue={def_pics} label="PIC"
                                            onChange={(item) => {
                                                setSelectedValue(item);
                                                setData('pics', item)
                                                console.log(selectedValue)
                                            }}
                                        />
                                        {errors.pics &&
                                            <div className="text-red-400 mt-1">{errors.pics}</div>
                                        }
                                    </div>
                                </div>


                            </CardBody>
                            <CardFooter className="space-x-2 ">
                                <Button variant="outlined" color="red" onClick={(e) => handleDestroy(e)}>
                                    Hapus
                                </Button>
                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                    Simpan
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