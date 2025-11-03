// Stripe configuration and utilities for E.O.A Line
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

export const STRIPE_PRODUCTS = {
  'LV-JK-F-BG': { priceId: 'price_1SOlN4FYjHOo4LIynimkrNCj', productId: 'prod_TLSHCfKIHOuMHy' },
  'LV-JK-F-BLK': { priceId: 'price_1SOlV2FYjHOo4LIyZ2v8t3pq', productId: 'prod_TLSPE7bc9hV6Qn' },
  'LV-JK-M-BG': { priceId: 'price_1SOlO3FYjHOo4LIyuy9eeMz7', productId: 'prod_TLSI36M61G5dKv' },
  'LV-JK-M-BLK': { priceId: 'price_1SOlWBFYjHOo4LIybIbhXgDu', productId: 'prod_TLSR0hNMHorsP5' },
  'LV-SH-F-BG': { priceId: 'price_1SOlQEFYjHOo4LIy4wM9uSDC', productId: 'prod_TLSKdYzrP4ONuH' },
  'LV-SH-F-BLK': { priceId: 'price_1SOlXSFYjHOo4LIytlIHOsbd', productId: 'prod_TLSSrxqwJAa3VW' },
  'LV-SH-M-BG': { priceId: 'price_1SOlZVFYjHOo4LIy3TxBacz5', productId: 'prod_TLSUgc4HTeQm7T' },
  'LV-SH-M-BLK': { priceId: 'price_1SOlYbFYjHOo4LIyH7ggYLe2', productId: 'prod_TLSTilB7Tf5Gnv' },
  'LV-SET-JK-SK-F-BG': { priceId: 'price_1SOlc1FYjHOo4LIyiDyTpMgx', productId: 'prod_TLSXfeD9CcyzBn' },
  'LV-SET-JK-SK-F-BLK': { priceId: 'price_1SOlbHFYjHOo4LIyjjj0Y60u', productId: 'prod_TLSW6Stm90h6Hc' },
  'LV-SET-JK-SH-F-BG': { priceId: 'price_1SOld7FYjHOo4LIy506q9zmg', productId: 'prod_TLSYzgamkAU0us' },
  'LV-SET-JK-SH-F-BLK': { priceId: 'price_1SOleOFYjHOo4LIyg0yGHJPl', productId: 'prod_TLSZAbIv9JMEtI' },
  'LV-SET-JK-SH-M-BG': { priceId: 'price_1SOlpNFYjHOo4LIyq2nOGWMO', productId: 'prod_TLSkaYGO6cyxIp' },
  'LV-SET-JK-SH-M-BLK': { priceId: 'price_1SOlfTFYjHOo4LIyYAM44c2Q', productId: 'prod_TLSawujSLAAhWD' },
  'TM-JK-F-BG': { priceId: 'price_1SOly1FYjHOo4LIyRN82kWkj', productId: 'prod_TLSts8KpzHMmx7' },
  'TM-JK-F-BLK': { priceId: 'price_1SOlxPFYjHOo4LIyc0jbAGNX', productId: 'prod_TLSt9f2obSjI0j' },
  'TM-JK-M-BG': { priceId: 'price_1SOlzSFYjHOo4LIyulx4z1Pn', productId: 'prod_TLSvWjaa4UUczq' },
  'TM-JK-M-BLK': { priceId: 'price_1SOm0DFYjHOo4LIyXtMUoWb2', productId: 'prod_TLSwlz9tqm3uje' },
  'TM-TS-F-BG': { priceId: 'price_1SOm2zFYjHOo4LIyUoZ4l6bP', productId: 'prod_TLSyKSV9lgj7TU' },
  'TM-TS-F-WHT': { priceId: 'price_1SOm1qFYjHOo4LIytyqk6Az6', productId: 'prod_TLSxfU7PwpC7xW' },
  'TM-TS-F-BLK': { priceId: 'price_1SOm45FYjHOo4LIynniBOPPS', productId: 'prod_TLT0puSzgbpt72' },
  'TM-TS-M-BG': { priceId: 'price_1SOm6dFYjHOo4LIyeNDihoPG', productId: 'prod_TLT2bYdEf251Zr' },
  'TM-TS-M-WHT': { priceId: 'price_1SOm5FFYjHOo4LIy9HYSCkvD', productId: 'prod_TLT1F6uSPXi4eU' },
  'TM-TS-M-BLK': { priceId: 'price_1SOm5wFYjHOo4LIyAYJzLyow', productId: 'prod_TLT1F6uSPXi4eU' },
  'TM-HD-F-BLK': { priceId: 'price_1SOm7qFYjHOo4LIyL8f20dyT', productId: 'prod_TLT3mqwVUE0smw' },
  'TM-HD-M-BLK': { priceId: 'price_1SOm8rFYjHOo4LIyTpCtvSgA', productId: 'prod_TLT5Uh0yh4upXh' },
  'TM-SP-BLK': { priceId: 'price_1SOmAdFYjHOo4LIytxapJsTE', productId: 'prod_TLT6kalzdj5IMA' },
  'TM-SP-F-BLK': { priceId: 'price_1SOmAdFYjHOo4LIytxapJsTE', productId: 'prod_TLT6kalzdj5IMA' },
  'TM-SP-M-BLK': { priceId: 'price_1SOmAdFYjHOo4LIytxapJsTE', productId: 'prod_TLT6kalzdj5IMA' },
  'TM-FS-F-BLK': { priceId: 'price_1SOmCNFYjHOo4LIyGTNoYIj5', productId: 'prod_TLT8w6S0NF8eF7' },
  'TM-FS-M-BLK': { priceId: 'price_1SOmDEFYjHOo4LIyhWoXSqhO', productId: 'prod_TLT9Cl7zQahU20' },
};

export const STRIPE_PRICES = Object.fromEntries(
    Object.entries(STRIPE_PRODUCTS).map(([sku, data]) => [sku, data.priceId])
);

const normalizeColorCode = (color?: string): string => {
  if (!color) return '';

  const colorMap: { [key: string]: string } = {
    'BLACK': 'BLK',
    'BEIGE': 'BG',
    'WHITE': 'WHT',
    'BLK': 'BLK',
    'BG': 'BG',
    'WHT': 'WHT'
  };

  const normalized = color.toUpperCase();
  return colorMap[normalized] || normalized;
};

export const generateSKU = (product: any, selectedColor?: string, selectedSize?: string) => {
  const colorCode = selectedColor ? `-${normalizeColorCode(selectedColor)}` : '';

  if (product.sku) {
    const baseSKU = product.sku;
    const fullSKU = `${baseSKU}${colorCode}`;

    if (STRIPE_PRODUCTS[fullSKU as keyof typeof STRIPE_PRODUCTS]) {
      return fullSKU;
    }

    return baseSKU;
  }

  const name = product.name.toUpperCase();
  let baseSKU = '';

  if (name.includes('LA VEIRA') && name.includes('JACKET') && name.includes('FEMALE')) {
    baseSKU = 'LV-JK-F';
  } else if (name.includes('LA VEIRA') && name.includes('JACKET') && name.includes('MALE')) {
    baseSKU = 'LV-JK-M';
  } else if (name.includes('TUMI') && name.includes('JACKET') && name.includes('FEMALE')) {
    baseSKU = 'TM-JK-F';
  } else if (name.includes('TUMI') && name.includes('JACKET') && name.includes('MALE')) {
    baseSKU = 'TM-JK-M';
  } else if (name.includes('TUMI') && name.includes('T-SHIRT') && name.includes('FEMALE')) {
    baseSKU = 'TM-TS-F';
  } else if (name.includes('TUMI') && name.includes('T-SHIRT') && name.includes('MALE')) {
    baseSKU = 'TM-TS-M';
  } else if (name.includes('TUMI') && name.includes('HOODIE') && name.includes('FEMALE')) {
    baseSKU = 'TM-HD-F';
  } else if (name.includes('TUMI') && name.includes('HOODIE') && name.includes('MALE')) {
    baseSKU = 'TM-HD-M';
  } else if (name.includes('TUMI') && name.includes('SWEAT PANTS') && name.includes('FEMALE')) {
    baseSKU = 'TM-SP-F';
  } else if (name.includes('TUMI') && name.includes('SWEAT PANTS') && name.includes('MALE')) {
    baseSKU = 'TM-SP-M';
  } else if (name.includes('TUMI') && name.includes('FULL SET') && name.includes('FEMALE')) {
    baseSKU = 'TM-FS-F';
  } else if (name.includes('TUMI') && name.includes('FULL SET') && name.includes('MALE')) {
    baseSKU = 'TM-FS-M';
  } else if (name.includes('LA VEIRA') && name.includes('SHORT') && name.includes('FEMALE') && !name.includes('SET')) {
    baseSKU = 'LV-SH-F';
  } else if (name.includes('LA VEIRA') && name.includes('SHORT') && name.includes('MALE') && !name.includes('SET')) {
    baseSKU = 'LV-SH-M';
  } else if (name.includes('LA VEIRA') && name.includes('SKIRT') && name.includes('SET')) {
    baseSKU = 'LV-SET-JK-SK-F';
  } else if (name.includes('LA VEIRA') && name.includes('SHORT') && name.includes('SET') && name.includes('FEMALE')) {
    baseSKU = 'LV-SET-JK-SH-F';
  } else if (name.includes('LA VEIRA') && name.includes('SHORT') && name.includes('SET') && name.includes('MALE')) {
    baseSKU = 'LV-SET-JK-SH-M';
  }

  if (!baseSKU) {
    console.warn('Could not generate SKU for product:', product.name);
    return 'UNKNOWN';
  }

  const fullSKU = `${baseSKU}${colorCode}`;

  if (STRIPE_PRODUCTS[fullSKU as keyof typeof STRIPE_PRODUCTS]) {
    return fullSKU;
  }

  return baseSKU;
};

// Initialize Stripe checkout with real integration
export const createCheckoutSession = async (
    items: Array<{
      product: any;
      quantity: number;
      selectedSize?: string;
      selectedColor?: string;
    }>,
    userEmail?: string | null,
    shippingInfo?: {
      shippingCost: number;
      country: string;
      countryName: string;
    }
) => {
  try {
    console.log('Creating Stripe checkout session for items:', items);
    console.log('User email:', userEmail || 'Guest checkout');

    const lineItems = items.map(item => {
      const sku = generateSKU(item.product, item.selectedColor, item.selectedSize);
      console.log(`Generated SKU: ${sku} for product: ${item.product.name}, color: ${item.selectedColor}`);

      const priceId = STRIPE_PRICES[sku as keyof typeof STRIPE_PRICES];

      if (!priceId) {
        console.error(`No price ID found for SKU: ${sku}`);
        console.error(`Available SKUs:`, Object.keys(STRIPE_PRICES));
        throw new Error(`No Stripe price configured for ${item.product.name} (${item.selectedColor}). Please contact support.`);
      }

      console.log(`Mapped to Price ID: ${priceId}`);

      return {
        price: priceId,
        quantity: item.quantity,
      };
    });


    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing');
    }

    console.log('Calling edge function with line items:', lineItems);

    const requestBody: any = {
      line_items: lineItems,
      success_url: `https://www.by-eoa.com/payment-redirects?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.by-eoa.com/payment-redirects?status=cancel`,
      metadata: {
        source: 'by-eoa.com',
        user_type: userEmail ? 'logged_in' : 'guest',
        items: JSON.stringify(items.map(item => ({
          name: item.product.name,
          sku: generateSKU(item.product, item.selectedColor, item.selectedSize),
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity
        }))),
        shipping_country: shippingInfo?.countryName || '',
      }
    };

    if (userEmail) {
      requestBody.customer_email = userEmail;
    }

    if (shippingInfo && shippingInfo.shippingCost > 0) {
      requestBody.shipping_cost = shippingInfo.shippingCost;
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Edge function error:', errorData);
      throw new Error(errorData.error || `Failed to create checkout session (${response.status})`);
    }

    const { url } = await response.json();

    if (!url) {
      throw new Error('No checkout URL returned');
    }

    console.log('Redirecting to:', url);
    window.location.href = url;

    return {
      success: true,
      message: 'Redirecting to secure checkout...'
    };

  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Format price for display
export const formatPrice = (price: number, currency: string = 'EUR') => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// Validate Stripe configuration
export const validateStripeConfig = () => {
  if (!STRIPE_PUBLIC_KEY || STRIPE_PUBLIC_KEY === '') {
    console.warn('Stripe public key not configured');
    return false;
  }
  return true;
};

// Initialize Stripe
export const initializeStripe = async () => {
  try {
    if (typeof window !== 'undefined') {
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
      return stripe;
    }
    return null;
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    return null;
  }
};

// Handle successful payment
export const handlePaymentSuccess = (sessionId: string) => {
  console.log('Payment successful:', sessionId);
  // Clear cart
  localStorage.removeItem('eoa-cart');
  // Show success message
  return {
    success: true,
    message: 'Payment completed successfully!'
  };
};

// Handle payment cancellation
export const handlePaymentCancel = () => {
  console.log('Payment cancelled by user');
  return {
    success: false,
    message: 'Payment was cancelled'
  };
};