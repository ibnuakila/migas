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
 
export default function FormSubKomponen() {
    const {auth, errors, komponen} = usePage().props;
    const { data, setData, post,  processing } = useForm({
        komponen_id: komponen.data.id || '',
        nama_sub_komponen: '',
        bobot: '',
        ordering: '',
        numbering: ''
    });
    const [option, setOption] = useState('');
    
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        setData('komponen_id', komponen.data.id);
        post(route('instrument-kinerja.store-sub-komponen'));        
    };
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New Sub Komponen
                                        </Typography>
                                    </CardHeader>                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Nama Komponen" variant="outlined" id="Periode"
                                                            defaultValue={komponen.data.nama_komponen}
                                                            disabled                                                     
                                                           error={errors.nama_komponen}/> 
                                                           {errors.nama_komponen && <div className="text-red-400 mt-1">{errors.nama_komponen}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Nama Sub Komponen" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('nama_sub_komponen', e.target.value)
                                                        }}                                                        
                                                       error={errors.bobot}/> 
                                                       {errors.bobot && <div className="text-red-400 mt-1">{errors.bobot}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Bobot" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('bobot', e.target.value)
                                                        }}                                                        
                                                       error={errors.bobot}/> 
                                                       {errors.bobot && <div className="text-red-400 mt-1">{errors.bobot}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Ordering" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('ordering', e.target.value)
                                                        }}                                                        
                                                       error={errors.ordering}/> 
                                                       {errors.ordering && <div className="text-red-400 mt-1">{errors.ordering}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Numbering" variant="outlined" id="Periode" 
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