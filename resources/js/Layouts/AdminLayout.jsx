import Sidebar from './Sidebar';
import Header from './Header';
import { Breadcrumbs } from "@material-tailwind/react";

export default function AdminLayout( {auth, children}){
    //console.log(props);
    return (
            <>                
                <Header auth={auth}/>
                <section className="max-h-full h-450 bg-teal-50">                    
                    <div className="container px-5 py-24 mx-auto flex flex-wrap ">
                        {children}
                    </div>                    
                </section>
                <section className="w-1/1 p-4 h-auto">
                <footer className="footer bg-white relative pt-1 border-b-2 border-blue-200">
                <div className="container mx-auto px-6">
                    <p className="p-4 text-md text-blue-400 text-center">Copyright &copy; 2023 Dirjen Migas</p>
                </div>                    
                </footer>
                </section>                
            </>
            );

};

