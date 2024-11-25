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
import AdminLayout from '@/layouts/AdminLayout';
import MSelect from '../../Components/MSelect';
import NewAdminLayout from "@/layouts/NewAdminLayout";


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
    const data_format = props.data_format;
    //const [realization, setRealization] = useState(0);
    const {data, setData, put, errors, delete: destroy, processing} = useForm({
        id: input_realisasi.id || '',
        kompositor_id: kompositor.id || '',
        input_realisasi_id: input_realisasi.id || '',
        realisasi: input_realisasi.realisasi == 0 ? realisasi_kompositor.nilai : null,
        realisasi_format: input_realisasi.realisasi_format || '',
        //nilai: realisasi_kompositor.nilai || '',
        triwulan_id: input_realisasi.triwulan_id || '',
        periode_id: laporan_capaian.periode_id || '',
        laporan_capaian_id: input_realisasi.laporan_capaian_id || '',
        pics: defPics
    });
    //console.log(data);
    const [optionTriwulan, setOptionTriwulan] = useState('');
    const [optionPic, setOptionPic] = useState('');
    const [optionPeriode, setOptionPeriode] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    const [realisasFormat, setRealisasiFormat] = useState('');
    const [isAgregasi, setIsAgregasi] = useState(kompositor.jenis_kompositor_id == 2 ? true:false);
    const [isParameter, setIsParameter] = useState(kompositor.jenis_kompositor_id == 3 ? true:false);
    const [isOfKompositor, setIsOfKompositor] = useState(kompositor.jenis_kompositor_id == 4 ? true:false);
    const [open, setOpen] = useState(true);
    const optPic = pics.map(pic => {
        return {value:pic.id, label:pic.nama_pic};
    })

    

    const handleSave = (e) => {
        e.preventDefault();
        put(route('input-realisasi.update', input_realisasi.id));
    }
    
    function handleChangeTriwulan(e) {
        setOptionTriwulan({selectValue: e});
        setData('triwulan_id', e);
        console.log(optionTriwulan);
    }
    
    /*function handleChangePic(e) {
        setOptionPic({selectValue: e});
        setData('pic_id', e);
        console.log(optionPic);
    }*/
    
    function handleChangePeriode(e) {
        setOptionPeriode({selectValue: e});
        setData('periode_id', e);
        console.log(optionPeriode);
    }
    
    function handleChangeRealisasi(e){
        console.log('handleChangeRealisasi triggered');
        setData('realisasi', parseFloat(e.target.value).toLocaleString(undefined, {maximumFractionDigits:2}));
        //setData('nilai', e.target.value);
    }
    
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data Kompositor Realisasi?')) {
            destroy(route('input-realisasi.destroy-kompositor', realisasi_kompositor.id));
        }
    }
    
    const handleCancel = (e) => {
        window.history.back();
    }
    
    function handleCalculate(){
        if (confirm('Apakah Anda ingin mengkalkulasi realisasi?')) {
            //alert(kompositor.jenis_kompositor_id);
            if(isAgregasi){
                axios.post(route('input-realisasi.calculate-realization'), 
                {input_realisasi_id:input_realisasi.id, realisasi_kompositor_id:realisasi_kompositor.id})
                        .then(res => {
                            console.log(res);
                            if(res.message != ''){
                                alert(res.data.realisasi);
                            
                                let realisasi = document.getElementById('realisasi');
                                realisasi.value = parseFloat(res.data.realisasi).toLocaleString(undefined, {maximumFractionDigits:2});
                                //realisasi.setAttribute('value', res.data.result);
                                setData('realisasi', parseFloat(res.data.realisasi).toLocaleString(undefined, {maximumFractionDigits:2}));
                                //setData('nilai', res.data.realisasi);
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
                            //console.log(res);
                            if(res.data.response){
                                //alert(res.data.value);
                            
                                let realisasi = document.getElementById('realisasi');
                                realisasi.value = parseFloat(res.data.value).toLocaleString(undefined, {maximumFractionDigits:2}) ;;
                                //setData('nilai', res.data.value);
                                setData('realisasi', res.data.value);
                                console.log(res.data.value);
                                
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
            }else if(isOfKompositor){
                axios.get(route('kompositor.getofkompositor', kompositor.id), 
                {kompositor_id:kompositor.id})
                        .then(res => {
                            //console.log(res);
                            if(res.data.response){
                                //alert(res.data.value);
                            
                                let realisasi = document.getElementById('realisasi');
                                realisasi.value = parseFloat(res.data.value).toLocaleString(undefined, {maximumFractionDigits:2}) ;;
                                //setData('nilai', res.data.value);
                                setData('realisasi', parseFloat(res.data.realisasi).toLocaleString(undefined, {maximumFractionDigits:2}));
                                //console.log(data);
                                
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
    const handleChangeRealisasiFormat = (e) => {
        setRealisasiFormat({selectValue: e});
        setData('realisasi_format', e);
    }
    
    //console.log(defPics);
    
    //console.log(optPic);
    return (
            <NewAdminLayout 
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
                                <form action="">
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        Edit Realisasi
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
                                                        {kompositor.jenis_kompositor_id == 4 ? (<Button
                                                          size="sm"
                                                          color="blue"                                                            
                                                          className="!absolute right-1 top-1 rounded"
                                                          onClick={handleCalculate}
                                                        >Get Value</Button>):("")}
                                                {errors.realisasi && <div className="text-red-400 mt-1">{errors.realisasi}</div>}
                                            </div>
                                            {isAgregasi ? (
                                                <div>
                                                    <Select label="Realisasi Format" onChange={handleChangeRealisasiFormat}
                                                            defaultValue={input_realisasi.realisasi_format}
                                                            error={errors.realisasi_format}>                                                    
                                                            {data_format.map(({id, format}) => (
                                                                <Option value={id} key={id}>{format}</Option>
                                                                            ))}                                                     
                                                    </Select>
                                                    {errors.realisasi_format && <div className="text-red-400 mt-1">{errors.realisasi_format}</div>}
                                                </div>
                                            ):null}                                            
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
                                    Delete Kompositor
                                </Button>
                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                    Save
                                </Button> 
                                <Button variant="gradient" color="blue" onClick={(e) => handleCancel(e)}>
                                    Cancel
                                </Button> 
                                </CardFooter>
                                </form>
                                </Card>
                                </div>
                                )}
                >
            
            </NewAdminLayout>
            );
}