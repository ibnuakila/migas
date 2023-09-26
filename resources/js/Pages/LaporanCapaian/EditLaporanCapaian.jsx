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
    const {auth, laporan_capaian} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: laporan_capaian.data.id || '',
        indikator_periode_id: laporan_capaian.data.indikator_periode_id || '',
        triwulan_id: laporan_capaian.data.triwulan_id || '',
        realisasi: laporan_capaian.data.realisasi || '',
        kinerja: laporan_capaian.data.kinerja || '',
        periode_id: laporan_capaian.data.periode_id || '',
        kategori_kinerja_id: laporan_capaian.data.kategori_kinerja_id || '',
        sumber_data: laporan_capaian.data.sumber_data || ''
    });
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('laporan-capaian.update'));        
    };
       
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            Edit Laporan Capaian
                                        </Typography>
                                    </CardHeader>                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-col gap-4">
                                                <Select label="Periode" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                        <Option value="Closed">Select</Option>
                                                      <Option value="Closed">2017</Option>
                                                      <Option value="Active">2018</Option>                                                      
                                                </Select>
                                                <Select label="Indikator" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                    <Option value="Closed">Select</Option>
                                                      <Option value="Closed">Realisasi Produksi/Lifting Minyak</Option>
                                                      <Option value="Active">Rekomendasi Ekspor Minyak Mentah</Option>                                                      
                                                </Select>
                                                <Select label="Triwulan" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                    <Option value="Closed">Select</Option>
                                                      <Option value="Closed">I</Option>
                                                      <Option value="Active">II</Option>  
                                                      <Option value="Active">III</Option> 
                                                      <Option value="Active">IV</Option>
                                                </Select>
                                                <Input label="Target" variant="outlined" id="Periode" disabled
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>
                                                <Input label="Realisasi" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>  
                                                       
                                                <Input label="Persentasi Kinerja" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>  
                                
                                                <Select label="Kategori Kinerja" onChange=""
                                                    defaultValue=""
                                                    error={errors.Status}>
                                                    <Option value="Closed">Select</Option>
                                                      <Option value="Closed">Minimize</Option>
                                                      <Option value="Active">Maximize</Option>                                                      
                                                </Select>
                                                
                                                <Input label="Sumber Data" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>
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