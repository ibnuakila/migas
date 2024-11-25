import {React, useState, useEffect} from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, 
    CardHeader,
    CardBody,
    Typography, 
    Button,
    Dialog,
    DialogHeader,
  DialogBody,
  DialogFooter,
  Input} from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import NewAdminLayout from '@/layouts/NewAdminLayout';

export default function ListIndikatorKompositor({auth}){
    //const TABLE_HEAD = ["ID", "Indeks", "Nama Kompositor", "Jenis Kompositor", "Satuan",   "Action"];
 
    const { kompositors, indikator, kompositor_pics, flash } = usePage().props;    
    console.log(usePage().props);
    const [open, setOpen] = useState(false);
    const [termIndeks, setTermIndeks] = useState('');
    const [termKompositor, setTermKompositor] = useState('');
    const queryString = { 
        findeks:termIndeks, 
        fkompositor:termKompositor,
        };
    const handleOpen = () => {
        setOpen(!open);
        alert("OK");
    }
    const [term, setTerm] = useState('');
        
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
            router.visit('/kompositor/index-indikator/'+indikator.id, {
                method: 'get',
                data: queryString,
                replace: true,
                preserveState: true
            });
        //}
        
    },[termIndeks, termKompositor]);
    
    return (
            <NewAdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="mt-12 mb-8 flex flex-col gap-12">
                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                    {indikator ? ( 
                        <Typography variant="h4">Kompositor/Parameter Indikator: {indikator.nama_indikator}</Typography> 
                        ):(
                        <Typography variant="h4">Kompositor/Parameter </Typography> 
                        )}                        
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-2 pt-0 pb-2">
                    <div className="flex my-2">
                    {indikator ? (
                        <Link href={route('kompositor.create', indikator.id)}>
                        <Button size="sm" className="ml-2" color="blue">Add</Button>
                        </Link>):(null)}
                    </div>
                    
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Id
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Indeks
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Nama Kompositor
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Id Indeks
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Jenis Kompositor
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Satuan
                                        </Typography>
                                    </th> 
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            PIC
                                        </Typography>
                                    </th> 
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Action
                                        </Typography>
                                    </th>
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
                                </tr>
                            </thead>
                            <tbody>                                                      
                                {kompositors.map(({ id, nama_indikator, nama_kompositor, nama_jenis_kompositor, satuan, indeks_id,nama_indeks, jenis_kompositor_id, kompositor_pics }) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_indeks}
                                        </Typography>                                                                                
                                      </td>                                      
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray"                                            
                                         className="font-normal text-blue-600">
                                          {nama_kompositor}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {indeks_id}
                                        </Typography>   
                                      </td>
                                      <td className="p-4">
                                        {nama_jenis_kompositor == 'Agregasi' ? (                                                
                                            <Typography variant="small" color="blue-gray" className="font-normal text-red-600">
                                                {nama_jenis_kompositor}
                                            </Typography>                                                
                                            ):(
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_jenis_kompositor}
                                        </Typography>)}                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {satuan}
                                        </Typography>                                                                                
                                      </td>
                                      <td>
                                        <div className="flex">
                                            {kompositor_pics.length > 0 ? (
                                            kompositor_pics.map( ({id, nama_pic}) => (
                                                <Typography key={id} variant="small" color="blue-gray" className="font-normal text-gray-600 ml-1">
                                                    {nama_pic}
                                                </Typography>) )
                                                ):null}
                                        </div>
                                      </td>
                                                                            
                                      <td className="flex mt-2">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                          <Link href={route('kompositor.edit', id)} title="Edit">
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
                        <Pagination links={kompositors.links} />
                        </CardBody>
                    </Card>
                </div>
                )}
        >
    
        </NewAdminLayout>
        );
}
