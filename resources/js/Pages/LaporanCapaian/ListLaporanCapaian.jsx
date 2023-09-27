
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
import { React, useState } from 'react';
import Pagination from '@/Components/Pagination';
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function ListLaporanCapaian({auth}){ 
    const { laporan_capaians } = usePage().props;
    const {
        data,
        //meta: { links }
      } = laporan_capaians;
    console.log(laporan_capaians);
    
    const TABLE_HEAD = ["ID", "No", "Nama Indikator", "Level", "Satuan","Target", "Triwulan", "Realisasi", "Persentasi Kinerja" , "PIC", "Periode", "Action"];
 
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [objPeriode, setObjPeriode] = useState([]);
 
    function handleImport(){
        if (confirm('Apakah Anda yakin akan mengimport data indikator?')) {
            router.visit('/laporan-capaian/importtarget', {
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
                        <Typography variant="h3">Laporan Capaian Kinerja                            
                        </Typography>
                        <div className="flex">
                            <span className="mx-2">
                                <Select label="Filter" onChange="">                                                      
                                      <Option value="indikator">Nama Indikator</Option>
                                      <Option value="pic">PIC</Option>  
                                      <Option value="pic">Periode</Option>
                                </Select>
                            </span>
                            <span>
                                <Input variant="outlined" size="md" className="w-45" label="Search.." />
                            </span>
                        </div>
                    </div>
                    <div className="flex my-2">
                    <Link href={route('laporan-capaian.create')}>
                        <Button size="sm" className="ml-2" onClick={() => setOpen(true)} color="blue">Add</Button>
                    </Link>
                    <Button size="sm" className="ml-2" onClick={handleImport} color="green">Import Target Indikator</Button>
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
                                {data.map(({id, numbering, nama_indikator, nama_level, nama_satuan, target, triwulan, realisasi, kinerja, nama_pic, periode}) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-500">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-gray-600">
                                          {numbering}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {nama_indikator}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-400">
                                          {nama_level}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-400">
                                          {nama_satuan}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-red-600">
                                          {target}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {triwulan}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {realisasi}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {kinerja}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {nama_pic}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {periode}
                                        </Typography>
                                      </td>                                      
                                      <td className="p-4">
                                        <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                        <Link href={route('laporan-capaian.edit', id)}>
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
                        <Pagination links={laporan_capaians.links} />
                    </Card>                    
                    
                </div>
                )}
        >
    
        </AdminLayout>
            )
};