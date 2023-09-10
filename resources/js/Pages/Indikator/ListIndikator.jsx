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

export default function ListIndikator({auth, indikators}){
    const TABLE_HEAD = ["ID", "Nama Indikator", "Satuan", "Level", "Action"];
 
    const TABLE_ROWS = [
      {
        id: "1",
        nama: "Realisasi Produksi/Lifting Minyak",
        satuan: "BBL",
        level: "-"
      },
      {
        id: "2",
        nama: "Rekomendasi Ekspor Minyak Mentah",
        satuan: "BBL",
        level: "-"
      },
      {
        id: "3",
        nama: "Realisasi Ekspor Minyak Mentah",
        satuan: "BBL",
        level: "-"
      },
      {
        id: "4",
        nama: "Kebutuhan Kilang Minyak",
        satuan: "BBL",
        level: "-"
      },
      {
        id: "5",
        nama: "Realisasi Alokasi Gas Dom ",
        satuan: "BBL",
        level: "-"
      },
    ];

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
        console.log(key + ", " +value);
    }
    
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <div className="flex justify-between">
                        <Typography variant="h3">Data Indikator                            
                        </Typography>
                        <span><Input variant="outlined" size="md" className="w-45" label="Search for periode" name="periode" onChange={handleChange}/></span>
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
                                {TABLE_ROWS.map(({ id, nama, satuan, level }) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {nama}
                                        </Typography>
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {satuan}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">                                      
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {level}
                                        </Typography>                                                                                
                                      </td>
                                      <td className="p-4">
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                          Edit
                                        </Typography>
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
                )}
        >
    
        </AdminLayout>
        );
}
