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

export default function FormHitungKompositor() {
    const props = usePage().props;
    const auth = props.auth;
    const indikator_kompositor = props.indikator_kompositor;
    const indikator_kompositors = props.indikator_kompositors;
    const hitung_kompositors = props.hitung_kompositors;
    const {data, setData, post, errors, processing} = useForm({
        field: '',
        f_type: '',
        p_field_id: '',
        indikator_kompositor_id: indikator_kompositor.data.id || ''       
    });
    console.log(props);
    const [optionFtype, setOptionFtype] = useState('');
    const [optionPfieldId, setOptionPfieldId] = useState('');
    const [optionKompositor, setOptionKompositor] = useState('');
    const [optionOperator, setOptionOperator] = useState('');
    //const [field, setField] = useState(true);
    const [input, setInput] = useState(true);
    const [value, setValue] = useState(false);
    const [operator, setOperator] = useState(false);
    
    const handleSave = (e) => {
        e.preventDefault();
        post(route('hitung-kompositor.store'));
    }
    
    function handleChangeFtype(e) {
        setOptionFtype({selectValue: e});
        setData('f_type', e);
        console.log(e);
        if(e === 'Input'){
            //alert(e);
            setInput(true);
            setOperator(false);
            setValue(false);
        }else if(e === 'Operator'){
            setInput(false);
            setOperator(true);
            setValue(false);
        }else if(e === 'Value'){
            setInput(false);
            setOperator(false);
            setValue(true);
        }
    }
    
    function handleChangePfieldId(e) {
        setOptionPfieldId({selectValue: e});
        setData('p_field_id', e);
        //console.log(optionJenisKompositor);
    }
    
    function handleChangeKompositor(e){
        setOptionKompositor({selectValue:e});
        setData('field',e);
    }
    
    function handleChangeOperator(e){
        setOptionOperator({selectValue:e});
        setData('field',e);
    }
    
    
    
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                        <div className="container mx-auto">
                                <Card className="p-5 h-full w-45">                                    
                                <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                    <Typography variant="h4" color="white">
                                        New Hitung Kompositor/Parameter
                                    </Typography>
                                </CardHeader>                                    
                                <CardBody>
                                    <form action="">
                                        <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Indikator" variant="outlined" id="nama-indikator" 
                                                    defaultValue={indikator_kompositor.data.nama_kompositor} disabled
                                                       error=""/>  
                                                {errors.indikator_id && <div className="text-red-400 mt-1">{errors.indikator_id}</div>}
                                            </div>
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Field Type" id="indeks"
                                                            onChange={handleChangeFtype}
                                                            value={optionFtype.selectValue}
                                                            error={errors.f_type}>                                                        
                                                            <Option value="Operator" key="1">Operator</Option>
                                                            <Option value="Input" key="2">Input</Option>
                                                            <Option value="Value" key="3">Value</Option>
                                                </Select>
                                                {errors.f_type && <div className="text-red-400 mt-1">{errors.f_type}</div>}
                                            </div>
                                            {value ? (
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Value" variant="outlined" id="nama-kompositor" 
                                                            onChange={e => {
                                                                        setData('field', e.target.value)
                                                                    }}
                                                           error={errors.field}/>  
                                                    {errors.field && <div className="text-red-400 mt-1">{errors.field}</div>}
                                                </div>
                                            ): null}
                                            {input ? (
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Kompositor" id="kompositor" className="hide"
                                                                onChange={handleChangeKompositor}
                                                                value={optionKompositor.selectValue}
                                                                error={errors.field}>
                                                            {indikator_kompositors.map(({id, nama_kompositor}) => (
                                                                <Option value={nama_kompositor} key={id}>{nama_kompositor}</Option>
                                                                                ))}
                                                    </Select>
                                                    {errors.field && <div className="text-red-400 mt-1">{errors.field}</div>}
                                                </div>
                                            ) : null}
                                            {operator ? (
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Operator" id="indeks"
                                                                onChange={handleChangeOperator}
                                                                value={optionOperator.selectValue}
                                                                error={errors.field}>                                                        
                                                                <Option value="+" key="1">+</Option>
                                                                <Option value="-" key="2">-</Option>
                                                                <Option value="/" key="3">/</Option>
                                                                <Option value="*" key="3">*</Option>
                                                    </Select>
                                                    {errors.field && <div className="text-red-400 mt-1">{errors.field}</div>}
                                                </div>
                                            ):null}
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Select label="Parent" id="indeks"
                                                            onChange={handleChangePfieldId}
                                                            value={optionPfieldId.selectValue}
                                                            error={errors.p_field_id}>
                                                            {hitung_kompositors.length === 0 ? (
                                                                <Option value="0" key="0">0</Option>
                                                            ):(
                                                                hitung_kompositors.map(({id, field}) => (
                                                                    <Option value={id} key={id}>{field}</Option>                                                            
                                                                ))
                                                            )}
                                                            
                                                </Select>
                                                {errors.p_field_id && <div className="text-red-400 mt-1">{errors.p_field_id}</div>}
                                            </div>
                                            <div className="flex">
                                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                                    Save
                                                </Button>
                                            </div>
                                        </div>
                                        
                                    </form>
                            
                                </CardBody>
                                <CardFooter className="space-x-2">                                    
                                    
                                </CardFooter>
                                </Card>
                                </div>
                                )}
                >
            
            </AdminLayout>
            );
}