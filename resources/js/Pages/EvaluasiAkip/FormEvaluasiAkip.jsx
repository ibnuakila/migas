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
  Typography ,
  Select, Option 
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import FormUpload from './FormUpload';

export default function FormEvaluasiAkip() {
    const {auth} = usePage().props;
    const { upload_files, periodes } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        id: '',
        periode: '',
        tanggal_ajuan: '',
        status: '',
        keterangan: ''
    });
    
    const [option, setOption] = useState('');
    const TABLE_HEAD = ["ID", "Nama Dokumen", "Kategori/Komponen", "Tgl Upload", "Deskripsi", "Revisi","Action"];
    const [open, setOpen] = useState(false);
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('evaluasi-akip.store'));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('periode', e);
    }
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                <div className="container mx-auto">
                    <Card className="p-5">

                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                        <Typography variant="h4" color="white">
                            New Evaluasi Akip
                        </Typography>
                    </CardHeader>


                    <form id="hasil-evaluasi" onSubmit={handleSave}>
                        <CardBody>

                            <div className="flex flex-wrap flex-col place-content-center gap-4">

                                <Select label="Select Periode" onChange={handleChange}
                                    id="opt-periode"
                                    value={option.selectValue}
                                    error={errors.periode}>
                                    {periodes.map( ({id, periode, status}) => (<Option value={id}>{periode+" ("+status+")"}</Option>) )}                                      
                                                                                          
                                    </Select>
                                <Input label="Tanggal" variant="outlined" id="tanggal" 
                                        onChange={e => {
                                            setData('tanggal_ajuan', e.target.value)
                                        }}                                                        
                                       error={errors.tanggal_ajuan}/> 
                                <Textarea label="Keterangan" variant="outlined" id="keterangan" 
                                        onChange={e => {
                                            setData('keterangan', e.target.value)
                                        }}                                                        
                                       error={errors.keterangan}/>
                            </div>
                            <div className="flex place-content-left mt-2">
                                <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                    Save
                                </Button>
                            </div>
                            
                            <div className="flex justify-between my-2">
                                <Typography variant="h3">Dokumen Evaluasi Akip                            
                                </Typography>
                                <span>                                    
                                    <Button size="sm" className="ml-2" color="blue" onClick={() => setOpen(true)}>Add</Button>                                    
                                </span>                        
                            </div>

                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                              <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                              >
                                                {head}
                                              </Typography>
                                            </th>
                                          ))}
                                        </tr>
                                    </thead>
                                    <tbody>                                                      
                                        {upload_files.data.map(({id, nama_dokumen, kategori_dokumen_id, upload_date, deskripsi, revisi}) => (
                                            <tr key={id} className="even:bg-blue-gray-50/50">
                                              <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                  {id}
                                                </Typography>
                                              </td>
                                              <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                  {nama_dokumen}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {kategori_dokumen_id}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {upload_date}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {deskripsi}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {revisi}
                                                </Typography>
                                              </td>
                                              <td className="p-4">
                                                <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                                <Link href={route('periode.edit', id)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                  </svg>
                                                </Link>
                                                </Typography>
                                              </td>
                                            </tr>
                                          ))}
                                    {upload_files.data.length === 0 && (
                                      <tr>
                                        <td className="px-6 py-4 border-t" colSpan="4">
                                          No data found.
                                        </td>
                                      </tr>
                                    )}
                                    </tbody>
                                </table>
                        </CardBody>
                        <CardFooter>
                        <div></div>
                        </CardFooter>
                    </form>
                    </Card>
                    
                    <FormUpload open={open} action={() => setOpen(!open)}/>
                </div>
                    )}>
            
            </AdminLayout>
  );
}