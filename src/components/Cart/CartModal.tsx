import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Lock } from 'lucide-react';
import { CartItem } from '../../lib/types';
import { useLocalization } from '../../contexts/LocalizationContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

// --- CONFIG ---
const FREE_SHIPPING_THRESHOLD = 100;   // Free shipping when subtotal > 100
const SHIPPING_FLAT = 4.90;              // Otherwise flat shipping
const DELIVERY_METHOD = 'Hermes';      // Shipper label shown to customers
// --------------

const CartModal: React.FC<CartModalProps> = ({
                                               isOpen,
                                               onClose,
                                               items,
                                               onUpdateQuantity,
                                               onRemoveItem,
                                             }) => {
  const { formatPrice, t } = useLocalization();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  // Subtotal (no tax, no discounts)
  const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
  );

  // Shipping rule
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;

  // Total = items + shipping
  const total = subtotal + shipping;

  const handleSecureCheckout = async () => {
    setIsProcessingPayment(true);
    try {
      const { createCheckoutSession } = await import('../../lib/stripe');
      await createCheckoutSession(items);
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Checkout error: ${error?.message ?? error}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white h-full w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">{t('yourCart')}</h2>
              <span className="text-red-500 text-sm">*</span>
            </div>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Banner */}
          {subtotal > FREE_SHIPPING_THRESHOLD && (
              <div className="bg-green-50 border-b border-green-200 px-4 py-2">
                <div className="text-sm text-green-700 font-medium">
                  You&apos;ve unlocked free express shipping
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Express Shipping: Free
                </div>
              </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('cartEmpty')}</h3>
                  <p className="text-gray-500 mb-6">Add some items to get started</p>
                  <button
                      onClick={onClose}
                      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    {t('continueShopping')}
                  </button>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                  {/* Shipping & Returns Info */}
                  <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 transition-colors border-b border-gray-200 pb-2">
                    Shipping & returns information →
                  </button>

                  {/* Items */}
                  {items.map((item) => {
                    const imageUrl =
                        typeof item.product.images === 'object'
                            ? item.product.images[item.product.colors[0].toLowerCase()]?.[0] ||
                            Object.values(item.product.images)[0]?.[0]
                            : item.product.images[0];

                    return (
                        <div key={item.product.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
                          <div className="relative w-20 h-28 flex-shrink-0">
                            <img
                                src={imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=112&fit=crop';
                                }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
                              {item.product.name}
                            </h3>
                            <div className="text-xs text-gray-600 mb-2">
                              {item.selectedSize && <span>{item.selectedSize} </span>}
                              {item.selectedColor && <span>{item.selectedColor}</span>}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                    className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                    className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">
                            {formatPrice(item.product.price)}
                          </span>
                                <button
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}
          </div>

          {/* Summary & Checkout */}
          {items.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {/* NEW: Delivery Method */}
                  <div className="flex justify-between">
                    <span>Delivery Method</span>
                    <span>{DELIVERY_METHOD}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>

                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>{t('total')}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                    onClick={handleSecureCheckout}
                    disabled={isProcessingPayment}
                    className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Processing...
                      </>
                  ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {t('secureCheckout')}
                      </>
                  )}
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default CartModal;
