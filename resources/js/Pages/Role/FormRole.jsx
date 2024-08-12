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
  Select, 
  Option,
  Checkbox
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
 
export default function FormRole() {
    const {auth, permissions} = usePage().props;
    const Tag = {id:0, value:""};
    const arr = new Array();
    const [selectedValue, setSelectedValue] = useState({});
    const { data, setData, post, errors, processing } = useForm({
        //d: '',
        name: '',
        permission: ''
    });
    //const [option, setOption] = useState('');
    
    //console.log(permissions);
   
    const handleSave = (e) => {
        
        var elements = document.querySelectorAll("input[type=checkbox]");
        //console.log(elements);
        elements.forEach(function(element) {
            let val = element.defaultValue;
            let isChecked = element.checked;
            //console.log(val + ": " + isChecked);
            if(isChecked){
                const obj = {id:val,checked:isChecked};
                arr.push(obj);
                setSelectedValue({...selectedValue, obj});
            }
        });
        console.log(arr);
        console.log(data);
        if(data.permission===""){
            //router.reload();
            //alert("Click Submit");
        }else{
                    
        }
        post(route('role.store'));
        e.preventDefault();
    };
    
    const handleChecked = (e) => {
        setSelectedValue({ ...selectedValue,[e.target.defaultValue]: e.target.checked});
        setData('permission', selectedValue);
        if(selectedValue===""){
            setSelectedValue({ ...selectedValue,[e.target.defaultValue]: e.target.checked});
            setData('permission', selectedValue);
        }
        console.log(selectedValue);
    }
    
    return (
    <AdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New Role
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Nama Role" variant="outlined" id="name" 
                                                        onChange={e => {
                                                            setData('name', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.name}/>
                                                       {errors.name && <div className="text-red-400 mt-1">{errors.name}</div>}
                                            </div>
                                                
                                                
                                                <div className="w-48">
                                                    <Typography variant="h6" className="font-normal">Permission:</Typography>
                                                    {permissions.map( ({id, name})=>(
                                                        <Checkbox label={name} color="blue" key={id} defaultValue={id} className="my-checkbox"
                                                        onClick={ handleChecked }/>
                                                    ) ) }
                                                </div>
                                            </div>
                                
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2 ">
                                        <div className="flex place-content-center">
                                            <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)} id="save">
                                                Oke
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