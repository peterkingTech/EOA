import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    const baseCurrency = 'EUR';
    const targetCurrencies = ['USD', 'GBP', 'CAD', 'AUD', 'NGN', 'GHS', 'ZAR', 'KES', 'UGX', 'TZS'];

    const exchangeRateApiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

    const response = await fetch(exchangeRateApiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates from API');
    }

    const data = await response.json();
    const rates = data.rates;

    const currencyNames: Record<string, string> = {
      'USD': 'US Dollar',
      'GBP': 'British Pound',
      'CAD': 'Canadian Dollar',
      'AUD': 'Australian Dollar',
      'NGN': 'Nigerian Naira',
      'GHS': 'Ghanaian Cedi',
      'ZAR': 'South African Rand',
      'KES': 'Kenyan Shilling',
      'UGX': 'Ugandan Shilling',
      'TZS': 'Tanzanian Shilling',
    };

    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'GBP': '£',
      'CAD': 'CA$',
      'AUD': 'AU$',
      'NGN': '₦',
      'GHS': '₵',
      'ZAR': 'R',
      'KES': 'KSh',
      'UGX': 'USh',
      'TZS': 'TSh',
    };

    const updates = [];

    for (const currency of targetCurrencies) {
      if (rates[currency]) {
        const { error } = await supabase
          .from('exchange_rates')
          .upsert({
            currency_code: currency,
            currency_name: currencyNames[currency] || currency,
            rate_to_eur: rates[currency],
            symbol: currencySymbols[currency] || currency,
            is_active: true,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'currency_code'
          });

        if (error) {
          console.error(`Error updating ${currency}:`, error);
        } else {
          updates.push(currency);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        updated: updates,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error fetching exchange rates:', error);
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