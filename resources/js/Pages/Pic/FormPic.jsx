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
import NewAdminLayout from "@/layouts/NewAdminLayout";

export default function FormPic() {
    const {auth, parent} = usePage().props;
    const {data, setData, post, errors, processing} = useForm({
        parent_id: '',
        nama_pic: '',
        keterangan: ''
    });
    const [option, setOption] = useState('');
    const [optionParent, setOptionParent] = useState('');
    console.log(usePage().props);

    const handleSave = (e) => {
        e.preventDefault();
        post(route('pic.store'));
    };

    function handleChangeParent(e) {
        setOptionParent({selectValue: e});
        setData('parent_id', e);        
    }

    return (
            <NewAdminLayout 
                auth = {auth}
                children={(
                                <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                            
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            Tambah PIC
                                        </Typography>
                                    </CardHeader>                                
                            
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                            
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Nama PIC" variant="outlined" id="nama_pic" 
                                                           onChange={e => {
                                                                               setData('nama_pic', e.target.value)
                                                                           }} 
                            
                                                           error={errors.nama_pic}/>
                                                    {errors.nama_pic && <div className="text-red-400 mt-1">{errors.nama_pic}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Parent" onChange={handleChangeParent}
                                                            
                                                            error={errors.satuan_id}>
                                                        {parent.map(({id, nama_pic}) => (
                                                            <Option value={id} key={id}>{nama_pic}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.satuan_id && <div className="text-red-400 mt-1">{errors.satuan_id}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Keterangan" variant="outlined" id="Periode" 
                                                           onChange={e => {
                                                                       setData('keterangan', e.target.value)
                                                                   }} 
                            
                                                           error={errors.keterangan}/> 
                                                    {errors.keterangan && <div className="text-red-400 mt-1">{errors.keterangan}</div>}
                                                </div>
                                            </div>
                            
                            
                                        </CardBody>
                                        <CardFooter className="space-x-2 ">
                                            <div className="flex place-content-center">
                                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                                    Simpan
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </form>
                                    </Card>
                                </div>
                                )}
                >
            
            </NewAdminLayout>
            );
}