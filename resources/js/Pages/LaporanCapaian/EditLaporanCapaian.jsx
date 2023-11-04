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
    const {auth, laporan_capaian, indikators, indikator_periode, periodes, triwulans, pics} = usePage().props;
    const {data, setData, put, errors, processing} = useForm({
        id: laporan_capaian.data.id || '',
        //indikator_periode_id: laporan_capaian.data.indikator_periode_id || '',
        triwulan_id: laporan_capaian.data[0].triwulan_id || '',
        realisasi: laporan_capaian.data[0].realisasi || '',
        kinerja: laporan_capaian.data[0].kinerja || '',
        periode_id: laporan_capaian.data[0].periode_id || '',
        kategori_kinerja_id: laporan_capaian.data[0].kategori_kinerja_id || '',
        indikator_id: laporan_capaian.data[0].indikator_id || '',
        target: laporan_capaian.data[0].target || '',
        target_format: laporan_capaian.data[0].target_format || '',
        persentasi_kinerja: laporan_capaian.data[0].persentasi_kinerja || '',
        sumber_data: laporan_capaian.data[0].sumber_data || '',
        file_path: laporan_capaian.data[0].file_path || '',
        pics: laporan_capaian.data[0]
    });
    console.log(usePage().props);
    const defPics = usePage().props.laporan_capaian.data[0].laporan_capaian_pic;
    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');
    const [optionPic, setOptionPic] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [optionTriwulan, setOptionTriwulan] = useState([]);
    const [targetFormat, setTargetFormat] = useState([]);
    const defPic = defPics.map((pic) => {
        return {value: pic.pic_id, label: pic.nama_pic};
    })

    const handleSave = (e) => {
        e.preventDefault();
        put(route('laporan-capaian.update', laporan_capaian.data[0].id));
    };

    const handlePeriodeChange = (e) => {
        setOptionPeriode({selectValue: e});
        setData('periode_id', e);
    }

    const handleIndikatorChange = (e) => {
        setOptionIndikator({selectValue: e});
        setData('indikator_id', e);
    }

    const handlePicChange = (e) => {
        setOptionPic({selectValue: e});
        setData('pic_id', e);
    }

    const handleTriwulanChange = (e) => {
        setOptionTriwulan({selectValue: e});
        setData('triwulan_id', e);
    }

    const handleTargetFormatChange = (e) => {
        setTargetFormat({selectValue: e});
        setData('target_format', e);
    }

    const optPic = pics.map(pic => {
        return {value: pic.id, label: pic.nama_pic};
    })
    
    function handleCalculate(){
        if (confirm('Apakah Anda ingin mengkalkulasi kinerja?')) {            
            axios.post(route('laporan-capaian.calculate-kinerja'), {laporan_capaian_id: laporan_capaian.data[0].id})
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
                                            Edit Laporan Capaian
                                        </Typography>
                                    </CardHeader>                                
                            
                                    <form onSubmit={handleSave}>
                                        <CardBody>                                
                                            <div className="flex flex-col gap-4">
                                                <Select label="Select Periode" id="periode" onChange={handlePeriodeChange}
                                                        value={laporan_capaian.data[0].periode_id}
                                                        error={errors.periode_id}>
                                                    {periodes.map(({id, periode, status}) => <Option value={id.toString()} key={id}>{periode + " (" + status + ")"}</Option>)}                                                                                                           
                                                </Select>
                                                {errors.periode_id &&
                                                        <div className="text-red-400 mt-1">{errors.periode_id}</div>
                                                }
                                                <Input label="Indikator" variant="outlined" id="indikator" onChange={handleIndikatorChange}
                                                       value={laporan_capaian.data[0].indikator.nama_indikator}
                                                       />                                                    
                                                {errors.indikator_id &&
                                                        <div className="text-red-400 mt-1">{errors.indikator_id}</div>
                                                }
                                                <Select label="Triwulan" id="triwulan" onChange={handleTriwulanChange}
                                                        value={laporan_capaian.data[0].triwulan_id}
                                                        error={errors.triwulan_id}>
                                                    {triwulans.map(({id, triwulan}) =>
                                                    <Option value={id.toString()} key={id}>{triwulan}</Option>)}                                                     
                                                </Select>
                                                <MSelect options={optPic} defaultValue={defPic} label="Pic"
                                                         onChange={(item) => {
                                                                     setOptionPic(item);
                                                                     setData('pics', item)
                                                                 }}
                                                         />
                                                {errors.pic_id &&
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                }
                                                <Input label="Target" variant="outlined" id="target" 
                                                       defaultValue={laporan_capaian.data[0].target}                                                      
                                                       />
                                                {errors.terget &&
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                }
                                                <Select label="Format Target" onChange=""
                                                        defaultValue={laporan_capaian.data[0].target_format}
                                                        error={errors.Status}>                                                    
                                                    <Option value="Decimal">Decimal</Option>
                                                    <Option value="Persentase">Persentase</Option>                                                      
                                                </Select>
                                                {errors.target_format &&
                                                        <div className="text-red-400 mt-1">{errors.target_format}</div>
                                                }
                                                <Input label="Realisasi" variant="outlined" id="realisasi"
                                                       defaultValue={
                                                               (parseFloat(laporan_capaian.data[0].realisasi)).toLocaleString(undefined, {maximumFractionDigits: 2})}
                                                       onChange={e => {
                                                                   setData('Periode', e.target.value)
                                                               }}                                                        
                                                       error={errors.Periode}/>
                                                {errors.realisasi &&
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                }
                                                <div className="relative flex w-full">
                                                    <Input label="Persentasi Kinerja" variant="outlined" id="persentasi"
                                                           defaultValue={laporan_capaian.data[0].persentasi_kinerja}
                                                           onChange={e => {
                                                                       setData('persentasi_kinerja', e.target.value)
                                                                   }}                                                       
                                                           error={errors.Periode}
                                                           className="pr-20"
                                                           containerProps={{
                                                                       className: "min-w-0",
                                                                   }}/>
                                                    {errors.persentasi_kinerja &&
                                                        <div className="text-red-400 mt-1">{errors.persentasi_kinerja}</div>
                                                    }
                                                    <Button
                                                        size="sm"
                                                        color="blue"                                                            
                                                        className="!absolute right-1 top-1 rounded"
                                                        >
                                                        Get
                                                    </Button>
                                                </div>
                                                <Select label="Kategori Kinerja" onChange=""
                                                        defaultValue=""
                                                        error={errors.Status}>
                                                    <Option value="undefined">Undefined</Option>
                                                    <Option value="Minimize">Minimize</Option>
                                                    <Option value="Maximize">Maximize</Option>                                                      
                                                </Select>
                                                {errors.persentasi_kinerja &&
                                                        <div className="text-red-400 mt-1">{errors.persentasi_kinerja}</div>
                                                }
                                                <Input label="Kinerja Tahunan" variant="outlined" id="kinerja-tahunan" 
                                                       onChange={e => {
                                                                   setData('kinerja', e.target.value)
                                                               }}
                                                       error={errors.kinerja}/>
                                                {errors.kinerja &&
                                                        <div className="text-red-400 mt-1">{errors.kinerja}</div>
                                                }
                            
                                                <Input label="Sumber Data" variant="outlined" id="periode" 
                                                       onChange={e => {
                                                                   setData('Periode', e.target.value)
                                                               }} 
                            
                                                       error={errors.Periode}/>
                                                <Input type="File" label="File" variant="outlined" id="file"
                                                       defaultValue=""                                                      
                                                       />
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