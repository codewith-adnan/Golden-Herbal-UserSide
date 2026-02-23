import { ShoppingBag, Star, Sparkles, Plus, Minus, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOrder } from './UseHooks';
import { getImageUrl } from '../utils/image.utils';
import HerbalModal from '../Components/HerbalModal';
import ProductList from './ProductList';

const BuyNow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state || { product: null };

    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const { placeOrder, loading, error, success } = useOrder();

    useEffect(() => {
        if (success) {
            setShowModal(true);
        }
    }, [success]);

    if (!product) {
        return (
            <div className="min-h-screen bg-[#050505] font-sans">
                <ProductList />
                <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-12">
                        <ShoppingBag size={48} className="mx-auto text-[#d4af37]/20 mb-6" />
                        <h2 className="text-2xl font-serif text-white mb-4">No Product Selected</h2>
                        <p className="text-[#888] mb-8">Please select a masterpiece from our collection above to proceed with your order.</p>
                    </div>
                </div>
            </div>
        );
    }

    const totalPrice = product.price * quantity;

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/');
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            customer_name: '',
            email: '',
            phone: '',
            address: '',
            city: ''
        }
    });

    const onSubmit = async (data: { customer_name: string; email: string; phone: string; address: string; city: string }) => {
        try {
            await placeOrder({
                ...data,
                items: [
                    {
                        product_id: product.id,
                        quantity: quantity,
                        weight: product.weight
                    }
                ]
            });
        } catch (err) {
            console.error("Order Submission Detail:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pb-20 font-sans selection:bg-[#d4af37]/30 selection:text-[#d4af37] overflow-hidden">

            {/* Modal for Success */}
            <HerbalModal
                isOpen={showModal}
                onClose={handleModalClose}
            />

            <ProductList />
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* --- LEFT SIDE: COMPACT VISUALS (5 Cols) --- */}
                    <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
                        <div className="relative group rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl shadow-black/50">
                            {/* Image Container - Aspect Ratio adjusted for a more 'portrait' premium look, not square */}
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img
                                    src={getImageUrl(product.image)}
                                    alt=""
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                                {/* Minimal Badge */}
                                <div className="absolute top-4 left-4 backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <Sparkles size={12} className="text-[#d4af37]" />
                                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.15em]">Premium</span>
                                </div>
                            </div>

                            {/* Product Info Overlay (Descriptive) */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                {product.weight && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest border border-[#d4af37]/30 px-2 py-0.5 rounded-full">
                                            {product.weight}
                                        </span>
                                    </div>
                                )}
                                <p className="text-xs text-[#888] line-clamp-2 leading-relaxed max-w-[90%]">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: PRO CHECKOUT FORM (7 Cols) --- */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-4 md:py-8 shadow-[0_0_50px_-10px_rgba(0,0,0,0.7)] relative overflow-hidden">

                            {/* Header Section */}
                            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                                <div>
                                    <span className="text-[10px] text-[#666] font-bold uppercase tracking-[0.3em] block mb-2">Order Details</span>
                                    <h2 className="text-3xl font-serif text-white tracking-tight">Checkout</h2>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-[#d4af37] text-lg">Rs.</span>
                                        <span className="text-4xl font-serif font-medium text-white tracking-tight">{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className="fill-[#d4af37] text-[#d4af37]" />
                                        ))}
                                        <span className="text-[10px] text-[#888] ml-1">Excellent Choice</span>
                                    </div>
                                </div>
                            </div>

                            {/* Success & Error Messages */}
                            {/* Removal of old success alert as requested by integrating modal */}

                            {error && (
                                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
                                    <AlertCircle size={18} />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Form Area */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Name</label>
                                        <input
                                            {...register("customer_name", { required: true })}
                                            className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                            placeholder="Enter full name"
                                        />
                                        {errors.customer_name && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Email</label>
                                        <input
                                            {...register("email", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            type="email"
                                            className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">{errors.email.message || "Required"}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Phone</label>
                                        <input
                                            {...register("phone", { required: true })}
                                            className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                            placeholder="03XXXXXXXXX"
                                        />
                                        {errors.phone && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">City</label>
                                        <input
                                            {...register("city", { required: true })}
                                            className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                            placeholder="e.g. Lahore, Karachi"
                                        />
                                        {errors.city && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Address</label>
                                    <textarea
                                        {...register("address", { required: true })}
                                        rows={2}
                                        className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 py-3 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616] resize-none"
                                        placeholder="Full delivery address"
                                    />
                                    {errors.address && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                </div>

                                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row gap-6 items-end">
                                    {/* Quantity Controller */}
                                    <div className="w-full md:w-auto">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">Quantity</label>
                                        <div className="flex items-center bg-[#111] rounded-xl border border-white/5 p-1 h-12 w-full md:w-32">
                                            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-full flex items-center justify-center text-[#666] hover:text-white transition-colors">
                                                <Minus size={14} />
                                            </button>
                                            <span className="flex-1 text-center text-[#d4af37] font-bold text-sm">{quantity}</span>
                                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-8 h-full flex items-center justify-center text-[#666] hover:text-white transition-colors">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 ${loading ? 'opacity-70 cursor-not-allowed' : 'bg-[#d4af37] hover:bg-[#c5a028]'} text-black font-bold text-xs uppercase tracking-[0.2em] h-12 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] active:scale-[0.98] w-full`}
                                    >
                                        <span>{loading ? 'Processing...' : 'Confirm Order'}</span>
                                        <ShoppingBag size={16} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;
