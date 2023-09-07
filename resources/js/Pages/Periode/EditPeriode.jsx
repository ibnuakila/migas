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
import AdminLayout from '@/Layouts/AdminLayout';

export default function EditPeriode() {
    const {periode, auth} = usePage().props;
    const {data, setData, put, delete:destroy, errors, processing, recentlySuccessful} = useForm({
        Id: periode.data.Id || '',
        Periode: periode.data.Periode || '',
        Status: periode.data.Status || ''
    });
    const [option, setOption] = useState('');

    const [open, setOpen] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        put(route('periode.update', periode.data.Id));
    }

    function handleChange(e){
        setOption({selectValue:e});
        setData('Status', e);
    }
    
    const handleDestroy = (e) => {
        if (confirm('Apakah Anda yakin akan menghapus data periode?')) {
          destroy(route('periode.destroy', periode.data.Id));
        }
      }

    return (
            <AdminLayout 
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
                                                    setData('Periode', e.target.value)
                                                }} 
                                                       defaultValue={periode.data.Periode}
                                                       error={errors.Periode}/>                      
                                
                                                
                                                    <Select label="Select Status" onChange={handleChange}
                                                    defaultValue={periode.data.Status}
                                                    error={errors.Status}>
                                                      <Option value="Closed">Closed</Option>
                                                      <Option value="Active">Active</Option>                                                      
                                                    </Select>
                                                
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
            
            </AdminLayout>
            );
}