import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

const Test =()=>{

const props = usePage().props;
console.log(props.periodes.links);

        return (
                <>
                <div><h1>Hello {props.auth.user.name}</h1></div>
                <div>
                <table>
                <thead></thead>
                <tbody>
                {props.periodes.data.map( (object) => (
                    <tr key={object.Id}>
                        <td>{object.Periode}</td>
                        <td>{object.Status}</td>
                    </tr>
                ))}
                </tbody>
                </table>
                <Pagination links={props.periodes.links} />
                </div>
                </>
                );
    }

export default Test