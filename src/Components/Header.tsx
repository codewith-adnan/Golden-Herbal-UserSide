import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleBuyNowClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(false);

        if (location.pathname === '/') {
            const productsSection = document.getElementById('products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            navigate('/', { state: { scrollToProducts: true } });
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#d4af37]/20 shadow-2xl">
            {/* Top Ornate Line (Image ke elegant feel ke liye) */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo: Serif Style matching the image */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-br from-[#d4af37] to-[#aa8930] p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:rotate-[360deg]">
                            <Leaf className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-serif font-bold tracking-widest text-[#d4af37] uppercase">
                                Gold Leaf
                            </span>
                            <span className="text-[10px] tracking-[0.3em] text-[#aa8930] uppercase font-medium">
                                Herbal Tea
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav: Elegant Gold Links */}
                    <div className="hidden md:flex items-center space-x-10">


                        {/* Premium Buy Now Button */}
                        <button
                            onClick={handleBuyNowClick}
                            className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center space-x-2 cursor-pointer"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span>Buy Now</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#d4af37] p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav: Dark Glassy Dropdown */}
            <div
                className={`md:hidden absolute w-full bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-[#d4af37]/20 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-8' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="flex flex-col space-y-6 px-6 items-center">

                    <button
                        onClick={handleBuyNowClick}
                        className="w-full max-w-[280px] bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black py-4 rounded-full font-bold text-center uppercase tracking-widest text-sm shadow-xl cursor-pointer"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
