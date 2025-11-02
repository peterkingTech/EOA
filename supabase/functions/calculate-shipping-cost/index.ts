import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ShippingRequest {
  country_code: string;
  shipping_type: 'standard' | 'express';
  order_total: number;
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

    const { country_code, shipping_type, order_total }: ShippingRequest = await req.json();

    if (!country_code || !shipping_type || order_total === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 400,
        }
      );
    }

    const { data: zones, error } = await supabase
      .from('shipping_zones')
      .select('*')
      .eq('is_active', true);

    if (error || !zones) {
      throw new Error('Failed to fetch shipping zones');
    }

    let matchedZone = zones.find(zone =>
      zone.countries.includes(country_code)
    );

    if (!matchedZone) {
      matchedZone = zones.find(zone => zone.zone_code === 'WORLD');
    }

    if (!matchedZone) {
      return new Response(
        JSON.stringify({ error: 'No shipping zone found for this country' }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: 404,
        }
      );
    }

    const shippingRate = shipping_type === 'express'
      ? parseFloat(matchedZone.express_rate)
      : parseFloat(matchedZone.standard_rate);

    const freeShippingThreshold = parseFloat(matchedZone.free_shipping_threshold);

    const shippingCost = order_total >= freeShippingThreshold ? 0 : shippingRate;
    const totalCost = order_total + shippingCost;

    const isFreeShipping = order_total >= freeShippingThreshold;
    const amountUntilFree = isFreeShipping ? 0 : Math.max(0, freeShippingThreshold - order_total);

    return new Response(
      JSON.stringify({
        zone_code: matchedZone.zone_code,
        zone_name: matchedZone.zone_name,
        country_code,
        shipping_type,
        order_total,
        shipping_cost: shippingCost,
        total_cost: totalCost,
        is_free_shipping: isFreeShipping,
        free_shipping_threshold: freeShippingThreshold,
        amount_until_free_shipping: amountUntilFree,
        standard_rate: parseFloat(matchedZone.standard_rate),
        express_rate: parseFloat(matchedZone.express_rate),
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