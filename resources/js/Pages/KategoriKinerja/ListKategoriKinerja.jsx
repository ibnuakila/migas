
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
//import FormPeriode from './FormPeriode';
import Pagination from '@/Components/Pagination';
import { Link, usePage, router } from '@inertiajs/react';


export default function ListLevel({auth}){ 
    const { kategori_kinerjas } = usePage().props;
    const { filter } = usePage().props;
    console.log(usePage().props);
    const {
        data,
        meta: { links }
      } = kategori_kinerjas;
    
    const TABLE_HEAD = ["ID", "Nama Kategori", "Action"];
 
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState({
        //role: filters.role || '', // role is used only on users page
        //search: filter.search || '',
        //trashed: filters.trashed || ''
      });
    const [term, setTerm] = useState('');
    
        
    function handleChange(e) {
        //const key = e.target.name;
        const value = e.target.value;

        /*setValues(values => ({
          ...values,
          [key]: value
        }));*/
        setTerm(value);
        console.log(key + ", " +value);
      }
      
    useEffect( () => {
        //if(term.length >= 2){
            router.visit('/kategori-kinerja', {
                method: 'get',
                data: { search: term, page:kategori_kinerjas.current_page},
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
                        <Typography variant="h3">Data Kategori Kinerja                            
                        </Typography>
                        <span><Input variant="outlined" size="md" className="w-45" label="Search for kategori_kinerja" name="kategori_kinerja" onChange={handleChange}/></span>
                    </div>
                    <div className="flex my-2">
                        <Link href={route('kategori-kinerja.create')}>
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
                                {kategori_kinerjas.data.map(({Id, NamaKategoriKinerja}) => (
                                    <tr key={Id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {Id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {NamaKategoriKinerja}
                                        </Typography>
                                      </td>
                                      
                                      <td className="p-4">
                                        <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                        <Link href={route('kategori-kinerja.edit', Id)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                          </svg>
                                        </Link>
                                        </Typography>
                                      </td>
                                    </tr>
                                  ))}
                            {kategori_kinerjas.data.length === 0 && (
                              <tr>
                                <td className="px-6 py-4 border-t" colSpan="4">
                                  No contacts found.
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