import React from "react";
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
import AdminLayout from '@/Layouts/AdminLayout';
 
export default function FormIndikatorPeriode() {
    const {auth} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        Id: '',
        Periode: '',
        Status: ''
    });
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('indikator-periode.store'));        
    };
       
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            Indikator Periode
                                        </Typography>
                                    </CardHeader>                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-col gap-4">
                                                <Select label="Select Periode" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                      <Option value="Closed">2017</Option>
                                                      <Option value="Active">2018</Option>                                                      
                                                </Select>
                                                <Select label="Select Indikator" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                      <Option value="Closed">Realisasi Produksi/Lifting Minyak</Option>
                                                      <Option value="Active">Rekomendasi Ekspor Minyak Mentah</Option>                                                      
                                                </Select>
                                                <Input label="Target" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>                      
                                
                                                <Select label="Select PIC" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                      <Option value="Closed">DMEP</Option>
                                                      <Option value="Active">DMOO</Option>                                                      
                                                </Select>
                                            </div>
                                
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2">                                            
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