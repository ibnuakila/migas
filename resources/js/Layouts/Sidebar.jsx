import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Sidebar(){
        return(
                <div className="bg-stone-50 w-60 p-3 flex flex-col text-gray-600">
                <div className="flex items-center gap-2 px-1 py-1 ">
                    <ApplicationLogo width={30} height={30}/>
                            <span className="text-2xl tracking-wide drop-shadow"> SICAKI</span>
                </div>
                <div className="my-2 drop-shadow-md"><hr/></div>
                <div className="flex-1">
                <div>Dashboard</div>
                <div>Master</div>
                <div>Realisasi</div>
                <div>Laporan</div>
                </div>
                <div>Copyright Migas @2023</div>
                </div>
                )
}
