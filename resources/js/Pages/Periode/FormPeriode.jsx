import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Alert
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
 
export default function FormPeriode(props) {
    const action = props.action;
    const open = props.open;
    const edit = props.edit;
    const objPeriode = props.objPeriode;
  
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        Id: objPeriode.Id || '',
        Periode: objPeriode.Periode || '',
        Status: objPeriode.Status || ''
    });
    console.log(objPeriode);
   
    const handleSave = (e) => {
        
        if(edit){
            let _periode = document.getElementById('Periode').value;
            let _status = document.getElementById('Status').value;

            e.preventDefault();
            router.visit('/periode/update', {
               method: 'post',
               data:{
                   Id: objPeriode.Id,
                   Periode: _periode,
                   Status: _status
               },
               onSuccess: page => {console.log(page)},
            });
            //post(route('periode.update',data.Id));
        }else{
            post(route('periode.create'));
        }
    }
    
    
    
    return (
    <>
      
      <Dialog open={open} >
        <div className="flex items-center justify-between">
          <DialogHeader>Add/ Update Periode</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={action}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
        <form>
            <div className="flex flex-col gap-4">
                <Input label="Periode" variant="outlined" id="Periode" 
                onChange={e => {setData('Periode', e.target.value)}} 
                defaultValue={objPeriode.Periode}
                
                error={errors.Periode}/>
                {errors.length >=1 ? (
                        <Alert color="red">{errors.Periode}</Alert>
                ):""}
                
                <Input label="Status" variant="outlined" id="Status" 
                onChange={e => {setData('Status', e.target.value)}} 
                defaultValue={objPeriode.Status}
                
                error={errors.Status}/>
            </div>
        </form>
          
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={action}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={(e) => handleSave(e)}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}