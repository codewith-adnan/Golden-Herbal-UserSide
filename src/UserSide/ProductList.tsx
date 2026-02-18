import { ShoppingBag, Scale, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useProducts } from "./UseHooks";

const ProductList = () => {
    const [page, setPage] = useState(0);
    const limit = 6;
    const offset = page * limit;

    const { products, loading, error, total } = useProducts(offset, limit);

    if (!loading && products.length === 0) return null;

    return (
        <section className="bg-[#030405] py-20 px-6 font-sans border-t border-[#d4af37]/5">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                        <Sparkles size={12} /> Premium Collection
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#d5dbe6] tracking-tight">
                        Our Botanical <span className="text-[#d4af37]">Masterpieces</span>
                    </h2>
                </motion.div>

                {loading && <p className="text-white text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="group relative bg-[#0d0f10] border border-[#1a1a1a] border-t-[2.5px] border-t-[#d4af37]/40 rounded-[32px] p-5 transition-all duration-500 hover:bg-white/[0.01] hover:border-[#d4af37]/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.08)] overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative h-64 w-full rounded-[24px] overflow-hidden mb-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030405]/80 via-transparent to-transparent"></div>

                                {/* Weight Badge */}
                                <div className="absolute bottom-4 left-4 bg-[#030405]/80 backdrop-blur-md border border-[#d4af37]/30 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <Scale size={12} className="text-[#d4af37]" />
                                    <span className="text-[10px] font-bold text-[#d5dbe6] uppercase tracking-widest">
                                        {product.weight}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-2 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-serif font-bold text-[#d5dbe6] group-hover:text-[#d4af37] transition-colors duration-300">
                                        {product.name}
                                    </h3>

                                    {product.stock_quantity > 0 ? (
                                        <div className="flex items-center gap-1 bg-green-500/5 px-2 py-1 rounded-lg">
                                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-[9px] text-green-500/80 font-bold uppercase">
                                                In Stock
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-red-500 text-xs font-bold">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                <p className="text-[#5e686e] text-sm leading-relaxed line-clamp-2 font-medium">
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-end gap-1 pt-2">
                                    <span className="text-[#d4af37] text-sm font-bold pb-1">Rs.</span>
                                    <span className="text-3xl font-serif font-black text-white tracking-tighter">
                                        {product.price}
                                    </span>
                                </div>

                                {/* Button */}
                                <Link
                                    to="/buy-now"
                                    state={{ product }}
                                    className="relative w-full overflow-hidden mt-6 py-4 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02] shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] active:scale-95"
                                >
                                    <ShoppingBag size={16} />
                                    Buy Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex justify-center gap-6">
                    <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="px-6 py-2 border border-[#d4af37] text-[#d4af37] rounded-lg disabled:opacity-30"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() =>
                            setPage((p) =>
                                offset + limit < total ? p + 1 : p
                            )
                        }
                        disabled={offset + limit >= total}
                        className="px-6 py-2 bg-[#d4af37] text-black rounded-lg disabled:opacity-30"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
