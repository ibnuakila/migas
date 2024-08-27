import {React, useState} from "react";
import {
Button,
        Card,
        CardHeader,
        CardBody,
        CardFooter,
        Input,
        Textarea,
        Alert,
        Typography,
        Select, Option 
        } from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import NewAdminLayout from '@/layouts/NewAdminLayout';

export default function EditPeriode() {
    const {periode, auth} = usePage().props;
    const {data, setData, put, delete:destroy, errors, processing, recentlySuccessful} = useForm({
        id: periode.data.id || '',
        periode: periode.data.periode || '',
        status: periode.data.status || ''
    });
    //console.log(usePage().props);
    
    const [option, setOption] = useState('');

    const [open, setOpen] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        put(route('periode.update', periode.data.id));
    }

    function handleChange(e){
        setOption({selectValue:e});
        setData('status', e);
    }
    
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data periode?')) {
          destroy(route('periode.destroy', periode.data.id));
        }
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
                                            Edit Periode
                                        </Typography>
                                    </CardHeader>
                                
                                
                                    <form onSubmit={handleSave}>
                                        <CardBody divider="true">
                                
                                            <div className="flex flex-col gap-4">
                                                <Input label="Periode" variant="outlined" id="Periode" 
                                                       onChange={e => {
                                                    setData('periode', e.target.value)
                                                }} 
                                                       defaultValue={periode.data.periode}
                                                       error={errors.periode}/>                      
                                                       {errors.periode && <div className="text-red-400 mt-1">{errors.periode}</div>}
                                                
                                                    <Select label="Select Status" onChange={handleChange}
                                                    value={periode.data.status}                                                    
                                                    error={errors.status}>
                                                    {optStatus.map( (opt) => <Option value={opt}>{opt}</Option> )}
                                                    </Select>
                                                    {errors.status && <div className="text-red-400 mt-1">{errors.status}</div>}
                                            </div>
                                
                                
                                        </CardBody>
                                        <CardFooter className="space-x-2">
                                            <Button variant="outlined" color="red" onClick={(e) => handleDestroy(e)}>
                                                Delete
                                            </Button>
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