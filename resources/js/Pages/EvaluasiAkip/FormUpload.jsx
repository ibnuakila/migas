import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Alert,
  Select, Option 
} from "@material-tailwind/react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function FormUpload(props) {
    const action = props.action;
    const open = props.open;
    //const errors = props.errors;
    
    const handleSave = (e) => {
        console.log("hell no");
    }
    const handleLoad = (e) => {
        e.preventDefault();
    }
        return (
                <>
                    <Dialog open={open} onLoad={handleLoad}>
                        <div className="flex items-center justify-between">
                          <DialogHeader>Add/ Update File</DialogHeader>
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
                        <DialogBody>
                        <form id="upload-file">
                            <div className="flex flex-col gap-4">
                                <Input label="Nama Dokumen" variant="outlined" id="nama_dokumen"                                 
                               />                                
                               <Select label="Select Kategori" 
                                    id="opt-kategori">
                                    <Option value="1">Perencanaan Kinerja</Option>
                                    <Option value="2">Pengukuran Kinerja</Option>                                                      
                                </Select>
                                <Input label="File" type="file" variant="outlined" id="file"                                 
                                />
                                
                                <Textarea label="Deskripsi" variant="outlined" id="deskripsi" 
                                />
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