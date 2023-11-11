import {React, useState, useEffect} from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, 
    Typography, 
    Button,
    Dialog,
    DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Alert} from "@material-tailwind/react";
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function ListInputRealisasi({auth}){
    const TABLE_HEAD = ["ID", "Nama Kompositor", "Realisasi", "Satuan", "Triwulan", "PIC", "Periode", "Action"];
 
    const { input_realisasis, indikator, laporan_capaian } = usePage().props;
    console.log(usePage().props);
    const [open, setOpen] = useState(false);
    const { flash } = usePage().props;
    
    const [term, setTerm] = useState('');
        
    function handleChange(e) {
        //const key = e.target.name;
        const value = e.target.value;
        
        setTerm(value);
        //console.log(key + ", " +value);
    }
    
    useEffect( () => {
        //if(term.length >= 2){
            /*router.visit('/indikator', {
                method: 'get',
                data: { search: term, page:indikators.current_page},
                replace: true,
                preserveState: true
            });*/
        //}
        //Inertia.get(route(route().current()), query, {
        //replace: true,
        //preserveState: true
      },[term]);
    
    function handleImport(){
        if (confirm('Apakah Anda yakin akan mengimport data indikator?')) {
            router.visit('/input-realisasi/import-kompositor/' , {
                method: 'get',
                data:{laporan_capaian_id:laporan_capaian.id},
                onFinish: visit => {
                    //router.reload();
                    console.log(visit)},
            });
            
        }
    }
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    {flash.message && (
                        <Alert color="green">{flash.message}</Alert>
                    )}
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <div className="flex justify-between">
                        <Typography variant="h4">Input Realisasi Kompositor/Parameter {indikator.nama_indikator}                     
                        </Typography>
                        <span><Input variant="outlined" size="md" className="w-45" label="Search for Indikator" name="namaIndikator" onChange={handleChange}/></span>
                    </div>
                    <div className="flex my-2">
                        <Link href={route('input-realisasi.create')}>
                            <Button size="sm" className="ml-2" color="blue">Add</Button>
                        </Link>
                        <Button size="sm" className="ml-2" onClick={handleImport} color="green">Import Indikator Kompositor</Button>
                    </div>
                    
                        <table>
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
                                {input_realisasis.map(({ id, nama_kompositor, realisasi, satuan, triwulan, pic_id, periode}) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_kompositor}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-red-600 text-right">
                                            {realisasi ? ((parseFloat(realisasi)).toLocaleString(undefined, {maximumFractionDigits:2})):(0)}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-green-600">
                                          {satuan}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {triwulan}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {pic_id}
                                        </Typography>                                                                                
                                      </td>                                      
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {periode}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="flex mt-2">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                          <Link href={route('input-realisasi.edit', id)} title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                          </Link>
                                        </Typography>
                                        
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                        </table>
                        <Pagination links={input_realisasis.links} />
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
