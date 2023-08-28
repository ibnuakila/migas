import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, Typography } from "@material-tailwind/react";

export default function ListPeriode({auth, periodes}){    
    //const tableHeader = ['ID', 'Periode', 'Status']
    console.log(periodes);
    const TABLE_HEAD = ["ID", "Periode", "Status", "Action"];
 
const TABLE_ROWS = [
  {
    id: "1",
    periode: "2017",
    status: "Closed",
  },
  {
    id: "2",
    periode: "2018",
    status: "Closed",
  },
  {
    id: "3",
    periode: "2019",
    status: "Closed",
  },
  {
    id: "4",
    periode: "2020",
    status: "Closed",
  },
  {
    id: "5",
    periode: "2021",
    status: "Closed",
  },
];
    return (
        <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto max-w-screen-lg py-12 ">
                    <Card className="p-5 h-full w-full overflow-scroll">
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
                                {TABLE_ROWS.map(({ id, periode, status }, index) => (
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
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {status}
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
            )
};