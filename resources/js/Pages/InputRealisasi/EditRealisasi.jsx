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

export default function EditRealisasi(props) {
    
    const auth = props.auth;    
    const input_realisasi = props.input_realisasi;
    const indikator_kompositor = props.indikator_kompositor;
    const triwulans = props.triwulans;
    const periodes = props.periodes;
    const pics = props.pics;
    const defPics = props.def_pics;
    const {data, setData, put, errors, processing} = useForm({
        id: input_realisasi.data.id || '',
        indikator_kompositor_id: input_realisasi.data.indikator_kompositor_id || '',
        realisasi: input_realisasi.data.realisasi || '',
        //pic_id: input_realisasi.data.pic_id || '',
        satuan: indikator_kompositor.satuan || '',
        triwulan_id: input_realisasi.data.triwulan_id || '',
        periode_id: input_realisasi.data.periode_id || '',
        laporan_capaian_id: input_realisasi.data.laporan_capaian_id || '',
        pics: defPics
    });
    console.log(props);
    const [optionTriwulan, setOptionTriwulan] = useState('');
    const [optionPic, setOptionPic] = useState('');
    const [optionPeriode, setOptionPeriode] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    const handleSave = (e) => {
        let realisasi = document.getElementById('realisasi');
            //alert(realisasi.value);
            setData('realisasi', realisasi.value)
        e.preventDefault();
        put(route('input-realisasi.update', input_realisasi.data.id));        
        //history.back();
        //router.reload();
        
    }
    
    function handleChangeTriwulan(e) {
        setOptionTriwulan({selectValue: e});
        setData('triwulan_id', e);
        console.log(optionTriwulan);
    }
    
    function handleChangePic(e) {
        setOptionPic({selectValue: e});
        setData('pic_id', e);
        console.log(optionPic);
    }
    
    function handleChangePeriode(e) {
        setOptionPeriode({selectValue: e});
        setData('periode_id', e);
        console.log(optionPeriode);
    }
    
    function handleChangeRealisasi(e){
        setData('realisasi', e.target.value);
    }
    
    
    function handleCalculate(){
        if (confirm('Apakah Anda ingin mengkalkulasi realisasi?')) {
            
            /*router.visit('/input-realisasi/calculate-realization/' , {
                method: 'get',
                data:{id:input_realisasi.data.id},
                onSuccess: page => {
                    //router.reload();
                    console.log(page)},
            });*/
            
            axios.post(route('input-realisasi.calculate-realization'), {input_realisasi_id:input_realisasi.data.id})
                    .then(res => {
                        //alert(res.data.result);
                        let realisasi = document.getElementById('realisasi');
                        realisasi.value = res.data.realisasi;
                        //realisasi.setAttribute('value', res.data.result);
                        //setData('realisasi', res.data.result);
            })
            
        }
    }
    /*const defPic = 
            defPics[].map(pic => {
                return {value:pic.value, label:pic.label};
            })*/
        
    
    console.log(defPics);
    const optPic = pics.map(pic => {
        return {value:pic.id, label:pic.nama_pic};
    })
    console.log(optPic);
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                                <Card className="p-5 h-full w-45"> 
                                <form action="">
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        Input Realisasi
                                    </Typography>
                                </CardHeader>                                    
                                <CardBody>
                                    
                                        <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Kompositor" variant="outlined" id="nama-indikator" 
                                                    defaultValue={indikator_kompositor.nama_kompositor}
                                                    disabled ={true}
                                                       />  
                                                {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Satuan" variant="outlined" id="satuan" 
                                                        defaultValue={indikator_kompositor.satuan}
                                                        disabled ={true}
                                                        error={errors.satuan}/>  
                                                {errors.satuan && <div className="text-red-400 mt-1">{errors.satuan}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Triwulan" id="indeks"
                                                            onChange={handleChangeTriwulan}
                                                            value={input_realisasi.data.triwulan_id}
                                                            error={errors.triwulan_id}>
                                                        {triwulans.map(({id, triwulan}) => (
                                                            <Option value={id.toString()} key={id}>{triwulan}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.triwulan_id && <div className="text-red-400 mt-1">{errors.triwulan_id}</div>}
                                            </div>
                                            <div className="relative flex w-full">
                                                <Input label="Realisasi" variant="outlined" id="realisasi"                                                         
                                                        defaultValue={input_realisasi.data.realisasi}
                                                        onChange={handleChangeRealisasi}
                                                        error={errors.realisasi}
                                                        className="pr-20"
                                                        containerProps={{
                                                          className: "min-w-0",
                                                        }}                                                        
                                                        />
                                                        {indikator_kompositor.jenis_kompositor_id > 1? (<Button
                                                            size="sm"
                                                            color="blue"                                                            
                                                            className="!absolute right-1 top-1 rounded"
                                                            onClick={handleCalculate}
                                                          >Get</Button>):("")}
                                                {errors.realisasi && <div className="text-red-400 mt-1">{errors.realisasi}</div>}
                                            </div>
                                            
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                 <MSelect id="pic" options={optPic} defaultValue={defPics} 
                                                    onChange={(item) => {
                                                        setSelectedValue(item); 
                                                        setData('pics', item)
                                                        console.log(selectedValue)
                                                    }}
                                                 />
                                                    {errors.pic_id && 
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                    }
                                            </div>
                                            
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Periode" id="periode" onChange={handleChangePeriode}
                                                    value={input_realisasi.data.periode_id}
                                                    error={errors.periode_id}>
                                                        {periodes.map(({id, periode}) => (
                                                            <Option value={id.toString()} key={id}>{periode}</Option>
                                                                            ))}                                                      
                                                </Select>
                                                    {errors.periode_id && 
                                                        <div className="text-red-400 mt-1">{errors.periode_id}</div>
                                                    }
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