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
    const {auth, laporan_capaian, indikator, kinerja, triwulans, data_format, flash} = usePage().props;
    console.log(usePage().props);
    const {data, setData, put, errors, processing} = useForm({
        id: kinerja.id || '',        
        triwulan_id: kinerja.triwulan_id || '',        
        kinerja: kinerja.kinerja || '',        
        laporan_capaian_id: kinerja.laporan_capaian_id || '',        
        kinerja_format: kinerja.kinerja_format || ''
    });
    
    const [open, setOpen] = useState(true);
    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');    
    const [kinerjaFormat, setKinerjaFormat] = useState('');
    const [optionTriwulan, setOptionTriwulan] = useState([]);
    
    const handleSave = (e) => {
        e.preventDefault();
        put(route('input-kinerja.update', kinerja.id));
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
            axios.post(route('input-kinerja.calculate-kinerja'), {laporan_capaian_id:laporan_capaian.id, triwulan_id:kinerja.triwulan_id})
                    .then(res => {
                        console.log(res);
                        if(res.data.response !== ''){                            
                            alert(res.data.kinerja);                        
                            let kinerja = document.getElementById('kinerja');
                            kinerja.value = res.data.kinerja;
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
    
    const handleChangeKinerjaFormat = (e) => {
        setKinerjaFormat({selectValue: e});
        setData('kinerja_format', e);
    }
    
    function Icon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        );
    }
    
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                                <div className="container mx-auto">
                                        {flash.message && (
                                    <Alert open={open} icon={<Icon />} onClose={() => setOpen(false)} 
                                        color="black" className="my-3 shadow-lg">
                                        {flash.message}
                                    </Alert>
                                )}
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
                                                    <Input label="Kinerja" variant="outlined" id="kinerja"                                                         
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
                                                <div>
                                                    <Select label="Kinerja Format" onChange={handleChangeKinerjaFormat}
                                                            value={kinerja.kinerja_format}
                                                            error={errors.kinerja_format}>                                                    
                                                            {data_format.map(({id, format}) => (
                                                                <Option value={id} key={id}>{format}</Option>
                                                                            ))}                                                     
                                                    </Select>
                                                    {errors.kinerja_format && <div className="text-red-400 mt-1">{errors.kinerja_format}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Triwulan" id="indeks"
                                                                onChange={handleTriwulanChange}
                                                                value={kinerja.triwulan_id}
                                                                error={errors.triwulan_id}>
                                                            {triwulans.map(({id, triwulan}) => (
                                                                <Option value={id} key={id}>{triwulan}</Option>
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
                                            <Button variant="gradient" type="submit" color="green" onClick={handleSave}>
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