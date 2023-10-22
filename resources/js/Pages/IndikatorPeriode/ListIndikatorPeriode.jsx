
import AdminLayout from '@/Layouts/AdminLayout';
import { Card,
        Typography,
        Button,
        Dialog,
        DialogHeader,
        DialogBody,
        DialogFooter,
        Select, Option, 
        Input} from "@material-tailwind/react";
import { React, useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';
import { Link, usePage, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function ListIndikatorPeriode( {auth}){
    const {indikator_periodes} = usePage().props;
    
    //const { get, put, errors, delete:destroy, processing } = useForm();
    const {
        data,
        meta: {links}
    } = indikator_periodes;
    console.log(indikator_periodes);

    const TABLE_HEAD = ["ID", "Periode", "Indikator", "Target", "PIC", "Action"];

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [objPeriode, setObjPeriode] = useState([]);
    const [term, setTerm] = useState('');
    
    function handleImport(e) {
        if (confirm('Apakah Anda yakin akan mengimport data indikator?')) {
            router.visit('/indikator-periode/importindikator', {
                method: 'get',
                data:{isImport:true},
                onFinish: visit => {
                    router.reload();
                    console.log(visit)},
            });
            
            //put(route('indikator-periode.importIndikator'));
        }
      };
    function handleChange(e) {
        //const key = e.target.name;
        const value = e.target.value;

        /*setValues(values => ({
          ...values,
          [key]: value
        }));*/
        setTerm(value);
        //console.log(key + ", " +value);
    }
      useEffect( () => {
        //if(term.length >= 2){
            router.visit('/indikator-periode', {
                method: 'get',
                data: { search: term, page:indikator_periodes.current_page},
                replace: true,
                preserveState: true
            });
        //}
       
      },[term]);
    return (
            <AdminLayout 
                auth = {auth}
                children={(
                                <div className="container mx-auto">
                                    <Card className="p-5 h-full w-full overflow-scroll">
                                        <div className="flex justify-between">
                                            <Typography variant="h3">Data Indikator Periode                            
                                            </Typography>
                                            <div className="flex">
                                            
                                            <span>
                                                <Input variant="outlined" size="md" className="w-45" label="Search.." onChange={handleChange}/>
                                            </span>
                                            </div>
                                        </div>
                                        <div className="flex my-2">
                                            <Link href={route('indikator-periode.create')}>
                                                <Button size="sm" className="ml-2" onClick={() => setOpen(true)} color="blue">Add</Button>
                                            </Link>
                                            
                                                <Button size="sm" className="ml-2" onClick={handleImport} color="green">Import Indikator</Button>
                                            
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
                                                {indikator_periodes.data.map(({id, nama_indikator, periode, target, indikator_periode_pic}) => (
                                                            <tr key={id} className="even:bg-blue-gray-50/50">
                                                                <td className="p-4">
                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                        {id}
                                                                    </Typography>
                                                                </td>
                                                                <td className="p-4">
                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                        {periode}
                                                                    </Typography>
                                                                </td>
                                                                <td className="p-4">                                        
                                                                    <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                                                        {nama_indikator}
                                                                    </Typography>
                                                                </td>
                                                                <td>
                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                        {target}
                                                                    </Typography>                                        
                                        
                                                                </td>
                                                                <td>
                                                                    <div className="flex">
                                                                        {indikator_periode_pic.map( ({id, nama_pic}) => (
                                                                            <Typography variant="small" color="blue-gray" className="font-normal ml-1">
                                                                                {nama_pic}
                                                                            </Typography>) )}
                                                                    </div>
                                        
                                                                </td>
                                                                <td className="p-4">
                                                                    <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                                                        <Link href={route('indikator-periode.edit', id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </Link>
                                                                    </Typography>
                                                                </td>
                                                            </tr>
                                                                    ))}
                                                {data.length === 0 && (
                                                        <tr>
                                                            <td className="px-6 py-4 border-t" colSpan="4">
                                                                No data found.
                                                            </td>
                                                        </tr>
                                                                )}
                                            </tbody>
                                        </table>
                                        <Pagination links={links} />
                                    </Card>                    
                            
                                </div>
                                )}
                >
            
            </AdminLayout>
            )
};