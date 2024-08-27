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
import AdminLayout from '@/layouts/AdminLayout';
 
export default function FormIndeks() {
    const {auth, parents, indeks} = usePage().props;
    const { data, setData, put, errors, delete: destroy, processing } = useForm({
        id: '',
        nama_indeks: '',
        parent_id: '0'
    });
    const [option, setOption] = useState('');
    const [optionParent, setOptionParent] = useState('');
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        put(route('indeks.update', indeks.data.id));        
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
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data indikator?')) {
            destroy(route('indeks.destroy', indeks.data.id));
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
                                            Edit Indeks
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
                                                            defaultValue={indeks.data.nama_indeks}
                                                           error={errors.nama_indeks}/>
                                                           {errors.nama_indeks && <div className="text-red-400 mt-1">{errors.nama_indeks}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Parent" onChange={handleChangeParent}
                                                            value={indeks.data.parent_id}
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
                                        
                                            <Button variant="outlined" color="red" onClick={(e) => handleDestroy(e)}>
                                                Delete
                                            </Button>
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