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
        Select, 
        Option
        } from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
//import Select from "react-select";
import MSelect from '../../Components/MSelect';
//initTE({Select});

export default function EditIndikatorPeriode() {
    const {auth, periodes, pics, indikators, indikator} = usePage().props;
    const {data, setData, put, errors, delete: destroy, processing} = useForm({
        id: indikator.data[0].id || '',
        periode_id: indikator.data[0].periode_id || '',
        indikator_id: indikator.data[0].indikator_id || '',
        target: indikator.data[0].target || '',
        //pics: indikator.data.pic_id || '',
        //level_id: ''
    });
    console.log(usePage().props);

    const [optionPeriode, setOptionPeriode] = useState('');
    const [optionIndikator, setOptionIndikator] = useState('');
    const [optionPic, setOptionPic] = useState([]);
    const [optionLevel, setOptionLevel] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    
    const handleSave = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('indikator-periode.update', indikator.data[0].id));
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
        //setSelectedValue(Array.isArray(e) ? e.map(x => x.value): []);
        //setOptionPic({selectValue: e});
        //setData('pic_id', e);
        console.log(selectedValue);
    }

    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data indikator periode?')) {
            destroy(route('indikator-periode.destroy', indikator.data.id));
        }
    }
    const defPic = indikator.data[0].indikator_periode_pic.map(pic => {
        return {value:pic.pic_id, label:pic.nama_pic};
    })
    console.log(defPic);
    const optPic = pics.map(pic => {
        return {value:pic.id, label:pic.nama_pic};
    })
    //console.log(optPic);
    
    
                
                
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
                                                
                                                <Select label="Select Periode" onChange={handlePeriodeChange}
                                                        value={indikator.data[0].periode_id}
                                                        error={errors.periode_id}>
                                                    {periodes.map(({id, periode, status}) => <Option value={id.toString()} key={id}>{periode + " (" + status + ")"}</Option>)}                                                                                                           
                                                </Select>
                                                {errors.periode_id &&
                                                        <div className="text-red-400 mt-1">{errors.periode_id}</div>
                                                }
                                                <Select label="Select Indikator" onChange={handleIndikatorChange}
                                                        value={indikator.data[0].indikator_id}
                                                        error={errors.indikator_id}>
                                                    {indikators.map(({id, nama_indikator}) => <Option value={id.toString()} key={id}>{nama_indikator}</Option>)}                                                     
                                                </Select>
                                                {errors.indikator_id &&
                                                        <div className="text-red-400 mt-1">{errors.indikator_id}</div>
                                                }
                                                <Input label="Target" variant="outlined" id="target" 
                                                       onChange={e => {
                                                                   setData('target', e.target.value)
                                                               }} 
                                                       defaultValue={indikator.data[0].target}
                                                       error={errors.target}/>                      
                                                {errors.target &&
                                                        <div className="text-red-400 mt-1">{errors.target}</div>
                                                }
                                                
                                                <MSelect options={optPic} defaultValue={defPic} 
                                                    onChange={(item) => {
                                                        setSelectedValue(item); 
                                                        setData('pics', item)
                                                        console.log(selectedValue)}}
                                                 />
                                                {errors.pic_id &&
                                                        <div className="text-red-400 mt-1">{errors.pic_id}</div>
                                                }
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