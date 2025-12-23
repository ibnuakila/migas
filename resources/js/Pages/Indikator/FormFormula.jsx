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
    Select, Option,
    List,
    ListItem
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
//import FormKompositor from './FormKompositor';
import MSelect from '../../Components/MSelect';
import NewAdminLayout from "@/layouts/NewAdminLayout";
import { object } from "prop-types";

export default function FormFormula() {
    const { auth, indikator, kompositors, formula,message } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: (formula) ? (formula.id):(''),
        indikator_id: (formula) ? (formula.indikator_id):(indikator.data.id),
        formula_realisasi: (formula) ? (formula.formula_realisasi):(''),
        mapping_realisasi: (formula) ? (formula.mapping_realisasi):(''),
        formula_kinerja: (formula) ? (formula.formula_kinerja):(''),
        mapping_kinerja: (formula) ? (formula.mapping_kinerja):('')       
    });
        
    console.log(usePage().props);
    //const msg = 'No Data Found!';

    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator.store-formula'));        
    };
    
    return (
        <NewAdminLayout
            auth={auth}
            children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-45">

                        <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                                Rumusan Indikator
                            </Typography>
                        </CardHeader>

                        <CardBody>
                            <form onSubmit={handleSave}>
                                <div className="flex flex-wrap flex-col place-content-center gap-4">

                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Input label="Nama Indikator" variant="outlined" id="namaIndikator"
                                            value={indikator.data.nama_indikator}
                                            error={errors.nama_indikator} />
                                        {errors.nama_indikator && <div className="text-red-400 mt-1">{errors.nama_indikator}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">                                        
                                        <Card>
                                            <CardBody>
                                            <div className="mb-4 flex items-center justify-between">
                                                <Typography variant="h5" color="blue-gray" className="">
                                                    Daftar Kompositor
                                                </Typography>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    variant="small"
                                                    color="blue"
                                                    className="font-bold"
                                                >
                                                </Typography>
                                            </div>                                            
                                            <List>
                                                {kompositors && kompositors.length > 0 && (
                                                    kompositors.map( (kompositor) => (
                                                        <ListItem>{kompositor.nama_kompositor}</ListItem>
                                                    ))
                                                )}
                                            </List>
                                            </CardBody>
                                        </Card>                                        
                                    </div> 
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Textarea label="Rumusan Realisasi" variant="outlined" id="formulaRealisasi" 
                                        className="border border-gray-300 rounded-lg p-4 text-xl font-bold text-gray-800 bg-gray-100 
                                                shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
                                                placeholder-gray-400 resize-y"
                                            value={ data['formula_realisasi'] }
                                            onChange={e => {
                                                setData('formula_realisasi', e.target.value)
                                            }}
                                            error={errors.formula_realisasi} />
                                        {errors.formula_realisasi && <div className="text-red-400 mt-1">{errors.formula_realisasi}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Textarea label="Pemetaan Realisasi" variant="outlined" id="mappingRealisasi"
                                        className="border border-gray-300 rounded-lg p-4 text-xl font-bold text-gray-800 bg-gray-100 
                                                shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
                                                placeholder-gray-400 resize-y"
                                            value={ data['mapping_realisasi']}
                                            onChange={e => {
                                                setData('mapping_realisasi', e.target.value)
                                            }}
                                            error={errors.mapping_realisasi} />
                                        {errors.mapping_realisasi && <div className="text-red-400 mt-1">{errors.mapping_realisasi}</div>}
                                    </div>
                                    
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Textarea label="Rumusan Kinerja" variant="outlined" id="formulaKinerja"
                                        className="border border-gray-300 rounded-lg p-4 text-xl font-bold text-gray-800 bg-gray-100 
                                            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
                                            placeholder-gray-400 resize-y"
                                            value={ data['formula_kinerja']}
                                            onChange={e => {
                                                setData('formula_kinerja', e.target.value)
                                            }}
                                            error={errors.formula_kinerja} />
                                        {errors.formula_kinerja && <div className="text-red-400 mt-1">{errors.formula_kinerja}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Textarea label="Pemetaan Kinerja" variant="outlined" id="mappingKinerja"
                                        className="border border-gray-300 rounded-lg p-4 text-xl font-bold text-gray-800 bg-gray-100 
                                            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
                                            placeholder-gray-400 resize-y"
                                            value={ data['mapping_kinerja']}
                                            onChange={e => {
                                                setData('mapping_kinerja', e.target.value)
                                            }}
                                            error={errors.mapping_kinerja} />
                                        {errors.mapping_kinerja && <div className="text-red-400 mt-1">{errors.mapping_kinerja}</div>}
                                    </div>
                                    
                                    <div className="flex">
                                        <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)} id="save-indikator">
                                            Simpan
                                        </Button>
                                    </div>

                                </div>
                            </form>

                        </CardBody>
                        <CardFooter className="space-x-2 ">

                        </CardFooter>

                    </Card>

                </div>
            )}
        >

        </NewAdminLayout>
    );
}