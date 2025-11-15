import React from "react";

export default function DiscountBanner() {
  return (
    <div className="relative w-full  overflow-hidden rounded-2xl p-6 mb-8 bg-[url('https://st5.depositphotos.com/17620692/62480/v/450/depositphotos_624809038-stock-illustration-pink-abstract-banner-background-vector.jpg')] bg-gradient-to-r from-pink-300 to-purple-300 shadow-xl">
      <div className="relative z-10 ">
        <h2 className="text-2xl font-black text-zinc-900 mb-2">Big discount</h2>
        <h2 className="text-4xl font-extrabold mb-1 tracking-tighter text-red-600">10%</h2>
        <p className="text-sm font-medium mt-3">Claim your voucher now!</p>
      </div>
      <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 w-3/5 h-full z-0 opacity-90">
        <img
          src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-group-of-fast-food-products-fast-food-items-hamburger-fries-hotdog-png-image_12517078.png"
          alt="Food Graphics"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
