
import AdminLayout from '@/layouts/AdminLayout';
import { Card, 
    CardHeader,
    CardBody,
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
import NewAdminLayout from '@/layouts/NewAdminLayout';


export default function ListUser({auth}){ 
    const { users } = usePage().props;
    //const { filter } = usePage().props;
    console.log(usePage().props);
    const {
        data,
        //meta: { links }
      } = users;
    
    const TABLE_HEAD = ["ID", "Nama User", "Email", "Role", "PIC","Action"];
 
    
    const [values, setValues] = useState({
        //role: filters.role || '', // role is used only on users page
        //search: filter.search || '',
        //trashed: filters.trashed || ''
      });
    const [term, setTerm] = useState('');
    
        
    function handleChange(e) {
        //const key = e.target.name;
        const value = e.target.value;
        
        setTerm(value);
        //console.log(key + ", " +value);
      }
      
        
    return (
        <NewAdminLayout 
        auth = {auth}
        children={(
                <div className="container mx-auto">
                    <Card className="mt-12 mb-8 flex flex-col gap-12">
                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                            <Typography variant="h4" color="white">
                                Daftar User
                            </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-2 pt-0 pb-2">
                    <div className="flex my-2">
                        <Link href={route('user.create')}>
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
                                {users.map(({id, name, email, roles, pic}) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {id}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {name}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {email}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {roles[0].name}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {pic.nama_pic}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography as="a" href="#" title="Edit" variant="small" color="blue-gray" className="font-normal text-center">
                                        <Link href={route('user.edit', id)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                          </svg>
                                        </Link>
                                        </Typography>
                                      </td>
                                    </tr>
                                  ))}
                            {users.length === 0 && (
                              <tr>
                                <td className="px-6 py-4 border-t" colSpan="4">
                                  No contacts found.
                                </td>
                              </tr>
                            )}
                            </tbody>
                        </table>
                        <Pagination links={users.links} />
                        </CardBody>
                    </Card>                    
                    
                </div>
                )}
        >
    
        </NewAdminLayout>
            )
};