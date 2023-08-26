import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout( {auth, content}){
    return (
            <div class="flex flex-row h-screen w-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1">
                    <Header />
                    <div className="">{content}</div>
                </div>
            
            
            </div>
            );

};

