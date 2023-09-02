import Sidebar from './Sidebar';
import Header from './Header';
import { Breadcrumbs } from "@material-tailwind/react";

export default function AdminLayout( {auth, children}){
    //console.log(props);
    return (
            <div className="">
                <Header auth={auth}/>
                <div className="flex flex-row max-h-full h-screen">
                    <div className="basis-1/6 bg-teal-50"></div>
                    <div className="basis-2/3">
                        <div className="flex flex-row mt-4 rounded-r-lg p-2 w-40 items-center text-gray-500">
                            <a href="#" className="opacity-60">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                              </svg>
                            </a>
                            <a href="#" className="ml-2">
                              <span>SICAKI </span>
                            </a>
                            
                            <a href={location.pathname} className="pl-2">{location.pathname.toString().toUpperCase()}</a>
                        </div>
                        {children}
                    </div>
                    <div className="basis-1/6 bg-teal-50"></div>
                </div>
                <div className="basis-1/4">
                    <p className="p-4 text-md text-blue-400 text-center">Copyright &copy; 2023 Dirjen Migas</p>
                </div>                
            </div>
            );

};

