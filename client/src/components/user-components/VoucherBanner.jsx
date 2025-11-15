import React from "react";
import { X, Tag } from "lucide-react";

export default function VoucherBanner({ count, onDismiss }) {
  return (
    <div className="flex items-center justify-between mx-5 my-4 p-4 rounded-xl bg-purple-600 text-white shadow-lg transition-all duration-300">
      <div className="flex items-center font-semibold text-lg">
        <Tag size={20} className="mr-3" />
        <span>You have {count} unused vouchers.</span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss voucher banner"
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
}
