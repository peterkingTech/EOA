import React, { useState, useEffect } from 'react';
import { Truck, Zap } from 'lucide-react';

interface ShippingZone {
  zone_code: string;
  zone_name: string;
  standard_rate: number;
  express_rate: number;
  free_shipping_threshold: number;
}

interface ShippingCalculation {
  zone_code: string;
  zone_name: string;
  country_code: string;
  shipping_type: 'standard' | 'express';
  order_total: number;
  shipping_cost: number;
  total_cost: number;
  is_free_shipping: boolean;
  free_shipping_threshold: number;
  amount_until_free_shipping: number;
  standard_rate: number;
  express_rate: number;
}

interface ShippingSelectorProps {
  orderTotal: number;
  onShippingChange: (calculation: ShippingCalculation | null) => void;
}

const COUNTRIES = [
  { code: 'DE', name: 'Germany', zone: 'DE' },
  { code: 'AT', name: 'Austria', zone: 'EU' },
  { code: 'BE', name: 'Belgium', zone: 'EU' },
  { code: 'BG', name: 'Bulgaria', zone: 'EU' },
  { code: 'HR', name: 'Croatia', zone: 'EU' },
  { code: 'CY', name: 'Cyprus', zone: 'EU' },
  { code: 'CZ', name: 'Czech Republic', zone: 'EU' },
  { code: 'DK', name: 'Denmark', zone: 'EU' },
  { code: 'EE', name: 'Estonia', zone: 'EU' },
  { code: 'FI', name: 'Finland', zone: 'EU' },
  { code: 'FR', name: 'France', zone: 'EU' },
  { code: 'GR', name: 'Greece', zone: 'EU' },
  { code: 'HU', name: 'Hungary', zone: 'EU' },
  { code: 'IE', name: 'Ireland', zone: 'EU' },
  { code: 'IT', name: 'Italy', zone: 'EU' },
  { code: 'LV', name: 'Latvia', zone: 'EU' },
  { code: 'LT', name: 'Lithuania', zone: 'EU' },
  { code: 'LU', name: 'Luxembourg', zone: 'EU' },
  { code: 'MT', name: 'Malta', zone: 'EU' },
  { code: 'NL', name: 'Netherlands', zone: 'EU' },
  { code: 'PL', name: 'Poland', zone: 'EU' },
  { code: 'PT', name: 'Portugal', zone: 'EU' },
  { code: 'RO', name: 'Romania', zone: 'EU' },
  { code: 'SK', name: 'Slovakia', zone: 'EU' },
  { code: 'SI', name: 'Slovenia', zone: 'EU' },
  { code: 'ES', name: 'Spain', zone: 'EU' },
  { code: 'SE', name: 'Sweden', zone: 'EU' },
  { code: 'GB', name: 'United Kingdom', zone: 'UK' },
  { code: 'US', name: 'United States', zone: 'US' },
  { code: 'CA', name: 'Canada', zone: 'CA' },
  { code: 'AU', name: 'Australia', zone: 'AU' },
];

export default function ShippingSelector({ orderTotal, onShippingChange }: ShippingSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState('DE');
  const [shippingType, setShippingType] = useState<'standard' | 'express'>('standard');
  const [calculation, setCalculation] = useState<ShippingCalculation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateShipping();
  }, [selectedCountry, shippingType, orderTotal]);

  const calculateShipping = async () => {
    if (orderTotal <= 0) {
      setCalculation(null);
      onShippingChange(null);
      return;
    }

    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/calculate-shipping-cost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_code: selectedCountry,
          shipping_type: shippingType,
          order_total: orderTotal,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate shipping');
      }

      const data = await response.json();
      setCalculation(data);
      onShippingChange(data);
    } catch (error) {
      console.error('Error calculating shipping:', error);
      setCalculation(null);
      onShippingChange(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-semibold text-gray-800">Shipping Options</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ship to
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shipping Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShippingType('standard')}
            className={`p-4 border-2 rounded-lg transition-all ${
              shippingType === 'standard'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Truck className={`w-6 h-6 ${shippingType === 'standard' ? 'text-orange-500' : 'text-gray-600'}`} />
            </div>
            <div className="text-sm font-medium text-gray-800">Standard</div>
            {calculation && (
              <div className="text-xs text-gray-600 mt-1">
                €{calculation.standard_rate.toFixed(2)}
              </div>
            )}
          </button>

          <button
            onClick={() => setShippingType('express')}
            className={`p-4 border-2 rounded-lg transition-all ${
              shippingType === 'express'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <Zap className={`w-6 h-6 ${shippingType === 'express' ? 'text-orange-500' : 'text-gray-600'}`} />
            </div>
            <div className="text-sm font-medium text-gray-800">Express</div>
            {calculation && (
              <div className="text-xs text-gray-600 mt-1">
                €{calculation.express_rate.toFixed(2)}
              </div>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-gray-600 text-center py-2">
          Calculating shipping...
        </div>
      )}

      {calculation && !loading && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order Subtotal:</span>
            <span className="font-medium">€{calculation.order_total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping ({calculation.shipping_type}):</span>
            <span className={`font-medium ${calculation.is_free_shipping ? 'text-green-600' : ''}`}>
              {calculation.is_free_shipping ? 'FREE' : `€${calculation.shipping_cost.toFixed(2)}`}
            </span>
          </div>
          {!calculation.is_free_shipping && calculation.amount_until_free_shipping > 0 && (
            <div className="text-xs text-orange-600 pt-2 border-t">
              Add €{calculation.amount_until_free_shipping.toFixed(2)} more for free shipping!
            </div>
          )}
          <div className="flex justify-between text-base font-bold pt-2 border-t">
            <span>Total:</span>
            <span>€{calculation.total_cost.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
