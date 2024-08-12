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
 
export default function FormIndikatorPeriode() {
    const {auth, periodes, indikators, pics} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: '',
        periode_id: '',
        indikator_id: '',
        target: '',
        pic_id: '',
        //level_id: ''
    });
    console.log(usePage().props);
   
    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');
    const [optionPic, setOptionPic] = useState('');
    const [optionLevel, setOptionLevel] = useState('');
    
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator-periode.store'));        
    };
       
    const handlePeriodeChange = (e) => {
        setOptionPeriode({selectValue:e});
        setData('periode_id', e);
    }
    
    const handleIndikatorChange = (e) => {
        setOptionIndikator({selectValue:e});
        setData('indikator_id', e);
    }
    
    const handlePicChange = (e) => {
        setOptionPic({selectValue:e});
        setData('pic_id', e);
    }
    
    
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            Indikator Periode
                                        </Typography>
                                    </CardHeader>                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-col gap-4">
                                                <Select label="Select Periode" onChange={handlePeriodeChange}
                                                    value={optionPeriode.selectValue}
                                                    error={errors.periode_id}>
                                                    {periodes.map( ({id, periode, status}) => <Option value={id.toString()} key={id}>{periode + " (" + status + ")"}</Option> )}                                                                                                           
                                                </Select>
                                                    {errors.periode_id && 
                                                        <div className="text-red-400 mt-1">{errors.periode_id}</div>
                                                    }
                                                <Select label="Select Indikator" onChange={handleIndikatorChange}
                                                    value={optionIndikator.selectValue}
                                                    error={errors.indikator_id}>
                                                    {indikators.map( ({id, nama_indikator}) => <Option value={id.toString()} key={id}>{nama_indikator}</Option> )}                                                     
                                                </Select>
                                                    {errors.indikator_id && 
                                                        <div className="text-red-400 mt-1">{errors.indikator_id}</div>
                                                    }
                                                <Input label="Target" variant="outlined" id="target" 
                                                        onChange={e => {
                                                            setData('target', e.target.value)
                                                        }} 
                                                       defaultValue=""
                                                       error={errors.target}/>                      
                                                    {errors.target && 
                                                        <div className="text-red-400 mt-1">{errors.target}</div>
                                                    }
                                                
                                                <Select label="Select PIC" onChange={handlePicChange}
                                                    value={optionPic.selectValue}
                                                    error={errors.pic}>
                                                    {pics.map( ({id, nama_pic}) => <Option value={id.toString()} key={id}>{nama_pic}</Option> )}                                                     
                                                </Select>
                                                    {errors.pic_id && 
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                    }
                                            </div>
                                
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2">                                            
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