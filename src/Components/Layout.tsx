import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="h-screen flex flex-col bg-[#030405] overflow-hidden">
            <Header />
            <main className="flex-grow overflow-y-auto custom-scrollbar">
                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default Layout;
