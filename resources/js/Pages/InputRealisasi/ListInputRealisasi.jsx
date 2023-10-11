import {React, useState, useEffect} from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, 
    Typography, 
    Button,
    Dialog,
    DialogHeader,
  DialogBody,
  DialogFooter,
  Input} from "@material-tailwind/react";
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function ListInputRealisasi({auth}){
    const TABLE_HEAD = ["ID", "Nama Kompositor", "Realisasi", "Satuan", "Triwulan", "PIC", "Periode", "Action"];
 
    const { input_realisasis, indikator } = usePage().props;
    console.log(indikator[0].nama_indikator);
    const [open, setOpen] = useState(false);
 
    
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
            router.visit('/input-realisasi/importkompositor', {
                method: 'get',
                data:{isImport:true},
                onFinish: visit => {
                    router.reload();
                    console.log(visit)},
            });
            
        }
    }
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <div className="flex justify-between">
                        <Typography variant="h4">Input Realisasi Kompositor/Parameter {indikator[0].nama_indikator}                           
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
