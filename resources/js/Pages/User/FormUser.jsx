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
    const {auth, pics, roles, flash} = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        pic_id: '',
    });
    const [confirm, setConfirm] = useState(false);
    const [optionRole, setOptionRole] = useState(0);
    const [optionPic, setOptionPic] = useState(0);
    const [open, setOpen] = useState(true);
    const handleSave = (e) => {
        e.preventDefault();
        post(route('user.store'));        
    };
    const confirmPassword = (e) => {
        var pass1 = document.getElementById('password').value;
        var pass2 = e.target.value;
        console.log(pass2);
        if(pass1.length == pass2.length){
            if(pass1 == pass2){
                setConfirm(true);
            }
        }
    }
    function handleChangeRole(e) {
        setOptionRole({selectValue: e});
        setData('role', e);        
    }
    function handleChangePic(e) {
        setOptionPic({selectValue: e});
        setData('pic_id', e);        
    }
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
                                                           onChange={confirmPassword} onBlur={ e => {
                                                               if(!confirm){
                                                                   alert("Password tidak sama!");
                                                                   e.target.focus;
                                                               }
                                                               console.log('confirm is '+confirm);
                                                           }}
                                                           error={errors.password}/>
                                                           {errors.password && <div className="text-red-400 mt-1">{errors.password}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Role" onChange={handleChangeRole}
                                                            value=""
                                                            error={errors.role}>
                                                        {roles.map(({id, name}) => (
                                                            <Option value={id.toString()} key={id}>{name}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.role && <div className="text-red-400 mt-1">{errors.role}</div>}
                                                </div>
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select PIC" onChange={handleChangePic}
                                                            value=""
                                                            error={errors.pic_id}>
                                                        {pics.map(({id, nama_pic}) => (
                                                            <Option value={id.toString()} key={id}>{nama_pic}</Option>
                                                                            ))}
                                                    </Select>
                                                    {errors.pic_id && <div className="text-red-400 mt-1">{errors.pic_id}</div>}
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