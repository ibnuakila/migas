
import AdminLayout from '@/Layouts/AdminLayout';
import { Card,
        Typography,
        Button,
        Dialog,
        DialogHeader,
        DialogBody,
        DialogFooter,
        Input} from "@material-tailwind/react";
import { React, useState, useEffect, usePrevious } from 'react';

import Pagination from '@/Components/Pagination';
import { Link, usePage, router } from '@inertiajs/react';


export default function ListKomponen( {auth}){
    const {komponens} = usePage().props;
    const {filter} = usePage().props;
    console.log(usePage().props);

    const TABLE_HEAD = ["ID", "Nama Komponen", "Bobot", "Action"];

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState({
        //role: filters.role || '', // role is used only on users page
        //search: filter.search || '',
        //trashed: filters.trashed || ''
    });
    const [term, setTerm] = useState('');

    function handleChange(e) {
        const value = e.target.value;
        setTerm(value);
    }

    

    return (
            <AdminLayout 
                auth = {auth}
                children={(
                                <div className="container mx-auto">
                                    <Card className="p-5 h-full w-full overflow-scroll">
                                        <div className="flex justify-between">
                                            <Typography variant="h3">Komponen Instrument Kinerja                            
                                            </Typography>
                                            <span><Input variant="outlined" size="md" className="w-45" label="Search for periode" name="periode" onChange={handleChange}/></span>
                                        </div>
                                        <div className="flex my-2">
                                            <Link href={route('instrument-kinerja.create-komponen')}>
                                                <Button size="sm" className="ml-2" color="blue">Add</Button>
                                            </Link>
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
                                                {
                                                        komponens ? (
                                                        <>
                                                            {komponens.data.map(({id, nama_komponen, bobot}) => (
                                                            <tr key={id} className="even:bg-blue-gray-50/50">
                                                                <td className="p-4">
                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                        {id}
                                                                    </Typography>
                                                                </td>
                                                                <td className="p-4">
                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                        {nama_komponen}
                                                                        {}
                                                                    </Typography>
                                                                </td>
                                                                <td className="p-4">                                      
                                                                    <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                                        {bobot}
                                                                    </Typography>
                                                                </td>
                                                                <td className="p-2">
                                                                    <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                                                        <Link href={route('instrument-kinerja.edit-komponen', id)} title="Edit">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </Link>                                                                        
                                                                    </Typography>
                                                                    <span>
                                                                    <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                                                        <Link href={route('instrument-kinerja.create-sub-komponen', id)} title="Add Sub Komponen">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                                                            </svg>
                                                                        </Link>
                                                                    </Typography>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            
                                                                ))}
                                                        </>
                                                                ) : (
                                                        <>
                                                            <tr>
                                                                <td className="px-6 py-4 border-t" colSpan="4">
                                                                    No Data found.
                                                                </td>
                                                            </tr>
                                                        </>
                                                                )
                                                }
                            
                                                
                                            </tbody>
                                        </table>
                                        <Pagination links={komponens.meta.links} />
                                    </Card>                    
                            
                                </div>
                                )}
                >
            
            </AdminLayout>
            )
};