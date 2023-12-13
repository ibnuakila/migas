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
import AdminLayout from '@/Layouts/AdminLayout';
import MSelect from '../../Components/MSelect';

export default function EditLaporanCapaian() {
    const {auth, laporan_capaian, indikator, kinerja, triwulans} = usePage().props;
    console.log(usePage().props);
    const {data, setData, put, errors, processing} = useForm({
        id: laporan_capaian.id || '',        
        triwulan_id: laporan_capaian.triwulan_id || '',        
        kinerja: laporan_capaian.kinerja || '',        
        kategori_kinerja_id: laporan_capaian.kategori_kinerja_id || '',
        indikator_id: laporan_capaian.indikator_id || '',        
    });
    
    
    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');    
    
    const [optionTriwulan, setOptionTriwulan] = useState([]);
    
    

    const handleSave = (e) => {
        e.preventDefault();
        put(route('input-kinerja.update', laporan_capaian.data[0].id));
    };
    

    const handleTriwulanChange = (e) => {
        setOptionTriwulan({selectValue: e});
        setData('triwulan_id', e);
    }

    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data kompositor?')) {
            destroy(route('input-kinerja.destroy', laporan_capaian.id));
        }
    }
        
    function handleCalculate(){
        if (confirm('Apakah Anda ingin mengkalkulasi kinerja?')) {            
            axios.post(route('input-kinerja.calculate-kinerja'), {laporancapaian:laporan_capaian.id, triwulan:kinerja.triwulan_id})
                    .then(res => {
                        console.log(res);
                        if(res.message != ''){
                            alert(res.data.kinerja);                        
                            let realisasi = document.getElementById('persentasi');
                            realisasi.value = res.data.kinerja;
                            //realisasi.setAttribute('value', res.data.result);
                            setData('kinerja', res.data.kinerja);
                        }
                    })
                    .catch((err) => {
                        if(err.response){
                            alert("Error: " + err.response.data.message);
                        }else if(err.request){
                            alert(err.request);
                        }else{
                            alert(err.message);
                        }
                    })            
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
                                            Edit Kinerja
                                        </Typography>
                                    </CardHeader>                                
                            
                                    <form onSubmit={handleSave}>
                                        <CardBody>                                
                                            <div className="flex flex-col gap-4">
                                            
                                                <Input label="Indikator" variant="outlined" id="indikator" 
                                                       value={indikator.nama_indikator}
                                                       />                                                    
                                                {errors.indikator_id &&
                                                        <div className="text-red-400 mt-1">{errors.indikator_id}</div>
                                                }
                                                
                                                {errors.target_format &&
                                                        <div className="text-red-400 mt-1">{errors.target_format}</div>
                                                }
                                                <div className="relative flex w-full">
                                                    <Input label="Kinerja" variant="outlined" id="realisasi"                                                         
                                                            defaultValue={kinerja.kinerja}
                                                            onChange=""
                                                            error={errors.kinerja}
                                                            className="pr-20"
                                                            containerProps={{
                                                              className: "min-w-0",
                                                            }}                                                        
                                                            />
                                                            <Button
                                                                size="sm"
                                                                color="blue"                                                            
                                                                className="!absolute right-1 top-1 rounded"
                                                                onClick={handleCalculate}
                                                              >Get</Button>
                                                    {errors.kinerja && <div className="text-red-400 mt-1">{errors.kinerja}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Triwulan" id="indeks"
                                                                onChange={handleTriwulanChange}
                                                                value={kinerja.triwulan_id}
                                                                error={errors.triwulan_id}>
                                                            {triwulans.map(({id, triwulan}) => (
                                                                <Option value={id.toString()} key={id}>{triwulan}</Option>
                                                                                ))}
                                                    </Select>
                                                    {errors.triwulan_id && <div className="text-red-400 mt-1">{errors.triwulan_id}</div>}
                                                </div>
                                                                                 
                                            </div>
                                        </CardBody>
                                        <CardFooter className="space-x-2">  
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