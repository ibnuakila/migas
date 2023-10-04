import React from "react";
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
    const errors = props.errors;
    const indikator = props.indikator;
    console.log(props);
    
    const handleSave = (e) => {
        
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
                                                <Input label="Nama Indikator" variant="outlined" id="Ordering" 
                                                    defaultValue={indikator.data.nama_indikator} disabled
                                                       error=""/>  
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Kompositor" variant="outlined" id="Ordering"                                                        
                                                       error=""/>  
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Indeks" 
                                                        value=""
                                                        error="">
                            
                                                    <Option value="" key="">Select Indeks</Option>
                            
                                                </Select>
                                                {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Satuan" variant="outlined" id="Ordering" 
                                                       
                                                       error=""/>  
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Sifat Kalkulasi" 
                                                        value=""
                                                        error="">                            
                                                    <Option value="" key="">+</Option>
                                                    <Option value="" key="">-</Option>
                                                    <Option value="" key="">/</Option>
                                                    <Option value="" key="">*</Option>
                                                </Select>
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Jenis Kompositor" 
                                                        value=""
                                                        error="">                            
                                                    <Option value="" key="">Input</Option>
                                                    <Option value="" key="">Agregator</Option>                            
                                                </Select>
                                                {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
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