'use client';

import React, { useState } from 'react';
import { ShoppingCart, Zap, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter } from 'next/navigation';

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const isOutOfStock = product.stock <= 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < (product.stock || 999)) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addItem(product, quantity);
      router.push('/dat-hang');
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity adjustment */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-emerald-950">Số lượng:</span>
        <div className="flex items-center border-2 border-emerald-200 rounded-xl bg-emerald-50/50">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="px-3 py-1.5 text-emerald-900 font-bold hover:bg-emerald-100 rounded-l-xl transition-colors disabled:opacity-40"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 text-sm font-extrabold text-emerald-950">{quantity}</span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stock || isOutOfStock}
            className="px-3 py-1.5 text-emerald-900 font-bold hover:bg-emerald-100 rounded-r-xl transition-colors disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="py-3 px-4 rounded-xl bg-emerald-100 text-emerald-900 border-2 border-emerald-300 hover:bg-emerald-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>THÊM VÀO GIỎ</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>MUA NGAY</span>
        </button>
      </div>
    </div>
  );
}
