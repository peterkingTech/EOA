/*
  # Create Shipping Zones System

  1. New Tables
    - `shipping_zones`
      - `id` (uuid, primary key)
      - `zone_code` (text, unique) - Zone identifier (DE, EU, UK, US, etc.)
      - `zone_name` (text) - Display name
      - `countries` (text[]) - Array of country codes in this zone
      - `standard_rate` (numeric) - Standard shipping rate in EUR
      - `express_rate` (numeric) - Express shipping rate in EUR
      - `free_shipping_threshold` (numeric) - Free shipping above this amount
      - `is_active` (boolean) - Whether zone is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `shipping_zones` table
    - Add policy for public read access (needed for checkout)
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS shipping_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_code text UNIQUE NOT NULL,
  zone_name text NOT NULL,
  countries text[] NOT NULL DEFAULT '{}',
  standard_rate numeric(10, 2) NOT NULL DEFAULT 0,
  express_rate numeric(10, 2) NOT NULL DEFAULT 0,
  free_shipping_threshold numeric(10, 2) NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shipping_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active shipping zones"
  ON shipping_zones FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can insert shipping zones"
  ON shipping_zones FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update shipping zones"
  ON shipping_zones FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete shipping zones"
  ON shipping_zones FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_shipping_zones_code ON shipping_zones(zone_code);
CREATE INDEX IF NOT EXISTS idx_shipping_zones_active ON shipping_zones(is_active);
