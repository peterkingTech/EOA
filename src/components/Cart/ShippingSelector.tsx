import React, { useState, useEffect } from 'react';
import { Truck, Zap } from 'lucide-react';

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
  { code: 'DE', name: 'Germany' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
];

export default function ShippingSelector({ orderTotal, onShippingChange }: ShippingSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState('DE');
  const [shippingType, setShippingType] = useState<'standard' | 'express'>('standard');

  useEffect(() => {
    if (selectedCountry && orderTotal > 0) {
      const mockCalculation: ShippingCalculation = {
        zone_code: 'DE',
        zone_name: selectedCountry,
        country_code: selectedCountry,
        shipping_type: shippingType,
        order_total: orderTotal / 100,
        shipping_cost: shippingType === 'standard' ? 5 : 15,
        total_cost: (orderTotal / 100) + (shippingType === 'standard' ? 5 : 15),
        is_free_shipping: false,
        free_shipping_threshold: 100,
        amount_until_free_shipping: 0,
        standard_rate: 5,
        express_rate: 15,
      };
      onShippingChange(mockCalculation);
    }
  }, [selectedCountry, shippingType, orderTotal]);

  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-semibold text-gray-800">Shipping</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country
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
          Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShippingType('standard')}
            className={`p-3 border-2 rounded-lg transition-all ${
              shippingType === 'standard'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              <Truck className={`w-5 h-5 ${shippingType === 'standard' ? 'text-orange-500' : 'text-gray-600'}`} />
            </div>
            <div className="text-sm font-medium text-gray-800">Standard</div>
            <div className="text-xs text-gray-600 mt-1">€5.00</div>
          </button>

          <button
            onClick={() => setShippingType('express')}
            className={`p-3 border-2 rounded-lg transition-all ${
              shippingType === 'express'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              <Zap className={`w-5 h-5 ${shippingType === 'express' ? 'text-orange-500' : 'text-gray-600'}`} />
            </div>
            <div className="text-sm font-medium text-gray-800">Express</div>
            <div className="text-xs text-gray-600 mt-1">€15.00</div>
          </button>
        </div>
      </div>
    </div>
  );
}
