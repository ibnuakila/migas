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
 
export default function FormIndeks() {
    const {auth, parents} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: '',
        nama_indeks: '',
        parent_id: '0'
    });
    const [option, setOption] = useState('');
    const [optionParent, setOptionParent] = useState('');
    //console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indeks.store'));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('nama_indeks', e);
    }
    
    function handleChangeParent(e) {
        setOptionParent({selectValue: e});
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
                                            New Indeks
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Nama Indeks" variant="outlined" id="indeks" 
                                                            onChange={e => {
                                                                setData('nama_indeks', e.target.value)
                                                            }} 

                                                           error={errors.nama_indeks}/>
                                                           {errors.nama_indeks && <div className="text-red-400 mt-1">{errors.nama_indeks}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Parent" onChange={handleChangeParent}
                                                            value={optionParent.selectValue}
                                                            error={errors.parent_id}>
                                                        {parents.map(({id, nama_indeks}) => (
                                                            <Option value={id.toString()} key={id}>{id + " | " + nama_indeks}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.parent_id && <div className="text-red-400 mt-1">{errors.parent_id}</div>}
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