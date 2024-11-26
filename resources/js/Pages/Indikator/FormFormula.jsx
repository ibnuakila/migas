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
//import FormKompositor from './FormKompositor';
import MSelect from '../../Components/MSelect';
import NewAdminLayout from "@/layouts/NewAdminLayout";

export default function FormIndikator() {
    const { auth, indikator, kompositors, message } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: '',
        indikator_id: '',
        formula_realisasi: '',
        mapping_realisasi: '',
        formula_kinerja: '',
        mapping_kinerja: ''        
    });
    
    
    console.log(usePage().props);
    const msg = 'No Data Found!';

    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator.store'));
        /*router.visit('indikator.store',{
            only:['indikator','message'],
            method: 'post',
        });*/
        /*if(indikator !== ''){
            alert(indikator.id + ', is saved');
        }*/
        //var btn = document.getElementById('save-indikator');
        //btn.setAttribute('color','blue-gray');
        //btn.value('Update');
    };

    function handleChangeSatuan(e) {
        setOptionSatuan({ selectValue: e });
        setData('satuan_id', e);
        console.log(optionSatuan);
    }

    function handleChangeLevel(e) {
        setOptionLevel({ selectValue: e });
        setData('level_id', e);
        console.log(optionLevel);
    }

    function handleChangeParent(e) {
        setOptionParent({ selectValue: e });
        setData('parent_id', e);
        console.log(optionParent);
    }
    
    return (
        <NewAdminLayout
            auth={auth}
            children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-45">

                        <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                                Formula Indikator
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
                                        <Input label="Formula Realisasi" variant="outlined" id="formulaRealisasi"
                                            onChange={e => {
                                                //setData('ordering', e.target.value)
                                            }}
                                            error={errors.formula_realisasi} />
                                        {errors.formula_realisasi && <div className="text-red-400 mt-1">{errors.formula_realisasi}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Textarea label="Mapping Realisasi" variant="outlined" id="mappingRealisasi"
                                            onChange={e => {
                                                //setData('numbering', e.target.value)
                                            }}
                                            error={errors.mapping_realisasi} />
                                        {errors.mapping_realisasi && <div className="text-red-400 mt-1">{errors.mapping_realisasi}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Input label="Formula Kinerja" variant="outlined" id="formulaKinerja"
                                            onChange={e => {
                                                //setData('ordering', e.target.value)
                                            }}
                                            error={errors.formula_kinerja} />
                                        {errors.formula_kinerja && <div className="text-red-400 mt-1">{errors.formula_kinerja}</div>}
                                    </div>
                                    <div className="sm:w-full md:w-full lg:w-full">
                                        <Textarea label="Mapping Kinerja" variant="outlined" id="mappingKinerja"
                                            onChange={e => {
                                                //setData('numbering', e.target.value)
                                            }}
                                            error={errors.mapping_kinerja} />
                                        {errors.mapping_kinerja && <div className="text-red-400 mt-1">{errors.mapping_kinerja}</div>}
                                    </div>
                                    
                                    <div className="flex">
                                        <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)} id="save-indikator">
                                            Save
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