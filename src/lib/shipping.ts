import { supabase } from './supabase';

export interface ShippingRate {
  id: string;
  country_code: string;
  country_name: string;
  base_rate: number;
  currency: string;
  estimated_days: string;
  is_active: boolean;
}

export interface ExchangeRate {
  id: string;
  currency_code: string;
  currency_name: string;
  rate_to_eur: number;
  symbol: string;
  is_active: boolean;
}

export async function getShippingRates(): Promise<ShippingRate[]> {
  const { data, error } = await supabase
    .from('shipping_rates')
    .select('*')
    .eq('is_active', true)
    .order('country_name');

  if (error) {
    console.error('Error fetching shipping rates:', error);
    return [];
  }

  return data || [];
}

export async function getShippingRateByCountry(countryCode: string): Promise<ShippingRate | null> {
  const { data, error } = await supabase
    .from('shipping_rates')
    .select('*')
    .eq('country_code', countryCode)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching shipping rate:', error);
    return null;
  }

  return data;
}

export async function getExchangeRates(): Promise<ExchangeRate[]> {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('is_active', true)
    .order('currency_name');

  if (error) {
    console.error('Error fetching exchange rates:', error);
    return [];
  }

  return data || [];
}

export async function getExchangeRateByCurrency(currencyCode: string): Promise<ExchangeRate | null> {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('currency_code', currencyCode)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }

  return data;
}

export function calculateShippingCost(
  baseRateInCents: number,
  targetCurrency: string,
  exchangeRate: number
): number {
  const baseInEur = baseRateInCents / 100;
  const convertedAmount = baseInEur * exchangeRate;
  return Math.round(convertedAmount * 100);
}

export function formatShippingPrice(
  amountInCents: number,
  currencySymbol: string,
  currencyCode: string
): string {
  const amount = amountInCents / 100;

  if (currencyCode === 'EUR' || currencyCode === 'USD' || currencyCode === 'GBP') {
    return `${currencySymbol}${amount.toFixed(2)}`;
  }

  return `${currencySymbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN' },
  { code: 'GH', name: 'Ghana', currency: 'GHS' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'FR', name: 'France', currency: 'EUR' },
  { code: 'DE', name: 'Germany', currency: 'EUR' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'AU', name: 'Australia', currency: 'AUD' },
  { code: 'KE', name: 'Kenya', currency: 'KES' },
  { code: 'UG', name: 'Uganda', currency: 'UGX' },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS' },
];
