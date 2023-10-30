import React,{useState} from "react";
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
    const defPics = usePage().props.laporan_capaian.data[0].laporan_capaian_pic;
    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');
    const [optionPic, setOptionPic] = useState('');
    //const [optionLevel, setOptionLevel] = useState('');
    
    const handleSave = (e) => {
        e.preventDefault();
        post(route('laporan-capaian.update'));        
    };
    
    const handlePeriodeChange = (e) => {
        setOptionPeriode({selectValue:e});
        setData('periode_id', e);
    }
    
    const handleIndikatorChange = (e) => {
        setOptionIndikator({selectValue:e});
        setData('indikator_id', e);
    }
    
    const handlePicChange = (e) => {
        setOptionPic({selectValue:e});
        setData('pic_id', e);
    }
    const optPic = pics.map(pic => {
        return {value:pic.id, label:pic.nama_pic};
    })
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
                                                    value={laporan_capaian.data.periode_id}
                                                    error={errors.periode_id}>
                                                    {periodes.map( ({id, periode, status}) => <Option value={id.toString()} key={id}>{periode + " (" + status + ")"}</Option> )}                                                                                                           
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
                                                <Select label="Triwulan" id="triwulan" onChange=""
                                                    value={laporan_capaian.data[0].triwulan_id}
                                                    error={errors.triwulan_id}>
                                                    {triwulans.map( ({id, triwulan}) => 
                                                    <Option value={id.toString()} key={id}>{triwulan}</Option> )}                                                     
                                                </Select>
                                                <MSelect options={optPic} defaultValue={defPics} 
                                                    onChange={(item) => {
                                                        setSelectedValue(item); 
                                                        setData('pics', item)
                                                        console.log(selectedValue)
                                                    }}
                                                 />
                                                    {errors.pic_id && 
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                    }
                                                <Input label="Target" variant="outlined" id="target" disabled
                                                       defaultValue={laporan_capaian.data.target}                                                      
                                                       />
                                                <Input label="Realisasi" variant="outlined" id="realisasi"
                                                        defaultValue={laporan_capaian.data.realisasi}
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.Periode}/>  
                                               <div className="relative flex w-full">
                                                    <Input label="Persentasi Kinerja" variant="outlined" id="persentasi" 
                                                        onChange={e => {
                                                            setData('Periode', e.target.value)
                                                        }}                                                       
                                                        error={errors.Periode}
                                                        className="pr-20"
                                                        containerProps={{
                                                          className: "min-w-0",
                                                        }}/>
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
                                                    <Option value="Closed">Select</Option>
                                                      <Option value="Closed">Minimize</Option>
                                                      <Option value="Active">Maximize</Option>                                                      
                                                </Select>
                                                
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