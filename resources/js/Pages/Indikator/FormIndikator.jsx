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
    const {auth} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        Id: '',
        Periode: '',
        Status: ''
    });
    const [option, setOption] = useState('');
    
    //console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('periode.store'));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('Status', e);
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
                                                            setData('NamaIndikator', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>                      
                                            </div>
                                                
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Satuan" onChange={handleChange}
                                                    value={option.selectValue}
                                                    error={errors.Status}>
                                                      <Option value="Closed">%</Option>
                                                      <Option value="Active">Index</Option>                                                      
                                                    </Select>
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Level" onChange={handleChange}
                                                    value={option.selectValue}
                                                    error={errors.Status}>
                                                      <Option value="Closed">IKSK-2</Option>
                                                      <Option value="Active">IKSK-3</Option>                                                      
                                                    </Select>
                                                </div>
                                            </div>
                                
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2 ">
                                        <div className="flex place-content-center">
                                            <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                                Save
                                            </Button>
                                        </div>
                                        </CardFooter>
                                    </form>
                                    </Card>
                                    </div>
                            )}
                >
            
            </AdminLayout>
  );
}