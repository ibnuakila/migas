import Sidebar from './Sidebar';
import Header from './Header';
import {
    Breadcrumbs,
    Typography
} from "@material-tailwind/react";
import { Link, router } from '@inertiajs/react';
import {
    Sidenav,
    DashboardNavbar,
    Configurator,
    Footer,
} from "@/widgets/layout";
import routes from "@/routes";

export default function NewAdminLayout({ auth, children }) {
    var path = location.pathname.split("/");
    //console.log(path);
    return (
        <div className="min-h-screen bg-teal-50">
            <Header auth={auth} />
            <div className="p-4 xl:ml-0">                
                
                <div className="max-h-ful"> {children} </div>
                <div className="text-blue-gray-600 bg-blue-gray-50">
                    <Footer />
                </div>
            </div>
        </div>
    );

};

