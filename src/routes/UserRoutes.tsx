import { Routes, Route } from 'react-router-dom';
import Layout from '../Components/Layout';
import Homepage from '../UserSide/Homepage';
import BuyNow from '../UserSide/BuyNow';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="buy-now" element={<BuyNow />} />
                {/* Placeholder for other routes */}
                <Route path="shop" element={<div className="py-20 text-center">Shop Page Coming Soon</div>} />
                <Route path="about" element={<div className="py-20 text-center">About Page Coming Soon</div>} />
                <Route path="contact" element={<div className="py-20 text-center">Contact Page Coming Soon</div>} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
