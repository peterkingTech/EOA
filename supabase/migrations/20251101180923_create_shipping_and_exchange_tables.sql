/*
  # Shipping and Exchange Rate Management System

  1. New Tables
    - `shipping_rates`
      - `id` (uuid, primary key)
      - `country_code` (text, not null) - ISO country code (e.g., 'US', 'GB', 'FR')
      - `country_name` (text, not null) - Full country name
      - `base_rate` (integer, not null) - Shipping cost in cents (base currency EUR)
      - `currency` (text, default 'eur')
      - `estimated_days` (text) - Estimated delivery time
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `exchange_rates`
      - `id` (uuid, primary key)
      - `currency_code` (text, unique, not null) - Currency code (e.g., 'USD', 'GBP')
      - `currency_name` (text, not null) - Full currency name
      - `rate_to_eur` (decimal, not null) - Exchange rate relative to EUR
      - `symbol` (text, not null) - Currency symbol (e.g., '$', '£')
      - `is_active` (boolean, default true)
      - `last_updated` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Allow public read access for active rates
    - Admin-only write access

  3. Important Notes
    - Base shipping rates are stored in cents (EUR)
    - Exchange rates are relative to EUR (base currency)
    - Automatic timestamp updates on changes
*/

-- Shipping Rates Table
CREATE TABLE IF NOT EXISTS shipping_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code text NOT NULL,
  country_name text NOT NULL,
  base_rate integer NOT NULL,
  currency text DEFAULT 'eur',
  estimated_days text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(country_code)
);

-- Exchange Rates Table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  currency_code text UNIQUE NOT NULL,
  currency_name text NOT NULL,
  rate_to_eur decimal(10,6) NOT NULL,
  symbol text NOT NULL,
  is_active boolean DEFAULT true,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- Public read access for active rates
CREATE POLICY "Public can view active shipping rates"
  ON shipping_rates
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can view active exchange rates"
  ON exchange_rates
  FOR SELECT
  TO public
  USING (is_active = true);

-- Service role full access
CREATE POLICY "Service role can manage shipping rates"
  ON shipping_rates
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage exchange rates"
  ON exchange_rates
  FOR ALL
  TO service_role
  USING (true);

-- Admin access
CREATE POLICY "Admins can manage shipping rates"
  ON shipping_rates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage exchange rates"
  ON exchange_rates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_shipping_rates_country_code ON shipping_rates(country_code);
CREATE INDEX IF NOT EXISTS idx_shipping_rates_is_active ON shipping_rates(is_active);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_currency_code ON exchange_rates(currency_code);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_is_active ON exchange_rates(is_active);

-- Trigger to auto-update updated_at for shipping_rates
CREATE TRIGGER update_shipping_rates_updated_at BEFORE UPDATE ON shipping_rates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default EUR exchange rate (base currency)
INSERT INTO exchange_rates (currency_code, currency_name, rate_to_eur, symbol, is_active)
VALUES ('EUR', 'Euro', 1.000000, '€', true)
ON CONFLICT (currency_code) DO NOTHING;

-- Insert common exchange rates (relative to EUR)
INSERT INTO exchange_rates (currency_code, currency_name, rate_to_eur, symbol, is_active)
VALUES 
  ('USD', 'US Dollar', 1.080000, '$', true),
  ('GBP', 'British Pound', 0.860000, '£', true),
  ('NGN', 'Nigerian Naira', 1680.000000, '₦', true),
  ('GHS', 'Ghanaian Cedi', 16.500000, '₵', true),
  ('ZAR', 'South African Rand', 20.000000, 'R', true),
  ('CAD', 'Canadian Dollar', 1.460000, 'C$', true),
  ('AUD', 'Australian Dollar', 1.650000, 'A$', true)
ON CONFLICT (currency_code) DO NOTHING;

-- Insert sample shipping rates (prices in cents for EUR)
INSERT INTO shipping_rates (country_code, country_name, base_rate, estimated_days, is_active)
VALUES
  ('NG', 'Nigeria', 2000, '7-14 days', true),
  ('GH', 'Ghana', 2200, '7-14 days', true),
  ('ZA', 'South Africa', 2500, '10-15 days', true),
  ('US', 'United States', 2500, '5-10 days', true),
  ('GB', 'United Kingdom', 1500, '3-7 days', true),
  ('FR', 'France', 1000, '3-5 days', true),
  ('DE', 'Germany', 1000, '3-5 days', true),
  ('CA', 'Canada', 2800, '7-12 days', true),
  ('AU', 'Australia', 3500, '10-15 days', true),
  ('KE', 'Kenya', 2300, '7-14 days', true),
  ('UG', 'Uganda', 2400, '7-14 days', true),
  ('TZ', 'Tanzania', 2400, '7-14 days', true)
ON CONFLICT (country_code) DO NOTHING;