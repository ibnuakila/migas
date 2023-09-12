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
import AdminLayout from '@/Layouts/AdminLayout';
 
export default function FormEvaluasiAkip() {
    const {auth} = usePage().props;
    const { upload_files } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        Id: '',
        Periode: '',
        TanggalAjuan: '',
        Status: '',
        Keterangan: ''
    });
    
    const [option, setOption] = useState('');
    const TABLE_HEAD = ["ID", "Nama Dokumen", "Kategori/Komponen", "Tgl Upload", "Deskripsi", "Revisi","Action"];
    
    console.log(usePage().props);
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('evaluasi-akip.store'));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('Periode', e);
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


                    <form onSubmit={handleSave}>
                        <CardBody>

                            <div className="flex flex-wrap flex-col place-content-center gap-4">

                                <Select label="Select Periode" onChange={handleChange}
                                    value={option.selectValue}
                                    error={errors.Status}>
                                      <Option value="Closed">2017</Option>
                                      <Option value="Active">2018</Option>                                                      
                                    </Select>
                                <Input label="Tanggal" variant="outlined" id="Periode" 
                                        onChange={e => {
                                            setData('TanggalAjuan', e.target.value)
                                        }}                                                        
                                       error={errors.TanggalAjuan}/> 
                                <Textarea label="Keterangan" variant="outlined" id="Periode" 
                                        onChange={e => {
                                            setData('TanggalAjuan', e.target.value)
                                        }}                                                        
                                       error={errors.TanggalAjuan}/>
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
                                    <Link href={route('evaluasi-akip.create')}>
                                        <Button size="sm" className="ml-2" color="blue">Add</Button>
                                    </Link>
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
                                        {upload_files.data.map(({Id, NamaDokumen, Komponen, UploadDate, Deskripsi, Revisi}) => (
                                            <tr key={Id} className="even:bg-blue-gray-50/50">
                                              <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                  {Id}
                                                </Typography>
                                              </td>
                                              <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                  {NamaDokumen}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {Komponen}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {UploadDate}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {Deskripsi}
                                                </Typography>
                                              </td>
                                              <td className="p-4">                                      
                                                <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                  {Revisi}
                                                </Typography>
                                              </td>
                                              <td className="p-4">
                                                <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                                <Link href={route('periode.edit', Id)}>
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
                                          No contacts found.
                                        </td>
                                      </tr>
                                    )}
                                    </tbody>
                                </table>
                        </CardBody>
                        <CardFooter>
                            <Typography variant="h5">Instruksi</Typography>
                            <Typography varian="small">
                                Isikan data terlebih dahulu, kemudian klik "Save". Setelah itu klik "Add" untuk menambahkan dokumen.
                            </Typography>
                        </CardFooter>
                    </form>
                    
                    
                    </Card>
                    
                </div>
                    )}>
            
            </AdminLayout>
  );
}