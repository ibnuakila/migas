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
//import FormKompositor from './FormKompositor';
import MSelect from '../../Components/MSelect';

export default function FormIndikator() {
    const {auth, satuans, levels, pics, parents, indikator, indikator_kompositors, message} = usePage().props;
    const {data, setData, post, errors, processing} = useForm({
        id: '',
        nama_indikator: '',
        satuan_id: '',
        level_id: '',
        parent_id: '0',
        ordering: '',
        numbering: '',
        pics: ''
    });
    const [optionSatuan, setOptionSatuan] = useState('');
    const [optionLevel, setOptionLevel] = useState('');
    const [optionParent, setOptionParent] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const TABLE_HEAD = ["ID", "Nama Kompositor", "Indeks", "Satuan", "Sifat Kalkulasi", "Jenis Kompositor", "Action"];
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
        setOptionSatuan({selectValue: e});
        setData('satuan_id', e);
        console.log(optionSatuan);
    }

    function handleChangeLevel(e) {
        setOptionLevel({selectValue: e});
        setData('level_id', e);
        console.log(optionLevel);
    }

    function handleChangeParent(e) {
        setOptionParent({selectValue: e});
        setData('parent_id', e);
        console.log(optionParent);
    }
    const optPic = pics.map(pic => {
        return {value:pic.id, label:pic.nama_pic};
    })
    
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
                            
                                    <CardBody>
                                        <form onSubmit={handleSave}>
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
                                                        {satuans.map(({id, nama_satuan}) => (
                                                            <Option value={id.toString()} key={id}>{nama_satuan}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.satuan_id && <div className="text-red-400 mt-1">{errors.satuan_id}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Level" onChange={handleChangeLevel}
                                                            value={optionLevel.selectValue}
                                                            error={errors.level_id}>
                                                        {levels.map(({id, nama_level}) => (
                                                            <Option value={id.toString()} key={id}>{nama_level}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.level_id && <div className="text-red-400 mt-1">{errors.level_id}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Parent" onChange={handleChangeParent}
                                                            value={optionParent.selectValue}
                                                            error={errors.parent_id}>
                                                        {parents.map(({id, numbering, nama_indikator}) => (
                                                            <Option value={id.toString()} key={id}>{numbering + " | " + nama_indikator}</Option>
                                                                            ))}
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
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <MSelect options={optPic}  
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
            
            </AdminLayout>
            );
}