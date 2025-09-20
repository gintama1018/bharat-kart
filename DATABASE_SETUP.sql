-- 🚀 BharatKart Database Setup Script
-- Copy and paste this entire script into Supabase SQL Editor

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('stripe', 'razorpay', 'cod');

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- States table
CREATE TABLE public.states (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  name_hindi TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  region TEXT NOT NULL,
  specialties JSONB NOT NULL DEFAULT '[]',
  artisans_count INTEGER DEFAULT 0,
  products_count INTEGER DEFAULT 0,
  image_url TEXT,
  color_primary TEXT NOT NULL DEFAULT '#DC143C',
  color_secondary TEXT NOT NULL DEFAULT '#FFD700',
  color_accent TEXT NOT NULL DEFAULT '#F4A460',
  theme TEXT NOT NULL,
  cultural_story TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Artisans table
CREATE TABLE public.artisans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  craft TEXT NOT NULL,
  experience TEXT NOT NULL,
  location TEXT NOT NULL,
  state_id UUID REFERENCES public.states(id) ON DELETE CASCADE,
  image_url TEXT,
  story TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  products_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  images JSONB NOT NULL DEFAULT '[]',
  category TEXT NOT NULL,
  state_id UUID REFERENCES public.states(id) ON DELETE CASCADE,
  artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE,
  rating DECIMAL(2,1) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]',
  materials JSONB NOT NULL DEFAULT '[]',
  dimensions TEXT,
  weight TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cart items table
CREATE TABLE public.cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  shipping_address JSONB NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  payment_method payment_method NOT NULL,
  payment_id TEXT,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_products_state_id ON public.products(state_id);
CREATE INDEX idx_products_artisan_id ON public.products(artisan_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);

-- Row Level Security Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "States are viewable by everyone" ON public.states FOR SELECT USING (true);

ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Artisans are viewable by everyone" ON public.artisans FOR SELECT USING (true);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger function for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample state data
INSERT INTO public.states (name, name_hindi, slug, tagline, description, region, specialties, theme, cultural_story) VALUES
('Rajasthan', 'राजस्थान', 'rajasthan', 'Land of Kings and Colors', 'Experience the royal heritage of Rajasthan through its magnificent handicrafts', 'North', '["Bandhej", "Block Printing", "Miniature Paintings", "Jewelry"]', 'royal', 'The desert state of Rajasthan has a rich tradition of craftsmanship that dates back centuries.'),
('Gujarat', 'गुजरात', 'gujarat', 'Vibrant Heritage Hub', 'Discover the colorful traditions and intricate crafts of Gujarat', 'West', '["Bandhani", "Patola Silk", "Rogan Art", "Mirror Work"]', 'vibrant', 'Gujarat is known for its entrepreneurial spirit and rich textile traditions.'),
('West Bengal', 'পশ্চিমবঙ্গ', 'west-bengal', 'Cultural Renaissance', 'Explore the artistic excellence of Bengal through its timeless crafts', 'East', '["Kantha Embroidery", "Terracotta", "Dokra", "Muslin"]', 'artistic', 'Bengal has been the center of artistic and intellectual renaissance in India.');