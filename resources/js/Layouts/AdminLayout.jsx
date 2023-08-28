import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout( {auth, children}){
    //console.log(props);
    return (
            <div className="flex flex-wrap h-screen w-screen">                                
                <div className="w-screen h-screen">
                    
                    <Header auth={auth}/>
                    {children}
                </div>
            </div>
            );

};

