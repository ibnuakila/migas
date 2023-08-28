import {React, useState} from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, Typography, Button } from "@material-tailwind/react";

export default function ListPic({auth, pics}){
    const TABLE_HEAD = ["ID", "Nama PIC", "Keterangan", "Action"];
 
    const TABLE_ROWS = [
      {
        id: "1",
        nama: "DMEP",
        keterangan: "Unit Kerja"
        
      },
      {
        id: "2",
        nama: "DMOO",
        keterangan: "Unit Kerja"
      },
      {
        id: "3",
        nama: "DMON",
        keterangan: "Unit Kerja"
      },
      {
        id: "4",
        nama: "DMBS",
        keterangan: "Unit Kerja"
      },
      {
        id: "5",
        nama: "DMOG",
        keterangan: "Unit Kerja"
      },
    ];

    const [open, setOpen] = useState(false);
 
    const handleOpen = () => {
        setOpen(!open);
        alert("OK");
    }
    return (
            <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto max-w-screen-lg py-12">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <Typography variant="h2">Data PIC
                        <Button size="sm" className="ml-2" onClick={handleOpen} color="blue">Add</Button>
                    </Typography>
                    
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
                                {TABLE_ROWS.map(({ id, nama, keterangan }) => (
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
                                          {keterangan}
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
