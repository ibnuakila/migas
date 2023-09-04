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
        Typography
        } from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function EditPeriode() {
    const {periode, auth} = usePage().props;
    const {data, setData, post, patch, delete:destroy, errors, processing, recentlySuccessful} = useForm({
        Id: periode.data.Id || '',
        Periode: periode.data.Periode || '',
        Status: periode.data.Status || ''
    });
    console.log(periode.data.Periode);

    const [open, setOpen] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        post(route('periode.update', periode.data.Id));
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
                                        <CardBody divider>
                                
                                            <div className="flex flex-col gap-4">
                                                <Input label="Periode" variant="outlined" id="Periode" 
                                                       onChange={e => {
                                                    setData('Periode', e.target.value)
                                                }} 
                                                       defaultValue={periode.data.Periode}
                                                       error={errors.Periode}/>                      
                                
                                                <Input label="Status" variant="outlined" id="Status" 
                                                       onChange={e => {
                                            setData('Status', e.target.value)
                                        }} 
                                                       defaultValue={periode.data.Status}
                                                       error={errors.Status}/>
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