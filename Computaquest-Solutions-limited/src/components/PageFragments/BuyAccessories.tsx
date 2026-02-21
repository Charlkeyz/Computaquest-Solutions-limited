import Link from "next/link";
import Picture from "../picture/Picture";
import { heroBg } from "@public/images";

const BuyAccessories = () => {
  return (
    <div className="w-full relative overflow-hidden py-24 sm:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Picture
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability and blue tint */}
        <div className="absolute inset-0 bg-[#0092E4]/40 mix-blend-multiply" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-[1]">
        {/* We can use decorative shapes since we don't have the exact background image of the desk */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 skew-x-12 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="max-w-[1256px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8 tracking-tighter">
          Custom Made Sets
        </h2>

        <p className="text-sm md:text-base text-black/70 max-w-2xl leading-relaxed mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo
          enim sit amet magna semper lacinia. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. In commodo enim sit amet.
        </p>

        <Link
          href="/category"
          className="bg-[#D9DEDC] hover:bg-gray-200 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest px-12 py-4 rounded-lg transition-all shadow-lg hover:scale-105 active:scale-95">
          Explore
        </Link>
      </div>

      {/* Tiny decorative star/plus as seen in bottom right of design */}
      <div className="absolute bottom-10 right-10 text-black opacity-20 text-xl font-light">
        +
      </div>
    </div>
  );
};

export default BuyAccessories;
