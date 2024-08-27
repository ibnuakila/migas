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
 
export default function FormKomponen() {
    const {auth, errors} = usePage().props;
    const { data, setData, post,  processing } = useForm({
        //id: '',
        nama_komponen: '',
        bobot: ''
    });
    const [option, setOption] = useState('');
    
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('instrument-kinerja.store-komponen'));        
    };
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New Komponen
                                        </Typography>
                                    </CardHeader>                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Nama Komponen" variant="outlined" id="Periode" 
                                                            onChange={e => {
                                                                setData('nama_komponen', e.target.value)
                                                            }}                                                        
                                                           error={errors.nama_komponen}/> 
                                                           {errors.nama_komponen && <div className="text-red-400 mt-1">{errors.nama_komponen}</div>}
                                                </div>

                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Bobot" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('bobot', e.target.value)
                                                        }}                                                        
                                                       error={errors.bobot}/> 
                                                       {errors.bobot && <div className="text-red-400 mt-1">{errors.bobot}</div>}
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