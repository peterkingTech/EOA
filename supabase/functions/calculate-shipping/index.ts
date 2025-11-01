import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ShippingRequest {
  country_code: string;
  currency_code?: string;
  weight_kg?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { country_code, currency_code, weight_kg = 1 }: ShippingRequest = await req.json();

    if (!country_code) {
      throw new Error('Country code is required');
    }

    const { data: shippingRate, error: shippingError } = await supabase
      .from('shipping_rates')
      .select('*')
      .eq('country_code', country_code)
      .eq('is_active', true)
      .maybeSingle();

    if (shippingError || !shippingRate) {
      return new Response(
        JSON.stringify({
          error: 'Shipping rate not found for this country',
          country_code
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 404,
        }
      );
    }

    let finalRate = shippingRate.base_rate;
    let finalCurrency = shippingRate.currency;
    let currencySymbol = '€';

    if (currency_code && currency_code !== 'EUR') {
      const { data: exchangeRate, error: exchangeError } = await supabase
        .from('exchange_rates')
        .select('*')
        .eq('currency_code', currency_code)
        .eq('is_active', true)
        .maybeSingle();

      if (!exchangeError && exchangeRate) {
        const baseInEur = shippingRate.base_rate / 100;
        const convertedAmount = baseInEur * exchangeRate.rate_to_eur;
        finalRate = Math.round(convertedAmount * 100);
        finalCurrency = currency_code;
        currencySymbol = exchangeRate.symbol;
      }
    }

    if (weight_kg > 1) {
      const additionalWeight = weight_kg - 1;
      const additionalCostPerKg = Math.round(finalRate * 0.15);
      finalRate += Math.ceil(additionalWeight) * additionalCostPerKg;
    }

    return new Response(
      JSON.stringify({
        country_code,
        country_name: shippingRate.country_name,
        base_rate: shippingRate.base_rate,
        final_rate: finalRate,
        currency: finalCurrency,
        currency_symbol: currencySymbol,
        estimated_days: shippingRate.estimated_days,
        weight_kg,
        formatted_price: `${currencySymbol}${(finalRate / 100).toFixed(2)}`
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error calculating shipping:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});