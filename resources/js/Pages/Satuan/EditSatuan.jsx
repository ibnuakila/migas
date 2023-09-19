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
 
export default function FormSatuan() {
    const {auth, satuan} = usePage().props;
    const { data, setData, put, errors, delete:destroy, processing } = useForm({
        id: '',
        nama_satuan: ''
    });
    const [option, setOption] = useState('');
    
    //console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        put(route('satuan.update', satuan.data.id));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('nama_satuan', e);
    }
    
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data indikator?')) {
          destroy(route('satuan.destroy', satuan.data.id));
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
                                            New Satuan
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Satuan" variant="outlined" id="Satuan" 
                                                        onChange={e => {
                                                            setData('nama_satuan', e.target.value)
                                                        }} 
                                                       defaultValue={satuan.data.nama_satuan}
                                                       error={errors.nama_satuan}/>   
                                                       {errors.nama_satuan && <div className="text-red-400 mt-1">{errors.nama_satuan}</div>}
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