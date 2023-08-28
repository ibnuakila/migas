import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import SimpleCard from '@/Components/SimpleCard';


export default function Home({props}) {
    console.log(props);
    return (
            <AdminLayout 
                props = {props}
                children={(
                        <div className="container mx-auto max-w-screen-lg py-12">
                            <div className="grid gap-x-10 gap-y-4 grid-cols-3">
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


