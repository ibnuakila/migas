import {React, useState, useEffect} from 'react';
import AdminLayout from '@/layouts/AdminLayout';
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

export default function ListHitungKompositor({auth}){
    const TABLE_HEAD = ["ID", "Nama Kompositor", "Field", "Nama Field", "Type Field", "Parent Id", "Action"];
 
    const { hitung_kompositors, indikator_kompositor } = usePage().props;
    console.log(usePage().props);
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => {
        setOpen(!open);
        alert("OK");
    }
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
    
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <div className="flex justify-between">
                        <Typography variant="h3">Hitung Kompositor {indikator_kompositor.nama_kompositor}                            
                        </Typography>
                        <span><Input variant="outlined" size="md" className="w-45" label="Search for Indikator" name="namaIndikator" onChange={handleChange}/></span>
                    </div>
                    <div className="flex my-2">
                        <Link href={route('hitung-kompositor.create',indikator_kompositor.id)}>
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
                                {hitung_kompositors.map(({ id, nama_kompositor, field, f_type, p_field_id}) => (
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
                                        <Typography variant="small" color="blue-gray" className="font-normal text-green-600">
                                          {field}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-green-600">
                                          
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {f_type}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {p_field_id}
                                        </Typography>                                                                                
                                      </td>                                      
                                                                            
                                      <td className="flex mt-2">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                          <Link href={route('hitung-kompositor.edit', id)} title="Edit">
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
                        <Pagination links={hitung_kompositors.links} />
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
