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
  Typography ,
  Select, Option 
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
 
export default function FormIndikator() {
    const {auth, satuans, levels, parents} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: '',
        nama_indikator: '',
        satuan_id: '',
        level_id: '',
        parent_id: '0',
        ordering: '',
        numbering: ''
    });
    const [optionSatuan, setOptionSatuan] = useState('');
    const [optionLevel, setOptionLevel] = useState('');
    const [optionParent, setOptionParent] = useState('');
    
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator.store'));        
    };
    
    function handleChangeSatuan(e){
        setOptionSatuan({selectValue:e});
        setData('satuan_id', e);
        console.log(optionSatuan);
    }
    
    function handleChangeLevel(e){
        setOptionLevel({selectValue:e});
        setData('level_id', e);
        console.log(optionLevel);
    }
    
    function handleChangeParent(e){
        setOptionParent({selectValue:e});
        setData('parent_id', e);
        console.log(optionParent);
    }
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                    <div className="container mx-auto">
                    <Card className="p-5 h-full w-45">

                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                        <Typography variant="h4" color="white">
                            New Indikator
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
                                            error={errors.nama_indikator}/>   
                                            {errors.nama_indikator && <div className="text-red-400 mt-1">{errors.nama_indikator}</div>}
                                </div>
                                
                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Select label="Select Satuan" onChange={handleChangeSatuan}
                                    value={optionSatuan.selectValue}
                                    error={errors.satuan_id}>
                                    {satuans.map( ({id, nama_satuan}) => (
                                    <Option value={id.toString()} key={id}>{nama_satuan}</Option>
                                    ) )}
                                    </Select>
                                    {errors.satuan_id && <div className="text-red-400 mt-1">{errors.satuan_id}</div>}
                                </div>
                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Select label="Select Level" onChange={handleChangeLevel}
                                    value={optionLevel.selectValue}
                                    error={errors.level_id}>
                                    {levels.map( ({id, nama_level}) => (
                                    <Option value={id.toString()} key={id}>{nama_level}</Option>
                                    ) )}
                                    </Select>
                                    {errors.level_id && <div className="text-red-400 mt-1">{errors.level_id}</div>}
                                </div>
                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Select label="Select Parent" onChange={handleChangeParent}
                                    value={optionParent.selectValue}
                                    error={errors.parent_id}>
                                    {parents.map( ({id, nama_indikator}) => (
                                    <Option value={id.toString()} key={id}>{nama_indikator}</Option>
                                    ) )}
                                    </Select>
                                    {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
                                </div>
                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Input label="Ordering" variant="outlined" id="Ordering" 
                                            onChange={e => {
                                                setData('ordering', e.target.value)
                                            }} 
                                           error={errors.ordering}/>  
                                           {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                </div>
                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Input label="Numbering" variant="outlined" id="Numbering" 
                                            onChange={e => {
                                                setData('numbering', e.target.value)
                                            }} 
                                           error={errors.numbering}/>    
                                           {errors.numbering && <div className="text-red-400 mt-1">{errors.numbering}</div>}
                                </div>
                            </div>


                        </CardBody>
                        <CardFooter className="space-x-2 ">                        
                            <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                Save
                            </Button>                        
                        </CardFooter>
                    </form>
                    </Card>
                    </div>
                            )}
                >
            
            </AdminLayout>
  );
}