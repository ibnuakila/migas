import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import SimpleCard from '@/Components/SimpleCard';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Home({props}) {
    //console.log(props);
    return (
            <AdminLayout 
                props = {props}
                children={(
                        <div className="container mx-auto">
                        <div className="sm:flex sm:mt-2">
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
                                  <Typography variant="h5" color="gray" className="mb-4 uppercase">
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
                            <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex flex-col">
                                <SimpleCard title="Periode Active" countIndikator="2023" content="Periode ditentukan setiap awal tahun." link="/periode"/>
                            </div>
                            <div className="flex flex-col">
                                <SimpleCard title="Jumlah Indikator" countIndikator="15" content="Indikator adalah satu set data yang digunakan untuk menilai capaian kinerja
          antara target dan realisasi" link="/indikator"/>
                            </div>
                            <div className="flex flex-col">
                                <SimpleCard title="Indikator Periode" countIndikator="2023" content="Indikator pada Periode berjalan ditentukan setiap awal tahun."/>
                            </div>
                            </div>
                        </div>
                        )}
                >
            
            </AdminLayout>
            );
};


