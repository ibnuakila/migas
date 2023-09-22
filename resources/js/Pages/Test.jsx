import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Card, Typography } from "@material-tailwind/react";

const Test =()=>{

const props = usePage().props;
const data = usePage().props.data;
console.log(props.data);
const TABLE_HEAD = ["Id", "Location", "LocationType"];

        return (
                <>
                <div className="container mx-auto">
                <h1 className="text-xl mx-4 my-4">Hello {props.auth.user.name}</h1>
                <Card className="mx-auto mx-4 p-4">
                <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                </thead>
                <tbody>
                {data.map( (object) => (
                    <tr key={object.LevelId} className="even:bg-blue-gray-50/50">
                        <td><Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                            {object.LevelId}
                        </Typography></td>
                        <td><Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                            {object.Location}
                        </Typography></td>
                        <td><Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                            {object.LocationType}
                        </Typography></td>
                    </tr>
                ))}
                </tbody>
                </table>
                
                </Card>
                </div>
                </>
                );
    }

export default Test