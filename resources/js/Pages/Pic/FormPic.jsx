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
 
export default function FormPic() {
    const {auth} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        d: '',
        nama_pic: '',
        keterangan: ''
    });
    const [option, setOption] = useState('');
    
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('pic.store'));        
    };
    
    
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New PIC
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