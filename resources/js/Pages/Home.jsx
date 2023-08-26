import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Home(props){
        return (
                <AdminLayout 
                auth = {props.auth}
                content={(
                        <h1>This is home page! {props.auth.user.name}</h1>
                )}
                >
                
                </AdminLayout>
                );
};


