import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-teal-50">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" width="70" height="70"/>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden ">
                {children}
            </div>
        </div>
    );
}
