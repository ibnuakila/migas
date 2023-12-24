import {React, useState, useEffect} from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, 
    CardHeader,
    CardBody,
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
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function ListInputRealisasi({auth}){
    const TABLE_HEAD = ["ID", "Indeks", "Nama Kompositor", "Jenis", "Realisasi", "Satuan", "Triwulan", "PIC","Periode", "Action"];
 
    const { input_realisasis, indikator, laporan_capaian, triwulan } = usePage().props;
    const {
        data,
        //meta: { links }
      } = input_realisasis;
    console.log(usePage().props);
    const [open, setOpen] = useState(true);
    const { flash } = usePage().props;    
    const [term, setTerm] = useState('');
    const [termIndeks, setTermIndeks] = useState('');
    const [termKompositor, setTermKompositor] = useState('');
    const queryString = { 
        findeks:termIndeks, 
        fkompositor:termKompositor,
        };
    function handleChangeIndeks(e){
        const value = e.target.value;
        setTermIndeks(value);
    }
    
    function handleChangeKompositor(e){
        const value = e.target.value;
        setTermKompositor(value);
    }
    
    useEffect( () => {
        //if(term.length >= 2){
            router.visit('/input-realisasi/laporancapaiantriwulan/' + laporan_capaian.id + '/triwulan/' + triwulan.id, {
                method: 'get',
                data: queryString,
                replace: true,
                preserveState: true
            });
        //}
        
    },[termIndeks, termKompositor]);
    
    function handleImport(){
        if (confirm('Apakah Anda yakin akan mengimport data indikator?')) {
            router.visit('/input-realisasi/import-kompositor/' , {
                method: 'get',
                data:{laporan_capaian_id:laporan_capaian.id, triwulan_id:triwulan.id},
                onFinish: visit => {
                    if(flash.message){
                        alert(flash.message);
                    }
                    router.reload();
                    },
            });
            
        }
    }
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    {flash.message && (
                        <Alert color="blue" open={open} 
                        onClose={() => setOpen(false)} className="my-3">{flash.message}</Alert>
                    )}
                    <Card className="mt-12 mb-8 flex flex-col gap-12">
                        <CardHeader variant="gradient" color="blue-gray" className="mb-2 p-6">
                            <Typography variant="h4" color="white">
                              Input Realisasi Kompositor/Parameter {indikator.nama_indikator} 
                            </Typography>
                        </CardHeader>
                    <CardBody className="overflow-x-scroll px-2 pt-0 pb-2">
                    
                    <div className="flex my-2">                        
                        <Button size="sm" className="ml-2" onClick={handleImport} color="green">Import Kompositor</Button>
                    </div>
                    
                        <table className="w-full min-w-[640px] table-auto">
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
                                <tr className="border-b-2">
                                    <th></th>
                                    <th>
                                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        onChange={handleChangeIndeks} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Indeks" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/>
                                    </th>
                                    <th>
                                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        onChange={handleChangeKompositor} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Kompositor" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/>
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    
                                </tr>
                            </thead>
                            <tbody>                                                      
                                {input_realisasis.map(({ id, nama_indeks, nama_kompositor, kompositor_id, nama_jenis_kompositor, nilai,  
                                    satuan, triwulan, input_realisasi_pic, periode, realisasi_kompositor_id}) => (
                                    <tr key={kompositor_id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {kompositor_id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_indeks}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {nama_kompositor}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_jenis_kompositor}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-red-600 text-right">
                                            {nilai ? ((parseFloat(nilai)).toLocaleString(undefined, {maximumFractionDigits:2})):(0)}
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
                                      <td>
                                        <div className="flex">
                                            {input_realisasi_pic.map( ({id, nama_pic}) => (
                                                <Typography key={id} variant="small" color="blue-gray" className="font-normal text-gray-600 ml-1">
                                                    {nama_pic}
                                                </Typography>) )}
                                        </div>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {periode}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="flex mt-2">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                          <Link href={route('input-realisasi.edit', {inputrealisasi:id, realisasikompositor:realisasi_kompositor_id})} title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                          </Link>
                                        </Typography>
                                        
                                      </td>
                                    </tr>
                                  ))}
                                {input_realisasis.length === 0 && (
                                    <tr>
                                      <td className="px-6 py-4 border-t" colSpan="4">
                                        No data found.
                                      </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        </CardBody>
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
