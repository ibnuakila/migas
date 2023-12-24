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
    console.log(props);
    const auth = props.auth;    
    const input_realisasi = props.input_realisasi;
    const laporan_capaian = props.laporan_capaian;
    const kompositor = props.kompositor;
    const realisasi_kompositor = props.realisasi_kompositor;
    const triwulans = props.triwulans;
    const periodes = props.periodes;
    const pics = props.pics;
    const defPics = props.def_pics;
    const flash = props.flash;
    const {data, setData, put, errors, processing} = useForm({
        id: input_realisasi.id || '',
        kompositor_id: kompositor.id || '',
        realisasi: input_realisasi.realisasi || '',
        realisasi_format: input_realisasi.realisasi_format || '',
        nilai: realisasi_kompositor.nilai || '',
        triwulan_id: input_realisasi.triwulan_id || '',
        periode_id: laporan_capaian.periode_id || '',
        laporan_capaian_id: input_realisasi.laporan_capaian_id || '',
        pics: defPics
    });
    
    const [optionTriwulan, setOptionTriwulan] = useState('');
    const [optionPic, setOptionPic] = useState('');
    const [optionPeriode, setOptionPeriode] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    const [realisasFormat, setRealisasiFormat] = useState('');
    const [isAgregasi, setIsAgregasi] = useState(kompositor.jenis_kompositor_id == 2 ? true:false);
    const [isParameter, setIsParameter] = useState(kompositor.jenis_kompositor_id == 3 ? true:false);
    const [open, setOpen] = useState(true);
    
    const handleSave = (e) => {
        let realisasi = document.getElementById('realisasi');
            //alert(realisasi.value);
        setData('realisasi', realisasi.value);
        //setData('nilai', realisasi.value);
        e.preventDefault();
        put(route('input-realisasi.update', input_realisasi.id));        
        if(flash.message){
            alert(flash.message);
        }        
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
        //setData('nilai', e.target.value);
    }
    
    
    function handleCalculate(){
        if (confirm('Apakah Anda ingin mengkalkulasi realisasi?')) {
            alert(kompositor.jenis_kompositor_id);
            if(isAgregasi){
                axios.post(route('input-realisasi.calculate-realization'), 
                {input_realisasi_id:input_realisasi.id, realisasi_kompositor_id:realisasi_kompositor.id})
                        .then(res => {
                            console.log(res);
                            if(res.message != ''){
                                alert(res.data.realisasi);
                            //}else{
                                let realisasi = document.getElementById('realisasi');
                                realisasi.value = res.data.realisasi;
                                //realisasi.setAttribute('value', res.data.result);
                                setData('realisasi', res.data.realisasi);
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
            }else if(isParameter){
                axios.get(route('kompositor.getparameter', kompositor.id), 
                {kompositor_id:kompositor.id})
                        .then(res => {
                            console.log(res);
                            if(res.data.response){
                                alert(res.data.value);
                            //}else{
                                let realisasi = document.getElementById('realisasi');
                                realisasi.value = res.data.value;
                                //realisasi.setAttribute('value', res.data.result);
                                setData('realisasi', res.data.value);
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
            }else{
                alert('Undefine jenis kompositor');
            }
            
        }
    }
    /*const defPic = 
            defPics[].map(pic => {
                return {value:pic.value, label:pic.label};
            })*/
    const handleChangeRealisasiFormat = (e) => {
        setRealisasiFormat({selectValue: e});
        setData('realisasi_format', e);
    }
    
    //console.log(defPics);
    const optPic = pics.map(pic => {
        return {value:pic.id, label:pic.nama_pic};
    })
    //console.log(optPic);
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                {flash.message && (
                    <Alert open={open} onClose={() => setOpen(false)} 
                        color="blue" className="my-3">
                        {flash.message}
                    </Alert>
                )}
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
                                                    defaultValue={kompositor.nama_kompositor}                                                    
                                                       />  
                                                {errors.kompositor_id && <div className="text-red-400 mt-1">{errors.kompositor_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Satuan" variant="outlined" id="satuan" 
                                                        defaultValue={kompositor.satuan}                                                        
                                                        error={errors.satuan}/>  
                                                {errors.satuan && <div className="text-red-400 mt-1">{errors.satuan}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Triwulan" id="indeks"
                                                            onChange={handleChangeTriwulan}
                                                            value={input_realisasi.triwulan_id}
                                                            error={errors.triwulan_id}>
                                                        {triwulans.map(({id, triwulan}) => (
                                                            <Option value={id} key={id}>{triwulan}</Option>
                                                                            ))}
                                                </Select>
                                                {errors.triwulan_id && <div className="text-red-400 mt-1">{errors.triwulan_id}</div>}
                                            </div>
                                            <div className="relative flex w-full">
                                                <Input label="Realisasi" variant="outlined" id="realisasi"                                                         
                                                        defaultValue={realisasi_kompositor.nilai}
                                                        onChange={handleChangeRealisasi}
                                                        error={errors.realisasi}
                                                        className="pr-20"
                                                        containerProps={{
                                                          className: "min-w-0",
                                                        }}                                                        
                                                        />
                                                        {kompositor.jenis_kompositor_id == 2 ? (<Button
                                                            size="sm"
                                                            color="blue"                                                            
                                                            className="!absolute right-1 top-1 rounded"
                                                            onClick={handleCalculate}
                                                          >Get Agregasi</Button>):("")}
                                                        {kompositor.jenis_kompositor_id == 3 ? (<Button
                                                          size="sm"
                                                          color="blue"                                                            
                                                          className="!absolute right-1 top-1 rounded"
                                                          onClick={handleCalculate}
                                                        >Get Parameter</Button>):("")}
                                                {errors.realisasi && <div className="text-red-400 mt-1">{errors.realisasi}</div>}
                                            </div>
                                            <div>
                                                <Select label="Realisasi Format" onChange={handleChangeRealisasiFormat}
                                                        defaultValue={input_realisasi.realisasi_format}
                                                        error={errors.realisasi_format}>                                                    
                                                    <Option value="Decimal">Decimal</Option>
                                                    <Option value="Persentase">Persentase</Option>                                                      
                                                </Select>
                                                {errors.realisasi_format && <div className="text-red-400 mt-1">{errors.realisasi_format}</div>}
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
                                                    value={laporan_capaian.periode_id}
                                                    error={errors.periode_id}>
                                                        {periodes.map(({id, periode}) => (
                                                            <Option value={id} key={id}>{periode}</Option>
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