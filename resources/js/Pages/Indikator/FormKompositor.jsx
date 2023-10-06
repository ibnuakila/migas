import React, {useState} from "react";
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
import AdminLayout from '@/Layouts/AdminLayout';

export default function FormKompositor(props) {
    
    const auth = props.auth;
    const jenis_kompositor = props.jenis_kompositor;
    const indikator = props.indikator;
    const indeks = props.indeks;
    const {data, setData, post, errors, processing} = useForm({
        indikator_id: '',
        nama_kompositor: '',
        kalkulasi: '',
        satuan: '',
        indeks_id: '0',
        jenis_kompositor_id: ''       
    });
    console.log(props);
    const [optionIndeks, setOptionIndeks] = useState('');
    const [optionJenisKompositor, setOptionJenisKompositor] = useState('');
    
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator.create-kompositor'));
    }
    
    function handleChangeIndeks(e) {
        setOptionIndeks({selectValue: e});
        setData('indeks_id', e);
        console.log(optionIndeks);
    }
    
    function handleChangeJenisKompositor(e) {
        setOptionJenisKompositor({selectValue: e});
        setData('jenis_kompositor_id', e);
        console.log(optionJenisKompositor);
    }
    
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                                <Card className="p-5 h-full w-45">                                    
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        New Kompositor/Parameter
                                    </Typography>
                                </CardHeader>                                    
                                <CardBody>
                                    <form action="">
                                        <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Indikator" variant="outlined" id="nama-indikator" 
                                                    defaultValue={indikator.data.nama_indikator} disabled
                                                       error=""/>  
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Kompositor" variant="outlined" id="nama-kompositor" 
                                                        onChange={e => {
                                                                    setData('nama_kompositor', e.target.value)
                                                                }}
                                                       error={errors.nama_kompositor}/>  
                                                {errors.nama_kompositor && <div className="text-red-400 mt-1">{errors.nama_kompositor}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Indeks" id="indeks"
                                                            onChange={handleChangeIndeks}
                                                            value={optionIndeks.selectValue}
                                                            error={errors.indeks_id}>
                                                        {indeks.map(({id, nama_indeks}) => (
                                                            <Option value={id.toString()} key={id}>{nama_indeks}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.indeks_id && <div className="text-red-400 mt-1">{errors.indeks_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Satuan" variant="outlined" id="satuan"
                                                        onChange={e => {
                                                                    setData('satuan', e.target.value)
                                                                }}
                                                       error=""/>  
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Jenis Kompositor" id="jenis-kompositor"
                                                        onChange={handleChangeJenisKompositor}
                                                        value={optionJenisKompositor.selectValue}
                                                        error={errors.indeks_id}>                            
                                                    {jenis_kompositor.map(({id, nama_jenis_kompositor}) => (
                                                            <Option value={id.toString()} key={id}>{nama_jenis_kompositor}</Option>
                                                                            ))}                           
                                                </Select>
                                                {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Sifat Kalkulasi" id="kalkulasi"
                                                        value=""
                                                        error="">                            
                                                    <Option value="" key="">+</Option>
                                                    <Option value="" key="">-</Option>
                                                    <Option value="" key="">/</Option>
                                                    <Option value="" key="">*</Option>
                                                </Select>
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            
                                            <div className="flex">
                                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                                    Save
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
            
            </AdminLayout>
            );
}