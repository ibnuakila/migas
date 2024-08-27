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
import NewAdminLayout from '@/layouts/NewAdminLayout';
 
export default function FormPeriode() {
    const {auth, errors} = usePage().props;
    const { data, setData, post,  processing } = useForm({
        id: '',
        periode: '',
        status: ''
    });
    const [option, setOption] = useState('');
    
    //console.log(errors);
    
   
    const handleSave = (e) => {
        e.preventDefault();
        post(route('periode.store'));        
    };
    
    function handleChange(e){
        setOption({selectValue:e});
        setData('status', e);
    }
    const optStatus = ['Closed' , 'Active'];
    return (
    <NewAdminLayout 
                auth = {auth}
                children={(
                                    <div className="container mx-auto">
                                    <Card className="p-5 h-full w-45">
                                
                                    <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                                        <Typography variant="h4" color="white">
                                            New Periode
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody>
                                
                                            <div className="flex flex-wrap flex-col place-content-center gap-4">
                                            <div className="sm:w-full md:w-full lg:w-full">
                                                <Input label="Periode" variant="outlined" id="Periode" 
                                                        onChange={e => {
                                                            setData('periode', e.target.value)
                                                        }} 
                                                       
                                                       error={errors.periode}/> 
                                                       {errors.periode && <div className="text-red-400 mt-1">{errors.periode}</div>}
                                            </div>
                                                
                                                <div className="sm:w-full md:w-full lg:w-full">
                                                    <Select label="Select Status" onChange={handleChange}
                                                    value={option.selectValue}
                                                    error={errors.status}>
                                                      {optStatus.map( (opt) => <Option value={opt}>{opt}</Option> )}                                                      
                                                    </Select>
                                                    {errors.status && 
                                                        <div className="text-red-400 mt-1">{errors.status}</div>
                                                    }
                                                </div>
                                            </div>
                                            
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2 ">
                                        
                                            <Button variant="gradient" type="submit" color="green" onClick={(e) => handleSave(e)}>
                                                Save
                                            </Button>
                                        
                                        </CardFooter>
                                    </form>
                                    </Card>
                                    </div>
                            )}
                >
            
            </NewAdminLayout>
  );
}