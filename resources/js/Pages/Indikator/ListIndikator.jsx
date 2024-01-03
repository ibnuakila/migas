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
    Select,
    Alert,} from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function ListIndikator({auth}){
    const TABLE_HEAD = ["ID", "Numbering", "Ordering", "Nama Indikator", "Satuan", "Level", "Pic" ,   "Action"];
            
    const { indikators, flash } = usePage().props;
    console.log(usePage().props);
    const [open, setOpen] = useState(true);
    const [termIndikator, setTermIndikator] = useState('');
    const [termPic, setTermPic] = useState('');
    const [termSatuan, setTermSatuan] = useState('');
    const [termLevel, setTermLevel] = useState('');
    const queryString = {page:indikators.current_page, 
        findikator:termIndikator, 
        fpic:termPic,        
        flevel:termLevel};
    function handleChangeIndikator(e) {        
        const value = e.target.value;
        setTermIndikator(value);        
    }
    function handleChangeLevel(e){
        const value = e.target.value;
        setTermLevel(value);
    }
    function handleChangePic(e){
        const value = e.target.value;
        setTermPic(value);
    }
        
    useEffect( () => {
        //if(term.length >= 2){
            router.visit('/indikator', {
                method: 'get',
                data: queryString,
                replace: true,
                preserveState: true
            });
        //}
        
      },[termIndikator, termPic, termLevel]);
    function Icon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        );
    }
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                {flash.message && (
                    <Alert open={open} icon={<Icon />} onClose={() => setOpen(false)} 
                        color="black" className="my-3 shadow-lg">
                        {flash.message}
                    </Alert>
                )}
                    <Card className="mt-12 mb-8 flex flex-col gap-12 bg-lime-50">
                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                              Indikator 
                            </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-2 pt-0 pb-2">
                    <div className="flex my-2">
                    <Link href={route('indikator.create')}>
                        <Button size="sm" className="ml-2" onClick={() => setOpen(true)} color="blue">Add</Button>
                    </Link>
                    </div>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >ID</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Numbering</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Ordering</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Nama Indikator</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Level</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Satuan</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >PIC</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Action</Typography>
                                    </th>
                                </tr>
                                <tr className="border-b-2">
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="p-2">
                                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10" 
                                            onChange={handleChangeIndikator} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Indikator" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/>
                                    </th>
                                    <th>
                                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        onChange={handleChangeLevel} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Level" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/>
                                    </th>
                                    <th></th>
                                    <th>
                                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        onChange={handleChangePic} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Pic" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/>
                                    </th>
                                    <th></th>
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
                                          {nama_level}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {nama_satuan}
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
                                            <Link href={route('kompositor.index-indikator',id)} title="Kompositor/Parameter Indikator">
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
                        </CardBody>
                        
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
