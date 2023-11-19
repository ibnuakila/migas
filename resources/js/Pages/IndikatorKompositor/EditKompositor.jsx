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

export default function EditKompositor(props) {
    console.log(props);
    const kompositor = props.kompositor;
    const auth = props.auth;
    const jenis_kompositor = props.jenis_kompositor;
    const indikator = props.indikator;
    const indeks = props.indeks;
    const {data, setData, put, errors,delete:destroy, processing} = useForm({
        indikator_id: indikator.data[0].id || '',
        nama_kompositor: kompositor.data.nama_kompositor || '',
        //kalkulasi: '',
        satuan: kompositor.data.satuan || '',
        indeks_id: kompositor.data.indeks_id || '0',
        jenis_kompositor_id: kompositor.data.jenis_kompositor_id || '',
        type_kompositor: 'New',
        kompositor_id: kompositor.data.id
    });
    
    const [optionIndeks, setOptionIndeks] = useState('');
    const [optionJenisKompositor, setOptionJenisKompositor] = useState('');
    const [newKompositor, setNewKompositor] = useState(true);
    const [existingKompositor, setExistingKompositor] = useState(false);
    
    const handleSave = (e) => {
        e.preventDefault();
        put(route('kompositor.update',kompositor.data.id));
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
    
    function handleChangeType(e){
        if(e === 'New'){
            setNewKompositor(true);
            setExistingKompositor(false);            
        }else{
            setNewKompositor(false);
            setExistingKompositor(true);
        }
        setData('type_kompositor', e);
    }
    
    function handleChangeKompositor(e){
        setData('kompositor_id', e);
    }
    
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data kompositor?')) {
            destroy(route('kompositor.destroy', kompositor.data.id));
        }
    }
    
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                                <Card className="p-5 h-full w-45">                                    
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        Edit Kompositor/Parameter
                                    </Typography>
                                </CardHeader>                                    
                                <CardBody>
                                    <form action="">
                                        <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Indikator" variant="outlined" id="nama-indikator" 
                                                    defaultValue={indikator.data[0].nama_indikator} disabled
                                                       error=""/>  
                                                {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                            <Select label="Type Kompositor" id="type-kompositor" value="New"
                                                onChange={handleChangeType}>
                                                <Option value="New">New</Option>
                                                <Option value="Existing">Existing</Option>
                                            </Select>
                                            </div>
                                            {newKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Kompositor" variant="outlined" id="nama-kompositor" 
                                                    defaultValue={kompositor.data.nama_kompositor}
                                                        onChange={e => {
                                                                    setData('nama_kompositor', e.target.value)
                                                                }}
                                                       error={errors.nama_kompositor}/>  
                                                {errors.nama_kompositor && <div className="text-red-400 mt-1">{errors.nama_kompositor}</div>}
                                            </div>):(null)}
                                            {existingKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Kompositor" id="indeks"
                                                            onChange={handleChangeKompositor}                                                            
                                                            error={errors.kompositor_id}>
                                                        {kompositors.map(({id, nama_kompositor}) => (
                                                            <Option value={id.toString()} key={id}>{nama_kompositor}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.kompositor_id && <div className="text-red-400 mt-1">{errors.kompositor_id}</div>}
                                            </div>):(null)}
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Indeks" id="indeks"
                                                            onChange={handleChangeIndeks}
                                                            value={kompositor.data.indeks_id}
                                                            error={errors.indeks_id}>
                                                        {indeks.map(({id, nama_indeks}) => (
                                                            <Option value={id.toString()} key={id}>{nama_indeks}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.indeks_id && <div className="text-red-400 mt-1">{errors.indeks_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Satuan" variant="outlined" id="satuan"
                                                    defaultValue={kompositor.data.satuan}
                                                        onChange={e => {
                                                                    setData('satuan', e.target.value)
                                                                }}
                                                       error=""/>  
                                                {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Jenis Kompositor" id="jenis-kompositor"
                                                        onChange={handleChangeJenisKompositor}
                                                        value={kompositor.data.jenis_kompositor_id}
                                                        error={errors.indeks_id}>                            
                                                    {jenis_kompositor.map(({id, nama_jenis_kompositor}) => (
                                                            <Option value={id.toString()} key={id}>{nama_jenis_kompositor}</Option>
                                                                            ))}                           
                                                </Select>
                                                {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                            </div>
                                            
                                            
                                            
                                        </div>
                                        
                                    </form>
                            
                                </CardBody>
                                <CardFooter className="space-x-2">                                                                        
                                        <Button variant="outlined" color="red" onClick={(e) => handleDestroy(e)}>
                                            Delete
                                        </Button>
                                        <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                            Save
                                        </Button>
                                    
                                </CardFooter>
                                </Card>
                                </div>
                                )}
                >
            
            </AdminLayout>
            );
}