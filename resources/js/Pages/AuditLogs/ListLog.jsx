import { React, useState, useEffect } from 'react';
import NewAdminLayout from '@/layouts/NewAdminLayout';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Alert,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage, router, Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import DatePicker from '@/Components/DatePicker';
import { format, isDate } from "date-fns";

export default function ListLog({ auth }) {
  //const TABLE_HEAD = ["ID", "Numbering", "Ordering", "Nama Indikator", "Satuan", "Level", "Pic", "Action"];
  const [date, setDate] = useState(null);
  const { logs, flash } = usePage().props;
  //console.log(logs);
  const [nama, setNama] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const queryString = {
    page: logs.current_page,
    date: date,    
    nama: nama
  };
 const handleSelect = (selectedDate) => {
    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd"); // ✅ date only
      setDate(formatted);

      // Example: send to Laravel via Inertia for filtering
      //router.get("/records", { date: formatted }, { preserveState: true });
    }
  };
  useEffect(() => {
    //if () {
      router.visit('/log/index', {
        method: 'get',
        data: queryString,
        replace: true,
        preserveState: true
      });
    //}

  }, [nama, date]);
  return (
    <NewAdminLayout
      auth={auth}
      children={(
        <>
          <Head title="Indikator" />
          <div className="mx-auto">

            <Card className="mt-12 mb-8 flex flex-col gap-12">
              <CardHeader variant="gradient" color="blue-gray" className="mb-4 grid h-20 place-items-center">
                <Typography variant="h4" color="white">
                  Log Aktivitas
                </Typography>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-2 pt-0 pb-2">

                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >Description</Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >Subject Type</Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >Subject ID</Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >User Name</Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >Date</Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >Properties</Typography>
                      </th>
                    </tr>
                    <tr className="border-b-2">
                      <th></th>
                      <th></th>
                      <th></th>

                      <th className="p-2">
                        <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                          onChange={(value)=>{
                            setNama(value);
                          }} labelProps={{
                            className: "hidden",
                          }} placeholder="Name" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                      </th>

                      <th>
                        {/* <Input variant="outlined" size="md" className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                              onChange={handleChangeDate} labelProps={{
                                className: "hidden",
                              }} placeholder="Date" icon={<MagnifyingGlassIcon className="h-5 w-5" />} /> */
                          <Popover placement="bottom">
                            <PopoverHandler>
                              <Input
                                label="Select a Date"
                                onChange={() => null}
                                value={date ? format(date, "MM/dd/yyyy") : ""}
                                readOnly
                              />
                            </PopoverHandler>
                            <PopoverContent>
                              <DatePicker selected={date} onSelect={handleSelect}></DatePicker>
                            </PopoverContent>
                          </Popover>
                        }
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.data.map(({ id, description, subject_type, subject_id, causer, properties, created_at }) => (
                      <tr key={id} className="even:bg-blue-gray-50/50">

                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                            {description}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                            {subject_type}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-blue-600">
                            {subject_id}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                            {causer.name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                            {new Date(created_at).toLocaleString()}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                            <div className="whitespace-pre-wrap break-words text-sm font-mono">
                              {JSON.stringify(properties, null, 2)}
                            </div>
                          </Typography>
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={logs.links} />
              </CardBody>

            </Card>
          </div>
        </>
      )}
    >

    </NewAdminLayout>
  );
}