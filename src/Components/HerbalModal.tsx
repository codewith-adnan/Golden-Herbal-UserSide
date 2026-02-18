interface HerbalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HerbalModal = ({ isOpen, onClose }: HerbalModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
            {/* Modal Container: Dark & Gold Theme */}
            <div className="relative w-full max-w-md p-10 bg-[#0a0a0a] rounded-[40px] border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] transform transition-all animate-in zoom-in duration-300">

                {/* Top Decorative Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

                {/* Logo Section: Matching Header Style */}
                <div className="flex justify-center mb-8">
                    <div className="p-5 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-full border border-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="#d4af37" fillOpacity="0.1" />
                            <path d="M12 22C12 22 17 18 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 18 12 22 12 22Z" fill="#d4af37" />
                            <path d="M12 8V22" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Text Content: English Premium Style */}
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold text-[#d4af37] mb-4 tracking-tight">
                        The Gold Standard <br /> of Wellness
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium px-4 tracking-wide">
                        Experience the essence of nature with our premium herbal selection.
                        Hand-picked ingredients crafted for your pure well-being.
                    </p>
                </div>

                {/* Premium Gold Button */}
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#aa8930] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-black rounded-2xl 
                     shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] transition-all duration-500 
                     active:scale-95 border-b-4 border-[#8e7225] text-xs uppercase tracking-[0.2em] cursor-pointer"
                >
                    Discover Purity
                </button>

                {/* Decorative Elements: Gold Leaves */}
                <div className="absolute -bottom-4 -left-4 p-4 opacity-10 pointer-events-none transform -rotate-45">
                    <svg width="80" height="80" fill="currentColor" className="text-[#d4af37]" viewBox="0 0 16 16">
                        <path d="M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm1.517 4.13c-.322.067-.654.12-.993.158a4.912 4.912 0 0 0-1.745.41 4.5 4.5 0 0 0-2.316 2.41 4.253 4.253 0 0 0-.256 1.156c-.023.23-.024.466.002.7a3.111 3.111 0 0 0 .167.75c.092.25.215.485.365.698l.053.076.012-.008.012.008c.15-.213.273-.448.365-.698a3.111 3.111 0 0 0 .167-.75c.026-.234.025-.47-.002-.7a4.253 4.253 0 0 0-.256-1.156 4.5 4.5 0 0 0-2.316-2.41 4.912 4.912 0 0 0-1.745-.41 3.554 3.554 0 0 0-.993-.158l-.133-.005.133.005z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default HerbalModal;