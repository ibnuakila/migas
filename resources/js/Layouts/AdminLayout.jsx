import Sidebar from './Sidebar';
import Header from './Header';
import { Breadcrumbs,
Typography} from "@material-tailwind/react";
import { Link, router } from '@inertiajs/react';

export default function AdminLayout( {auth, children}){
    var path = location.pathname.split("/");
    //console.log(path);
    return (
            <>                
            <Header auth={auth}/>
            <section className="max-h-full h-450 bg-cyan-50">                     
                <div className="container px-1 pt-10 pb-5 mx-auto flex flex-wrap ">  
                    <div className="flex py-2 mb-2">
                        <Typography variant="h6">
                            <Link href="/home" className="text-gray-400">APP &nbsp;|&nbsp;</Link>
                        </Typography>
                        {path.length <= 2 ? (
                            <Typography variant="h6">&nbsp;
                                <Link href={"/" + path[1]} className="text-blue-300">{path[1].toString().toLocaleUpperCase()}</Link>
                            </Typography>
                            ) : (
                            <Typography variant="h6">
                                <Link href={"/" + path[1]} className="text-blue-300">{path[1].toString().toLocaleUpperCase()}</Link>
                                &nbsp;|                        
                                &nbsp;                        
                                <Link href={"/" + path[2]} className="text-blue-300">{path[2].toString().toLocaleUpperCase()}</Link>
                            </Typography>
                                    )}
                    </div>
                    
                </div>                    
            </section>
            <section className="max-h-full bg-cyan-50"> {children} </section> 
            <section className="w-1/1 p-4 h-auto">
                <footer className="footer bg-white relative pt-1 border-b-2 border-blue-200">
                    <div className="container mx-auto px-6">
                    <Typography className="p-2 text-md text-blue-400 text-center">Sistem Informasi Capaian Kinerja</Typography>
                    <Typography className="p-2 text-md text-blue-400 text-center">Copyright &copy; 2023 Dirjen Migas</Typography>
                    </div>                    
                </footer>
            </section>                
            </>
            );

};

