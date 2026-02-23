import { ShoppingBag, Scale, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "./UseHooks";
import { getImageUrl } from "../utils/image.utils";

const ProductList = () => {
    const [viewAll, setViewAll] = useState(false);

    // Fetch all products at once (high limit)
    const { products, loading, error } = useProducts(0, 100);

    const displayedProducts = viewAll ? products : products.slice(0, 3);

    if (loading) {
        return (
            <div className="bg-[#030405] py-20 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!loading && products.length === 0) return null;

    return (
        <section className="bg-[#030405] pt-6 md:pt-12 pb-8 md:pb-18 px-3 font-sans border-t border-[#d4af37]/5">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-8 md:mb-16"
                >
                    <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                        <Sparkles size={12} /> Premium Collection
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#d5dbe6] tracking-tight">
                        Our Botanical <span className="text-[#d4af37]">Masterpieces</span>
                    </h2>
                </motion.div>

                {error && <p className="text-red-500 text-center mb-8">{error}</p>}

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                    {displayedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className={`group relative bg-[#0d0f10] border border-[#1a1a1a] border-t-[2.5px] border-t-[#d4af37]/40 rounded-2xl md:rounded-[32px] p-2.5 md:p-5 transition-all duration-500 hover:bg-white/[0.01] hover:border-[#d4af37]/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.08)] overflow-hidden ${!viewAll && index === 2 ? 'hidden md:block' : ''}`}
                        >
                            {/* Image */}
                            <div className="relative h-28 md:h-64 w-full rounded-xl md:rounded-[24px] overflow-hidden mb-2.5 md:mb-6">
                                <img
                                    src={getImageUrl(product.image)}
                                    alt=""
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        const img = e.currentTarget;
                                        const currentSrc = img.src;

                                        // If already tried /gold/, stop to prevent infinite loops
                                        if (currentSrc.includes('/gold/')) {
                                            return;
                                        }

                                        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://13.60.168.111";
                                        // Use the same regex to get the path part
                                        const rawUrl = product.image || '';
                                        const pathPart = rawUrl.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '');

                                        // Try adding /gold/ prefix if initial load fails
                                        const retryUrl = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/gold/${pathPart}`;

                                        console.log(`🔄 Image Retry (/gold/) for [${product.name}]:`, retryUrl);
                                        img.src = retryUrl;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030405]/80 via-transparent to-transparent"></div>

                                {/* Weight Badge - Even smaller on Mobile */}
                                <div className="absolute bottom-1.5 left-1.5 md:bottom-4 md:left-4 bg-[#030405]/80 backdrop-blur-md border border-[#d4af37]/30 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 md:gap-2">
                                    <Scale size={8} className="text-[#d4af37] md:w-[12px] md:h-[12px]" />
                                    <span className="text-[7px] md:text-[10px] font-bold text-[#d5dbe6] uppercase tracking-widest">
                                        {product.weight}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-1 md:px-2 space-y-1.5 md:space-y-4">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-0.5 md:gap-1">
                                    <h3 className="text-[10px] md:text-xl font-serif font-bold text-[#d5dbe6] group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1">
                                        {product.name}
                                    </h3>

                                    {product.stock_quantity > 0 ? (
                                        <div className="flex items-center gap-0.5 bg-green-500/5 px-1 py-0.5 rounded">
                                            <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-[7px] md:text-[9px] text-green-500/80 font-bold uppercase">
                                                In Stock
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-red-500 text-[8px] md:text-xs font-bold">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                <p className="text-[#5e686e] text-[9px] md:text-sm leading-tight md:leading-relaxed line-clamp-2 font-medium">
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-end gap-0.5 pt-0.5 md:pt-2">
                                    <span className="text-[#d4af37] text-[9px] md:text-sm font-bold pb-0.5 md:pb-1">Rs.</span>
                                    <span className="text-sm md:text-3xl font-serif font-black text-white tracking-tighter">
                                        {product.price}
                                    </span>
                                </div>

                                {/* Buy Now Button */}
                                <Link
                                    to="/buy-now"
                                    state={{ product }}
                                    className="relative w-full overflow-hidden mt-2 md:mt-6 py-2 md:py-4 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black font-black text-[8px] md:text-xs uppercase tracking-[0.05em] md:tracking-[0.2em] rounded-lg md:rounded-2xl flex items-center justify-center gap-1.5 md:gap-3 transition-all duration-500 hover:scale-[1.02] shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] active:scale-95"
                                >
                                    <ShoppingBag size={12} className="md:w-[16px] md:h-[16px]" />
                                    Buy Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Toggle */}
                {products.length > 3 && (
                    <div className="flex justify-center pt-12">
                        <button
                            onClick={() => setViewAll(!viewAll)}
                            className="px-8 py-3 bg-[#111111] border border-[#d4af37]/20 text-[#d4af37] rounded-xl font-bold text-sm tracking-widest hover:bg-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all transform hover:scale-105"
                        >
                            {viewAll ? "SHOW LESS" : "VIEW ALL PRODUCTS"}
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ProductList;

