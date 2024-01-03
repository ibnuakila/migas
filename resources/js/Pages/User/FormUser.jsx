import React, {useState} from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Alert,
  Typography ,
  Select, Option 
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function FormUser() {
    console.log(usePage().props);
    const {auth, pics} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        pic_id: '',
    });
    const handleSave = (e) => {
        e.preventDefault();
        post(route('user.store'));        
    };
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New User
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Nama User" variant="outlined" id="name" 
                                                            onChange={e => {
                                                                setData('name', e.target.value)
                                                            }}
                                                           error={errors.name}/>
                                                           {errors.name && <div className="text-red-400 mt-1">{errors.name}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Email" variant="outlined" id="email" 
                                                            onChange={e => {
                                                                setData('email', e.target.value)
                                                            }}
                                                           error={errors.email}/>
                                                           {errors.email && <div className="text-red-400 mt-1">{errors.email}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Password" variant="outlined" id="password" type="password"
                                                            onChange={e => {
                                                                setData('password', e.target.value)
                                                            }}
                                                           error={errors.password}/>
                                                           {errors.password && <div className="text-red-400 mt-1">{errors.password}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Input label="Confirm Password" variant="outlined" id="confirm-password" type="password"
                                                            onChange={e => {
                                                                //setData('password', e.target.value)
                                                            }}
                                                           error={errors.password}/>
                                                           {errors.password && <div className="text-red-400 mt-1">{errors.password}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select PIC" onChange=""
                                                            value=""
                                                            error={errors.pic}>
                                                        {pics.map(({id, nama_pic}) => (
                                                            <Option value={id.toString()} key={id}>{nama_pic}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.satuan_id && <div className="text-red-400 mt-1">{errors.satuan_id}</div>}
                                                </div>
                                            </div>
                                
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2 ">
                                        <div className="flex place-content-center">
                                            <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                                Save
                                            </Button>
                                        </div>
                                        </CardFooter>
                                    </form>
                                    </Card>
                                    </div>
                            )}
                >
            
            </AdminLayout>
  );
}