import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import SimpleCard from '@/Components/SimpleCard';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Home({props}) {
    console.log(props);
    return (
            <AdminLayout 
                props = {props}
                children={(
                        <div className="container mx-auto max-w-screen-lg py-12">
                        <div className="flex">
                            <Card className="w-full flex-row">
                                <CardHeader
                                  shadow={false}
                                  floated={false}
                                  className="m-0 w-2/5 shrink-0 rounded-r-none"
                                >
                                  <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                  />
                                </CardHeader>
                                <CardBody>
                                  <Typography variant="h6" color="gray" className="mb-4 uppercase">
                                  Si<span className="text-blue-600">CaKi</span>
                                  </Typography>
                                  <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Sistem Informasi Capaian Kinerja
                                  </Typography>
                                  <Typography color="gray" className="mb-8 font-normal">
                                    Direktorat Jenderal Minyak dan Gas Bumi Kementerian Energi dan Sumber Daya Mineral Republik Indonesia
                                  </Typography>
                                  <a href="#" className="inline-block">
                                    <Button variant="text" className="flex items-center gap-2">
                                      Learn More
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-4 w-4"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        />
                                      </svg>
                                    </Button>
                                  </a>
                                </CardBody>
                              </Card>
                            </div>
                            <div className="flex flex-row gap-4">
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


