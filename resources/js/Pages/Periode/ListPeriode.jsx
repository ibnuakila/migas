
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, 
    Typography, 
    Button,
    Dialog,
    DialogHeader,
  DialogBody,
  DialogFooter,} from "@material-tailwind/react";
import { React, useState } from 'react';
import FormPeriode from './FormPeriode';
import Pagination from '@/Components/Pagination';

export default function ListPeriode({auth, periodes}){    
    const {
        data,
        meta: { links }
      } = periodes;
    console.log(links);
    
    const TABLE_HEAD = ["ID", "Periode", "Status", "Action"];
 
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [objPeriode, setObjPeriode] = useState([]);
 
    return (
        <AdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="p-5 h-full w-full overflow-scroll">
                    <Typography variant="h2">Data Periode
                        <Button size="sm" className="ml-2" onClick={() => setOpen(true)} color="blue">Add</Button>
                    </Typography>
                    
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
                                {data.map((object) => (
                                    <tr key={object.Id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {object.Id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {object.Periode}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                      {object.Status=="Active" ? (
                                        <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                                          {object.Status}
                                        </Typography>
                                        ):(
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {object.Status}
                                        </Typography>
                                        )}
                                        
                                      </td>
                                      <td className="p-4">
                                        <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" 
                                          onClick={() => {
                                              setEdit(!edit); 
                                              setOpen(!open);
                                              setObjPeriode(object);
                                          }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                          </svg>
                                          
                                        </Typography>
                                      </td>
                                    </tr>
                                  ))}
                            {data.length === 0 && (
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
                    
                    <FormPeriode open={open} edit={edit} objPeriode={objPeriode} action={() => setOpen(!open)}/>
                </div>
                )}
        >
    
        </AdminLayout>
            )
};