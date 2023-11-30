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
    const kompositors = props.kompositors;
    const jenis_kompositor = props.jenis_kompositor;
    const indikator = props.indikator;
    const indeks = props.indeks;
    const parameters = props.parameters;
    const {data, setData, post, errors, processing} = useForm({
        indikator_id: indikator.data.id || '',
        nama_kompositor: '',
        kalkulasi: '',
        satuan: '',
        indeks_id: '1',
        jenis_kompositor_id: '',
        sumber_kompositor: '',
        kompositor_id: '',
        parameter_id: ''
    });
    console.log(props);
    const [optionIndeks, setOptionIndeks] = useState('');
    const [optionJenisKompositor, setOptionJenisKompositor] = useState('');
    const [newKompositor, setNewKompositor] = useState(true);
    const [existingIndikator, setExistingIndikator] = useState(false);
    const [existingKompositor, setExistingKompositor] = useState(false);
    const [isParameter, setIsParameter] = useState(false);
    const [namaKompositor, setNamaKompositor] = useState('');
    
    const handleSave = (e) => {
        e.preventDefault();
        post(route('kompositor.store',indikator.id));
    }
    
    function handleChangeIndeks(e) {
        setOptionIndeks({selectValue: e});
        setData('indeks_id', e);
        //console.log(optionIndeks);
    }
    
    function handleChangeJenisKompositor(e) {
        setOptionJenisKompositor({selectValue: e});
        setData('jenis_kompositor_id', e);
        //alert(e);
        if(e === '3'){
            setIsParameter(true);
        }else{
            setIsParameter(false);
        }
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
    
    function handleChangeParameter(e){
        //console.log(e);
        setData('parameter_id', e);
    }
    
    function handleSelectedParameter(e){
        console.log(e.props.label);
        setNamaKompositor(e.props.label);
        setData('nama_kompositor', e.props.label)
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
                                                {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Sumber Kompositor" id="type-kompositor"
                                                    onChange={ (e)=> {
                                                        if(e === 'New'){
                                                            setNewKompositor(true);
                                                            setExistingIndikator(false);
                                                            setExistingKompositor(false);            
                                                        }else if(e === 'Existing Indikator'){
                                                            setNewKompositor(false);
                                                            setExistingIndikator(true);
                                                            setExistingKompositor(false);
                                                        }else{//existing kompositor
                                                            setNewKompositor(false);
                                                            setExistingIndikator(false);
                                                            setExistingKompositor(true);
                                                        }
                                                        setData('sumber_kompositor', e);
                                                    }}>
                                                    <Option value="New">New</Option>
                                                    <Option value="Existing Indikator">Existing Indikator</Option>
                                                    <Option value="Existing Kompositor">Existing Kompositor</Option>
                                                </Select>
                                            </div>
                                            {newKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Jenis Kompositor" id="jenis-kompositor"
                                                        onChange={ (e) => {
                                                            setOptionJenisKompositor({selectValue: e});
                                                            setData('jenis_kompositor_id', e);
                                                            //alert(e);
                                                            if(e === '3'){
                                                                setIsParameter(true);
                                                            }else{
                                                                setIsParameter(false);
                                                            }
                                                        }}
                                                        value={optionJenisKompositor.selectValue}
                                                        error={errors.jenis_kompositor_id}>                            
                                                    {jenis_kompositor.map(({id, nama_jenis_kompositor}) => (
                                                            <Option value={id.toString()} key={id}>{nama_jenis_kompositor}</Option>
                                                                            ))}                           
                                                </Select>
                                                {errors.jenis_kompositor_id && <div className="text-red-400 mt-1">{errors.jenis_kompositor_id}</div>}
                                            </div>):(null)}
                                            {isParameter ? (
                                            <>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Parameter" id="parameter"
                                                        onChange={ (e) => {
                                                            setData('parameter_id', e);
                                                            }
                                                        }
                                                        >
                                                        {parameters.map(({id, nama_parameter, nama_indeks}) => (
                                                            <Option value={id.toString()} key={id} label={nama_parameter}>{nama_parameter + " (" + nama_indeks + ")"}</Option>
                                                                            ))}  
                                                    </Select>
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Kalkulasi" variant="outlined" id="kalkulasi" 
                                                            onChange={e => {
                                                                        setData('kalkulasi', e.target.value)
                                                                    }}
                                                           error={errors.kalkulasi}/>  
                                                    {errors.kalkulasi && <div className="text-red-400 mt-1">{errors.kalkulasi}</div>}
                                                </div>
                                            </>
                                                ):(null)}
                                            {newKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Kompositor" variant="outlined" id="nama-kompositor" 
                                                        onChange={e => {
                                                                    setData('nama_kompositor', e.target.value)
                                                                }}
                                                        onFocus={(e)=>{                                                            
                                                            let param = document.getElementById("parameter").textContent;                                                            
                                                            e.target.value = param;
                                                            setData('nama_kompositor', param);
                                                        }}
                                                                defaultValue = {namaKompositor}
                                                       error={errors.nama_kompositor}/>  
                                                {errors.nama_kompositor && <div className="text-red-400 mt-1">{errors.nama_kompositor}</div>}
                                            </div>):(null)}
                                            {existingKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Kompositor" id="indeks"
                                                            onChange={(e)=>{
                                                                setData('kompositor_id', e);
                                                            }}                                                            
                                                            error={errors.kompositor_id}>
                                                        {kompositors.map(({id, nama_kompositor}) => (
                                                            <Option value={id.toString()} key={id}>{nama_kompositor}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.kompositor_id && <div className="text-red-400 mt-1">{errors.kompositor_id}</div>}
                                            </div>):(null)}
                                            {newKompositor || existingKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Select Indeks" id="indeks"
                                                            onChange={ (e)=> {
                                                                setOptionIndeks({selectValue: e});
                                                                setData('indeks_id', e);
                                                            }}
                                                            value={optionIndeks.selectValue}
                                                            error={errors.indeks_id}>
                                                        {indeks.map(({id, nama_indeks}) => (
                                                            <Option value={id.toString()} key={id}>{nama_indeks}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.indeks_id && <div className="text-red-400 mt-1">{errors.indeks_id}</div>}
                                            </div>):(null)}
                                            {newKompositor ? (
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Satuan" variant="outlined" id="satuan"
                                                        onChange={e => {
                                                                    setData('satuan', e.target.value)
                                                                }}
                                                       error={errors.satuan}/>  
                                                {errors.satuan && <div className="text-red-400 mt-1">{errors.satuan}</div>}
                                            </div>):(null)}
                                                                                       
                                            
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