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
import AdminLayout from '@/layouts/AdminLayout';
import MSelect from '../../Components/MSelect';
import NewAdminLayout from "@/layouts/NewAdminLayout";

export default function EditKompositor(props) {
    console.log(props);
    const kompositor = props.kompositor;
    const parameter = props.parameter;
    const kompositors = props.kompositors;
    const auth = props.auth;
    const jenis_kompositor = props.jenis_kompositor;
    const indikator = props.indikator;
    const indeks = props.indeks;
    const parameters = props.parameters;
    const sumber_kompositor = props.sumber_kompositor;
    const pics = props.pics;
    const defPics = props.def_pics;
    const optPic = pics.map(pic => {
        return {value: pic.id, label: pic.nama_pic};
    })
    
    const {data, setData, put, errors,delete:destroy, processing} = useForm({
        indikator_id: indikator.data.id || '',        
        nama_kompositor: kompositor.data.nama_kompositor || '',
        kalkulasi: parameter ? parameter.kalkulasi : null,
        satuan: kompositor.data.satuan || '',
        indeks_id: kompositor.data.indeks_id || '0',
        jenis_kompositor_id: kompositor.data.jenis_kompositor_id || '',
        sumber_kompositor_id: kompositor.data.sumber_kompositor_id ||'',
        kompositor_id: kompositor.data.id,        
        value: parameter ? parameter.value : null,
        parameter_id: parameter ? parameter.id : null,
        pics: defPics
    });
    const { flash } = props;  
    const [optionIndeks, setOptionIndeks] = useState('');
    const [optionJenisKompositor, setOptionJenisKompositor] = useState('');    
    const [isParameter, setIsParameter] = useState(kompositor.data.jenis_kompositor_id == 3 ? true : false);
    
    const [newKompositor, setNewKompositor] = useState(kompositor.data.sumber_kompositor_id == 1 ? true : false);
    const [existingIndikator, setExistingIndikator] = useState(kompositor.data.sumber_kompositor_id == 2 ? true : false);
    const [existingKompositor, setExistingKompositor] = useState(kompositor.data.sumber_kompositor_id == 3 ? true : false);    
    const [existingParameter, setExistingParameter] = useState(kompositor.data.sumber_kompositor_id == 4 ? true : false);
    
    const [selectedValue, setSelectedValue] = useState([]);
   
    
    function handleLoad() {
        console.log('The page has fully loaded');
        setIsParameter(true);
    };
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
            <NewAdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                            {flash.message && (
                                <Alert open={open} icon={<Icon />} onClose={() => {
                                        setOpen(false); //router.reload();
                                    }} 
                                    color="black" className="my-3 shadow-lg">
                                    {flash.message}
                                </Alert>
                            )}
                                <Card className="p-5 h-full w-45">                                    
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        Edit Kompositor/Parameter
                                    </Typography>
                                </CardHeader>                                    
                                <CardBody>
                                    <form action="" id="form-kompositor" >
                                        <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Indikator" variant="outlined" id="nama-indikator" 
                                                    defaultValue={indikator.data.nama_indikator} disabled
                                                       error=""/>  
                                                {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Sumber Kompositor" id="type-kompositor" disabled
                                                    value={kompositor.data.sumber_kompositor_id}
                                                    onChange={ (e)=> {
                                                            if(e === 1){
                                                                setNewKompositor(true);
                                                                setExistingIndikator(false);
                                                                setExistingKompositor(false);  
                                                                setExistingParameter(false);
                                                            }else if(e === 2){
                                                                setNewKompositor(false);
                                                                setExistingIndikator(true);
                                                                setExistingKompositor(false);
                                                                setExistingParameter(false);
                                                            }else if(e === 3){//existing kompositor
                                                                setNewKompositor(false);
                                                                setExistingIndikator(false);
                                                                setExistingKompositor(true);
                                                                setExistingParameter(false);
                                                            }else if(e === 4){//existing parameter
                                                                setNewKompositor(false);
                                                                setExistingIndikator(false);
                                                                setExistingKompositor(false);
                                                                setExistingParameter(true);
                                                            }
                                                            setData('sumber_kompositor_id', e);
                                                        }}>
                                                    {sumber_kompositor.map(({id, nama_sumber_kompositor}) => (
                                                            <Option value={id} key={id}>{nama_sumber_kompositor}</Option>
                                                                            ))}
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
                                                        {kompositors.map(({id, nama_kompositor, jenis_kompositor_id}) => (
                                                            <Option value={id} key={id}>{nama_kompositor + " | " + jenis_kompositor_id}</Option>
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
                                                            <Option value={id} key={id}>{nama_indeks}</Option>
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
                                                            <Option value={id} key={id}>{nama_jenis_kompositor}</Option>
                                                                            ))}                           
                                                </Select>
                                                {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                            </div>
                                            {isParameter ? (
                                            <>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Parameter" id="parameter"
                                                        onChange={ (e) => {
                                                            setData('parameter_id', e);
                                                            }
                                                        }
                                                        value={parameter.id}
                                                        >
                                                        {parameters.map(({id, nama_parameter, nama_indeks}) => (
                                                            <Option value={id} key={id} label={nama_parameter}>{nama_parameter + " (" + nama_indeks + ")"}</Option>
                                                                            ))}  
                                                    </Select>
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Kalkulasi" variant="outlined" id="kalkulasi" 
                                                            onChange={e => {
                                                                        setData('kalkulasi', e.target.value)
                                                                    }}
                                                            defaultValue={parameter.kalkulasi}
                                                           error={errors.kalkulasi}/>  
                                                    {errors.kalkulasi && <div className="text-red-400 mt-1">{errors.kalkulasi}</div>}
                                                </div>
                                                        <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Value" variant="outlined" id="value" 
                                                            defaultValue={parameter.value}
                                                            onChange={e => {
                                                                        setData('value', e.target.value)
                                                                    }}
                                                           error={errors.value}/>  
                                                    {errors.value && <div className="text-red-400 mt-1">{errors.value}</div>}
                                                </div>
                                            </>
                                                ):(null)}
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                 <MSelect id="pic" options={optPic} defaultValue={defPics} 
                                                    onChange={(item) => {
                                                        setSelectedValue(item); 
                                                        setData('pics', item)
                                                        console.log(selectedValue)
                                                    }}
                                                 />
                                                    {errors.pic_id && 
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                    }
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
            
            </NewAdminLayout>
            );
}