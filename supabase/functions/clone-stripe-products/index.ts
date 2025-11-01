import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@19.1.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ClonedMapping {
  testProductId: string;
  liveProductId: string;
  prices: Array<{
    testPriceId: string;
    livePriceId: string;
    amount: number;
    currency: string;
  }>;
  productName: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const testKey = Deno.env.get("STRIPE_TEST_KEY");
    const liveKey = Deno.env.get("STRIPE_LIVE_KEY");

    if (!testKey || !liveKey) {
      return new Response(
        JSON.stringify({
          error: "Missing Stripe API keys",
          details: "Both STRIPE_TEST_KEY and STRIPE_LIVE_KEY environment variables are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const stripeTest = new Stripe(testKey, {
      apiVersion: "2023-10-16",
    });

    const stripeLive = new Stripe(liveKey, {
      apiVersion: "2023-10-16",
    });

    console.log("Starting product cloning from test mode to live mode...");

    const products = await stripeTest.products.list({
      limit: 100,
      active: true,
    });

    console.log(`Found ${products.data.length} products to clone`);

    const clonedMappings: ClonedMapping[] = [];

    for (const testProduct of products.data) {
      console.log(`\n--- Cloning product: ${testProduct.name} (${testProduct.id}) ---`);

      const productData: Stripe.ProductCreateParams = {
        name: testProduct.name,
        description: testProduct.description || undefined,
        images: testProduct.images || undefined,
        metadata: testProduct.metadata || {},
        shippable: testProduct.shippable || undefined,
        url: testProduct.url || undefined,
        active: testProduct.active,
      };

      const liveProduct = await stripeLive.products.create(productData);
      console.log(`✓ Created product in live mode: ${liveProduct.id}`);

      const prices = await stripeTest.prices.list({
        product: testProduct.id,
        limit: 100,
      });

      console.log(`  Found ${prices.data.length} price(s) to clone`);

      const clonedPrices: ClonedMapping["prices"] = [];

      for (const testPrice of prices.data) {
        const priceData: Stripe.PriceCreateParams = {
          product: liveProduct.id,
          unit_amount: testPrice.unit_amount || undefined,
          currency: testPrice.currency,
          metadata: testPrice.metadata || {},
          active: testPrice.active,
        };

        if (testPrice.recurring) {
          priceData.recurring = {
            interval: testPrice.recurring.interval,
            interval_count: testPrice.recurring.interval_count || undefined,
            trial_period_days: testPrice.recurring.trial_period_days || undefined,
          };
        }

        if (testPrice.nickname) {
          priceData.nickname = testPrice.nickname;
        }

        const livePrice = await stripeLive.prices.create(priceData);
        console.log(
          `  ✓ Created price in live mode: ${livePrice.id} (${testPrice.unit_amount ? testPrice.unit_amount / 100 : 0} ${testPrice.currency.toUpperCase()})`
        );

        clonedPrices.push({
          testPriceId: testPrice.id,
          livePriceId: livePrice.id,
          amount: testPrice.unit_amount || 0,
          currency: testPrice.currency,
        });
      }

      clonedMappings.push({
        testProductId: testProduct.id,
        liveProductId: liveProduct.id,
        prices: clonedPrices,
        productName: testProduct.name,
      });

      console.log(`✓ Completed cloning: ${testProduct.name}`);
    }

    console.log(`\n=== Cloning completed successfully! ===`);
    console.log(`Total products cloned: ${clonedMappings.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully cloned ${clonedMappings.length} products from test mode to live mode`,
        totalProducts: clonedMappings.length,
        totalPrices: clonedMappings.reduce((sum, mapping) => sum + mapping.prices.length, 0),
        mappings: clonedMappings,
      }, null, 2),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error cloning products:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Unknown error occurred",
        details: error.type || "Error while cloning Stripe products",
        stack: error.stack || undefined,
      }, null, 2),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
