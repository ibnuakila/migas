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
import SSelect from "@/Components/SSelect";
import axios from "axios";

export default function FormKompositor(props) {

    const auth = props.auth;
    const kompositor = props.kompositor;
    const kompositors = props.kompositors;
    const jenis_kompositor = props.jenis_kompositor;
    const indikator = props.indikator;
    const indikators = props.indikators;
    const indeks = props.indeks;
    const parameters = props.parameters;
    const sumber_kompositor = props.sumber_kompositor;
    const status_kompositor = props.status_kompositor;
    const { data, setData, post, errors, processing } = useForm({
        indikator_id: indikator.data.id || '',
        nama_kompositor: '',
        kalkulasi: '',
        satuan: '',
        indeks_id: '',
        jenis_kompositor_id: '',
        sumber_kompositor_id: '',
        status_kompositor_id: '',
        kompositor_id: '',
        parameter_id: '',
        value: ''
    });
    console.log(props);
    const [optionIndeks, setOptionIndeks] = useState('');
    const [optionJenisKompositor, setOptionJenisKompositor] = useState('');

    const [isParameter, setIsParameter] = useState(false);
    const [namaKompositor, setNamaKompositor] = useState('');

    const [newKompositor, setNewKompositor] = useState(true);
    const [existingIndikator, setExistingIndikator] = useState(false);
    const [existingKompositor, setExistingKompositor] = useState(false);
    const [existingParameter, setExistingParameter] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [optionStatusKompositor, setOptionStatusKompositor] = useState('');
    const pics = props.pics;
    //const defPics = props.def_pics;
    const optPic = pics.map(pic => {
        return { value: pic.id, label: pic.nama_pic };
    })

    const optExistIndikator = indikators.map(({ id, nama_indikator, level, kompositor_id }) => {
        return { value: kompositor_id, label: nama_indikator + " (" + level.nama_level + ")" };
    })

    const handleChange = (value) => {
        //e = (event.target.value); // Get the selected value
        if (value === '1') {//new
            setNewKompositor(true);
            setExistingIndikator(false);
            setExistingKompositor(false);
            setExistingParameter(false);
            //alert("new? " + newKompositor);
        } else if (value === '2') {//Existing indikator
            setNewKompositor(false);
            setExistingIndikator(true);
            setExistingKompositor(false);
            setExistingParameter(false);
            //alert("existing? " + existingIndikator);
        } else if (value === '3') {//existing kompositor
            setNewKompositor(false);
            setExistingIndikator(false);
            setExistingKompositor(true);
            setExistingParameter(false);
            //alert("existing? " + existingKompositor);
        } else if (value === '4') {//existing parameter
            setNewKompositor(false);
            setExistingIndikator(false);
            setExistingKompositor(false);
            setExistingParameter(true);
            setIsParameter(true);
            //alert("parameter? " + existingParameter);
        }
        setData('sumber_kompositor_id', value);
        console.log("Selected value:", value);
    };

    function handleChangeStatus(e) {
        setOptionStatusKompositor({ selectValue: e });
        setData('status_kompositor_id', e);
        //console.log(optionIndeks);
    }

    const handleSave = (e) => {
        e.preventDefault();
        post(route('kompositor.store', indikator.id));
    }   

    return (
        <NewAdminLayout
            auth={auth}
            children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-45">
                        <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                                Tambah Kompositor/Parameter
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <form action="">
                                <div className="flex flex-wrap flex-col place-content-center gap-4">
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Input label="Nama Indikator" variant="outlined" id="nama-indikator"
                                            defaultValue={indikator.data.nama_indikator} disabled
                                        />
                                        {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Select label="Sumber Kompositor" id="type-kompositor"
                                            onChange={handleChange}>
                                            {sumber_kompositor.map(({ id, nama_sumber_kompositor }) => (
                                                <Option value={id.toString()} key={id}>{nama_sumber_kompositor}</Option>
                                            ))}
                                        </Select>
                                        {errors.sumber_kompositor && <div className="text-red-400 mt-1">{errors.sumber_kompositor}</div>}
                                    </div>
                                    {newKompositor ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            <Select label="Pilih Jenis Kompositor" id="jenis-kompositor"
                                                onChange={(e) => {
                                                    setOptionJenisKompositor({ selectValue: e });
                                                    setData('jenis_kompositor_id', e);
                                                    //alert(e);
                                                    if (e === '3') {
                                                        setIsParameter(true);
                                                    } else {
                                                        setIsParameter(false);
                                                    }
                                                }}

                                            >
                                                {jenis_kompositor.map(({ id, nama_jenis_kompositor }) => (
                                                    <Option value={id.toString()} key={id}>{nama_jenis_kompositor}</Option>
                                                ))}
                                            </Select>
                                            {errors.jenis_kompositor_id && <div className="text-red-400 mt-1">{errors.jenis_kompositor_id}</div>}
                                        </div>) : (null)}
                                    {isParameter ? (
                                        existingParameter ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Parameter" id="parameter"
                                                    onChange={(e) => {
                                                        setData('parameter_id', e);
                                                        //setData('jenis_kompositor_id', 4);
                                                    }
                                                    }
                                                >
                                                    {parameters.map(({ id, nama_parameter, nama_indeks }) => (
                                                        <Option value={id.toString()} key={id} label={nama_parameter}>{nama_parameter + " (" + nama_indeks + ")"}</Option>
                                                    ))}
                                                </Select>
                                            </div>) : (
                                            <>
                                                {/* <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Kalkulasi" variant="outlined" id="kalkulasi"
                                                        onChange={e => {
                                                            setData('kalkulasi', e.target.value)
                                                        }}
                                                    />                                                  
                                                </div> */}
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Value" variant="outlined" id="value"
                                                        onChange={e => {
                                                            setData('value', e.target.value)
                                                        }}
                                                    />
                                                    {errors.value && <div className="text-red-400 mt-1">{errors.value}</div>}
                                                </div>
                                            </>
                                        )

                                    ) : (null)
                                    }
                                    {newKompositor || existingParameter ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            <Input label="Nama Kompositor" variant="outlined" id="nama-kompositor"
                                                onChange={e => {
                                                    setData('nama_kompositor', e.target.value)
                                                }}
                                                onFocus={(e) => {
                                                    if (existingParameter) {
                                                        let param = document.getElementById("parameter").textContent;
                                                        e.target.value = param;
                                                        setData('nama_kompositor', param);
                                                    }

                                                }}
                                                defaultValue={namaKompositor}
                                                error={errors.nama_kompositor} />
                                            {errors.nama_kompositor && <div className="text-red-400 mt-1">{errors.nama_kompositor}</div>}
                                        </div>) : (null)}
                                    {existingIndikator ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            
                                            <SSelect label="Pilih Indikator" id="indeks" options={optExistIndikator}
                                                onChange={(e) => {
                                                    setData('kompositor_id', e.value);
                                                    console.log(e);
                                                }}
                                                error={errors.kompositor_id}>
                                                {/*indikators.map(({ id, nama_indikator, level, kompositor_id }) => (
                                                    <Option value={kompositor_id} key={kompositor_id}>{nama_indikator + " (" + level.nama_level + ")"}</Option>
                                                ))*/}
                                            </SSelect>
                                            {errors.kompositor_id && <div className="text-red-400 mt-1">{errors.kompositor_id}</div>}
                                        </div>) : (null)}
                                    {existingKompositor ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            <Select label="Pilih Kompositor" id="indeks"
                                                onChange={(e) => {
                                                    setData('kompositor_id', e);
                                                }}
                                                error={errors.kompositor_id}>
                                                {kompositors.map(({ kompositor_id, nama_kompositor, jenis_kompositor }) => (
                                                    <Option value={kompositor_id} key={kompositor_id}>{nama_kompositor + " (" + jenis_kompositor.nama_jenis_kompositor + ")"}</Option>
                                                ))}
                                            </Select>
                                            {errors.kompositor_id && <div className="text-red-400 mt-1">{errors.kompositor_id}</div>}
                                        </div>) : (null)}

                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Select label="Pilih Indeks" id="indeks"
                                            onChange={(e) => {
                                                setOptionIndeks({ selectValue: e });
                                                setData('indeks_id', e);
                                            }}
                                            value={optionIndeks.selectValue}
                                            error={errors.indeks_id}>
                                            {indeks && indeks.length > 0 ? indeks.map(({ id, nama_indeks }) => (
                                                <Option value={id.toString()} key={id}>{nama_indeks + "(" + id + ")"}</Option>
                                            )) : <Option></Option>}
                                        </Select>
                                        {errors.indeks_id && <div className="text-red-400 mt-1">{errors.indeks_id}</div>}
                                    </div>
                                    {newKompositor || existingKompositor || existingParameter ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            <Input label="Satuan" variant="outlined" id="satuan"
                                                onChange={e => {
                                                    setData('satuan', e.target.value)
                                                }}
                                                error={errors.satuan} />
                                            {errors.satuan && <div className="text-red-400 mt-1">{errors.satuan}</div>}
                                        </div>) : (null)}
                                    {!isParameter ? (
                                        <div className="sm:w-full md:w-full lg:w-full">
                                            <MSelect id="pic" options={optPic} defaultValue={null} label="PIC"
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
                                    ) : null}
                                    {/* <div className="sm:w-full md:w-full lg:w-full">
                                        <Select label="Status" id="jenis-kompositor"
                                            onChange={handleChangeStatus}
                                            // value={kompositor.data.status_kompositor_id}
                                            error={errors.indeks_id}>
                                            {status_kompositor.map(({ id, status_kompositor }) => (
                                                <Option value={id} key={id}>{status_kompositor}</Option>
                                            ))}
                                        </Select>
                                        {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                    </div> */}

                                    <div className="flex">
                                        <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                            Simpan
                                        </Button>
                                    </div>
                                </div>

                            </form>

                        </CardBody>
                        <CardFooter className="space-x-2">
                        </CardFooter>
                    </Card>
                </div>
            )}
        >

        </NewAdminLayout>
    );
}