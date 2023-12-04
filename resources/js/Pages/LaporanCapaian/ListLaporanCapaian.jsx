
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, 
    Typography, 
    Button,
    Dialog,
    DialogHeader,
  DialogBody,
  DialogFooter,
  Select, Option, 
  Input, Alert} from "@material-tailwind/react";
import { React, useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
export default function ListLaporanCapaian({auth}){ 
    const { laporan_capaians } = usePage().props;
    const {
        data,        
      } = laporan_capaians;
    const levels = usePage().props;
    console.log(usePage().props);
    
    const TABLE_HEAD = ["ID", "No", 
        "Nama Indikator", 
        "Level", 
        "Satuan",
        "Target", 
        "PIC", 
        "Realisasi Triwulan", 
        "Kinerja Triwulan", 
        "Kinerja Tahunan", 
        "Kategori Kinerja",
        "Status Kinerja",
        "Periode", 
        "Action"];
 
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [objPeriode, setObjPeriode] = useState([]);
    const [termIndikator, setTermIndikator] = useState('');
    const [termPic, setTermPic] = useState('');
    const [termPeriode, setTermPeriode] = useState('');
    const [termLevel, setTermLevel] = useState('');
    const { flash } = usePage().props;
    const queryString = {page:laporan_capaians.current_page, 
        findikator:termIndikator, 
        fpic:termPic,
        fperiode:termPeriode,
        flevel:termLevel};
    const [optionLevel, setOptionLevel] = useState('');
    function handleImport(){
        if (confirm('Apakah Anda yakin akan mengimport data indikator?')) {
            router.visit('/laporan-capaian/importindikator', {
                method: 'get',
                data:{isImport:true},
                onFinish: visit => {
                    router.reload();
                    },
            });
            
        }
    }
    function handleChangeIndikator(e) {
        //const key = e.target.name;
        const value = e.target.value;
        setTermIndikator(value);
        //queryString.findikator = term;
    }
    function handleChangeLevel(e){
        const value = e.target.value;
        setTermLevel(value);
    }
    function handleChangePic(e){
        const value = e.target.value;
        setTermPic(value);
    }
    function handleChangePeriode(e){
        const value = e.target.value;
        setTermPeriode(value);
    }
      useEffect( () => {
        //if(term.length >= 2){
            router.visit('/laporan-capaian', {
                method: 'get',
                data: queryString,
                replace: true,
                preserveState: true
            });
        //}
        
      },[termIndikator, termPic, termLevel, termPeriode]);
    return (
        <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                            {flash.message && (
                                <Alert color="green">{flash.message}</Alert>
                            )}
                    <Card className="p-5 h-full w-full overflow-scroll">                    
                    <div className="flex justify-between">
                        <Typography variant="h3">Laporan Capaian Kinerja                            
                        </Typography>
                        
                    </div>
                    <div className="flex my-2">
                    <Link href={route('laporan-capaian.create')}>
                        <Button size="sm" className="ml-2" onClick={() => setOpen(true)} color="blue">Add</Button>
                    </Link>
                    <Button size="sm" className="ml-2" onClick={handleImport} color="green">Import Indikator</Button>
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
                                        >No</Typography>
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
                                        >Target</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >PIC</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" colspan="4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70 text-center"
                                        >Realisasi Triwulan</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" colspan="4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70 text-center"
                                        >Kinerja Triwulan</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Kinerja Tahunan</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Kategori Kinerja</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Status Kinerja</Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >Periode</Typography>
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
                                    <th></th>
                                    <th>
                                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        onChange={handleChangePic} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Pic" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW I</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW II</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW III</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW IV</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW I</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW II</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW III</Typography>
                                    </th>
                                    <th className="border text-center p-1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal leading-none opacity-70"
                                        >TW IV</Typography>
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    
                                    <th><Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                        onChange={handleChangePeriode} labelProps={{
                                            className: "hidden",
                                            }} placeholder="Periode" icon={<MagnifyingGlassIcon className="h-5 w-5" />}/></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>                                                      
                                {data.map(({id, indikator_id, numbering, nama_indikator, nama_level, nama_satuan, target, laporan_capaian_pic,
                                    input_realisasi,  kinerja_triwulan, kinerja_tahunan, kategori_kinerja_id,status_kinerja, periode}) => (
                                    <tr key={indikator_id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-500">
                                          {indikator_id}
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
                                        <Typography variant="small" color="blue-gray" className="font-normal text-red-400">
                                          {target ? ((parseFloat(target)).toLocaleString(undefined, {maximumFractionDigits:2})):(0)}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                            <div className="flex">
                                            {laporan_capaian_pic.map( ({id, nama_pic}) => (
                                                <Typography key={id} variant="small" color="blue-gray" className="font-normal text-gray-600 ml-1">
                                                    {nama_pic}
                                                </Typography>) )}
                                            </div>
                                        </Typography>
                                      </td>
                                        {input_realisasi.length > 0 ?
                                            (input_realisasi.map( ({id, realisasi})=>(
                                                <td className="p-4 text-center" key={id}>
                                                    <Typography  variant="small" color="blue-gray" className="font-normal text-gray-600">
                                                      {realisasi}
                                                    </Typography>
                                                </td>
                                            ) )): 
                                            (<>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            </>)
                                        }
                                        
                                        {kinerja_triwulan.length > 0 ?
                                            (kinerja_triwulan.map( ({id, triwulan_id, kinerja})=>(
                                                <td className="p-4 text-center" key={id}>
                                                    <Typography key={id} variant="small" color="blue-gray" className="font-normal text-gray-600 ml-1">
                                                        {kinerja}
                                                    </Typography>
                                                </td>
                                            ))) : 
                                            (<>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                                    <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            </>)
                                        }
                                      
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {kinerja_tahunan}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {kategori_kinerja_id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {status_kinerja}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                                          {periode}
                                        </Typography>
                                      </td>                                      
                                      <td className="flex mt-2">
                                        <Typography variant="small" color="blue-gray" className="font-medium mr-1 text-red-300">
                                          <Link href={route('laporan-capaian.edit', id)} title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                          </Link>
                                        </Typography>
                                        <Typography title="" variant="small" color="blue-gray" className="font-normal text-center text-blue-gray-400">
                                            <Link href={route('input-realisasi.index-indikator', id)} title="Realisasi Kompositor/Parameter">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
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