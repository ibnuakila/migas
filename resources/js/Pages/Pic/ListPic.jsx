import {React, useState} from 'react';
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

export default function ListPic({auth}){
    const { pics } = usePage().props;
    const TABLE_HEAD = ["ID", "Nama PIC", "Keterangan", "Action"];
 
    
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
      }
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto max-w-screen-lg py-12">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <div className="flex justify-between">
                        <Typography variant="h3">Data PIC                            
                        </Typography>
                        <span><Input variant="outlined" size="md" className="w-45" label="Search for periode" name="periode" onChange={handleChange}/></span>
                    </div>
                    <div className="flex my-2">
                        <Link href={route('pic.create')}>
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
                                {pics.data.map(({ id, nama_pic, keterangan }) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {nama_pic}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {keterangan}
                                        </Typography>                                                                                
                                      </td>                                      
                                      <td className="p-4">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                          <Link href={route('pic.edit', id)}>
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
                        <Pagination links={pics.links} />
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
