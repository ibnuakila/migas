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
 
export default function EditIndikator() {
    const {auth, indikator, satuans} = usePage().props;
    const { data, setData, put, errors, delete:destroy, processing } = useForm({
        id: indikator.data.id || '',
        nama_indikator: indikator.data.nama_indikator || '',
        satuan_id: indikator.data.satuan_id || ''        
    });
    const [option, setOption] = useState('');
    
    //console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        put(route('indikator.update', indikator.data.id));        
    };
    
    function handleChangeSatuan(e){
        setOption({selectValue:e});
        setData('satuan_id', e);
    }
    
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data indikator?')) {
          destroy(route('indikator.destroy', indikator.data.id));
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
                            Update Indikator
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
                                        defaultValue={indikator.data.nama_indikator}
                                       error={errors.nama_indikator}/>                      
                            </div>

                                <div className="sm:w-full md:w-full lg:w-full">
                                    <Select label="Select Satuan" onChange={handleChangeSatuan}
                                    value={indikator.data.satuan_id}
                                    error={errors.satuan_id}>
                                    {satuans.map( ({id, nama_satuan}) => (
                                    <Option value={id.toString()} key={id}>{nama_satuan}</Option>
                                    ) )}

                                    </Select>
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