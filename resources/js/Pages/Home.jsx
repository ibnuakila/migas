import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Typography,
    Button,
} from "@material-tailwind/react";
import SimpleCard from '@/Components/SimpleCard';

export default function Home(props) {
    return (
            <AdminLayout 
                props = {props}
                content={(
                        <div className="container mx-auto max-w-screen-lg py-12 ">
                            <div class="grid gap-x-10 gap-y-4 grid-cols-3">
                                <SimpleCard />
                                <SimpleCard />
                                <SimpleCard />
                            </div>
                        </div>
                        )}
                >
            
            </AdminLayout>
            );
};


