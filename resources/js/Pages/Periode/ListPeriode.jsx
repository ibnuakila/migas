import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ListPeriode({ periodes}){    
    const tableHeader = ['ID', 'Periode', 'Status']
        
    return (
        <AdminLayout 
        props = {null}
        content={(
                <div className="container mx-auto max-w-screen-lg py-12 ">
                    <div className="">
                        <table>
                            <thead>
                                <tr>
                                    {tableHeader.map( (head, headID) => 
                                    <th key={headID}>{head}</th> )}
                                </tr>
                            </thead>
                            <tbody>                                                      
                                {periodes.map( (Id, Periode, Status) =>
                                    <tr key={Id}>
                                        <td>{Id}</td>
                                        <td>{Periode}</td>
                                        <td>{Status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
        >
    
        </AdminLayout>
            )
};