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
  Select} from "@material-tailwind/react";
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function ListIndikator({auth}){
    const TABLE_HEAD = ["ID", "Numbering", "Ordering", "Nama Indikator", "Satuan", "Level", "Pic" ,   "Action"];
    const Filter = [
        [1, "Nama"],
        [2, "Level"]        
    ];
        
    const { indikators } = usePage().props;
    console.log(indikators);
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => {
        setOpen(!open);
        alert("OK");
    }
    const [term, setTerm] = useState('');
        
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
            router.visit('/indikator', {
                method: 'get',
                data: { search: term, page:indikators.current_page},
                replace: true,
                preserveState: true
            });
        //}
        //Inertia.get(route(route().current()), query, {
        //replace: true,
        //preserveState: true
      },[term]);
    
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <div className="flex justify-between">
                        <Typography variant="h3">Data Indikator                            
                        </Typography>
                        <span>                            
                            <Input variant="outlined" size="md" className="w-45" label="Search for Indikator" name="namaIndikator" onChange={handleChange}/>
                        </span>
                            
                        
                    </div>
                    <div className="flex my-2">
                        <Link href={route('indikator.create')}>
                        <Button size="sm" className="ml-2" color="blue">Add</Button>
                        </Link>
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
                                {indikators.data.map(({ id, nama_indikator, nama_satuan, nama_level, indikator_pics, ordering, numbering }) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-green-600">
                                          {numbering}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {ordering}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {nama_indikator}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_satuan}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_level}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">     
                                        <div className="flex">
                                            {indikator_pics.map( ({id, nama_pic}) => (
                                                <Typography variant="small" color="blue-gray" className="font-normal text-gray-600 ml-1">
                                                    {nama_pic}
                                                </Typography>) )}
                                        </div>                                                                                                                      
                                      </td>
                                      
                                      
                                      
                                      <td className="flex mt-2">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium pr-1 text-red-300">
                                          <Link href={route('indikator.edit', id)} title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                          </Link>
                                        </Typography>
                                        <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal pr-1 text-blue-gray-400">
                                            <Link href={route('indikator-kompositor.index-indikator',id)} title="Kompositor/Parameter Indikator">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLineJoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                                                </svg>
                                            </Link>
                                        </Typography>
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                        </table>
                        <Pagination links={indikators.links} />
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
