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

export default function FormRealisasi(props) {
    
    const auth = props.auth;
    const triwulan = props.triwulan;
    const periode = props.periode;
    const pic = props.pic;
    const {data, setData, post, errors, processing} = useForm({
        indikator_kompositor_id: '',
        realisasi: '',
        pic_id: '',
        satuan: '',
        triwulan_id: '',
        periode_id: ''       
    });
    console.log(props);
    const [optionIndeks, setOptionIndeks] = useState('');
    const [optionJenisKompositor, setOptionJenisKompositor] = useState('');
    
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator.store-indikator-kompositor'));
    }
    
    function handleChangeIndeks(e) {
        setOptionIndeks({selectValue: e});
        setData('indeks_id', e);
        //console.log(optionIndeks);
    }
    
    function handleChangeJenisKompositor(e) {
        setOptionJenisKompositor({selectValue: e});
        setData('jenis_kompositor_id', e);
        //console.log(optionJenisKompositor);
    }
    
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                                <Card className="p-5 h-full w-45">                                    
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        Input Realisasi
                                    </Typography>
                                </CardHeader>                                    
                                <CardBody>
                                    <form action="">
                                        <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Indikator" variant="outlined" id="nama-indikator" 
                                                    defaultValue="" disabled
                                                       error=""/>  
                                                {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Triwulan" id="indeks"
                                                            onChange={handleChangeIndeks}
                                                            value={optionIndeks.selectValue}
                                                            error={errors.indeks_id}>
                                                        {triwulan.map(({id, triwulan}) => (
                                                            <Option value={id.toString()} key={id}>{triwulan}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.indeks_id && <div className="text-red-400 mt-1">{errors.indeks_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Realisasi" variant="outlined" id="realisasi" 
                                                        onChange={e => {
                                                                    setData('realisasi', e.target.value)
                                                                }}
                                                       error={errors.realisasi}/>  
                                                {errors.realisasi && <div className="text-red-400 mt-1">{errors.realisasi}</div>}
                                            </div>
                                            
                                            
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Periode" onChange=""
                                                        defaultValue=""
                                                        error={errors.Status}>
                                                            {periode.map(({id, periode}) => (
                                                                <Option value={id.toString()} key={id}>{periode}</Option>
                                                                                ))}                                                      
                                                </Select>
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