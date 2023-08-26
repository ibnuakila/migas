import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout( {props, content}){
    return (
            <div className="flex flex-wrap h-screen w-screen">                                
                <div className="w-screen h-screen">
                    
                    <Header auth={props.auth}/>
                    {content}
                </div>
            </div>
            );

};

