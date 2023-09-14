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
    const {auth, satuans, levels} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: '',
        nama_indikator: '',
        satuan_id: ''        
    });
    const [option, setOption] = useState('');
    
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator.store'));        
    };
    
    function handleChangeSatuan(e){
        setOption({selectValue:e});
        setData('satuan_id', e);
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

                                       error={errors.NamaIndikator}/>                      
                            </div>

                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Select label="Select Satuan" onChange={handleChangeSatuan}
                                    value={option.selectValue}
                                    error={errors.Status}>
                                    {satuans.map( ({id, nama_satuan}) => (
                                    <Option value={id.toString()} key={id}>{nama_satuan}</Option>
                                    ) )}

                                    </Select>
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