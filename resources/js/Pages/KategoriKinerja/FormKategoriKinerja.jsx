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
 
export default function FormLevel() {
    const {auth} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        Id: '',
        NamaLevel: ''
    });
    const [option, setOption] = useState('');
    
    //console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('kategori-kinerja.store'));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('NamaKategoriKinerja', e);
    }
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New Kategori Kinerja
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Kategori Kinerja" variant="outlined" id="Level" 
                                                        onChange={e => {
                                                            setData('NamaKategoriKinerja', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.NamaKategoriKinerja}/>                      
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