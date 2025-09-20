Repository: gintama1018/bharat-kart
Files analyzed: 68

Estimated tokens: 195.1k

Directory structure:
└── gintama1018-bharat-kart/
    ├── README.md
    ├── components.json
    ├── DATABASE_SETUP.sql
    ├── next.config.mjs
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── SUPABASE_SETUP.md
    ├── tsconfig.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── page.tsx
    │   ├── api/
    │   │   ├── payments/
    │   │   │   ├── razorpay/
    │   │   │   │   └── route.ts
    │   │   │   └── stripe/
    │   │   │       └── route.ts
    │   │   └── states/
    │   │       ├── route.ts
    │   │       └── [slug]/
    │   │           └── route.ts
    │   ├── auth/
    │   │   └── page.tsx
    │   ├── cart/
    │   │   └── page.tsx
    │   ├── checkout/
    │   │   └── page.tsx
    │   ├── explore/
    │   │   ├── loading.tsx
    │   │   └── page.tsx
    │   ├── get-started/
    │   │   └── page.tsx
    │   ├── products/
    │   │   └── [id]/
    │   │       └── page.tsx
    │   └── states/
    │       ├── loading.tsx
    │       ├── page.tsx
    │       └── [slug]/
    │           ├── loading.tsx
    │           └── page.tsx
    ├── components/
    │   ├── theme-provider.tsx
    │   ├── cultural/
    │   │   ├── advanced-sound-manager.tsx
    │   │   ├── cultural-loading.tsx
    │   │   ├── cultural-transitions.tsx
    │   │   ├── custom-cursor.tsx
    │   │   ├── floating-elements.tsx
    │   │   ├── interactive-map.tsx
    │   │   ├── loading-spinner.tsx
    │   │   ├── parallax-section.tsx
    │   │   ├── premium-buttons.tsx
    │   │   ├── premium-cursor.tsx
    │   │   ├── premium-inputs.tsx
    │   │   ├── premium-loading-states.tsx
    │   │   ├── premium-notifications.tsx
    │   │   ├── sound-manager.tsx
    │   │   ├── success-animation.tsx
    │   │   ├── three-d-background.tsx
    │   │   └── three-d-environment.tsx
    │   ├── layout/
    │   │   ├── footer.tsx
    │   │   └── header.tsx
    │   └── ui/
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── image-shimmer.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── robust-image.tsx
    │       ├── select.tsx
    │       └── textarea.tsx
    ├── contexts/
    │   ├── AuthContext.tsx
    │   └── CartContext.tsx
    ├── lib/
    │   ├── image-config.ts
    │   ├── states-data.ts
    │   ├── supabase.ts
    │   ├── utils.ts
    │   └── supabase/
    │       └── server.ts
    ├── public/
    ├── scripts/
    │   └── seed-states.js
    ├── styles/
    │   └── globals.css
    └── supabase/
        ├── seed.sql
        └── migrations/
            └── 001_initial_schema.sql


================================================
FILE: README.md
================================================
# BharatKart E-commerce Design


## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/indianbhai28-8638s-projects/v0-bharat-kart-e-commerce-design](https://vercel.com/indianbhai28-8638s-projects/v0-bharat-kart-e-commerce-design)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/FdfUZGsNNJd](https://v0.app/chat/projects/FdfUZGsNNJd)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository


================================================
FILE: components.json
================================================
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}



================================================
FILE: DATABASE_SETUP.sql
================================================
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


================================================
FILE: next.config.mjs
================================================
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig


================================================
FILE: package.json
================================================
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start"
  },
  "dependencies": {
    "@emotion/is-prop-valid": "latest",
    "@supabase/supabase-js": "^2.39.3",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/auth-helpers-react": "^0.4.2",
    "@supabase/auth-ui-react": "^0.4.6",
    "@supabase/auth-ui-shared": "^0.1.8",
    "@stripe/stripe-js": "^2.4.0",
    "stripe": "^14.14.0",
    "razorpay": "^2.9.2",
    "react-hot-toast": "^2.4.1",
    "react-phone-number-input": "^3.3.9",
    "libphonenumber-js": "^1.10.51",
    "zustand": "^4.4.7",
    "swr": "^2.2.4",
    "nodemailer": "^6.9.8",
    "twilio": "^4.19.3",
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@remix-run/react": "latest",
    "@sveltejs/kit": "latest",
    "@vercel/analytics": "latest",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "framer-motion": "latest",
    "geist": "latest",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "15.2.4",
    "next-themes": "latest",
    "react": "^19",
    "react-day-picker": "9.8.0",
    "react-dom": "^19",
    "react-hook-form": "^7.60.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.4",
    "sonner": "^1.7.4",
    "svelte": "latest",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "vue": "latest",
    "vue-router": "latest",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "tw-animate-css": "1.3.3",
    "typescript": "^5"
  }
}


================================================
FILE: pnpm-lock.yaml
================================================
lockfileVersion: '9.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

importers:

  .:
    dependencies:
      '@emotion/is-prop-valid':
        specifier: latest
        version: 1.4.0
      '@hookform/resolvers':
        specifier: ^3.10.0
        version: 3.10.0(react-hook-form@7.60.0(react@19.0.0))
      '@radix-ui/react-accordion':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-alert-dialog':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-aspect-ratio':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-avatar':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-checkbox':
        specifier: 1.1.3
        version: 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-collapsible':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-context-menu':
        specifier: 2.2.4
        version: 2.2.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-dialog':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-dropdown-menu':
        specifier: 2.1.4
        version: 2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-hover-card':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-label':
        specifier: 2.1.1
        version: 2.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-menubar':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-navigation-menu':
        specifier: 1.2.3
        version: 1.2.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-popover':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-progress':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-radio-group':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-scroll-area':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-select':
        specifier: latest
        version: 2.2.6(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-separator':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slider':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot':
        specifier: 1.1.1
        version: 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-switch':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-tabs':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-toast':
        specifier: 1.2.4
        version: 1.2.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-toggle':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-toggle-group':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-tooltip':
        specifier: 1.1.6
        version: 1.1.6(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@remix-run/react':
        specifier: latest
        version: 2.17.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)(typescript@5.0.2)
      '@sveltejs/kit':
        specifier: latest
        version: 2.39.0(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))
      '@vercel/analytics':
        specifier: latest
        version: 1.5.0(@remix-run/react@2.17.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)(typescript@5.0.2))(@sveltejs/kit@2.39.0(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(next@15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0))(react@19.0.0)(svelte@5.38.10)(vue-router@4.5.1(vue@3.5.21(typescript@5.0.2)))(vue@3.5.21(typescript@5.0.2))
      autoprefixer:
        specifier: ^10.4.20
        version: 10.4.20(postcss@8.5.0)
      class-variance-authority:
        specifier: ^0.7.1
        version: 0.7.1
      clsx:
        specifier: ^2.1.1
        version: 2.1.1
      cmdk:
        specifier: 1.0.4
        version: 1.0.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      date-fns:
        specifier: 4.1.0
        version: 4.1.0
      embla-carousel-react:
        specifier: 8.5.1
        version: 8.5.1(react@19.0.0)
      framer-motion:
        specifier: latest
        version: 12.23.12(@emotion/is-prop-valid@1.4.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      geist:
        specifier: latest
        version: 1.5.1(next@15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0))
      input-otp:
        specifier: 1.4.1
        version: 1.4.1(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      lucide-react:
        specifier: ^0.454.0
        version: 0.454.0(react@19.0.0)
      next:
        specifier: 15.2.4
        version: 15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      next-themes:
        specifier: latest
        version: 0.4.6(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react:
        specifier: ^19
        version: 19.0.0
      react-day-picker:
        specifier: 9.8.0
        version: 9.8.0(react@19.0.0)
      react-dom:
        specifier: ^19
        version: 19.0.0(react@19.0.0)
      react-hook-form:
        specifier: ^7.60.0
        version: 7.60.0(react@19.0.0)
      react-resizable-panels:
        specifier: ^2.1.7
        version: 2.1.7(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      recharts:
        specifier: 2.15.4
        version: 2.15.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      sonner:
        specifier: ^1.7.4
        version: 1.7.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      svelte:
        specifier: latest
        version: 5.38.10
      tailwind-merge:
        specifier: ^2.5.5
        version: 2.5.5
      tailwindcss-animate:
        specifier: ^1.0.7
        version: 1.0.7(tailwindcss@4.1.9)
      vaul:
        specifier: ^0.9.9
        version: 0.9.9(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      vue:
        specifier: latest
        version: 3.5.21(typescript@5.0.2)
      vue-router:
        specifier: latest
        version: 4.5.1(vue@3.5.21(typescript@5.0.2))
      zod:
        specifier: 3.25.67
        version: 3.25.67
    devDependencies:
      '@tailwindcss/postcss':
        specifier: ^4.1.9
        version: 4.1.9
      '@types/node':
        specifier: ^22
        version: 22.0.0
      '@types/react':
        specifier: ^19
        version: 19.0.0
      '@types/react-dom':
        specifier: ^19
        version: 19.0.0
      postcss:
        specifier: ^8.5
        version: 8.5.0
      tailwindcss:
        specifier: ^4.1.9
        version: 4.1.9
      tw-animate-css:
        specifier: 1.3.3
        version: 1.3.3
      typescript:
        specifier: ^5
        version: 5.0.2

packages:

  '@alloc/quick-lru@5.2.0':
    resolution: {integrity: sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==}
    engines: {node: '>=10'}

  '@ampproject/remapping@2.3.0':
    resolution: {integrity: sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==}
    engines: {node: '>=6.0.0'}

  '@babel/helper-string-parser@7.27.1':
    resolution: {integrity: sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==}
    engines: {node: '>=6.9.0'}

  '@babel/helper-validator-identifier@7.27.1':
    resolution: {integrity: sha512-D2hP9eA+Sqx1kBZgzxZh0y1trbuU+JoDkiEwqhQ36nodYqJwyEIhPSdMNd7lOm/4io72luTPWH20Yda0xOuUow==}
    engines: {node: '>=6.9.0'}

  '@babel/parser@7.28.4':
    resolution: {integrity: sha512-yZbBqeM6TkpP9du/I2pUZnJsRMGGvOuIrhjzC1AwHwW+6he4mni6Bp/m8ijn0iOuZuPI2BfkCoSRunpyjnrQKg==}
    engines: {node: '>=6.0.0'}
    hasBin: true

  '@babel/runtime@7.28.4':
    resolution: {integrity: sha512-Q/N6JNWvIvPnLDvjlE1OUBLPQHH6l3CltCEsHIujp45zQUSSh8K+gHnaEX45yAT1nyngnINhvWtzN+Nb9D8RAQ==}
    engines: {node: '>=6.9.0'}

  '@babel/types@7.28.4':
    resolution: {integrity: sha512-bkFqkLhh3pMBUQQkpVgWDWq/lqzc2678eUyDlTBhRqhCHFguYYGM0Efga7tYk4TogG/3x0EEl66/OQ+WGbWB/Q==}
    engines: {node: '>=6.9.0'}

  '@date-fns/tz@1.2.0':
    resolution: {integrity: sha512-LBrd7MiJZ9McsOgxqWX7AaxrDjcFVjWH/tIKJd7pnR7McaslGYOP1QmmiBXdJH/H/yLCT+rcQ7FaPBUxRGUtrg==}

  '@emnapi/runtime@1.5.0':
    resolution: {integrity: sha512-97/BJ3iXHww3djw6hYIfErCZFee7qCtrneuLa20UXFCOTCfBM2cvQHjWJ2EG0s0MtdNwInarqCTz35i4wWXHsQ==}

  '@emotion/is-prop-valid@1.4.0':
    resolution: {integrity: sha512-QgD4fyscGcbbKwJmqNvUMSE02OsHUa+lAWKdEUIJKgqe5IwRSKd7+KhibEWdaKwgjLj0DRSHA9biAIqGBk05lw==}

  '@emotion/memoize@0.9.0':
    resolution: {integrity: sha512-30FAj7/EoJ5mwVPOWhAyCX+FPfMDrVecJAM+Iw9NRoSl4BBAQeqj4cApHHUXOVvIPgLVDsCFoz/hGD+5QQD1GQ==}

  '@esbuild/aix-ppc64@0.25.9':
    resolution: {integrity: sha512-OaGtL73Jck6pBKjNIe24BnFE6agGl+6KxDtTfHhy1HmhthfKouEcOhqpSL64K4/0WCtbKFLOdzD/44cJ4k9opA==}
    engines: {node: '>=18'}
    cpu: [ppc64]
    os: [aix]

  '@esbuild/android-arm64@0.25.9':
    resolution: {integrity: sha512-IDrddSmpSv51ftWslJMvl3Q2ZT98fUSL2/rlUXuVqRXHCs5EUF1/f+jbjF5+NG9UffUDMCiTyh8iec7u8RlTLg==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [android]

  '@esbuild/android-arm@0.25.9':
    resolution: {integrity: sha512-5WNI1DaMtxQ7t7B6xa572XMXpHAaI/9Hnhk8lcxF4zVN4xstUgTlvuGDorBguKEnZO70qwEcLpfifMLoxiPqHQ==}
    engines: {node: '>=18'}
    cpu: [arm]
    os: [android]

  '@esbuild/android-x64@0.25.9':
    resolution: {integrity: sha512-I853iMZ1hWZdNllhVZKm34f4wErd4lMyeV7BLzEExGEIZYsOzqDWDf+y082izYUE8gtJnYHdeDpN/6tUdwvfiw==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [android]

  '@esbuild/darwin-arm64@0.25.9':
    resolution: {integrity: sha512-XIpIDMAjOELi/9PB30vEbVMs3GV1v2zkkPnuyRRURbhqjyzIINwj+nbQATh4H9GxUgH1kFsEyQMxwiLFKUS6Rg==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [darwin]

  '@esbuild/darwin-x64@0.25.9':
    resolution: {integrity: sha512-jhHfBzjYTA1IQu8VyrjCX4ApJDnH+ez+IYVEoJHeqJm9VhG9Dh2BYaJritkYK3vMaXrf7Ogr/0MQ8/MeIefsPQ==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [darwin]

  '@esbuild/freebsd-arm64@0.25.9':
    resolution: {integrity: sha512-z93DmbnY6fX9+KdD4Ue/H6sYs+bhFQJNCPZsi4XWJoYblUqT06MQUdBCpcSfuiN72AbqeBFu5LVQTjfXDE2A6Q==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [freebsd]

  '@esbuild/freebsd-x64@0.25.9':
    resolution: {integrity: sha512-mrKX6H/vOyo5v71YfXWJxLVxgy1kyt1MQaD8wZJgJfG4gq4DpQGpgTB74e5yBeQdyMTbgxp0YtNj7NuHN0PoZg==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [freebsd]

  '@esbuild/linux-arm64@0.25.9':
    resolution: {integrity: sha512-BlB7bIcLT3G26urh5Dmse7fiLmLXnRlopw4s8DalgZ8ef79Jj4aUcYbk90g8iCa2467HX8SAIidbL7gsqXHdRw==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [linux]

  '@esbuild/linux-arm@0.25.9':
    resolution: {integrity: sha512-HBU2Xv78SMgaydBmdor38lg8YDnFKSARg1Q6AT0/y2ezUAKiZvc211RDFHlEZRFNRVhcMamiToo7bDx3VEOYQw==}
    engines: {node: '>=18'}
    cpu: [arm]
    os: [linux]

  '@esbuild/linux-ia32@0.25.9':
    resolution: {integrity: sha512-e7S3MOJPZGp2QW6AK6+Ly81rC7oOSerQ+P8L0ta4FhVi+/j/v2yZzx5CqqDaWjtPFfYz21Vi1S0auHrap3Ma3A==}
    engines: {node: '>=18'}
    cpu: [ia32]
    os: [linux]

  '@esbuild/linux-loong64@0.25.9':
    resolution: {integrity: sha512-Sbe10Bnn0oUAB2AalYztvGcK+o6YFFA/9829PhOCUS9vkJElXGdphz0A3DbMdP8gmKkqPmPcMJmJOrI3VYB1JQ==}
    engines: {node: '>=18'}
    cpu: [loong64]
    os: [linux]

  '@esbuild/linux-mips64el@0.25.9':
    resolution: {integrity: sha512-YcM5br0mVyZw2jcQeLIkhWtKPeVfAerES5PvOzaDxVtIyZ2NUBZKNLjC5z3/fUlDgT6w89VsxP2qzNipOaaDyA==}
    engines: {node: '>=18'}
    cpu: [mips64el]
    os: [linux]

  '@esbuild/linux-ppc64@0.25.9':
    resolution: {integrity: sha512-++0HQvasdo20JytyDpFvQtNrEsAgNG2CY1CLMwGXfFTKGBGQT3bOeLSYE2l1fYdvML5KUuwn9Z8L1EWe2tzs1w==}
    engines: {node: '>=18'}
    cpu: [ppc64]
    os: [linux]

  '@esbuild/linux-riscv64@0.25.9':
    resolution: {integrity: sha512-uNIBa279Y3fkjV+2cUjx36xkx7eSjb8IvnL01eXUKXez/CBHNRw5ekCGMPM0BcmqBxBcdgUWuUXmVWwm4CH9kg==}
    engines: {node: '>=18'}
    cpu: [riscv64]
    os: [linux]

  '@esbuild/linux-s390x@0.25.9':
    resolution: {integrity: sha512-Mfiphvp3MjC/lctb+7D287Xw1DGzqJPb/J2aHHcHxflUo+8tmN/6d4k6I2yFR7BVo5/g7x2Monq4+Yew0EHRIA==}
    engines: {node: '>=18'}
    cpu: [s390x]
    os: [linux]

  '@esbuild/linux-x64@0.25.9':
    resolution: {integrity: sha512-iSwByxzRe48YVkmpbgoxVzn76BXjlYFXC7NvLYq+b+kDjyyk30J0JY47DIn8z1MO3K0oSl9fZoRmZPQI4Hklzg==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [linux]

  '@esbuild/netbsd-arm64@0.25.9':
    resolution: {integrity: sha512-9jNJl6FqaUG+COdQMjSCGW4QiMHH88xWbvZ+kRVblZsWrkXlABuGdFJ1E9L7HK+T0Yqd4akKNa/lO0+jDxQD4Q==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [netbsd]

  '@esbuild/netbsd-x64@0.25.9':
    resolution: {integrity: sha512-RLLdkflmqRG8KanPGOU7Rpg829ZHu8nFy5Pqdi9U01VYtG9Y0zOG6Vr2z4/S+/3zIyOxiK6cCeYNWOFR9QP87g==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [netbsd]

  '@esbuild/openbsd-arm64@0.25.9':
    resolution: {integrity: sha512-YaFBlPGeDasft5IIM+CQAhJAqS3St3nJzDEgsgFixcfZeyGPCd6eJBWzke5piZuZ7CtL656eOSYKk4Ls2C0FRQ==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [openbsd]

  '@esbuild/openbsd-x64@0.25.9':
    resolution: {integrity: sha512-1MkgTCuvMGWuqVtAvkpkXFmtL8XhWy+j4jaSO2wxfJtilVCi0ZE37b8uOdMItIHz4I6z1bWWtEX4CJwcKYLcuA==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [openbsd]

  '@esbuild/openharmony-arm64@0.25.9':
    resolution: {integrity: sha512-4Xd0xNiMVXKh6Fa7HEJQbrpP3m3DDn43jKxMjxLLRjWnRsfxjORYJlXPO4JNcXtOyfajXorRKY9NkOpTHptErg==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [openharmony]

  '@esbuild/sunos-x64@0.25.9':
    resolution: {integrity: sha512-WjH4s6hzo00nNezhp3wFIAfmGZ8U7KtrJNlFMRKxiI9mxEK1scOMAaa9i4crUtu+tBr+0IN6JCuAcSBJZfnphw==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [sunos]

  '@esbuild/win32-arm64@0.25.9':
    resolution: {integrity: sha512-mGFrVJHmZiRqmP8xFOc6b84/7xa5y5YvR1x8djzXpJBSv/UsNK6aqec+6JDjConTgvvQefdGhFDAs2DLAds6gQ==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [win32]

  '@esbuild/win32-ia32@0.25.9':
    resolution: {integrity: sha512-b33gLVU2k11nVx1OhX3C8QQP6UHQK4ZtN56oFWvVXvz2VkDoe6fbG8TOgHFxEvqeqohmRnIHe5A1+HADk4OQww==}
    engines: {node: '>=18'}
    cpu: [ia32]
    os: [win32]

  '@esbuild/win32-x64@0.25.9':
    resolution: {integrity: sha512-PPOl1mi6lpLNQxnGoyAfschAodRFYXJ+9fs6WHXz7CSWKbOqiMZsubC+BQsVKuul+3vKLuwTHsS2c2y9EoKwxQ==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [win32]

  '@floating-ui/core@1.7.3':
    resolution: {integrity: sha512-sGnvb5dmrJaKEZ+LDIpguvdX3bDlEllmv4/ClQ9awcmCZrlx5jQyyMWFM5kBI+EyNOCDDiKk8il0zeuX3Zlg/w==}

  '@floating-ui/dom@1.7.4':
    resolution: {integrity: sha512-OOchDgh4F2CchOX94cRVqhvy7b3AFb+/rQXyswmzmGakRfkMgoWVjfnLWkRirfLEfuD4ysVW16eXzwt3jHIzKA==}

  '@floating-ui/react-dom@2.1.6':
    resolution: {integrity: sha512-4JX6rEatQEvlmgU80wZyq9RT96HZJa88q8hp0pBd+LrczeDI4o6uA2M+uvxngVHo4Ihr8uibXxH6+70zhAFrVw==}
    peerDependencies:
      react: '>=16.8.0'
      react-dom: '>=16.8.0'

  '@floating-ui/utils@0.2.10':
    resolution: {integrity: sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==}

  '@hookform/resolvers@3.10.0':
    resolution: {integrity: sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==}
    peerDependencies:
      react-hook-form: ^7.0.0

  '@img/sharp-darwin-arm64@0.33.5':
    resolution: {integrity: sha512-UT4p+iz/2H4twwAoLCqfA9UH5pI6DggwKEGuaPy7nCVQ8ZsiY5PIcrRvD1DzuY3qYL07NtIQcWnBSY/heikIFQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-darwin-x64@0.33.5':
    resolution: {integrity: sha512-fyHac4jIc1ANYGRDxtiqelIbdWkIuQaI84Mv45KvGRRxSAa7o7d1ZKAOBaYbnepLC1WqxfpimdeWfvqqSGwR2Q==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-darwin-arm64@1.0.4':
    resolution: {integrity: sha512-XblONe153h0O2zuFfTAbQYAX2JhYmDHeWikp1LM9Hul9gVPjFY427k6dFEcOL72O01QxQsWi761svJ/ev9xEDg==}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-libvips-darwin-x64@1.0.4':
    resolution: {integrity: sha512-xnGR8YuZYfJGmWPvmlunFaWJsb9T/AO2ykoP3Fz/0X5XV2aoYBPkX6xqCQvUTKKiLddarLaxpzNe+b1hjeWHAQ==}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-linux-arm64@1.0.4':
    resolution: {integrity: sha512-9B+taZ8DlyyqzZQnoeIvDVR/2F4EbMepXMc/NdVbkzsJbzkUjhXv/70GQJ7tdLA4YJgNP25zukcxpX2/SueNrA==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-libvips-linux-arm@1.0.5':
    resolution: {integrity: sha512-gvcC4ACAOPRNATg/ov8/MnbxFDJqf/pDePbBnuBDcjsI8PssmjoKMAz4LtLaVi+OnSb5FK/yIOamqDwGmXW32g==}
    cpu: [arm]
    os: [linux]

  '@img/sharp-libvips-linux-s390x@1.0.4':
    resolution: {integrity: sha512-u7Wz6ntiSSgGSGcjZ55im6uvTrOxSIS8/dgoVMoiGE9I6JAfU50yH5BoDlYA1tcuGS7g/QNtetJnxA6QEsCVTA==}
    cpu: [s390x]
    os: [linux]

  '@img/sharp-libvips-linux-x64@1.0.4':
    resolution: {integrity: sha512-MmWmQ3iPFZr0Iev+BAgVMb3ZyC4KeFc3jFxnNbEPas60e1cIfevbtuyf9nDGIzOaW9PdnDciJm+wFFaTlj5xYw==}
    cpu: [x64]
    os: [linux]

  '@img/sharp-libvips-linuxmusl-arm64@1.0.4':
    resolution: {integrity: sha512-9Ti+BbTYDcsbp4wfYib8Ctm1ilkugkA/uscUn6UXK1ldpC1JjiXbLfFZtRlBhjPZ5o1NCLiDbg8fhUPKStHoTA==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-libvips-linuxmusl-x64@1.0.4':
    resolution: {integrity: sha512-viYN1KX9m+/hGkJtvYYp+CCLgnJXwiQB39damAO7WMdKWlIhmYTfHjwSbQeUK/20vY154mwezd9HflVFM1wVSw==}
    cpu: [x64]
    os: [linux]

  '@img/sharp-linux-arm64@0.33.5':
    resolution: {integrity: sha512-JMVv+AMRyGOHtO1RFBiJy/MBsgz0x4AWrT6QoEVVTyh1E39TrCUpTRI7mx9VksGX4awWASxqCYLCV4wBZHAYxA==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-linux-arm@0.33.5':
    resolution: {integrity: sha512-JTS1eldqZbJxjvKaAkxhZmBqPRGmxgu+qFKSInv8moZ2AmT5Yib3EQ1c6gp493HvrvV8QgdOXdyaIBrhvFhBMQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm]
    os: [linux]

  '@img/sharp-linux-s390x@0.33.5':
    resolution: {integrity: sha512-y/5PCd+mP4CA/sPDKl2961b+C9d+vPAveS33s6Z3zfASk2j5upL6fXVPZi7ztePZ5CuH+1kW8JtvxgbuXHRa4Q==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [s390x]
    os: [linux]

  '@img/sharp-linux-x64@0.33.5':
    resolution: {integrity: sha512-opC+Ok5pRNAzuvq1AG0ar+1owsu842/Ab+4qvU879ippJBHvyY5n2mxF1izXqkPYlGuP/M556uh53jRLJmzTWA==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [linux]

  '@img/sharp-linuxmusl-arm64@0.33.5':
    resolution: {integrity: sha512-XrHMZwGQGvJg2V/oRSUfSAfjfPxO+4DkiRh6p2AFjLQztWUuY/o8Mq0eMQVIY7HJ1CDQUJlxGGZRw1a5bqmd1g==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-linuxmusl-x64@0.33.5':
    resolution: {integrity: sha512-WT+d/cgqKkkKySYmqoZ8y3pxx7lx9vVejxW/W4DOFMYVSkErR+w7mf2u8m/y4+xHe7yY9DAXQMWQhpnMuFfScw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [linux]

  '@img/sharp-wasm32@0.33.5':
    resolution: {integrity: sha512-ykUW4LVGaMcU9lu9thv85CbRMAwfeadCJHRsg2GmeRa/cJxsVY9Rbd57JcMxBkKHag5U/x7TSBpScF4U8ElVzg==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [wasm32]

  '@img/sharp-win32-ia32@0.33.5':
    resolution: {integrity: sha512-T36PblLaTwuVJ/zw/LaH0PdZkRz5rd3SmMHX8GSmR7vtNSP5Z6bQkExdSK7xGWyxLw4sUknBuugTelgw2faBbQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [ia32]
    os: [win32]

  '@img/sharp-win32-x64@0.33.5':
    resolution: {integrity: sha512-MpY/o8/8kj+EcnxwvrP4aTJSWw/aZ7JIGR4aBeZkZw5B7/Jn+tY9/VNwtcoGmdT7GfggGIU4kygOMSbYnOrAbg==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [win32]

  '@isaacs/fs-minipass@4.0.1':
    resolution: {integrity: sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==}
    engines: {node: '>=18.0.0'}

  '@jridgewell/gen-mapping@0.3.13':
    resolution: {integrity: sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==}

  '@jridgewell/remapping@2.3.5':
    resolution: {integrity: sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==}

  '@jridgewell/resolve-uri@3.1.2':
    resolution: {integrity: sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==}
    engines: {node: '>=6.0.0'}

  '@jridgewell/sourcemap-codec@1.5.5':
    resolution: {integrity: sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==}

  '@jridgewell/trace-mapping@0.3.31':
    resolution: {integrity: sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==}

  '@next/env@15.2.4':
    resolution: {integrity: sha512-+SFtMgoiYP3WoSswuNmxJOCwi06TdWE733D+WPjpXIe4LXGULwEaofiiAy6kbS0+XjM5xF5n3lKuBwN2SnqD9g==}

  '@next/swc-darwin-arm64@15.2.4':
    resolution: {integrity: sha512-1AnMfs655ipJEDC/FHkSr0r3lXBgpqKo4K1kiwfUf3iE68rDFXZ1TtHdMvf7D0hMItgDZ7Vuq3JgNMbt/+3bYw==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [darwin]

  '@next/swc-darwin-x64@15.2.4':
    resolution: {integrity: sha512-3qK2zb5EwCwxnO2HeO+TRqCubeI/NgCe+kL5dTJlPldV/uwCnUgC7VbEzgmxbfrkbjehL4H9BPztWOEtsoMwew==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [darwin]

  '@next/swc-linux-arm64-gnu@15.2.4':
    resolution: {integrity: sha512-HFN6GKUcrTWvem8AZN7tT95zPb0GUGv9v0d0iyuTb303vbXkkbHDp/DxufB04jNVD+IN9yHy7y/6Mqq0h0YVaQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@next/swc-linux-arm64-musl@15.2.4':
    resolution: {integrity: sha512-Oioa0SORWLwi35/kVB8aCk5Uq+5/ZIumMK1kJV+jSdazFm2NzPDztsefzdmzzpx5oGCJ6FkUC7vkaUseNTStNA==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@next/swc-linux-x64-gnu@15.2.4':
    resolution: {integrity: sha512-yb5WTRaHdkgOqFOZiu6rHV1fAEK0flVpaIN2HB6kxHVSy/dIajWbThS7qON3W9/SNOH2JWkVCyulgGYekMePuw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@next/swc-linux-x64-musl@15.2.4':
    resolution: {integrity: sha512-Dcdv/ix6srhkM25fgXiyOieFUkz+fOYkHlydWCtB0xMST6X9XYI3yPDKBZt1xuhOytONsIFJFB08xXYsxUwJLw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@next/swc-win32-arm64-msvc@15.2.4':
    resolution: {integrity: sha512-dW0i7eukvDxtIhCYkMrZNQfNicPDExt2jPb9AZPpL7cfyUo7QSNl1DjsHjmmKp6qNAqUESyT8YFl/Aw91cNJJg==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [win32]

  '@next/swc-win32-x64-msvc@15.2.4':
    resolution: {integrity: sha512-SbnWkJmkS7Xl3kre8SdMF6F/XDh1DTFEhp0jRTj/uB8iPKoU2bb2NDfcu+iifv1+mxQEd1g2vvSxcZbXSKyWiQ==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [win32]

  '@polka/url@1.0.0-next.29':
    resolution: {integrity: sha512-wwQAWhWSuHaag8c4q/KN/vCoeOJYshAIvMQwD4GpSb3OiZklFfvAgmj0VCBBImRpuF/aFgIRzllXlVX93Jevww==}

  '@radix-ui/number@1.1.0':
    resolution: {integrity: sha512-V3gRzhVNU1ldS5XhAPTom1fOIo4ccrjjJgmE+LI2h/WaFpHmx0MQApT+KZHnx8abG6Avtfcz4WoEciMnpFT3HQ==}

  '@radix-ui/number@1.1.1':
    resolution: {integrity: sha512-MkKCwxlXTgz6CFoJx3pCwn07GKp36+aZyu/u2Ln2VrA5DcdyCZkASEDBTd8x5whTQQL5CiYf4prXKLcgQdv29g==}

  '@radix-ui/primitive@1.1.1':
    resolution: {integrity: sha512-SJ31y+Q/zAyShtXJc8x83i9TYdbAfHZ++tUZnvjJJqFjzsdUnKsxPL6IEtBlxKkU7yzer//GQtZSV4GbldL3YA==}

  '@radix-ui/primitive@1.1.3':
    resolution: {integrity: sha512-JTF99U/6XIjCBo0wqkU5sK10glYe27MRRsfwoiq5zzOEZLHU3A3KCMa5X/azekYRCJ0HlwI0crAXS/5dEHTzDg==}

  '@radix-ui/react-accordion@1.2.2':
    resolution: {integrity: sha512-b1oh54x4DMCdGsB4/7ahiSrViXxaBwRPotiZNnYXjLha9vfuURSAZErki6qjDoSIV0eXx5v57XnTGVtGwnfp2g==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-alert-dialog@1.1.4':
    resolution: {integrity: sha512-A6Kh23qZDLy3PSU4bh2UJZznOrUdHImIXqF8YtUa6CN73f8EOO9XlXSCd9IHyPvIquTaa/kwaSWzZTtUvgXVGw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-arrow@1.1.1':
    resolution: {integrity: sha512-NaVpZfmv8SKeZbn4ijN2V3jlHA9ngBG16VnIIm22nUR0Yk8KUALyBxT3KYEUnNuch9sTE8UTsS3whzBgKOL30w==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-arrow@1.1.7':
    resolution: {integrity: sha512-F+M1tLhO+mlQaOWspE8Wstg+z6PwxwRd8oQ8IXceWz92kfAmalTRf0EjrouQeo7QssEPfCn05B4Ihs1K9WQ/7w==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-aspect-ratio@1.1.1':
    resolution: {integrity: sha512-kNU4FIpcFMBLkOUcgeIteH06/8JLBcYY6Le1iKenDGCYNYFX3TQqCZjzkOsz37h7r94/99GTb7YhEr98ZBJibw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-avatar@1.1.2':
    resolution: {integrity: sha512-GaC7bXQZ5VgZvVvsJ5mu/AEbjYLnhhkoidOboC50Z6FFlLA03wG2ianUoH+zgDQ31/9gCF59bE4+2bBgTyMiig==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-checkbox@1.1.3':
    resolution: {integrity: sha512-HD7/ocp8f1B3e6OHygH0n7ZKjONkhciy1Nh0yuBgObqThc3oyx+vuMfFHKAknXRHHWVE9XvXStxJFyjUmB8PIw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-collapsible@1.1.2':
    resolution: {integrity: sha512-PliMB63vxz7vggcyq0IxNYk8vGDrLXVWw4+W4B8YnwI1s18x7YZYqlG9PLX7XxAJUi0g2DxP4XKJMFHh/iVh9A==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-collection@1.1.1':
    resolution: {integrity: sha512-LwT3pSho9Dljg+wY2KN2mrrh6y3qELfftINERIzBUO9e0N+t0oMTyn3k9iv+ZqgrwGkRnLpNJrsMv9BZlt2yuA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-collection@1.1.7':
    resolution: {integrity: sha512-Fh9rGN0MoI4ZFUNyfFVNU4y9LUz93u9/0K+yLgA2bwRojxM8JU1DyvvMBabnZPBgMWREAJvU2jjVzq+LrFUglw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-compose-refs@1.1.1':
    resolution: {integrity: sha512-Y9VzoRDSJtgFMUCoiZBDVo084VQ5hfpXxVE+NgkdNsjiDBByiImMZKKhxMwCbdHvhlENG6a833CbFkOQvTricw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-compose-refs@1.1.2':
    resolution: {integrity: sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-context-menu@2.2.4':
    resolution: {integrity: sha512-ap4wdGwK52rJxGkwukU1NrnEodsUFQIooANKu+ey7d6raQ2biTcEf8za1zr0mgFHieevRTB2nK4dJeN8pTAZGQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-context@1.1.1':
    resolution: {integrity: sha512-UASk9zi+crv9WteK/NU4PLvOoL3OuE6BWVKNF6hPRBtYBDXQ2u5iu3O59zUlJiTVvkyuycnqrztsHVJwcK9K+Q==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-context@1.1.2':
    resolution: {integrity: sha512-jCi/QKUM2r1Ju5a3J64TH2A5SpKAgh0LpknyqdQ4m6DCV0xJ2HG1xARRwNGPQfi1SLdLWZ1OJz6F4OMBBNiGJA==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-dialog@1.1.4':
    resolution: {integrity: sha512-Ur7EV1IwQGCyaAuyDRiOLA5JIUZxELJljF+MbM/2NC0BYwfuRrbpS30BiQBJrVruscgUkieKkqXYDOoByaxIoA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-direction@1.1.0':
    resolution: {integrity: sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-direction@1.1.1':
    resolution: {integrity: sha512-1UEWRX6jnOA2y4H5WczZ44gOOjTEmlqv1uNW4GAJEO5+bauCBhv8snY65Iw5/VOS/ghKN9gr2KjnLKxrsvoMVw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-dismissable-layer@1.1.11':
    resolution: {integrity: sha512-Nqcp+t5cTB8BinFkZgXiMJniQH0PsUt2k51FUhbdfeKvc4ACcG2uQniY/8+h1Yv6Kza4Q7lD7PQV0z0oicE0Mg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-dismissable-layer@1.1.3':
    resolution: {integrity: sha512-onrWn/72lQoEucDmJnr8uczSNTujT0vJnA/X5+3AkChVPowr8n1yvIKIabhWyMQeMvvmdpsvcyDqx3X1LEXCPg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-dropdown-menu@2.1.4':
    resolution: {integrity: sha512-iXU1Ab5ecM+yEepGAWK8ZhMyKX4ubFdCNtol4sT9D0OVErG9PNElfx3TQhjw7n7BC5nFVz68/5//clWy+8TXzA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-focus-guards@1.1.1':
    resolution: {integrity: sha512-pSIwfrT1a6sIoDASCSpFwOasEwKTZWDw/iBdtnqKO7v6FeOzYJ7U53cPzYFVR3geGGXgVHaH+CdngrrAzqUGxg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-focus-guards@1.1.3':
    resolution: {integrity: sha512-0rFg/Rj2Q62NCm62jZw0QX7a3sz6QCQU0LpZdNrJX8byRGaGVTqbrW9jAoIAHyMQqsNpeZ81YgSizOt5WXq0Pw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-focus-scope@1.1.1':
    resolution: {integrity: sha512-01omzJAYRxXdG2/he/+xy+c8a8gCydoQ1yOxnWNcRhrrBW5W+RQJ22EK1SaO8tb3WoUsuEw7mJjBozPzihDFjA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-focus-scope@1.1.7':
    resolution: {integrity: sha512-t2ODlkXBQyn7jkl6TNaw/MtVEVvIGelJDCG41Okq/KwUsJBwQ4XVZsHAVUkK4mBv3ewiAS3PGuUWuY2BoK4ZUw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-hover-card@1.1.4':
    resolution: {integrity: sha512-QSUUnRA3PQ2UhvoCv3eYvMnCAgGQW+sTu86QPuNb+ZMi+ZENd6UWpiXbcWDQ4AEaKF9KKpCHBeaJz9Rw6lRlaQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-id@1.1.0':
    resolution: {integrity: sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-id@1.1.1':
    resolution: {integrity: sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-label@2.1.1':
    resolution: {integrity: sha512-UUw5E4e/2+4kFMH7+YxORXGWggtY6sM8WIwh5RZchhLuUg2H1hc98Py+pr8HMz6rdaYrK2t296ZEjYLOCO5uUw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-menu@2.1.4':
    resolution: {integrity: sha512-BnOgVoL6YYdHAG6DtXONaR29Eq4nvbi8rutrV/xlr3RQCMMb3yqP85Qiw/3NReozrSW+4dfLkK+rc1hb4wPU/A==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-menubar@1.1.4':
    resolution: {integrity: sha512-+KMpi7VAZuB46+1LD7a30zb5IxyzLgC8m8j42gk3N4TUCcViNQdX8FhoH1HDvYiA8quuqcek4R4bYpPn/SY1GA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-navigation-menu@1.2.3':
    resolution: {integrity: sha512-IQWAsQ7dsLIYDrn0WqPU+cdM7MONTv9nqrLVYoie3BPiabSfUVDe6Fr+oEt0Cofsr9ONDcDe9xhmJbL1Uq1yKg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-popover@1.1.4':
    resolution: {integrity: sha512-aUACAkXx8LaFymDma+HQVji7WhvEhpFJ7+qPz17Nf4lLZqtreGOFRiNQWQmhzp7kEWg9cOyyQJpdIMUMPc/CPw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-popper@1.2.1':
    resolution: {integrity: sha512-3kn5Me69L+jv82EKRuQCXdYyf1DqHwD2U/sxoNgBGCB7K9TRc3bQamQ+5EPM9EvyPdli0W41sROd+ZU1dTCztw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-popper@1.2.8':
    resolution: {integrity: sha512-0NJQ4LFFUuWkE7Oxf0htBKS6zLkkjBH+hM1uk7Ng705ReR8m/uelduy1DBo0PyBXPKVnBA6YBlU94MBGXrSBCw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-portal@1.1.3':
    resolution: {integrity: sha512-NciRqhXnGojhT93RPyDaMPfLH3ZSl4jjIFbZQ1b/vxvZEdHsBZ49wP9w8L3HzUQwep01LcWtkUvm0OVB5JAHTw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-portal@1.1.9':
    resolution: {integrity: sha512-bpIxvq03if6UNwXZ+HTK71JLh4APvnXntDc6XOX8UVq4XQOVl7lwok0AvIl+b8zgCw3fSaVTZMpAPPagXbKmHQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-presence@1.1.2':
    resolution: {integrity: sha512-18TFr80t5EVgL9x1SwF/YGtfG+l0BS0PRAlCWBDoBEiDQjeKgnNZRVJp/oVBl24sr3Gbfwc/Qpj4OcWTQMsAEg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-primitive@2.0.1':
    resolution: {integrity: sha512-sHCWTtxwNn3L3fH8qAfnF3WbUZycW93SM1j3NFDzXBiz8D6F5UTTy8G1+WFEaiCdvCVRJWj6N2R4Xq6HdiHmDg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-primitive@2.1.3':
    resolution: {integrity: sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-progress@1.1.1':
    resolution: {integrity: sha512-6diOawA84f/eMxFHcWut0aE1C2kyE9dOyCTQOMRR2C/qPiXz/X0SaiA/RLbapQaXUCmy0/hLMf9meSccD1N0pA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-radio-group@1.2.2':
    resolution: {integrity: sha512-E0MLLGfOP0l8P/NxgVzfXJ8w3Ch8cdO6UDzJfDChu4EJDy+/WdO5LqpdY8PYnCErkmZH3gZhDL1K7kQ41fAHuQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-roving-focus@1.1.1':
    resolution: {integrity: sha512-QE1RoxPGJ/Nm8Qmk0PxP8ojmoaS67i0s7hVssS7KuI2FQoc/uzVlZsqKfQvxPE6D8hICCPHJ4D88zNhT3OOmkw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-scroll-area@1.2.2':
    resolution: {integrity: sha512-EFI1N/S3YxZEW/lJ/H1jY3njlvTd8tBmgKEn4GHi51+aMm94i6NmAJstsm5cu3yJwYqYc93gpCPm21FeAbFk6g==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-select@2.2.6':
    resolution: {integrity: sha512-I30RydO+bnn2PQztvo25tswPH+wFBjehVGtmagkU78yMdwTwVf12wnAOF+AeP8S2N8xD+5UPbGhkUfPyvT+mwQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-separator@1.1.1':
    resolution: {integrity: sha512-RRiNRSrD8iUiXriq/Y5n4/3iE8HzqgLHsusUSg5jVpU2+3tqcUFPJXHDymwEypunc2sWxDUS3UC+rkZRlHedsw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-slider@1.2.2':
    resolution: {integrity: sha512-sNlU06ii1/ZcbHf8I9En54ZPW0Vil/yPVg4vQMcFNjrIx51jsHbFl1HYHQvCIWJSr1q0ZmA+iIs/ZTv8h7HHSA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-slot@1.1.1':
    resolution: {integrity: sha512-RApLLOcINYJA+dMVbOju7MYv1Mb2EBp2nH4HdDzXTSyaR5optlm6Otrz1euW3HbdOR8UmmFK06TD+A9frYWv+g==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-slot@1.2.3':
    resolution: {integrity: sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-switch@1.1.2':
    resolution: {integrity: sha512-zGukiWHjEdBCRyXvKR6iXAQG6qXm2esuAD6kDOi9Cn+1X6ev3ASo4+CsYaD6Fov9r/AQFekqnD/7+V0Cs6/98g==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-tabs@1.1.2':
    resolution: {integrity: sha512-9u/tQJMcC2aGq7KXpGivMm1mgq7oRJKXphDwdypPd/j21j/2znamPU8WkXgnhUaTrSFNIt8XhOyCAupg8/GbwQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-toast@1.2.4':
    resolution: {integrity: sha512-Sch9idFJHJTMH9YNpxxESqABcAFweJG4tKv+0zo0m5XBvUSL8FM5xKcJLFLXononpePs8IclyX1KieL5SDUNgA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-toggle-group@1.1.1':
    resolution: {integrity: sha512-OgDLZEA30Ylyz8YSXvnGqIHtERqnUt1KUYTKdw/y8u7Ci6zGiJfXc02jahmcSNK3YcErqioj/9flWC9S1ihfwg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-toggle@1.1.1':
    resolution: {integrity: sha512-i77tcgObYr743IonC1hrsnnPmszDRn8p+EGUsUt+5a/JFn28fxaM88Py6V2mc8J5kELMWishI0rLnuGLFD/nnQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-tooltip@1.1.6':
    resolution: {integrity: sha512-TLB5D8QLExS1uDn7+wH/bjEmRurNMTzNrtq7IjaS4kjion9NtzsTGkvR5+i7yc9q01Pi2KMM2cN3f8UG4IvvXA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-use-callback-ref@1.1.0':
    resolution: {integrity: sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-callback-ref@1.1.1':
    resolution: {integrity: sha512-FkBMwD+qbGQeMu1cOHnuGB6x4yzPjho8ap5WtbEJ26umhgqVXbhekKUQO+hZEL1vU92a3wHwdp0HAcqAUF5iDg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-controllable-state@1.1.0':
    resolution: {integrity: sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-controllable-state@1.2.2':
    resolution: {integrity: sha512-BjasUjixPFdS+NKkypcyyN5Pmg83Olst0+c6vGov0diwTEo6mgdqVR6hxcEgFuh4QrAs7Rc+9KuGJ9TVCj0Zzg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-effect-event@0.0.2':
    resolution: {integrity: sha512-Qp8WbZOBe+blgpuUT+lw2xheLP8q0oatc9UpmiemEICxGvFLYmHm9QowVZGHtJlGbS6A6yJ3iViad/2cVjnOiA==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-escape-keydown@1.1.0':
    resolution: {integrity: sha512-L7vwWlR1kTTQ3oh7g1O0CBF3YCyyTj8NmhLR+phShpyA50HCfBFKVJTpshm9PzLiKmehsrQzTYTpX9HvmC9rhw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-escape-keydown@1.1.1':
    resolution: {integrity: sha512-Il0+boE7w/XebUHyBjroE+DbByORGR9KKmITzbR7MyQ4akpORYP/ZmbhAr0DG7RmmBqoOnZdy2QlvajJ2QA59g==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-layout-effect@1.1.0':
    resolution: {integrity: sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-layout-effect@1.1.1':
    resolution: {integrity: sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-previous@1.1.0':
    resolution: {integrity: sha512-Z/e78qg2YFnnXcW88A4JmTtm4ADckLno6F7OXotmkQfeuCVaKuYzqAATPhVzl3delXE7CxIV8shofPn3jPc5Og==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-previous@1.1.1':
    resolution: {integrity: sha512-2dHfToCj/pzca2Ck724OZ5L0EVrr3eHRNsG/b3xQJLA2hZpVCS99bLAX+hm1IHXDEnzU6by5z/5MIY794/a8NQ==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-rect@1.1.0':
    resolution: {integrity: sha512-0Fmkebhr6PiseyZlYAOtLS+nb7jLmpqTrJyv61Pe68MKYW6OWdRE2kI70TaYY27u7H0lajqM3hSMMLFq18Z7nQ==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-rect@1.1.1':
    resolution: {integrity: sha512-QTYuDesS0VtuHNNvMh+CjlKJ4LJickCMUAqjlE3+j8w+RlRpwyX3apEQKGFzbZGdo7XNG1tXa+bQqIE7HIXT2w==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-size@1.1.0':
    resolution: {integrity: sha512-XW3/vWuIXHa+2Uwcc2ABSfcCledmXhhQPlGbfcRXbiUQI5Icjcg19BGCZVKKInYbvUCut/ufbbLLPFC5cbb1hw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-size@1.1.1':
    resolution: {integrity: sha512-ewrXRDTAqAXlkl6t/fkXWNAhFX9I+CkKlw6zjEwk86RSPKwZr3xpBRso655aqYafwtnbpHLj6toFzmd6xdVptQ==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-visually-hidden@1.1.1':
    resolution: {integrity: sha512-vVfA2IZ9q/J+gEamvj761Oq1FpWgCDaNOOIfbPVp2MVPLEomUr5+Vf7kJGwQ24YxZSlQVar7Bes8kyTo5Dshpg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-visually-hidden@1.2.3':
    resolution: {integrity: sha512-pzJq12tEaaIhqjbzpCuv/OypJY/BPavOofm+dbab+MHLajy277+1lLm6JFcGgF5eskJ6mquGirhXY2GD/8u8Ug==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/rect@1.1.0':
    resolution: {integrity: sha512-A9+lCBZoaMJlVKcRBz2YByCG+Cp2t6nAnMnNba+XiWxnj6r4JUFqfsgwocMBZU9LPtdxC6wB56ySYpc7LQIoJg==}

  '@radix-ui/rect@1.1.1':
    resolution: {integrity: sha512-HPwpGIzkl28mWyZqG52jiqDJ12waP11Pa1lGoiyUkIEuMLBP0oeK/C89esbXrxsky5we7dfd8U58nm0SgAWpVw==}

  '@remix-run/react@2.17.0':
    resolution: {integrity: sha512-muOLHqcimMCrIk6VOuqIn51P3buYjKpdYc6qpNy6zE5HlKfyaKEY00a5pzdutRmevYTQy7FiEF/LK4M8sxk70Q==}
    engines: {node: '>=18.0.0'}
    peerDependencies:
      react: ^18.0.0
      react-dom: ^18.0.0
      typescript: ^5.1.0
    peerDependenciesMeta:
      typescript:
        optional: true

  '@remix-run/router@1.23.0':
    resolution: {integrity: sha512-O3rHJzAQKamUz1fvE0Qaw0xSFqsA/yafi2iqeE0pvdFtCO1viYx8QL6f3Ln/aCCTLxs68SLf0KPM9eSeM8yBnA==}
    engines: {node: '>=14.0.0'}

  '@remix-run/server-runtime@2.17.0':
    resolution: {integrity: sha512-X0zfGLgvukhuTIL0tdWKnlvHy4xUe7Z17iQ0KMQoITK0SkTZPSud/6cJCsKhPqC8kfdYT1GNFLJKRhHz7Aapmw==}
    engines: {node: '>=18.0.0'}
    peerDependencies:
      typescript: ^5.1.0
    peerDependenciesMeta:
      typescript:
        optional: true

  '@rollup/rollup-android-arm-eabi@4.50.1':
    resolution: {integrity: sha512-HJXwzoZN4eYTdD8bVV22DN8gsPCAj3V20NHKOs8ezfXanGpmVPR7kalUHd+Y31IJp9stdB87VKPFbsGY3H/2ag==}
    cpu: [arm]
    os: [android]

  '@rollup/rollup-android-arm64@4.50.1':
    resolution: {integrity: sha512-PZlsJVcjHfcH53mOImyt3bc97Ep3FJDXRpk9sMdGX0qgLmY0EIWxCag6EigerGhLVuL8lDVYNnSo8qnTElO4xw==}
    cpu: [arm64]
    os: [android]

  '@rollup/rollup-darwin-arm64@4.50.1':
    resolution: {integrity: sha512-xc6i2AuWh++oGi4ylOFPmzJOEeAa2lJeGUGb4MudOtgfyyjr4UPNK+eEWTPLvmPJIY/pgw6ssFIox23SyrkkJw==}
    cpu: [arm64]
    os: [darwin]

  '@rollup/rollup-darwin-x64@4.50.1':
    resolution: {integrity: sha512-2ofU89lEpDYhdLAbRdeyz/kX3Y2lpYc6ShRnDjY35bZhd2ipuDMDi6ZTQ9NIag94K28nFMofdnKeHR7BT0CATw==}
    cpu: [x64]
    os: [darwin]

  '@rollup/rollup-freebsd-arm64@4.50.1':
    resolution: {integrity: sha512-wOsE6H2u6PxsHY/BeFHA4VGQN3KUJFZp7QJBmDYI983fgxq5Th8FDkVuERb2l9vDMs1D5XhOrhBrnqcEY6l8ZA==}
    cpu: [arm64]
    os: [freebsd]

  '@rollup/rollup-freebsd-x64@4.50.1':
    resolution: {integrity: sha512-A/xeqaHTlKbQggxCqispFAcNjycpUEHP52mwMQZUNqDUJFFYtPHCXS1VAG29uMlDzIVr+i00tSFWFLivMcoIBQ==}
    cpu: [x64]
    os: [freebsd]

  '@rollup/rollup-linux-arm-gnueabihf@4.50.1':
    resolution: {integrity: sha512-54v4okehwl5TaSIkpp97rAHGp7t3ghinRd/vyC1iXqXMfjYUTm7TfYmCzXDoHUPTTf36L8pr0E7YsD3CfB3ZDg==}
    cpu: [arm]
    os: [linux]

  '@rollup/rollup-linux-arm-musleabihf@4.50.1':
    resolution: {integrity: sha512-p/LaFyajPN/0PUHjv8TNyxLiA7RwmDoVY3flXHPSzqrGcIp/c2FjwPPP5++u87DGHtw+5kSH5bCJz0mvXngYxw==}
    cpu: [arm]
    os: [linux]

  '@rollup/rollup-linux-arm64-gnu@4.50.1':
    resolution: {integrity: sha512-2AbMhFFkTo6Ptna1zO7kAXXDLi7H9fGTbVaIq2AAYO7yzcAsuTNWPHhb2aTA6GPiP+JXh85Y8CiS54iZoj4opw==}
    cpu: [arm64]
    os: [linux]

  '@rollup/rollup-linux-arm64-musl@4.50.1':
    resolution: {integrity: sha512-Cgef+5aZwuvesQNw9eX7g19FfKX5/pQRIyhoXLCiBOrWopjo7ycfB292TX9MDcDijiuIJlx1IzJz3IoCPfqs9w==}
    cpu: [arm64]
    os: [linux]

  '@rollup/rollup-linux-loongarch64-gnu@4.50.1':
    resolution: {integrity: sha512-RPhTwWMzpYYrHrJAS7CmpdtHNKtt2Ueo+BlLBjfZEhYBhK00OsEqM08/7f+eohiF6poe0YRDDd8nAvwtE/Y62Q==}
    cpu: [loong64]
    os: [linux]

  '@rollup/rollup-linux-ppc64-gnu@4.50.1':
    resolution: {integrity: sha512-eSGMVQw9iekut62O7eBdbiccRguuDgiPMsw++BVUg+1K7WjZXHOg/YOT9SWMzPZA+w98G+Fa1VqJgHZOHHnY0Q==}
    cpu: [ppc64]
    os: [linux]

  '@rollup/rollup-linux-riscv64-gnu@4.50.1':
    resolution: {integrity: sha512-S208ojx8a4ciIPrLgazF6AgdcNJzQE4+S9rsmOmDJkusvctii+ZvEuIC4v/xFqzbuP8yDjn73oBlNDgF6YGSXQ==}
    cpu: [riscv64]
    os: [linux]

  '@rollup/rollup-linux-riscv64-musl@4.50.1':
    resolution: {integrity: sha512-3Ag8Ls1ggqkGUvSZWYcdgFwriy2lWo+0QlYgEFra/5JGtAd6C5Hw59oojx1DeqcA2Wds2ayRgvJ4qxVTzCHgzg==}
    cpu: [riscv64]
    os: [linux]

  '@rollup/rollup-linux-s390x-gnu@4.50.1':
    resolution: {integrity: sha512-t9YrKfaxCYe7l7ldFERE1BRg/4TATxIg+YieHQ966jwvo7ddHJxPj9cNFWLAzhkVsbBvNA4qTbPVNsZKBO4NSg==}
    cpu: [s390x]
    os: [linux]

  '@rollup/rollup-linux-x64-gnu@4.50.1':
    resolution: {integrity: sha512-MCgtFB2+SVNuQmmjHf+wfI4CMxy3Tk8XjA5Z//A0AKD7QXUYFMQcns91K6dEHBvZPCnhJSyDWLApk40Iq/H3tA==}
    cpu: [x64]
    os: [linux]

  '@rollup/rollup-linux-x64-musl@4.50.1':
    resolution: {integrity: sha512-nEvqG+0jeRmqaUMuwzlfMKwcIVffy/9KGbAGyoa26iu6eSngAYQ512bMXuqqPrlTyfqdlB9FVINs93j534UJrg==}
    cpu: [x64]
    os: [linux]

  '@rollup/rollup-openharmony-arm64@4.50.1':
    resolution: {integrity: sha512-RDsLm+phmT3MJd9SNxA9MNuEAO/J2fhW8GXk62G/B4G7sLVumNFbRwDL6v5NrESb48k+QMqdGbHgEtfU0LCpbA==}
    cpu: [arm64]
    os: [openharmony]

  '@rollup/rollup-win32-arm64-msvc@4.50.1':
    resolution: {integrity: sha512-hpZB/TImk2FlAFAIsoElM3tLzq57uxnGYwplg6WDyAxbYczSi8O2eQ+H2Lx74504rwKtZ3N2g4bCUkiamzS6TQ==}
    cpu: [arm64]
    os: [win32]

  '@rollup/rollup-win32-ia32-msvc@4.50.1':
    resolution: {integrity: sha512-SXjv8JlbzKM0fTJidX4eVsH+Wmnp0/WcD8gJxIZyR6Gay5Qcsmdbi9zVtnbkGPG8v2vMR1AD06lGWy5FLMcG7A==}
    cpu: [ia32]
    os: [win32]

  '@rollup/rollup-win32-x64-msvc@4.50.1':
    resolution: {integrity: sha512-StxAO/8ts62KZVRAm4JZYq9+NqNsV7RvimNK+YM7ry//zebEH6meuugqW/P5OFUCjyQgui+9fUxT6d5NShvMvA==}
    cpu: [x64]
    os: [win32]

  '@standard-schema/spec@1.0.0':
    resolution: {integrity: sha512-m2bOd0f2RT9k8QJx1JN85cZYyH1RqFBdlwtkSlf4tBDYLCiiZnv1fIIwacK6cqwXavOydf0NPToMQgpKq+dVlA==}

  '@sveltejs/acorn-typescript@1.0.5':
    resolution: {integrity: sha512-IwQk4yfwLdibDlrXVE04jTZYlLnwsTT2PIOQQGNLWfjavGifnk1JD1LcZjZaBTRcxZu2FfPfNLOE04DSu9lqtQ==}
    peerDependencies:
      acorn: ^8.9.0

  '@sveltejs/kit@2.39.0':
    resolution: {integrity: sha512-8yZpfCfv9FQfJUBxtD8XMS+T/+ls5xdPZvMwKg4qNS9fmzfWsah3Dz8IR5cmbXtCzHkgr0j/+v6zq5Fk4IuTBA==}
    engines: {node: '>=18.13'}
    hasBin: true
    peerDependencies:
      '@opentelemetry/api': ^1.0.0
      '@sveltejs/vite-plugin-svelte': ^3.0.0 || ^4.0.0-next.1 || ^5.0.0 || ^6.0.0-next.0
      svelte: ^4.0.0 || ^5.0.0-next.0
      vite: ^5.0.3 || ^6.0.0 || ^7.0.0-beta.0
    peerDependenciesMeta:
      '@opentelemetry/api':
        optional: true

  '@sveltejs/vite-plugin-svelte-inspector@5.0.1':
    resolution: {integrity: sha512-ubWshlMk4bc8mkwWbg6vNvCeT7lGQojE3ijDh3QTR6Zr/R+GXxsGbyH4PExEPpiFmqPhYiVSVmHBjUcVc1JIrA==}
    engines: {node: ^20.19 || ^22.12 || >=24}
    peerDependencies:
      '@sveltejs/vite-plugin-svelte': ^6.0.0-next.0
      svelte: ^5.0.0
      vite: ^6.3.0 || ^7.0.0

  '@sveltejs/vite-plugin-svelte@6.2.0':
    resolution: {integrity: sha512-nJsV36+o7rZUDlrnSduMNl11+RoDE1cKqOI0yUEBCcqFoAZOk47TwD3dPKS2WmRutke9StXnzsPBslY7prDM9w==}
    engines: {node: ^20.19 || ^22.12 || >=24}
    peerDependencies:
      svelte: ^5.0.0
      vite: ^6.3.0 || ^7.0.0

  '@swc/counter@0.1.3':
    resolution: {integrity: sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==}

  '@swc/helpers@0.5.15':
    resolution: {integrity: sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==}

  '@tailwindcss/node@4.1.9':
    resolution: {integrity: sha512-ZFsgw6lbtcZKYPWvf6zAuCVSuer7UQ2Z5P8BETHcpA4x/3NwOjAIXmRnYfG77F14f9bPeuR4GaNz3ji1JkQMeQ==}

  '@tailwindcss/oxide-android-arm64@4.1.9':
    resolution: {integrity: sha512-X4mBUUJ3DPqODhtdT5Ju55feJwBN+hP855Z7c0t11Jzece9KRtdM41ljMrCcureKMh96mcOh2gxahkp1yE+BOQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [android]

  '@tailwindcss/oxide-darwin-arm64@4.1.9':
    resolution: {integrity: sha512-jnWnqz71ZLXUbJLW53m9dSQakLBfaWxAd9TAibimrNdQfZKyie+xGppdDCZExtYwUdflt3kOT9y1JUgYXVEQmw==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [darwin]

  '@tailwindcss/oxide-darwin-x64@4.1.9':
    resolution: {integrity: sha512-+Ui6LlvZ6aCPvSwv3l16nYb6gu1N6RamFz7hSu5aqaiPrDQqD1LPT/e8r2/laSVwFjRyOZxQQ/gvGxP3ihA2rw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [darwin]

  '@tailwindcss/oxide-freebsd-x64@4.1.9':
    resolution: {integrity: sha512-BWqCh0uoXMprwWfG7+oyPW53VCh6G08pxY0IIN/i5DQTpPnCJ4zm2W8neH9kW1v1f6RXP3b2qQjAzrAcnQ5e9w==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [freebsd]

  '@tailwindcss/oxide-linux-arm-gnueabihf@4.1.9':
    resolution: {integrity: sha512-U8itjQb5TVc80aV5Yo+JtKo+qS95CV4XLrKEtSLQFoTD/c9j3jk4WZipYT+9Jxqem29qCMRPxjEZ3s+wTT4XCw==}
    engines: {node: '>= 10'}
    cpu: [arm]
    os: [linux]

  '@tailwindcss/oxide-linux-arm64-gnu@4.1.9':
    resolution: {integrity: sha512-dKlGraoNvyTrR7ovLw3Id9yTwc+l0NYg8bwOkYqk+zltvGns8bPvVr6PH5jATdc75kCGd6kDRmP4p1LwqCnPJQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@tailwindcss/oxide-linux-arm64-musl@4.1.9':
    resolution: {integrity: sha512-qCZ4QTrZaBEgNM13pGjvakdmid1Kw3CUCEQzgVAn64Iud7zSxOGwK1usg+hrwrOfFH7vXZZr8OhzC8fJTRq5NA==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@tailwindcss/oxide-linux-x64-gnu@4.1.9':
    resolution: {integrity: sha512-bmzkAWQjRlY9udmg/a1bOtZpV14ZCdrB74PZrd7Oz/wK62Rk+m9+UV3BsgGfOghyO5Qu5ZDciADzDMZbi9n1+g==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@tailwindcss/oxide-linux-x64-musl@4.1.9':
    resolution: {integrity: sha512-NpvPQsXj1raDHhd+g2SUvZQoTPWfYAsyYo9h4ZqV7EOmR+aj7LCAE5hnXNnrJ5Egy/NiO3Hs7BNpSbsPEOpORg==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@tailwindcss/oxide-wasm32-wasi@4.1.9':
    resolution: {integrity: sha512-G93Yuf3xrpTxDUCSh685d1dvOkqOB0Gy+Bchv9Zy3k+lNw/9SEgsHit50xdvp1/p9yRH2TeDHJeDLUiV4mlTkA==}
    engines: {node: '>=14.0.0'}
    cpu: [wasm32]
    bundledDependencies:
      - '@napi-rs/wasm-runtime'
      - '@emnapi/core'
      - '@emnapi/runtime'
      - '@tybys/wasm-util'
      - '@emnapi/wasi-threads'
      - tslib

  '@tailwindcss/oxide-win32-arm64-msvc@4.1.9':
    resolution: {integrity: sha512-Eq9FZzZe/NPkUiSMY+eY7r5l7msuFlm6wC6lnV11m8885z0vs9zx48AKTfw0UbVecTRV5wMxKb3Kmzx2LoUIWg==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [win32]

  '@tailwindcss/oxide-win32-x64-msvc@4.1.9':
    resolution: {integrity: sha512-oZ4zkthMXMJN2w/vu3jEfuqWTW7n8giGYDV/SfhBGRNehNMOBqh3YUAEv+8fv2YDJEzL4JpXTNTiSXW3UiUwBw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [win32]

  '@tailwindcss/oxide@4.1.9':
    resolution: {integrity: sha512-oqjNxOBt1iNRAywjiH+VFsfovx/hVt4mxe0kOkRMAbbcCwbJg5e2AweFqyGN7gtmE1TJXnvnyX7RWTR1l72ciQ==}
    engines: {node: '>= 10'}

  '@tailwindcss/postcss@4.1.9':
    resolution: {integrity: sha512-v3DKzHibZO8ioVDmuVHCW1PR0XSM7nS40EjZFJEA1xPuvTuQPaR5flE1LyikU3hu2u1KNWBtEaSe8qsQjX3tyg==}

  '@types/cookie@0.6.0':
    resolution: {integrity: sha512-4Kh9a6B2bQciAhf7FSuMRRkUWecJgJu9nPnx3yzpsfXX/c50REIqpHY4C82bXP90qrLtXtkDxTZosYO3UpOwlA==}

  '@types/d3-array@3.2.1':
    resolution: {integrity: sha512-Y2Jn2idRrLzUfAKV2LyRImR+y4oa2AntrgID95SHJxuMUrkNXmanDSed71sRNZysveJVt1hLLemQZIady0FpEg==}

  '@types/d3-color@3.1.3':
    resolution: {integrity: sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==}

  '@types/d3-ease@3.0.2':
    resolution: {integrity: sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==}

  '@types/d3-interpolate@3.0.4':
    resolution: {integrity: sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==}

  '@types/d3-path@3.1.1':
    resolution: {integrity: sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==}

  '@types/d3-scale@4.0.9':
    resolution: {integrity: sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==}

  '@types/d3-shape@3.1.7':
    resolution: {integrity: sha512-VLvUQ33C+3J+8p+Daf+nYSOsjB4GXp19/S/aGo60m9h1v6XaxjiT82lKVWJCfzhtuZ3yD7i/TPeC/fuKLLOSmg==}

  '@types/d3-time@3.0.4':
    resolution: {integrity: sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==}

  '@types/d3-timer@3.0.2':
    resolution: {integrity: sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==}

  '@types/estree@1.0.8':
    resolution: {integrity: sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==}

  '@types/node@22.0.0':
    resolution: {integrity: sha512-VT7KSYudcPOzP5Q0wfbowyNLaVR8QWUdw+088uFWwfvpY6uCWaXpqV6ieLAu9WBcnTa7H4Z5RLK8I5t2FuOcqw==}

  '@types/react-dom@19.0.0':
    resolution: {integrity: sha512-1KfiQKsH1o00p9m5ag12axHQSb3FOU9H20UTrujVSkNhuCrRHiQWFqgEnTNK5ZNfnzZv8UWrnXVqCmCF9fgY3w==}

  '@types/react@19.0.0':
    resolution: {integrity: sha512-MY3oPudxvMYyesqs/kW1Bh8y9VqSmf+tzqw3ae8a9DZW68pUe3zAdHeI1jc6iAysuRdACnVknHP8AhwD4/dxtg==}

  '@vercel/analytics@1.5.0':
    resolution: {integrity: sha512-MYsBzfPki4gthY5HnYN7jgInhAZ7Ac1cYDoRWFomwGHWEX7odTEzbtg9kf/QSo7XEsEAqlQugA6gJ2WS2DEa3g==}
    peerDependencies:
      '@remix-run/react': ^2
      '@sveltejs/kit': ^1 || ^2
      next: '>= 13'
      react: ^18 || ^19 || ^19.0.0-rc
      svelte: '>= 4'
      vue: ^3
      vue-router: ^4
    peerDependenciesMeta:
      '@remix-run/react':
        optional: true
      '@sveltejs/kit':
        optional: true
      next:
        optional: true
      react:
        optional: true
      svelte:
        optional: true
      vue:
        optional: true
      vue-router:
        optional: true

  '@vue/compiler-core@3.5.21':
    resolution: {integrity: sha512-8i+LZ0vf6ZgII5Z9XmUvrCyEzocvWT+TeR2VBUVlzIH6Tyv57E20mPZ1bCS+tbejgUgmjrEh7q/0F0bibskAmw==}

  '@vue/compiler-dom@3.5.21':
    resolution: {integrity: sha512-jNtbu/u97wiyEBJlJ9kmdw7tAr5Vy0Aj5CgQmo+6pxWNQhXZDPsRr1UWPN4v3Zf82s2H3kF51IbzZ4jMWAgPlQ==}

  '@vue/compiler-sfc@3.5.21':
    resolution: {integrity: sha512-SXlyk6I5eUGBd2v8Ie7tF6ADHE9kCR6mBEuPyH1nUZ0h6Xx6nZI29i12sJKQmzbDyr2tUHMhhTt51Z6blbkTTQ==}

  '@vue/compiler-ssr@3.5.21':
    resolution: {integrity: sha512-vKQ5olH5edFZdf5ZrlEgSO1j1DMA4u23TVK5XR1uMhvwnYvVdDF0nHXJUblL/GvzlShQbjhZZ2uvYmDlAbgo9w==}

  '@vue/devtools-api@6.6.4':
    resolution: {integrity: sha512-sGhTPMuXqZ1rVOk32RylztWkfXTRhuS7vgAKv0zjqk8gbsHkJ7xfFf+jbySxt7tWObEJwyKaHMikV/WGDiQm8g==}

  '@vue/reactivity@3.5.21':
    resolution: {integrity: sha512-3ah7sa+Cwr9iiYEERt9JfZKPw4A2UlbY8RbbnH2mGCE8NwHkhmlZt2VsH0oDA3P08X3jJd29ohBDtX+TbD9AsA==}

  '@vue/runtime-core@3.5.21':
    resolution: {integrity: sha512-+DplQlRS4MXfIf9gfD1BOJpk5RSyGgGXD/R+cumhe8jdjUcq/qlxDawQlSI8hCKupBlvM+3eS1se5xW+SuNAwA==}

  '@vue/runtime-dom@3.5.21':
    resolution: {integrity: sha512-3M2DZsOFwM5qI15wrMmNF5RJe1+ARijt2HM3TbzBbPSuBHOQpoidE+Pa+XEaVN+czbHf81ETRoG1ltztP2em8w==}

  '@vue/server-renderer@3.5.21':
    resolution: {integrity: sha512-qr8AqgD3DJPJcGvLcJKQo2tAc8OnXRcfxhOJCPF+fcfn5bBGz7VCcO7t+qETOPxpWK1mgysXvVT/j+xWaHeMWA==}
    peerDependencies:
      vue: 3.5.21

  '@vue/shared@3.5.21':
    resolution: {integrity: sha512-+2k1EQpnYuVuu3N7atWyG3/xoFWIVJZq4Mz8XNOdScFI0etES75fbny/oU4lKWk/577P1zmg0ioYvpGEDZ3DLw==}

  '@web3-storage/multipart-parser@1.0.0':
    resolution: {integrity: sha512-BEO6al7BYqcnfX15W2cnGR+Q566ACXAT9UQykORCWW80lmkpWsnEob6zJS1ZVBKsSJC8+7vJkHwlp+lXG1UCdw==}

  acorn@8.15.0:
    resolution: {integrity: sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==}
    engines: {node: '>=0.4.0'}
    hasBin: true

  aria-hidden@1.2.6:
    resolution: {integrity: sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==}
    engines: {node: '>=10'}

  aria-query@5.3.2:
    resolution: {integrity: sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==}
    engines: {node: '>= 0.4'}

  autoprefixer@10.4.20:
    resolution: {integrity: sha512-XY25y5xSv/wEoqzDyXXME4AFfkZI0P23z6Fs3YgymDnKJkCGOnkL0iTxCa85UTqaSgfcqyf3UA6+c7wUvx/16g==}
    engines: {node: ^10 || ^12 || >=14}
    hasBin: true
    peerDependencies:
      postcss: ^8.1.0

  axobject-query@4.1.0:
    resolution: {integrity: sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==}
    engines: {node: '>= 0.4'}

  browserslist@4.25.4:
    resolution: {integrity: sha512-4jYpcjabC606xJ3kw2QwGEZKX0Aw7sgQdZCvIK9dhVSPh76BKo+C+btT1RRofH7B+8iNpEbgGNVWiLki5q93yg==}
    engines: {node: ^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7}
    hasBin: true

  busboy@1.6.0:
    resolution: {integrity: sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==}
    engines: {node: '>=10.16.0'}

  caniuse-lite@1.0.30001741:
    resolution: {integrity: sha512-QGUGitqsc8ARjLdgAfxETDhRbJ0REsP6O3I96TAth/mVjh2cYzN2u+3AzPP3aVSm2FehEItaJw1xd+IGBXWeSw==}

  chownr@3.0.0:
    resolution: {integrity: sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==}
    engines: {node: '>=18'}

  class-variance-authority@0.7.1:
    resolution: {integrity: sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==}

  client-only@0.0.1:
    resolution: {integrity: sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==}

  clsx@2.1.1:
    resolution: {integrity: sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==}
    engines: {node: '>=6'}

  cmdk@1.0.4:
    resolution: {integrity: sha512-AnsjfHyHpQ/EFeAnG216WY7A5LiYCoZzCSygiLvfXC3H3LFGCprErteUcszaVluGOhuOTbJS3jWHrSDYPBBygg==}
    peerDependencies:
      react: ^18 || ^19 || ^19.0.0-rc
      react-dom: ^18 || ^19 || ^19.0.0-rc

  color-convert@2.0.1:
    resolution: {integrity: sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==}
    engines: {node: '>=7.0.0'}

  color-name@1.1.4:
    resolution: {integrity: sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==}

  color-string@1.9.1:
    resolution: {integrity: sha512-shrVawQFojnZv6xM40anx4CkoDP+fZsw/ZerEMsW/pyzsRbElpsL/DBVW7q3ExxwusdNXI3lXpuhEZkzs8p5Eg==}

  color@4.2.3:
    resolution: {integrity: sha512-1rXeuUUiGGrykh+CeBdu5Ie7OJwinCgQY0bc7GCRxy5xVHy+moaqkpL/jqQq0MtQOeYcrqEz4abc5f0KtU7W4A==}
    engines: {node: '>=12.5.0'}

  cookie@0.6.0:
    resolution: {integrity: sha512-U71cyTamuh1CRNCfpGY6to28lxvNwPG4Guz/EVjgf3Jmzv0vlDp1atT9eS5dDjMYHucpHbWns6Lwf3BKz6svdw==}
    engines: {node: '>= 0.6'}

  cookie@0.7.2:
    resolution: {integrity: sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==}
    engines: {node: '>= 0.6'}

  csstype@3.1.3:
    resolution: {integrity: sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==}

  d3-array@3.2.4:
    resolution: {integrity: sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==}
    engines: {node: '>=12'}

  d3-color@3.1.0:
    resolution: {integrity: sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==}
    engines: {node: '>=12'}

  d3-ease@3.0.1:
    resolution: {integrity: sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==}
    engines: {node: '>=12'}

  d3-format@3.1.0:
    resolution: {integrity: sha512-YyUI6AEuY/Wpt8KWLgZHsIU86atmikuoOmCfommt0LYHiQSPjvX2AcFc38PX0CBpr2RCyZhjex+NS/LPOv6YqA==}
    engines: {node: '>=12'}

  d3-interpolate@3.0.1:
    resolution: {integrity: sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==}
    engines: {node: '>=12'}

  d3-path@3.1.0:
    resolution: {integrity: sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==}
    engines: {node: '>=12'}

  d3-scale@4.0.2:
    resolution: {integrity: sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==}
    engines: {node: '>=12'}

  d3-shape@3.2.0:
    resolution: {integrity: sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==}
    engines: {node: '>=12'}

  d3-time-format@4.1.0:
    resolution: {integrity: sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==}
    engines: {node: '>=12'}

  d3-time@3.1.0:
    resolution: {integrity: sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==}
    engines: {node: '>=12'}

  d3-timer@3.0.1:
    resolution: {integrity: sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==}
    engines: {node: '>=12'}

  date-fns-jalali@4.1.0-0:
    resolution: {integrity: sha512-hTIP/z+t+qKwBDcmmsnmjWTduxCg+5KfdqWQvb2X/8C9+knYY6epN/pfxdDuyVlSVeFz0sM5eEfwIUQ70U4ckg==}

  date-fns@4.1.0:
    resolution: {integrity: sha512-Ukq0owbQXxa/U3EGtsdVBkR1w7KOQ5gIBqdH2hkvknzZPYvBxb/aa6E8L7tmjFtkwZBu3UXBbjIgPo/Ez4xaNg==}

  debug@4.4.1:
    resolution: {integrity: sha512-KcKCqiftBJcZr++7ykoDIEwSa3XWowTfNPo92BYxjXiyYEVrUQh2aLyhxBCwww+heortUFxEJYcRzosstTEBYQ==}
    engines: {node: '>=6.0'}
    peerDependencies:
      supports-color: '*'
    peerDependenciesMeta:
      supports-color:
        optional: true

  decimal.js-light@2.5.1:
    resolution: {integrity: sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==}

  deepmerge@4.3.1:
    resolution: {integrity: sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==}
    engines: {node: '>=0.10.0'}

  detect-libc@2.0.4:
    resolution: {integrity: sha512-3UDv+G9CsCKO1WKMGw9fwq/SWJYbI0c5Y7LU1AXYoDdbhE2AHQ6N6Nb34sG8Fj7T5APy8qXDCKuuIHd1BR0tVA==}
    engines: {node: '>=8'}

  detect-node-es@1.1.0:
    resolution: {integrity: sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==}

  devalue@5.3.2:
    resolution: {integrity: sha512-UDsjUbpQn9kvm68slnrs+mfxwFkIflOhkanmyabZ8zOYk8SMEIbJ3TK+88g70hSIeytu4y18f0z/hYHMTrXIWw==}

  dom-helpers@5.2.1:
    resolution: {integrity: sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==}

  electron-to-chromium@1.5.218:
    resolution: {integrity: sha512-uwwdN0TUHs8u6iRgN8vKeWZMRll4gBkz+QMqdS7DDe49uiK68/UX92lFb61oiFPrpYZNeZIqa4bA7O6Aiasnzg==}

  embla-carousel-react@8.5.1:
    resolution: {integrity: sha512-z9Y0K84BJvhChXgqn2CFYbfEi6AwEr+FFVVKm/MqbTQ2zIzO1VQri6w67LcfpVF0AjbhwVMywDZqY4alYkjW5w==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc

  embla-carousel-reactive-utils@8.5.1:
    resolution: {integrity: sha512-n7VSoGIiiDIc4MfXF3ZRTO59KDp820QDuyBDGlt5/65+lumPHxX2JLz0EZ23hZ4eg4vZGUXwMkYv02fw2JVo/A==}
    peerDependencies:
      embla-carousel: 8.5.1

  embla-carousel@8.5.1:
    resolution: {integrity: sha512-JUb5+FOHobSiWQ2EJNaueCNT/cQU9L6XWBbWmorWPQT9bkbk+fhsuLr8wWrzXKagO3oWszBO7MSx+GfaRk4E6A==}

  enhanced-resolve@5.18.3:
    resolution: {integrity: sha512-d4lC8xfavMeBjzGr2vECC3fsGXziXZQyJxD868h2M/mBI3PwAuODxAkLkq5HYuvrPYcUtiLzsTo8U3PgX3Ocww==}
    engines: {node: '>=10.13.0'}

  entities@4.5.0:
    resolution: {integrity: sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==}
    engines: {node: '>=0.12'}

  esbuild@0.25.9:
    resolution: {integrity: sha512-CRbODhYyQx3qp7ZEwzxOk4JBqmD/seJrzPa/cGjY1VtIn5E09Oi9/dB4JwctnfZ8Q8iT7rioVv5k/FNT/uf54g==}
    engines: {node: '>=18'}
    hasBin: true

  escalade@3.2.0:
    resolution: {integrity: sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==}
    engines: {node: '>=6'}

  esm-env@1.2.2:
    resolution: {integrity: sha512-Epxrv+Nr/CaL4ZcFGPJIYLWFom+YeV1DqMLHJoEd9SYRxNbaFruBwfEX/kkHUJf55j2+TUbmDcmuilbP1TmXHA==}

  esrap@2.1.0:
    resolution: {integrity: sha512-yzmPNpl7TBbMRC5Lj2JlJZNPml0tzqoqP5B1JXycNUwtqma9AKCO0M2wHrdgsHcy1WRW7S9rJknAMtByg3usgA==}

  estree-walker@2.0.2:
    resolution: {integrity: sha512-Rfkk/Mp/DL7JVje3u18FxFujQlTNR2q6QfMSMB7AvCBx91NGj/ba3kCfza0f6dVDbw7YlRf/nDrn7pQrCCyQ/w==}

  eventemitter3@4.0.7:
    resolution: {integrity: sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==}

  fast-equals@5.2.2:
    resolution: {integrity: sha512-V7/RktU11J3I36Nwq2JnZEM7tNm17eBJz+u25qdxBZeCKiX6BkVSZQjwWIr+IobgnZy+ag73tTZgZi7tr0LrBw==}
    engines: {node: '>=6.0.0'}

  fdir@6.5.0:
    resolution: {integrity: sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==}
    engines: {node: '>=12.0.0'}
    peerDependencies:
      picomatch: ^3 || ^4
    peerDependenciesMeta:
      picomatch:
        optional: true

  fraction.js@4.3.7:
    resolution: {integrity: sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==}

  framer-motion@12.23.12:
    resolution: {integrity: sha512-6e78rdVtnBvlEVgu6eFEAgG9v3wLnYEboM8I5O5EXvfKC8gxGQB8wXJdhkMy10iVcn05jl6CNw7/HTsTCfwcWg==}
    peerDependencies:
      '@emotion/is-prop-valid': '*'
      react: ^18.0.0 || ^19.0.0
      react-dom: ^18.0.0 || ^19.0.0
    peerDependenciesMeta:
      '@emotion/is-prop-valid':
        optional: true
      react:
        optional: true
      react-dom:
        optional: true

  fsevents@2.3.3:
    resolution: {integrity: sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==}
    engines: {node: ^8.16.0 || ^10.6.0 || >=11.0.0}
    os: [darwin]

  geist@1.5.1:
    resolution: {integrity: sha512-mAHZxIsL2o3ZITFaBVFBnwyDOw+zNLYum6A6nIjpzCGIO8QtC3V76XF2RnZTyLx1wlDTmMDy8jg3Ib52MIjGvQ==}
    peerDependencies:
      next: '>=13.2.0'

  get-nonce@1.0.1:
    resolution: {integrity: sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==}
    engines: {node: '>=6'}

  graceful-fs@4.2.11:
    resolution: {integrity: sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==}

  input-otp@1.4.1:
    resolution: {integrity: sha512-+yvpmKYKHi9jIGngxagY9oWiiblPB7+nEO75F2l2o4vs+6vpPZZmUl4tBNYuTCvQjhvEIbdNeJu70bhfYP2nbw==}
    peerDependencies:
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc

  internmap@2.0.3:
    resolution: {integrity: sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==}
    engines: {node: '>=12'}

  is-arrayish@0.3.2:
    resolution: {integrity: sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ==}

  is-reference@3.0.3:
    resolution: {integrity: sha512-ixkJoqQvAP88E6wLydLGGqCJsrFUnqoH6HnaczB8XmDH1oaWU+xxdptvikTgaEhtZ53Ky6YXiBuUI2WXLMCwjw==}

  jiti@2.5.1:
    resolution: {integrity: sha512-twQoecYPiVA5K/h6SxtORw/Bs3ar+mLUtoPSc7iMXzQzK8d7eJ/R09wmTwAjiamETn1cXYPGfNnu7DMoHgu12w==}
    hasBin: true

  js-tokens@4.0.0:
    resolution: {integrity: sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==}

  kleur@4.1.5:
    resolution: {integrity: sha512-o+NO+8WrRiQEE4/7nwRJhN1HWpVmJm511pBHUxPLtp0BUISzlBplORYSmTclCnJvQq2tKu/sgl3xVpkc7ZWuQQ==}
    engines: {node: '>=6'}

  lightningcss-darwin-arm64@1.30.1:
    resolution: {integrity: sha512-c8JK7hyE65X1MHMN+Viq9n11RRC7hgin3HhYKhrMyaXflk5GVplZ60IxyoVtzILeKr+xAJwg6zK6sjTBJ0FKYQ==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [darwin]

  lightningcss-darwin-x64@1.30.1:
    resolution: {integrity: sha512-k1EvjakfumAQoTfcXUcHQZhSpLlkAuEkdMBsI/ivWw9hL+7FtilQc0Cy3hrx0AAQrVtQAbMI7YjCgYgvn37PzA==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [darwin]

  lightningcss-freebsd-x64@1.30.1:
    resolution: {integrity: sha512-kmW6UGCGg2PcyUE59K5r0kWfKPAVy4SltVeut+umLCFoJ53RdCUWxcRDzO1eTaxf/7Q2H7LTquFHPL5R+Gjyig==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [freebsd]

  lightningcss-linux-arm-gnueabihf@1.30.1:
    resolution: {integrity: sha512-MjxUShl1v8pit+6D/zSPq9S9dQ2NPFSQwGvxBCYaBYLPlCWuPh9/t1MRS8iUaR8i+a6w7aps+B4N0S1TYP/R+Q==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm]
    os: [linux]

  lightningcss-linux-arm64-gnu@1.30.1:
    resolution: {integrity: sha512-gB72maP8rmrKsnKYy8XUuXi/4OctJiuQjcuqWNlJQ6jZiWqtPvqFziskH3hnajfvKB27ynbVCucKSm2rkQp4Bw==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [linux]

  lightningcss-linux-arm64-musl@1.30.1:
    resolution: {integrity: sha512-jmUQVx4331m6LIX+0wUhBbmMX7TCfjF5FoOH6SD1CttzuYlGNVpA7QnrmLxrsub43ClTINfGSYyHe2HWeLl5CQ==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [linux]

  lightningcss-linux-x64-gnu@1.30.1:
    resolution: {integrity: sha512-piWx3z4wN8J8z3+O5kO74+yr6ze/dKmPnI7vLqfSqI8bccaTGY5xiSGVIJBDd5K5BHlvVLpUB3S2YCfelyJ1bw==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [linux]

  lightningcss-linux-x64-musl@1.30.1:
    resolution: {integrity: sha512-rRomAK7eIkL+tHY0YPxbc5Dra2gXlI63HL+v1Pdi1a3sC+tJTcFrHX+E86sulgAXeI7rSzDYhPSeHHjqFhqfeQ==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [linux]

  lightningcss-win32-arm64-msvc@1.30.1:
    resolution: {integrity: sha512-mSL4rqPi4iXq5YVqzSsJgMVFENoa4nGTT/GjO2c0Yl9OuQfPsIfncvLrEW6RbbB24WtZ3xP/2CCmI3tNkNV4oA==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [win32]

  lightningcss-win32-x64-msvc@1.30.1:
    resolution: {integrity: sha512-PVqXh48wh4T53F/1CCu8PIPCxLzWyCnn/9T5W1Jpmdy5h9Cwd+0YQS6/LwhHXSafuc61/xg9Lv5OrCby6a++jg==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [win32]

  lightningcss@1.30.1:
    resolution: {integrity: sha512-xi6IyHML+c9+Q3W0S4fCQJOym42pyurFiJUHEcEyHS0CeKzia4yZDEsLlqOFykxOdHpNy0NmvVO31vcSqAxJCg==}
    engines: {node: '>= 12.0.0'}

  locate-character@3.0.0:
    resolution: {integrity: sha512-SW13ws7BjaeJ6p7Q6CO2nchbYEc3X3J6WrmTTDto7yMPqVSZTUyY5Tjbid+Ab8gLnATtygYtiDIJGQRRn2ZOiA==}

  lodash@4.17.21:
    resolution: {integrity: sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==}

  loose-envify@1.4.0:
    resolution: {integrity: sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==}
    hasBin: true

  lucide-react@0.454.0:
    resolution: {integrity: sha512-hw7zMDwykCLnEzgncEEjHeA6+45aeEzRYuKHuyRSOPkhko+J3ySGjGIzu+mmMfDFG1vazHepMaYFYHbTFAZAAQ==}
    peerDependencies:
      react: ^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc

  magic-string@0.30.19:
    resolution: {integrity: sha512-2N21sPY9Ws53PZvsEpVtNuSW+ScYbQdp4b9qUaL+9QkHUrGFKo56Lg9Emg5s9V/qrtNBmiR01sYhUOwu3H+VOw==}

  minipass@7.1.2:
    resolution: {integrity: sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==}
    engines: {node: '>=16 || 14 >=14.17'}

  minizlib@3.0.2:
    resolution: {integrity: sha512-oG62iEk+CYt5Xj2YqI5Xi9xWUeZhDI8jjQmC5oThVH5JGCTgIjr7ciJDzC7MBzYd//WvR1OTmP5Q38Q8ShQtVA==}
    engines: {node: '>= 18'}

  mkdirp@3.0.1:
    resolution: {integrity: sha512-+NsyUUAZDmo6YVHzL/stxSu3t9YS1iljliy3BSDrXJ/dkn1KYdmtZODGGjLcc9XLgVVpH4KshHB8XmZgMhaBXg==}
    engines: {node: '>=10'}
    hasBin: true

  motion-dom@12.23.12:
    resolution: {integrity: sha512-RcR4fvMCTESQBD/uKQe49D5RUeDOokkGRmz4ceaJKDBgHYtZtntC/s2vLvY38gqGaytinij/yi3hMcWVcEF5Kw==}

  motion-utils@12.23.6:
    resolution: {integrity: sha512-eAWoPgr4eFEOFfg2WjIsMoqJTW6Z8MTUCgn/GZ3VRpClWBdnbjryiA3ZSNLyxCTmCQx4RmYX6jX1iWHbenUPNQ==}

  mri@1.2.0:
    resolution: {integrity: sha512-tzzskb3bG8LvYGFF/mDTpq3jpI6Q9wc3LEmBaghu+DdCssd1FakN7Bc0hVNmEyGq1bq3RgfkCb3cmQLpNPOroA==}
    engines: {node: '>=4'}

  mrmime@2.0.1:
    resolution: {integrity: sha512-Y3wQdFg2Va6etvQ5I82yUhGdsKrcYox6p7FfL1LbK2J4V01F9TGlepTIhnK24t7koZibmg82KGglhA1XK5IsLQ==}
    engines: {node: '>=10'}

  ms@2.1.3:
    resolution: {integrity: sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==}

  nanoid@3.3.11:
    resolution: {integrity: sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==}
    engines: {node: ^10 || ^12 || ^13.7 || ^14 || >=15.0.1}
    hasBin: true

  next-themes@0.4.6:
    resolution: {integrity: sha512-pZvgD5L0IEvX5/9GWyHMf3m8BKiVQwsCMHfoFosXtXBMnaS0ZnIJ9ST4b4NqLVKDEm8QBxoNNGNaBv2JNF6XNA==}
    peerDependencies:
      react: ^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc
      react-dom: ^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc

  next@15.2.4:
    resolution: {integrity: sha512-VwL+LAaPSxEkd3lU2xWbgEOtrM8oedmyhBqaVNmgKB+GvZlCy9rgaEc+y2on0wv+l0oSFqLtYD6dcC1eAedUaQ==}
    engines: {node: ^18.18.0 || ^19.8.0 || >= 20.0.0}
    hasBin: true
    peerDependencies:
      '@opentelemetry/api': ^1.1.0
      '@playwright/test': ^1.41.2
      babel-plugin-react-compiler: '*'
      react: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
      react-dom: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
      sass: ^1.3.0
    peerDependenciesMeta:
      '@opentelemetry/api':
        optional: true
      '@playwright/test':
        optional: true
      babel-plugin-react-compiler:
        optional: true
      sass:
        optional: true

  node-releases@2.0.20:
    resolution: {integrity: sha512-7gK6zSXEH6neM212JgfYFXe+GmZQM+fia5SsusuBIUgnPheLFBmIPhtFoAQRj8/7wASYQnbDlHPVwY0BefoFgA==}

  normalize-range@0.1.2:
    resolution: {integrity: sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==}
    engines: {node: '>=0.10.0'}

  object-assign@4.1.1:
    resolution: {integrity: sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==}
    engines: {node: '>=0.10.0'}

  picocolors@1.1.1:
    resolution: {integrity: sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==}

  picomatch@4.0.3:
    resolution: {integrity: sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==}
    engines: {node: '>=12'}

  postcss-value-parser@4.2.0:
    resolution: {integrity: sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==}

  postcss@8.4.31:
    resolution: {integrity: sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==}
    engines: {node: ^10 || ^12 || >=14}

  postcss@8.5.0:
    resolution: {integrity: sha512-27VKOqrYfPncKA2NrFOVhP5MGAfHKLYn/Q0mz9cNQyRAKYi3VNHwYU2qKKqPCqgBmeeJ0uAFB56NumXZ5ZReXg==}
    engines: {node: ^10 || ^12 || >=14}

  postcss@8.5.6:
    resolution: {integrity: sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==}
    engines: {node: ^10 || ^12 || >=14}

  prop-types@15.8.1:
    resolution: {integrity: sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==}

  react-day-picker@9.8.0:
    resolution: {integrity: sha512-E0yhhg7R+pdgbl/2toTb0xBhsEAtmAx1l7qjIWYfcxOy8w4rTSVfbtBoSzVVhPwKP/5E9iL38LivzoE3AQDhCQ==}
    engines: {node: '>=18'}
    peerDependencies:
      react: '>=16.8.0'

  react-dom@19.0.0:
    resolution: {integrity: sha512-4GV5sHFG0e/0AD4X+ySy6UJd3jVl1iNsNHdpad0qhABJ11twS3TTBnseqsKurKcsNqCEFeGL3uLpVChpIO3QfQ==}
    peerDependencies:
      react: ^19.0.0

  react-hook-form@7.60.0:
    resolution: {integrity: sha512-SBrYOvMbDB7cV8ZfNpaiLcgjH/a1c7aK0lK+aNigpf4xWLO8q+o4tcvVurv3c4EOyzn/3dCsYt4GKD42VvJ/+A==}
    engines: {node: '>=18.0.0'}
    peerDependencies:
      react: ^16.8.0 || ^17 || ^18 || ^19

  react-is@16.13.1:
    resolution: {integrity: sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==}

  react-is@18.3.1:
    resolution: {integrity: sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==}

  react-remove-scroll-bar@2.3.8:
    resolution: {integrity: sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
    peerDependenciesMeta:
      '@types/react':
        optional: true

  react-remove-scroll@2.7.1:
    resolution: {integrity: sha512-HpMh8+oahmIdOuS5aFKKY6Pyog+FNaZV/XyJOq7b4YFwsFHe5yYfdbIalI4k3vU2nSDql7YskmUseHsRrJqIPA==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  react-resizable-panels@2.1.7:
    resolution: {integrity: sha512-JtT6gI+nURzhMYQYsx8DKkx6bSoOGFp7A3CwMrOb8y5jFHFyqwo9m68UhmXRw57fRVJksFn1TSlm3ywEQ9vMgA==}
    peerDependencies:
      react: ^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
      react-dom: ^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc

  react-router-dom@6.30.0:
    resolution: {integrity: sha512-x30B78HV5tFk8ex0ITwzC9TTZMua4jGyA9IUlH1JLQYQTFyxr/ZxwOJq7evg1JX1qGVUcvhsmQSKdPncQrjTgA==}
    engines: {node: '>=14.0.0'}
    peerDependencies:
      react: '>=16.8'
      react-dom: '>=16.8'

  react-router@6.30.0:
    resolution: {integrity: sha512-D3X8FyH9nBcTSHGdEKurK7r8OYE1kKFn3d/CF+CoxbSHkxU7o37+Uh7eAHRXr6k2tSExXYO++07PeXJtA/dEhQ==}
    engines: {node: '>=14.0.0'}
    peerDependencies:
      react: '>=16.8'

  react-smooth@4.0.4:
    resolution: {integrity: sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
      react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  react-style-singleton@2.2.3:
    resolution: {integrity: sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  react-transition-group@4.4.5:
    resolution: {integrity: sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==}
    peerDependencies:
      react: '>=16.6.0'
      react-dom: '>=16.6.0'

  react@19.0.0:
    resolution: {integrity: sha512-V8AVnmPIICiWpGfm6GLzCR/W5FXLchHop40W4nXBmdlEceh16rCN8O8LNWm5bh5XUX91fh7KpA+W0TgMKmgTpQ==}
    engines: {node: '>=0.10.0'}

  recharts-scale@0.4.5:
    resolution: {integrity: sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==}

  recharts@2.15.4:
    resolution: {integrity: sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw==}
    engines: {node: '>=14'}
    peerDependencies:
      react: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
      react-dom: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  rollup@4.50.1:
    resolution: {integrity: sha512-78E9voJHwnXQMiQdiqswVLZwJIzdBKJ1GdI5Zx6XwoFKUIk09/sSrr+05QFzvYb8q6Y9pPV45zzDuYa3907TZA==}
    engines: {node: '>=18.0.0', npm: '>=8.0.0'}
    hasBin: true

  sade@1.8.1:
    resolution: {integrity: sha512-xal3CZX1Xlo/k4ApwCFrHVACi9fBqJ7V+mwhBsuf/1IOKbBy098Fex+Wa/5QMubw09pSZ/u8EY8PWgevJsXp1A==}
    engines: {node: '>=6'}

  scheduler@0.25.0:
    resolution: {integrity: sha512-xFVuu11jh+xcO7JOAGJNOXld8/TcEHK/4CituBUeUb5hqxJLj9YuemAEuvm9gQ/+pgXYfbQuqAkiYu+u7YEsNA==}

  semver@7.7.2:
    resolution: {integrity: sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==}
    engines: {node: '>=10'}
    hasBin: true

  set-cookie-parser@2.7.1:
    resolution: {integrity: sha512-IOc8uWeOZgnb3ptbCURJWNjWUPcO3ZnTTdzsurqERrP6nPyv+paC55vJM0LpOlT2ne+Ix+9+CRG1MNLlyZ4GjQ==}

  sharp@0.33.5:
    resolution: {integrity: sha512-haPVm1EkS9pgvHrQ/F3Xy+hgcuMV0Wm9vfIBSiwZ05k+xgb0PkBQpGsAA/oWdDobNaZTH5ppvHtzCFbnSEwHVw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}

  simple-swizzle@0.2.2:
    resolution: {integrity: sha512-JA//kQgZtbuY83m+xT+tXJkmJncGMTFT+C+g2h2R9uxkYIrE2yy9sgmcLhCnw57/WSD+Eh3J97FPEDFnbXnDUg==}

  sirv@3.0.2:
    resolution: {integrity: sha512-2wcC/oGxHis/BoHkkPwldgiPSYcpZK3JU28WoMVv55yHJgcZ8rlXvuG9iZggz+sU1d4bRgIGASwyWqjxu3FM0g==}
    engines: {node: '>=18'}

  sonner@1.7.4:
    resolution: {integrity: sha512-DIS8z4PfJRbIyfVFDVnK9rO3eYDtse4Omcm6bt0oEr5/jtLgysmjuBl1frJ9E/EQZrFmKx2A8m/s5s9CRXIzhw==}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-rc
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-rc

  source-map-js@1.2.1:
    resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
    engines: {node: '>=0.10.0'}

  source-map@0.7.6:
    resolution: {integrity: sha512-i5uvt8C3ikiWeNZSVZNWcfZPItFQOsYTUAOkcUPGd8DqDy1uOUikjt5dG+uRlwyvR108Fb9DOd4GvXfT0N2/uQ==}
    engines: {node: '>= 12'}

  streamsearch@1.1.0:
    resolution: {integrity: sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==}
    engines: {node: '>=10.0.0'}

  styled-jsx@5.1.6:
    resolution: {integrity: sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==}
    engines: {node: '>= 12.0.0'}
    peerDependencies:
      '@babel/core': '*'
      babel-plugin-macros: '*'
      react: '>= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0'
    peerDependenciesMeta:
      '@babel/core':
        optional: true
      babel-plugin-macros:
        optional: true

  svelte@5.38.10:
    resolution: {integrity: sha512-UY+OhrWK7WI22bCZ00P/M3HtyWgwJPi9IxSRkoAE2MeAy6kl7ZlZWJZ8RaB+X4KD/G+wjis+cGVnVYaoqbzBqg==}
    engines: {node: '>=18'}

  tailwind-merge@2.5.5:
    resolution: {integrity: sha512-0LXunzzAZzo0tEPxV3I297ffKZPlKDrjj7NXphC8V5ak9yHC5zRmxnOe2m/Rd/7ivsOMJe3JZ2JVocoDdQTRBA==}

  tailwindcss-animate@1.0.7:
    resolution: {integrity: sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==}
    peerDependencies:
      tailwindcss: '>=3.0.0 || insiders'

  tailwindcss@4.1.9:
    resolution: {integrity: sha512-anBZRcvfNMsQdHB9XSGzAtIQWlhs49uK75jfkwrqjRUbjt4d7q9RE1wR1xWyfYZhLFnFX4ahWp88Au2lcEw5IQ==}

  tapable@2.2.3:
    resolution: {integrity: sha512-ZL6DDuAlRlLGghwcfmSn9sK3Hr6ArtyudlSAiCqQ6IfE+b+HHbydbYDIG15IfS5do+7XQQBdBiubF/cV2dnDzg==}
    engines: {node: '>=6'}

  tar@7.4.3:
    resolution: {integrity: sha512-5S7Va8hKfV7W5U6g3aYxXmlPoZVAwUMy9AOKyF2fVuZa2UD3qZjg578OrLRt8PcNN1PleVaL/5/yYATNL0ICUw==}
    engines: {node: '>=18'}

  tiny-invariant@1.3.3:
    resolution: {integrity: sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==}

  tinyglobby@0.2.15:
    resolution: {integrity: sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==}
    engines: {node: '>=12.0.0'}

  totalist@3.0.1:
    resolution: {integrity: sha512-sf4i37nQ2LBx4m3wB74y+ubopq6W/dIzXg0FDGjsYnZHVa1Da8FH853wlL2gtUhg+xJXjfk3kUZS3BRoQeoQBQ==}
    engines: {node: '>=6'}

  tslib@2.8.1:
    resolution: {integrity: sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==}

  turbo-stream@2.4.1:
    resolution: {integrity: sha512-v8kOJXpG3WoTN/+at8vK7erSzo6nW6CIaeOvNOkHQVDajfz1ZVeSxCbc6tOH4hrGZW7VUCV0TOXd8CPzYnYkrw==}

  tw-animate-css@1.3.3:
    resolution: {integrity: sha512-tXE2TRWrskc4TU3RDd7T8n8Np/wCfoeH9gz22c7PzYqNPQ9FBGFbWWzwL0JyHcFp+jHozmF76tbHfPAx22ua2Q==}

  typescript@5.0.2:
    resolution: {integrity: sha512-wVORMBGO/FAs/++blGNeAVdbNKtIh1rbBL2EyQ1+J9lClJ93KiiKe8PmFIVdXhHcyv44SL9oglmfeSsndo0jRw==}
    engines: {node: '>=12.20'}
    hasBin: true

  undici-types@6.11.1:
    resolution: {integrity: sha512-mIDEX2ek50x0OlRgxryxsenE5XaQD4on5U2inY7RApK3SOJpofyw7uW2AyfMKkhAxXIceo2DeWGVGwyvng1GNQ==}

  update-browserslist-db@1.1.3:
    resolution: {integrity: sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw==}
    hasBin: true
    peerDependencies:
      browserslist: '>= 4.21.0'

  use-callback-ref@1.3.3:
    resolution: {integrity: sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  use-sidecar@1.1.3:
    resolution: {integrity: sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  use-sync-external-store@1.5.0:
    resolution: {integrity: sha512-Rb46I4cGGVBmjamjphe8L/UnvJD+uPPtTkNvX5mZgqdbavhI4EbgIWJiIHXJ8bc/i9EQGPRh4DwEURJ552Do0A==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  vaul@0.9.9:
    resolution: {integrity: sha512-7afKg48srluhZwIkaU+lgGtFCUsYBSGOl8vcc8N/M3YQlZFlynHD15AE+pwrYdc826o7nrIND4lL9Y6b9WWZZQ==}
    peerDependencies:
      react: ^16.8 || ^17.0 || ^18.0
      react-dom: ^16.8 || ^17.0 || ^18.0

  victory-vendor@36.9.2:
    resolution: {integrity: sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==}

  vite@7.1.5:
    resolution: {integrity: sha512-4cKBO9wR75r0BeIWWWId9XK9Lj6La5X846Zw9dFfzMRw38IlTk2iCcUt6hsyiDRcPidc55ZParFYDXi0nXOeLQ==}
    engines: {node: ^20.19.0 || >=22.12.0}
    hasBin: true
    peerDependencies:
      '@types/node': ^20.19.0 || >=22.12.0
      jiti: '>=1.21.0'
      less: ^4.0.0
      lightningcss: ^1.21.0
      sass: ^1.70.0
      sass-embedded: ^1.70.0
      stylus: '>=0.54.8'
      sugarss: ^5.0.0
      terser: ^5.16.0
      tsx: ^4.8.1
      yaml: ^2.4.2
    peerDependenciesMeta:
      '@types/node':
        optional: true
      jiti:
        optional: true
      less:
        optional: true
      lightningcss:
        optional: true
      sass:
        optional: true
      sass-embedded:
        optional: true
      stylus:
        optional: true
      sugarss:
        optional: true
      terser:
        optional: true
      tsx:
        optional: true
      yaml:
        optional: true

  vitefu@1.1.1:
    resolution: {integrity: sha512-B/Fegf3i8zh0yFbpzZ21amWzHmuNlLlmJT6n7bu5e+pCHUKQIfXSYokrqOBGEMMe9UG2sostKQF9mml/vYaWJQ==}
    peerDependencies:
      vite: ^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0-beta.0
    peerDependenciesMeta:
      vite:
        optional: true

  vue-router@4.5.1:
    resolution: {integrity: sha512-ogAF3P97NPm8fJsE4by9dwSYtDwXIY1nFY9T6DyQnGHd1E2Da94w9JIolpe42LJGIl0DwOHBi8TcRPlPGwbTtw==}
    peerDependencies:
      vue: ^3.2.0

  vue@3.5.21:
    resolution: {integrity: sha512-xxf9rum9KtOdwdRkiApWL+9hZEMWE90FHh8yS1+KJAiWYh+iGWV1FquPjoO9VUHQ+VIhsCXNNyZ5Sf4++RVZBA==}
    peerDependencies:
      typescript: '*'
    peerDependenciesMeta:
      typescript:
        optional: true

  yallist@5.0.0:
    resolution: {integrity: sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==}
    engines: {node: '>=18'}

  zimmerframe@1.1.4:
    resolution: {integrity: sha512-B58NGBEoc8Y9MWWCQGl/gq9xBCe4IiKM0a2x7GZdQKOW5Exr8S1W24J6OgM1njK8xCRGvAJIL/MxXHf6SkmQKQ==}

  zod@3.25.67:
    resolution: {integrity: sha512-idA2YXwpCdqUSKRCACDE6ItZD9TZzy3OZMtpfLoh6oPR47lipysRrJfjzMqFxQ3uJuUPyUeWe1r9vLH33xO/Qw==}

snapshots:

  '@alloc/quick-lru@5.2.0': {}

  '@ampproject/remapping@2.3.0':
    dependencies:
      '@jridgewell/gen-mapping': 0.3.13
      '@jridgewell/trace-mapping': 0.3.31

  '@babel/helper-string-parser@7.27.1': {}

  '@babel/helper-validator-identifier@7.27.1': {}

  '@babel/parser@7.28.4':
    dependencies:
      '@babel/types': 7.28.4

  '@babel/runtime@7.28.4': {}

  '@babel/types@7.28.4':
    dependencies:
      '@babel/helper-string-parser': 7.27.1
      '@babel/helper-validator-identifier': 7.27.1

  '@date-fns/tz@1.2.0': {}

  '@emnapi/runtime@1.5.0':
    dependencies:
      tslib: 2.8.1
    optional: true

  '@emotion/is-prop-valid@1.4.0':
    dependencies:
      '@emotion/memoize': 0.9.0

  '@emotion/memoize@0.9.0': {}

  '@esbuild/aix-ppc64@0.25.9':
    optional: true

  '@esbuild/android-arm64@0.25.9':
    optional: true

  '@esbuild/android-arm@0.25.9':
    optional: true

  '@esbuild/android-x64@0.25.9':
    optional: true

  '@esbuild/darwin-arm64@0.25.9':
    optional: true

  '@esbuild/darwin-x64@0.25.9':
    optional: true

  '@esbuild/freebsd-arm64@0.25.9':
    optional: true

  '@esbuild/freebsd-x64@0.25.9':
    optional: true

  '@esbuild/linux-arm64@0.25.9':
    optional: true

  '@esbuild/linux-arm@0.25.9':
    optional: true

  '@esbuild/linux-ia32@0.25.9':
    optional: true

  '@esbuild/linux-loong64@0.25.9':
    optional: true

  '@esbuild/linux-mips64el@0.25.9':
    optional: true

  '@esbuild/linux-ppc64@0.25.9':
    optional: true

  '@esbuild/linux-riscv64@0.25.9':
    optional: true

  '@esbuild/linux-s390x@0.25.9':
    optional: true

  '@esbuild/linux-x64@0.25.9':
    optional: true

  '@esbuild/netbsd-arm64@0.25.9':
    optional: true

  '@esbuild/netbsd-x64@0.25.9':
    optional: true

  '@esbuild/openbsd-arm64@0.25.9':
    optional: true

  '@esbuild/openbsd-x64@0.25.9':
    optional: true

  '@esbuild/openharmony-arm64@0.25.9':
    optional: true

  '@esbuild/sunos-x64@0.25.9':
    optional: true

  '@esbuild/win32-arm64@0.25.9':
    optional: true

  '@esbuild/win32-ia32@0.25.9':
    optional: true

  '@esbuild/win32-x64@0.25.9':
    optional: true

  '@floating-ui/core@1.7.3':
    dependencies:
      '@floating-ui/utils': 0.2.10

  '@floating-ui/dom@1.7.4':
    dependencies:
      '@floating-ui/core': 1.7.3
      '@floating-ui/utils': 0.2.10

  '@floating-ui/react-dom@2.1.6(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@floating-ui/dom': 1.7.4
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  '@floating-ui/utils@0.2.10': {}

  '@hookform/resolvers@3.10.0(react-hook-form@7.60.0(react@19.0.0))':
    dependencies:
      react-hook-form: 7.60.0(react@19.0.0)

  '@img/sharp-darwin-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-darwin-arm64': 1.0.4
    optional: true

  '@img/sharp-darwin-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-darwin-x64': 1.0.4
    optional: true

  '@img/sharp-libvips-darwin-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-darwin-x64@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-arm@1.0.5':
    optional: true

  '@img/sharp-libvips-linux-s390x@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-x64@1.0.4':
    optional: true

  '@img/sharp-libvips-linuxmusl-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-linuxmusl-x64@1.0.4':
    optional: true

  '@img/sharp-linux-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-arm64': 1.0.4
    optional: true

  '@img/sharp-linux-arm@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-arm': 1.0.5
    optional: true

  '@img/sharp-linux-s390x@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-s390x': 1.0.4
    optional: true

  '@img/sharp-linux-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-x64': 1.0.4
    optional: true

  '@img/sharp-linuxmusl-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linuxmusl-arm64': 1.0.4
    optional: true

  '@img/sharp-linuxmusl-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linuxmusl-x64': 1.0.4
    optional: true

  '@img/sharp-wasm32@0.33.5':
    dependencies:
      '@emnapi/runtime': 1.5.0
    optional: true

  '@img/sharp-win32-ia32@0.33.5':
    optional: true

  '@img/sharp-win32-x64@0.33.5':
    optional: true

  '@isaacs/fs-minipass@4.0.1':
    dependencies:
      minipass: 7.1.2

  '@jridgewell/gen-mapping@0.3.13':
    dependencies:
      '@jridgewell/sourcemap-codec': 1.5.5
      '@jridgewell/trace-mapping': 0.3.31

  '@jridgewell/remapping@2.3.5':
    dependencies:
      '@jridgewell/gen-mapping': 0.3.13
      '@jridgewell/trace-mapping': 0.3.31

  '@jridgewell/resolve-uri@3.1.2': {}

  '@jridgewell/sourcemap-codec@1.5.5': {}

  '@jridgewell/trace-mapping@0.3.31':
    dependencies:
      '@jridgewell/resolve-uri': 3.1.2
      '@jridgewell/sourcemap-codec': 1.5.5

  '@next/env@15.2.4': {}

  '@next/swc-darwin-arm64@15.2.4':
    optional: true

  '@next/swc-darwin-x64@15.2.4':
    optional: true

  '@next/swc-linux-arm64-gnu@15.2.4':
    optional: true

  '@next/swc-linux-arm64-musl@15.2.4':
    optional: true

  '@next/swc-linux-x64-gnu@15.2.4':
    optional: true

  '@next/swc-linux-x64-musl@15.2.4':
    optional: true

  '@next/swc-win32-arm64-msvc@15.2.4':
    optional: true

  '@next/swc-win32-x64-msvc@15.2.4':
    optional: true

  '@polka/url@1.0.0-next.29': {}

  '@radix-ui/number@1.1.0': {}

  '@radix-ui/number@1.1.1': {}

  '@radix-ui/primitive@1.1.1': {}

  '@radix-ui/primitive@1.1.3': {}

  '@radix-ui/react-accordion@1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collapsible': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-alert-dialog@1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dialog': 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-arrow@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-arrow@1.1.7(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-aspect-ratio@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-avatar@1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-checkbox@1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-collapsible@1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-collection@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-collection@1.1.7(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.2.3(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-compose-refs@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-compose-refs@1.1.2(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-context-menu@2.2.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-menu': 2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-context@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-context@1.1.2(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-dialog@1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      aria-hidden: 1.2.6
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-remove-scroll: 2.7.1(@types/react@19.0.0)(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-direction@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-direction@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-dismissable-layer@1.1.11(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.3
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-escape-keydown': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-dismissable-layer@1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-escape-keydown': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-dropdown-menu@2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-menu': 2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-focus-guards@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-focus-guards@1.1.3(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-focus-scope@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-focus-scope@1.1.7(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-hover-card@1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-id@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-id@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-label@2.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-menu@2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      aria-hidden: 1.2.6
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-remove-scroll: 2.7.1(@types/react@19.0.0)(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-menubar@1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-menu': 2.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-navigation-menu@1.2.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-popover@1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      aria-hidden: 1.2.6
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-remove-scroll: 2.7.1(@types/react@19.0.0)(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-popper@1.2.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@floating-ui/react-dom': 2.1.6(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-arrow': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-rect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/rect': 1.1.0
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-popper@1.2.8(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@floating-ui/react-dom': 2.1.6(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-arrow': 1.1.7(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-rect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-size': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/rect': 1.1.1
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-portal@1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-portal@1.1.9(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-presence@1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-primitive@2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-primitive@2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-slot': 1.2.3(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-progress@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-radio-group@1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-roving-focus@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-scroll-area@1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/number': 1.1.0
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-select@2.2.6(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/number': 1.1.1
      '@radix-ui/primitive': 1.1.3
      '@radix-ui/react-collection': 1.1.7(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.11(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-focus-guards': 1.1.3(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-focus-scope': 1.1.7(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-popper': 1.2.8(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-portal': 1.1.9(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.2.3(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.2.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-previous': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-visually-hidden': 1.2.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      aria-hidden: 1.2.6
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-remove-scroll: 2.7.1(@types/react@19.0.0)(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-separator@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-slider@1.2.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/number': 1.1.0
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-slot@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-slot@1.2.3(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-switch@1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-tabs@1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-toast@1.2.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-toggle-group@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-toggle': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-toggle@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-tooltip@1.1.6(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-context': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-use-callback-ref@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-callback-ref@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-controllable-state@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-controllable-state@1.2.2(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-effect-event': 0.0.2(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-effect-event@0.0.2(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-escape-keydown@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-escape-keydown@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-callback-ref': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-layout-effect@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-layout-effect@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-previous@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-previous@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-rect@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/rect': 1.1.0
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-rect@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/rect': 1.1.1
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-size@1.1.0(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-use-size@1.1.1(@types/react@19.0.0)(react@19.0.0)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      react: 19.0.0
    optionalDependencies:
      '@types/react': 19.0.0

  '@radix-ui/react-visually-hidden@1.1.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/react-visually-hidden@1.2.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0
      '@types/react-dom': 19.0.0

  '@radix-ui/rect@1.1.0': {}

  '@radix-ui/rect@1.1.1': {}

  '@remix-run/react@2.17.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)(typescript@5.0.2)':
    dependencies:
      '@remix-run/router': 1.23.0
      '@remix-run/server-runtime': 2.17.0(typescript@5.0.2)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-router: 6.30.0(react@19.0.0)
      react-router-dom: 6.30.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      turbo-stream: 2.4.1
    optionalDependencies:
      typescript: 5.0.2

  '@remix-run/router@1.23.0': {}

  '@remix-run/server-runtime@2.17.0(typescript@5.0.2)':
    dependencies:
      '@remix-run/router': 1.23.0
      '@types/cookie': 0.6.0
      '@web3-storage/multipart-parser': 1.0.0
      cookie: 0.7.2
      set-cookie-parser: 2.7.1
      source-map: 0.7.6
      turbo-stream: 2.4.1
    optionalDependencies:
      typescript: 5.0.2

  '@rollup/rollup-android-arm-eabi@4.50.1':
    optional: true

  '@rollup/rollup-android-arm64@4.50.1':
    optional: true

  '@rollup/rollup-darwin-arm64@4.50.1':
    optional: true

  '@rollup/rollup-darwin-x64@4.50.1':
    optional: true

  '@rollup/rollup-freebsd-arm64@4.50.1':
    optional: true

  '@rollup/rollup-freebsd-x64@4.50.1':
    optional: true

  '@rollup/rollup-linux-arm-gnueabihf@4.50.1':
    optional: true

  '@rollup/rollup-linux-arm-musleabihf@4.50.1':
    optional: true

  '@rollup/rollup-linux-arm64-gnu@4.50.1':
    optional: true

  '@rollup/rollup-linux-arm64-musl@4.50.1':
    optional: true

  '@rollup/rollup-linux-loongarch64-gnu@4.50.1':
    optional: true

  '@rollup/rollup-linux-ppc64-gnu@4.50.1':
    optional: true

  '@rollup/rollup-linux-riscv64-gnu@4.50.1':
    optional: true

  '@rollup/rollup-linux-riscv64-musl@4.50.1':
    optional: true

  '@rollup/rollup-linux-s390x-gnu@4.50.1':
    optional: true

  '@rollup/rollup-linux-x64-gnu@4.50.1':
    optional: true

  '@rollup/rollup-linux-x64-musl@4.50.1':
    optional: true

  '@rollup/rollup-openharmony-arm64@4.50.1':
    optional: true

  '@rollup/rollup-win32-arm64-msvc@4.50.1':
    optional: true

  '@rollup/rollup-win32-ia32-msvc@4.50.1':
    optional: true

  '@rollup/rollup-win32-x64-msvc@4.50.1':
    optional: true

  '@standard-schema/spec@1.0.0': {}

  '@sveltejs/acorn-typescript@1.0.5(acorn@8.15.0)':
    dependencies:
      acorn: 8.15.0

  '@sveltejs/kit@2.39.0(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))':
    dependencies:
      '@standard-schema/spec': 1.0.0
      '@sveltejs/acorn-typescript': 1.0.5(acorn@8.15.0)
      '@sveltejs/vite-plugin-svelte': 6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))
      '@types/cookie': 0.6.0
      acorn: 8.15.0
      cookie: 0.6.0
      devalue: 5.3.2
      esm-env: 1.2.2
      kleur: 4.1.5
      magic-string: 0.30.19
      mrmime: 2.0.1
      sade: 1.8.1
      set-cookie-parser: 2.7.1
      sirv: 3.0.2
      svelte: 5.38.10
      vite: 7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)

  '@sveltejs/vite-plugin-svelte-inspector@5.0.1(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))':
    dependencies:
      '@sveltejs/vite-plugin-svelte': 6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))
      debug: 4.4.1
      svelte: 5.38.10
      vite: 7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)
    transitivePeerDependencies:
      - supports-color

  '@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))':
    dependencies:
      '@sveltejs/vite-plugin-svelte-inspector': 5.0.1(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))
      debug: 4.4.1
      deepmerge: 4.3.1
      magic-string: 0.30.19
      svelte: 5.38.10
      vite: 7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)
      vitefu: 1.1.1(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))
    transitivePeerDependencies:
      - supports-color

  '@swc/counter@0.1.3': {}

  '@swc/helpers@0.5.15':
    dependencies:
      tslib: 2.8.1

  '@tailwindcss/node@4.1.9':
    dependencies:
      '@ampproject/remapping': 2.3.0
      enhanced-resolve: 5.18.3
      jiti: 2.5.1
      lightningcss: 1.30.1
      magic-string: 0.30.19
      source-map-js: 1.2.1
      tailwindcss: 4.1.9

  '@tailwindcss/oxide-android-arm64@4.1.9':
    optional: true

  '@tailwindcss/oxide-darwin-arm64@4.1.9':
    optional: true

  '@tailwindcss/oxide-darwin-x64@4.1.9':
    optional: true

  '@tailwindcss/oxide-freebsd-x64@4.1.9':
    optional: true

  '@tailwindcss/oxide-linux-arm-gnueabihf@4.1.9':
    optional: true

  '@tailwindcss/oxide-linux-arm64-gnu@4.1.9':
    optional: true

  '@tailwindcss/oxide-linux-arm64-musl@4.1.9':
    optional: true

  '@tailwindcss/oxide-linux-x64-gnu@4.1.9':
    optional: true

  '@tailwindcss/oxide-linux-x64-musl@4.1.9':
    optional: true

  '@tailwindcss/oxide-wasm32-wasi@4.1.9':
    optional: true

  '@tailwindcss/oxide-win32-arm64-msvc@4.1.9':
    optional: true

  '@tailwindcss/oxide-win32-x64-msvc@4.1.9':
    optional: true

  '@tailwindcss/oxide@4.1.9':
    dependencies:
      detect-libc: 2.0.4
      tar: 7.4.3
    optionalDependencies:
      '@tailwindcss/oxide-android-arm64': 4.1.9
      '@tailwindcss/oxide-darwin-arm64': 4.1.9
      '@tailwindcss/oxide-darwin-x64': 4.1.9
      '@tailwindcss/oxide-freebsd-x64': 4.1.9
      '@tailwindcss/oxide-linux-arm-gnueabihf': 4.1.9
      '@tailwindcss/oxide-linux-arm64-gnu': 4.1.9
      '@tailwindcss/oxide-linux-arm64-musl': 4.1.9
      '@tailwindcss/oxide-linux-x64-gnu': 4.1.9
      '@tailwindcss/oxide-linux-x64-musl': 4.1.9
      '@tailwindcss/oxide-wasm32-wasi': 4.1.9
      '@tailwindcss/oxide-win32-arm64-msvc': 4.1.9
      '@tailwindcss/oxide-win32-x64-msvc': 4.1.9

  '@tailwindcss/postcss@4.1.9':
    dependencies:
      '@alloc/quick-lru': 5.2.0
      '@tailwindcss/node': 4.1.9
      '@tailwindcss/oxide': 4.1.9
      postcss: 8.5.0
      tailwindcss: 4.1.9

  '@types/cookie@0.6.0': {}

  '@types/d3-array@3.2.1': {}

  '@types/d3-color@3.1.3': {}

  '@types/d3-ease@3.0.2': {}

  '@types/d3-interpolate@3.0.4':
    dependencies:
      '@types/d3-color': 3.1.3

  '@types/d3-path@3.1.1': {}

  '@types/d3-scale@4.0.9':
    dependencies:
      '@types/d3-time': 3.0.4

  '@types/d3-shape@3.1.7':
    dependencies:
      '@types/d3-path': 3.1.1

  '@types/d3-time@3.0.4': {}

  '@types/d3-timer@3.0.2': {}

  '@types/estree@1.0.8': {}

  '@types/node@22.0.0':
    dependencies:
      undici-types: 6.11.1

  '@types/react-dom@19.0.0':
    dependencies:
      '@types/react': 19.0.0

  '@types/react@19.0.0':
    dependencies:
      csstype: 3.1.3

  '@vercel/analytics@1.5.0(@remix-run/react@2.17.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)(typescript@5.0.2))(@sveltejs/kit@2.39.0(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(next@15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0))(react@19.0.0)(svelte@5.38.10)(vue-router@4.5.1(vue@3.5.21(typescript@5.0.2)))(vue@3.5.21(typescript@5.0.2))':
    optionalDependencies:
      '@remix-run/react': 2.17.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)(typescript@5.0.2)
      '@sveltejs/kit': 2.39.0(@sveltejs/vite-plugin-svelte@6.2.0(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)))(svelte@5.38.10)(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1))
      next: 15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      svelte: 5.38.10
      vue: 3.5.21(typescript@5.0.2)
      vue-router: 4.5.1(vue@3.5.21(typescript@5.0.2))

  '@vue/compiler-core@3.5.21':
    dependencies:
      '@babel/parser': 7.28.4
      '@vue/shared': 3.5.21
      entities: 4.5.0
      estree-walker: 2.0.2
      source-map-js: 1.2.1

  '@vue/compiler-dom@3.5.21':
    dependencies:
      '@vue/compiler-core': 3.5.21
      '@vue/shared': 3.5.21

  '@vue/compiler-sfc@3.5.21':
    dependencies:
      '@babel/parser': 7.28.4
      '@vue/compiler-core': 3.5.21
      '@vue/compiler-dom': 3.5.21
      '@vue/compiler-ssr': 3.5.21
      '@vue/shared': 3.5.21
      estree-walker: 2.0.2
      magic-string: 0.30.19
      postcss: 8.5.6
      source-map-js: 1.2.1

  '@vue/compiler-ssr@3.5.21':
    dependencies:
      '@vue/compiler-dom': 3.5.21
      '@vue/shared': 3.5.21

  '@vue/devtools-api@6.6.4': {}

  '@vue/reactivity@3.5.21':
    dependencies:
      '@vue/shared': 3.5.21

  '@vue/runtime-core@3.5.21':
    dependencies:
      '@vue/reactivity': 3.5.21
      '@vue/shared': 3.5.21

  '@vue/runtime-dom@3.5.21':
    dependencies:
      '@vue/reactivity': 3.5.21
      '@vue/runtime-core': 3.5.21
      '@vue/shared': 3.5.21
      csstype: 3.1.3

  '@vue/server-renderer@3.5.21(vue@3.5.21(typescript@5.0.2))':
    dependencies:
      '@vue/compiler-ssr': 3.5.21
      '@vue/shared': 3.5.21
      vue: 3.5.21(typescript@5.0.2)

  '@vue/shared@3.5.21': {}

  '@web3-storage/multipart-parser@1.0.0': {}

  acorn@8.15.0: {}

  aria-hidden@1.2.6:
    dependencies:
      tslib: 2.8.1

  aria-query@5.3.2: {}

  autoprefixer@10.4.20(postcss@8.5.0):
    dependencies:
      browserslist: 4.25.4
      caniuse-lite: 1.0.30001741
      fraction.js: 4.3.7
      normalize-range: 0.1.2
      picocolors: 1.1.1
      postcss: 8.5.0
      postcss-value-parser: 4.2.0

  axobject-query@4.1.0: {}

  browserslist@4.25.4:
    dependencies:
      caniuse-lite: 1.0.30001741
      electron-to-chromium: 1.5.218
      node-releases: 2.0.20
      update-browserslist-db: 1.1.3(browserslist@4.25.4)

  busboy@1.6.0:
    dependencies:
      streamsearch: 1.1.0

  caniuse-lite@1.0.30001741: {}

  chownr@3.0.0: {}

  class-variance-authority@0.7.1:
    dependencies:
      clsx: 2.1.1

  client-only@0.0.1: {}

  clsx@2.1.1: {}

  cmdk@1.0.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      '@radix-ui/react-dialog': 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@radix-ui/react-id': 1.1.1(@types/react@19.0.0)(react@19.0.0)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      use-sync-external-store: 1.5.0(react@19.0.0)
    transitivePeerDependencies:
      - '@types/react'
      - '@types/react-dom'

  color-convert@2.0.1:
    dependencies:
      color-name: 1.1.4
    optional: true

  color-name@1.1.4:
    optional: true

  color-string@1.9.1:
    dependencies:
      color-name: 1.1.4
      simple-swizzle: 0.2.2
    optional: true

  color@4.2.3:
    dependencies:
      color-convert: 2.0.1
      color-string: 1.9.1
    optional: true

  cookie@0.6.0: {}

  cookie@0.7.2: {}

  csstype@3.1.3: {}

  d3-array@3.2.4:
    dependencies:
      internmap: 2.0.3

  d3-color@3.1.0: {}

  d3-ease@3.0.1: {}

  d3-format@3.1.0: {}

  d3-interpolate@3.0.1:
    dependencies:
      d3-color: 3.1.0

  d3-path@3.1.0: {}

  d3-scale@4.0.2:
    dependencies:
      d3-array: 3.2.4
      d3-format: 3.1.0
      d3-interpolate: 3.0.1
      d3-time: 3.1.0
      d3-time-format: 4.1.0

  d3-shape@3.2.0:
    dependencies:
      d3-path: 3.1.0

  d3-time-format@4.1.0:
    dependencies:
      d3-time: 3.1.0

  d3-time@3.1.0:
    dependencies:
      d3-array: 3.2.4

  d3-timer@3.0.1: {}

  date-fns-jalali@4.1.0-0: {}

  date-fns@4.1.0: {}

  debug@4.4.1:
    dependencies:
      ms: 2.1.3

  decimal.js-light@2.5.1: {}

  deepmerge@4.3.1: {}

  detect-libc@2.0.4: {}

  detect-node-es@1.1.0: {}

  devalue@5.3.2: {}

  dom-helpers@5.2.1:
    dependencies:
      '@babel/runtime': 7.28.4
      csstype: 3.1.3

  electron-to-chromium@1.5.218: {}

  embla-carousel-react@8.5.1(react@19.0.0):
    dependencies:
      embla-carousel: 8.5.1
      embla-carousel-reactive-utils: 8.5.1(embla-carousel@8.5.1)
      react: 19.0.0

  embla-carousel-reactive-utils@8.5.1(embla-carousel@8.5.1):
    dependencies:
      embla-carousel: 8.5.1

  embla-carousel@8.5.1: {}

  enhanced-resolve@5.18.3:
    dependencies:
      graceful-fs: 4.2.11
      tapable: 2.2.3

  entities@4.5.0: {}

  esbuild@0.25.9:
    optionalDependencies:
      '@esbuild/aix-ppc64': 0.25.9
      '@esbuild/android-arm': 0.25.9
      '@esbuild/android-arm64': 0.25.9
      '@esbuild/android-x64': 0.25.9
      '@esbuild/darwin-arm64': 0.25.9
      '@esbuild/darwin-x64': 0.25.9
      '@esbuild/freebsd-arm64': 0.25.9
      '@esbuild/freebsd-x64': 0.25.9
      '@esbuild/linux-arm': 0.25.9
      '@esbuild/linux-arm64': 0.25.9
      '@esbuild/linux-ia32': 0.25.9
      '@esbuild/linux-loong64': 0.25.9
      '@esbuild/linux-mips64el': 0.25.9
      '@esbuild/linux-ppc64': 0.25.9
      '@esbuild/linux-riscv64': 0.25.9
      '@esbuild/linux-s390x': 0.25.9
      '@esbuild/linux-x64': 0.25.9
      '@esbuild/netbsd-arm64': 0.25.9
      '@esbuild/netbsd-x64': 0.25.9
      '@esbuild/openbsd-arm64': 0.25.9
      '@esbuild/openbsd-x64': 0.25.9
      '@esbuild/openharmony-arm64': 0.25.9
      '@esbuild/sunos-x64': 0.25.9
      '@esbuild/win32-arm64': 0.25.9
      '@esbuild/win32-ia32': 0.25.9
      '@esbuild/win32-x64': 0.25.9

  escalade@3.2.0: {}

  esm-env@1.2.2: {}

  esrap@2.1.0:
    dependencies:
      '@jridgewell/sourcemap-codec': 1.5.5

  estree-walker@2.0.2: {}

  eventemitter3@4.0.7: {}

  fast-equals@5.2.2: {}

  fdir@6.5.0(picomatch@4.0.3):
    optionalDependencies:
      picomatch: 4.0.3

  fraction.js@4.3.7: {}

  framer-motion@12.23.12(@emotion/is-prop-valid@1.4.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      motion-dom: 12.23.12
      motion-utils: 12.23.6
      tslib: 2.8.1
    optionalDependencies:
      '@emotion/is-prop-valid': 1.4.0
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  fsevents@2.3.3:
    optional: true

  geist@1.5.1(next@15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)):
    dependencies:
      next: 15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)

  get-nonce@1.0.1: {}

  graceful-fs@4.2.11: {}

  input-otp@1.4.1(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  internmap@2.0.3: {}

  is-arrayish@0.3.2:
    optional: true

  is-reference@3.0.3:
    dependencies:
      '@types/estree': 1.0.8

  jiti@2.5.1: {}

  js-tokens@4.0.0: {}

  kleur@4.1.5: {}

  lightningcss-darwin-arm64@1.30.1:
    optional: true

  lightningcss-darwin-x64@1.30.1:
    optional: true

  lightningcss-freebsd-x64@1.30.1:
    optional: true

  lightningcss-linux-arm-gnueabihf@1.30.1:
    optional: true

  lightningcss-linux-arm64-gnu@1.30.1:
    optional: true

  lightningcss-linux-arm64-musl@1.30.1:
    optional: true

  lightningcss-linux-x64-gnu@1.30.1:
    optional: true

  lightningcss-linux-x64-musl@1.30.1:
    optional: true

  lightningcss-win32-arm64-msvc@1.30.1:
    optional: true

  lightningcss-win32-x64-msvc@1.30.1:
    optional: true

  lightningcss@1.30.1:
    dependencies:
      detect-libc: 2.0.4
    optionalDependencies:
      lightningcss-darwin-arm64: 1.30.1
      lightningcss-darwin-x64: 1.30.1
      lightningcss-freebsd-x64: 1.30.1
      lightningcss-linux-arm-gnueabihf: 1.30.1
      lightningcss-linux-arm64-gnu: 1.30.1
      lightningcss-linux-arm64-musl: 1.30.1
      lightningcss-linux-x64-gnu: 1.30.1
      lightningcss-linux-x64-musl: 1.30.1
      lightningcss-win32-arm64-msvc: 1.30.1
      lightningcss-win32-x64-msvc: 1.30.1

  locate-character@3.0.0: {}

  lodash@4.17.21: {}

  loose-envify@1.4.0:
    dependencies:
      js-tokens: 4.0.0

  lucide-react@0.454.0(react@19.0.0):
    dependencies:
      react: 19.0.0

  magic-string@0.30.19:
    dependencies:
      '@jridgewell/sourcemap-codec': 1.5.5

  minipass@7.1.2: {}

  minizlib@3.0.2:
    dependencies:
      minipass: 7.1.2

  mkdirp@3.0.1: {}

  motion-dom@12.23.12:
    dependencies:
      motion-utils: 12.23.6

  motion-utils@12.23.6: {}

  mri@1.2.0: {}

  mrmime@2.0.1: {}

  ms@2.1.3: {}

  nanoid@3.3.11: {}

  next-themes@0.4.6(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  next@15.2.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      '@next/env': 15.2.4
      '@swc/counter': 0.1.3
      '@swc/helpers': 0.5.15
      busboy: 1.6.0
      caniuse-lite: 1.0.30001741
      postcss: 8.4.31
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      styled-jsx: 5.1.6(react@19.0.0)
    optionalDependencies:
      '@next/swc-darwin-arm64': 15.2.4
      '@next/swc-darwin-x64': 15.2.4
      '@next/swc-linux-arm64-gnu': 15.2.4
      '@next/swc-linux-arm64-musl': 15.2.4
      '@next/swc-linux-x64-gnu': 15.2.4
      '@next/swc-linux-x64-musl': 15.2.4
      '@next/swc-win32-arm64-msvc': 15.2.4
      '@next/swc-win32-x64-msvc': 15.2.4
      sharp: 0.33.5
    transitivePeerDependencies:
      - '@babel/core'
      - babel-plugin-macros

  node-releases@2.0.20: {}

  normalize-range@0.1.2: {}

  object-assign@4.1.1: {}

  picocolors@1.1.1: {}

  picomatch@4.0.3: {}

  postcss-value-parser@4.2.0: {}

  postcss@8.4.31:
    dependencies:
      nanoid: 3.3.11
      picocolors: 1.1.1
      source-map-js: 1.2.1

  postcss@8.5.0:
    dependencies:
      nanoid: 3.3.11
      picocolors: 1.1.1
      source-map-js: 1.2.1

  postcss@8.5.6:
    dependencies:
      nanoid: 3.3.11
      picocolors: 1.1.1
      source-map-js: 1.2.1

  prop-types@15.8.1:
    dependencies:
      loose-envify: 1.4.0
      object-assign: 4.1.1
      react-is: 16.13.1

  react-day-picker@9.8.0(react@19.0.0):
    dependencies:
      '@date-fns/tz': 1.2.0
      date-fns: 4.1.0
      date-fns-jalali: 4.1.0-0
      react: 19.0.0

  react-dom@19.0.0(react@19.0.0):
    dependencies:
      react: 19.0.0
      scheduler: 0.25.0

  react-hook-form@7.60.0(react@19.0.0):
    dependencies:
      react: 19.0.0

  react-is@16.13.1: {}

  react-is@18.3.1: {}

  react-remove-scroll-bar@2.3.8(@types/react@19.0.0)(react@19.0.0):
    dependencies:
      react: 19.0.0
      react-style-singleton: 2.2.3(@types/react@19.0.0)(react@19.0.0)
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.0.0

  react-remove-scroll@2.7.1(@types/react@19.0.0)(react@19.0.0):
    dependencies:
      react: 19.0.0
      react-remove-scroll-bar: 2.3.8(@types/react@19.0.0)(react@19.0.0)
      react-style-singleton: 2.2.3(@types/react@19.0.0)(react@19.0.0)
      tslib: 2.8.1
      use-callback-ref: 1.3.3(@types/react@19.0.0)(react@19.0.0)
      use-sidecar: 1.1.3(@types/react@19.0.0)(react@19.0.0)
    optionalDependencies:
      '@types/react': 19.0.0

  react-resizable-panels@2.1.7(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  react-router-dom@6.30.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      '@remix-run/router': 1.23.0
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-router: 6.30.0(react@19.0.0)

  react-router@6.30.0(react@19.0.0):
    dependencies:
      '@remix-run/router': 1.23.0
      react: 19.0.0

  react-smooth@4.0.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      fast-equals: 5.2.2
      prop-types: 15.8.1
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-transition-group: 4.4.5(react-dom@19.0.0(react@19.0.0))(react@19.0.0)

  react-style-singleton@2.2.3(@types/react@19.0.0)(react@19.0.0):
    dependencies:
      get-nonce: 1.0.1
      react: 19.0.0
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.0.0

  react-transition-group@4.4.5(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      '@babel/runtime': 7.28.4
      dom-helpers: 5.2.1
      loose-envify: 1.4.0
      prop-types: 15.8.1
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  react@19.0.0: {}

  recharts-scale@0.4.5:
    dependencies:
      decimal.js-light: 2.5.1

  recharts@2.15.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      clsx: 2.1.1
      eventemitter3: 4.0.7
      lodash: 4.17.21
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      react-is: 18.3.1
      react-smooth: 4.0.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      recharts-scale: 0.4.5
      tiny-invariant: 1.3.3
      victory-vendor: 36.9.2

  rollup@4.50.1:
    dependencies:
      '@types/estree': 1.0.8
    optionalDependencies:
      '@rollup/rollup-android-arm-eabi': 4.50.1
      '@rollup/rollup-android-arm64': 4.50.1
      '@rollup/rollup-darwin-arm64': 4.50.1
      '@rollup/rollup-darwin-x64': 4.50.1
      '@rollup/rollup-freebsd-arm64': 4.50.1
      '@rollup/rollup-freebsd-x64': 4.50.1
      '@rollup/rollup-linux-arm-gnueabihf': 4.50.1
      '@rollup/rollup-linux-arm-musleabihf': 4.50.1
      '@rollup/rollup-linux-arm64-gnu': 4.50.1
      '@rollup/rollup-linux-arm64-musl': 4.50.1
      '@rollup/rollup-linux-loongarch64-gnu': 4.50.1
      '@rollup/rollup-linux-ppc64-gnu': 4.50.1
      '@rollup/rollup-linux-riscv64-gnu': 4.50.1
      '@rollup/rollup-linux-riscv64-musl': 4.50.1
      '@rollup/rollup-linux-s390x-gnu': 4.50.1
      '@rollup/rollup-linux-x64-gnu': 4.50.1
      '@rollup/rollup-linux-x64-musl': 4.50.1
      '@rollup/rollup-openharmony-arm64': 4.50.1
      '@rollup/rollup-win32-arm64-msvc': 4.50.1
      '@rollup/rollup-win32-ia32-msvc': 4.50.1
      '@rollup/rollup-win32-x64-msvc': 4.50.1
      fsevents: 2.3.3

  sade@1.8.1:
    dependencies:
      mri: 1.2.0

  scheduler@0.25.0: {}

  semver@7.7.2:
    optional: true

  set-cookie-parser@2.7.1: {}

  sharp@0.33.5:
    dependencies:
      color: 4.2.3
      detect-libc: 2.0.4
      semver: 7.7.2
    optionalDependencies:
      '@img/sharp-darwin-arm64': 0.33.5
      '@img/sharp-darwin-x64': 0.33.5
      '@img/sharp-libvips-darwin-arm64': 1.0.4
      '@img/sharp-libvips-darwin-x64': 1.0.4
      '@img/sharp-libvips-linux-arm': 1.0.5
      '@img/sharp-libvips-linux-arm64': 1.0.4
      '@img/sharp-libvips-linux-s390x': 1.0.4
      '@img/sharp-libvips-linux-x64': 1.0.4
      '@img/sharp-libvips-linuxmusl-arm64': 1.0.4
      '@img/sharp-libvips-linuxmusl-x64': 1.0.4
      '@img/sharp-linux-arm': 0.33.5
      '@img/sharp-linux-arm64': 0.33.5
      '@img/sharp-linux-s390x': 0.33.5
      '@img/sharp-linux-x64': 0.33.5
      '@img/sharp-linuxmusl-arm64': 0.33.5
      '@img/sharp-linuxmusl-x64': 0.33.5
      '@img/sharp-wasm32': 0.33.5
      '@img/sharp-win32-ia32': 0.33.5
      '@img/sharp-win32-x64': 0.33.5
    optional: true

  simple-swizzle@0.2.2:
    dependencies:
      is-arrayish: 0.3.2
    optional: true

  sirv@3.0.2:
    dependencies:
      '@polka/url': 1.0.0-next.29
      mrmime: 2.0.1
      totalist: 3.0.1

  sonner@1.7.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  source-map-js@1.2.1: {}

  source-map@0.7.6: {}

  streamsearch@1.1.0: {}

  styled-jsx@5.1.6(react@19.0.0):
    dependencies:
      client-only: 0.0.1
      react: 19.0.0

  svelte@5.38.10:
    dependencies:
      '@jridgewell/remapping': 2.3.5
      '@jridgewell/sourcemap-codec': 1.5.5
      '@sveltejs/acorn-typescript': 1.0.5(acorn@8.15.0)
      '@types/estree': 1.0.8
      acorn: 8.15.0
      aria-query: 5.3.2
      axobject-query: 4.1.0
      clsx: 2.1.1
      esm-env: 1.2.2
      esrap: 2.1.0
      is-reference: 3.0.3
      locate-character: 3.0.0
      magic-string: 0.30.19
      zimmerframe: 1.1.4

  tailwind-merge@2.5.5: {}

  tailwindcss-animate@1.0.7(tailwindcss@4.1.9):
    dependencies:
      tailwindcss: 4.1.9

  tailwindcss@4.1.9: {}

  tapable@2.2.3: {}

  tar@7.4.3:
    dependencies:
      '@isaacs/fs-minipass': 4.0.1
      chownr: 3.0.0
      minipass: 7.1.2
      minizlib: 3.0.2
      mkdirp: 3.0.1
      yallist: 5.0.0

  tiny-invariant@1.3.3: {}

  tinyglobby@0.2.15:
    dependencies:
      fdir: 6.5.0(picomatch@4.0.3)
      picomatch: 4.0.3

  totalist@3.0.1: {}

  tslib@2.8.1: {}

  turbo-stream@2.4.1: {}

  tw-animate-css@1.3.3: {}

  typescript@5.0.2: {}

  undici-types@6.11.1: {}

  update-browserslist-db@1.1.3(browserslist@4.25.4):
    dependencies:
      browserslist: 4.25.4
      escalade: 3.2.0
      picocolors: 1.1.1

  use-callback-ref@1.3.3(@types/react@19.0.0)(react@19.0.0):
    dependencies:
      react: 19.0.0
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.0.0

  use-sidecar@1.1.3(@types/react@19.0.0)(react@19.0.0):
    dependencies:
      detect-node-es: 1.1.0
      react: 19.0.0
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.0.0

  use-sync-external-store@1.5.0(react@19.0.0):
    dependencies:
      react: 19.0.0

  vaul@0.9.9(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      '@radix-ui/react-dialog': 1.1.4(@types/react-dom@19.0.0)(@types/react@19.0.0)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
    transitivePeerDependencies:
      - '@types/react'
      - '@types/react-dom'

  victory-vendor@36.9.2:
    dependencies:
      '@types/d3-array': 3.2.1
      '@types/d3-ease': 3.0.2
      '@types/d3-interpolate': 3.0.4
      '@types/d3-scale': 4.0.9
      '@types/d3-shape': 3.1.7
      '@types/d3-time': 3.0.4
      '@types/d3-timer': 3.0.2
      d3-array: 3.2.4
      d3-ease: 3.0.1
      d3-interpolate: 3.0.1
      d3-scale: 4.0.2
      d3-shape: 3.2.0
      d3-time: 3.1.0
      d3-timer: 3.0.1

  vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1):
    dependencies:
      esbuild: 0.25.9
      fdir: 6.5.0(picomatch@4.0.3)
      picomatch: 4.0.3
      postcss: 8.5.6
      rollup: 4.50.1
      tinyglobby: 0.2.15
    optionalDependencies:
      '@types/node': 22.0.0
      fsevents: 2.3.3
      jiti: 2.5.1
      lightningcss: 1.30.1

  vitefu@1.1.1(vite@7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)):
    optionalDependencies:
      vite: 7.1.5(@types/node@22.0.0)(jiti@2.5.1)(lightningcss@1.30.1)

  vue-router@4.5.1(vue@3.5.21(typescript@5.0.2)):
    dependencies:
      '@vue/devtools-api': 6.6.4
      vue: 3.5.21(typescript@5.0.2)

  vue@3.5.21(typescript@5.0.2):
    dependencies:
      '@vue/compiler-dom': 3.5.21
      '@vue/compiler-sfc': 3.5.21
      '@vue/runtime-dom': 3.5.21
      '@vue/server-renderer': 3.5.21(vue@3.5.21(typescript@5.0.2))
      '@vue/shared': 3.5.21
    optionalDependencies:
      typescript: 5.0.2

  yallist@5.0.0: {}

  zimmerframe@1.1.4: {}

  zod@3.25.67: {}



================================================
FILE: postcss.config.mjs
================================================
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config



================================================
FILE: SUPABASE_SETUP.md
================================================
# 🚀 Supabase Setup Guide for BharatKart

## Quick Fix for Current Error

The error `supabaseKey is required` occurs because your `.env.local` file contains placeholder values instead of actual Supabase credentials.

## Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `bharat-kart`
   - Database Password: (create a strong password)
   - Region: (choose closest to your location)
6. Click "Create new project"

### 2. Get Your Project Credentials

Once your project is created:

1. Go to your project dashboard
2. Click on "Settings" in the sidebar
3. Navigate to "API" section
4. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon (public) key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role (secret) key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Update Your Environment Variables

Open your `.env.local` file and replace the placeholder values:

```env
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-service-role-key
```

### 4. Restart Your Development Server

After updating the environment variables:

```bash
# Stop your current server (Ctrl+C)
# Then restart it
npm run dev
```

## Database Setup (Optional)

If you want to set up the complete database schema:

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Run the database migration scripts (we can provide these if needed)

## Troubleshooting

### Common Issues:

1. **Still getting the error after updating .env.local**
   - Make sure you restarted your development server
   - Check that there are no extra spaces in your environment variables
   - Ensure the file is named exactly `.env.local` (not `.env.local.txt`)

2. **Authentication not working**
   - Enable Email authentication in Supabase dashboard: Authentication > Settings > Email

3. **Can't find .env.local file**
   - Create it in the root directory of your project
   - Copy content from `.env.example` and update with real values

## Security Notes

- ✅ **anon key** is safe to expose in client-side code
- ❌ **service_role key** should NEVER be exposed to the client
- 🔒 Always use `.env.local` for local development
- 🚫 Never commit `.env.local` to version control

## Need Help?

If you're still having issues:
1. Double-check your Supabase project is fully created (this can take a minute)
2. Verify the URL format: `https://[project-id].supabase.co`
3. Make sure you copied the complete keys (they're quite long)

Once you update your `.env.local` with real Supabase credentials, the error will be resolved!


================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}



================================================
FILE: app/globals.css
================================================
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Updated color tokens for enhanced BharatKart design */
  --background: #ffffff;
  --foreground: #374151;
  --card: #fefce8;
  --card-foreground: #374151;
  --popover: #ffffff;
  --popover-foreground: #374151;
  --primary: #d97706;
  --primary-foreground: #ffffff;
  --secondary: #84cc16;
  --secondary-foreground: #374151;
  --muted: #f0fdf4;
  --muted-foreground: #6b7280;
  --accent: #d97706;
  --accent-foreground: #ffffff;
  --destructive: #be123c;
  --destructive-foreground: #ffffff;
  --border: #e5e7eb;
  --input: #f9fafb;
  --ring: rgba(217, 119, 6, 0.5);
  --chart-1: #d97706;
  --chart-2: #15803d;
  --chart-3: #be123c;
  --chart-4: #ec4899;
  --chart-5: #84cc16;
  --radius: 0.75rem;
  --sidebar: #fefce8;
  --sidebar-foreground: #374151;
  --sidebar-primary: #d97706;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #84cc16;
  --sidebar-accent-foreground: #374151;
  --sidebar-border: #e5e7eb;
  --sidebar-ring: rgba(217, 119, 6, 0.5);
}

.dark {
  /* Enhanced dark mode tokens */
  --background: #1f2937;
  --foreground: #f9fafb;
  --card: #374151;
  --card-foreground: #f9fafb;
  --popover: #1f2937;
  --popover-foreground: #f9fafb;
  --primary: #f59e0b;
  --primary-foreground: #1f2937;
  --secondary: #84cc16;
  --secondary-foreground: #1f2937;
  --muted: #374151;
  --muted-foreground: #9ca3af;
  --accent: #f59e0b;
  --accent-foreground: #1f2937;
  --destructive: #f87171;
  --destructive-foreground: #1f2937;
  --border: #4b5563;
  --input: #374151;
  --ring: rgba(245, 158, 11, 0.5);
  --chart-1: #f59e0b;
  --chart-2: #84cc16;
  --chart-3: #f87171;
  --chart-4: #ec4899;
  --chart-5: #06b6d4;
  --sidebar: #374151;
  --sidebar-foreground: #f9fafb;
  --sidebar-primary: #f59e0b;
  --sidebar-primary-foreground: #1f2937;
  --sidebar-accent: #84cc16;
  --sidebar-accent-foreground: #1f2937;
  --sidebar-border: #4b5563;
  --sidebar-ring: rgba(245, 158, 11, 0.5);
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    /* Added smooth scrolling and better font rendering */
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Enhanced responsive typography */
  h1 {
    @apply text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight;
  }
  h2 {
    @apply text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight;
  }
  h3 {
    @apply text-xl sm:text-2xl md:text-3xl font-semibold leading-tight;
  }
  h4 {
    @apply text-lg sm:text-xl md:text-2xl font-semibold leading-tight;
  }

  /* Better focus states */
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}

/* Enhanced animations and transitions */
@layer utilities {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-bounce-slow {
    animation: bounce 3s infinite;
  }

  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-gpu {
    transform: translateZ(0);
  }

  .text-balance {
    text-wrap: balance;
  }

  .text-pretty {
    text-wrap: pretty;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Enhanced responsive breakpoints */
@media (max-width: 640px) {
  .container {
    @apply px-4;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .container {
    @apply px-6;
  }
}

@media (min-width: 769px) {
  .container {
    @apply px-8;
  }
}

/* Improved scroll behavior */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  body {
    scroll-behavior: auto;
  }
}



================================================
FILE: app/layout.tsx
================================================
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdvancedSoundProvider } from "@/components/cultural/advanced-sound-manager"
import { NotificationProvider } from "@/components/cultural/premium-notifications"
import { PremiumCursor } from "@/components/cultural/premium-cursor"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"

export const metadata: Metadata = {
  title: "BharatKart - Celebrating India's Heritage",
  description: "Discover authentic Indian crafts and support traditional artisans",
  generator: "v0.app",
}

const geistSans = GeistSans.variable
const geistMono = GeistMono.variable

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans} ${geistMono} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <AdvancedSoundProvider>
                <NotificationProvider>
                  <PremiumCursor />
                  <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                  </Suspense>
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#fff',
                        color: '#333',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '14px',
                      },
                      success: {
                        iconTheme: {
                          primary: '#10b981',
                          secondary: '#fff',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#ef4444',
                          secondary: '#fff',
                        },
                      },
                    }}
                  />
                </NotificationProvider>
              </AdvancedSoundProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}



================================================
FILE: app/loading.tsx
================================================
import { LoadingSpinner } from "@/components/cultural/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" type="chakra" />
        <p className="mt-4 text-orange-600 font-medium">Loading BharatKart...</p>
        <p className="text-sm text-gray-600">भारत कार्ट</p>
      </div>
    </div>
  )
}



================================================
FILE: app/page.tsx
================================================
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PremiumButton } from "@/components/cultural/premium-buttons"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RobustImage } from "@/components/ui/robust-image"
import { ArrowRight, MapPin, Users, Star, Heart, ShoppingBag, Globe, Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"
import { FloatingElements } from "@/components/cultural/floating-elements"
import { ParallaxSection } from "@/components/cultural/parallax-section"
import { CulturalTransition } from "@/components/cultural/cultural-transitions"
import { InteractiveMap } from "@/components/cultural/interactive-map"
import { ThreeDEnvironment } from "@/components/cultural/three-d-environment"
import { useSound, useCulturalSounds } from "@/components/cultural/advanced-sound-manager"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { playAmbient } = useSound()
  const { playHover, playClick } = useCulturalSounds()

  const heroSlides = [
    {
      title: "Where Stories Become Treasures",
      subtitle: "Experience India's Soul Through Authentic Crafts",
      theme: "diwali",
      bgColor: "from-primary via-amber-500 to-orange-600",
    },
    {
      title: "Colors of Heritage",
      subtitle: "Celebrating Holi Through Handcrafted Masterpieces",
      theme: "holi",
      bgColor: "from-pink-500 via-purple-500 to-blue-500",
    },
    {
      title: "Royal Traditions",
      subtitle: "Discover Rajputana Crafts from the Land of Kings",
      theme: "royal",
      bgColor: "from-red-700 via-primary to-orange-500",
    },
  ]

  const culturalStats = [
    { number: "28", label: "States", icon: MapPin },
    { number: "2000+", label: "Artisans", icon: Users },
    { number: "15000+", label: "Products", icon: ShoppingBag },
    { number: "4.9", label: "Rating", icon: Star },
  ]

  const featuredStates = [
    {
      name: "Rajasthan",
      nameHindi: "राजस्थान",
      tagline: "Land of Kings",
      image: "/rajasthan-desert-palace.jpg",
      specialties: ["Blue Pottery", "Kathputli", "Block Prints"],
      color: "from-red-600 to-primary",
    },
    {
      name: "Kerala",
      nameHindi: "केरल",
      tagline: "God's Own Country",
      image: "/kerala-backwaters-coconut.jpg",
      specialties: ["Coir Products", "Spices", "Ayurveda"],
      color: "from-secondary to-teal-500",
    },
    {
      name: "Gujarat",
      nameHindi: "गुजरात",
      tagline: "Vibrant Gujarat",
      image: "/gujarat-colorful-textiles-kites.jpg",
      specialties: ["Bandhani", "Mirror Work", "Patola"],
      color: "from-yellow-500 to-pink-500",
    },
    {
      name: "Tamil Nadu",
      nameHindi: "तमिल नाडु",
      tagline: "Temple Land",
      image: "/tamil-nadu-bronze-temple.jpg",
      specialties: ["Bronze Idols", "Silk Sarees", "Tanjore Art"],
      color: "from-amber-600 to-red-500",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
    playAmbient("landing")

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [playAmbient])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ThreeDEnvironment scene="landing" className="absolute inset-0 z-0" />
      <FloatingElements count={25} />

      <CulturalTransition type="scroll">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={playHover}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                  <p className="text-xs text-primary font-medium">भारत कार्ट</p>
                </div>
              </motion.div>

              <nav className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/states"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base"
                  onMouseEnter={playHover}
                >
                  Explore States
                </Link>
                <Link
                  href="/artisans"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base"
                  onMouseEnter={playHover}
                >
                  Meet Artisans
                </Link>
                <Link
                  href="/collections"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base"
                  onMouseEnter={playHover}
                >
                  Collections
                </Link>
                <PremiumButton
                  size="sm"
                  variant="secondary"
                  className="border-border text-primary hover:bg-muted bg-transparent"
                  data-cursor="button"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  EN | हिं
                </PremiumButton>
              </nav>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <PremiumButton
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:bg-muted"
                    data-cursor="button"
                    onMouseEnter={playHover}
                  >
                    <Heart className="w-5 h-5" />
                  </PremiumButton>
                  <PremiumButton
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:bg-muted"
                    data-cursor="button"
                    onMouseEnter={playHover}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </PremiumButton>
                </div>

                <Link href="/get-started" className="hidden sm:block">
                  <PremiumButton
                    size="lg"
                    variant="primary"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                    data-cursor="button"
                    onClick={playClick}
                  >
                    <span className="hidden md:inline">Get Started</span>
                    <span className="md:hidden">Start</span>
                  </PremiumButton>
                </Link>

                <button
                  className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden mt-4 pt-4 border-t border-border"
                >
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/states"
                      className="text-foreground hover:text-primary transition-colors font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Explore States
                    </Link>
                    <Link
                      href="/artisans"
                      className="text-foreground hover:text-primary transition-colors font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Meet Artisans
                    </Link>
                    <Link
                      href="/collections"
                      className="text-foreground hover:text-primary transition-colors font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Collections
                    </Link>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <PremiumButton size="sm" variant="ghost" className="text-primary">
                          <Heart className="w-5 h-5" />
                        </PremiumButton>
                        <PremiumButton size="sm" variant="ghost" className="text-primary">
                          <ShoppingBag className="w-5 h-5" />
                        </PremiumButton>
                      </div>
                      <Link href="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                        <PremiumButton size="lg" variant="primary" className="bg-primary text-primary-foreground">
                          Get Started
                        </PremiumButton>
                      </Link>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      </CulturalTransition>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="/indian-artisan-crafting-pottery.jpg"
          >
            <source
              src="https://cdn.pixabay.com/vimeo/580351/spinning-wheel-28795.mp4?width=1280&hash=ace9bb74b2a64f76b8a8dafee0f1f7cd23e43a1a"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-orange-800/60 to-amber-900/70" />

          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: "url('/indian-mandala-pattern.png')",
              backgroundSize: "200px 200px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <CulturalTransition key={currentSlide} type="kaleidoscope">
              <motion.div>
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-balance"
                  style={{
                    background: `linear-gradient(135deg, ${heroSlides[currentSlide].bgColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 30px rgba(217, 119, 6, 0.5)",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 30px rgba(217, 119, 6, 0.5)",
                      "0 0 40px rgba(217, 119, 6, 0.8)",
                      "0 0 30px rgba(217, 119, 6, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-yellow-100 font-light max-w-4xl mx-auto text-pretty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
              </motion.div>
            </CulturalTransition>
          </AnimatePresence>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/explore">
              <PremiumButton
                size="lg"
                variant="primary"
                data-cursor="button"
                onClick={playClick}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </PremiumButton>
            </Link>
            <PremiumButton
              size="lg"
              variant="secondary"
              data-cursor="button"
              onClick={playClick}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
            >
              Watch Stories
            </PremiumButton>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {culturalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={playHover}
                data-cursor="product"
              >
                <motion.div
                  className="flex justify-center mb-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </motion.div>
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.5)",
                      "0 0 20px rgba(255, 255, 255, 0.8)",
                      "0 0 10px rgba(255, 255, 255, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm sm:text-base text-yellow-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentSlide(index)
                playClick()
              }}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                index === currentSlide ? "bg-white shadow-lg" : "bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              data-cursor="button"
            />
          ))}
        </div>
      </section>

      {/* Enhanced Heritage Exploration Section */}
      <ParallaxSection speed={0.3}>
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-background via-card to-muted relative">
          <div className="absolute inset-0 opacity-30">
            <ThreeDEnvironment scene="landing" className="w-full h-full" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent text-balance">
                Explore Our Heritage
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
                Journey through 28 states, each with unique traditions and masterful artisans
              </p>

              <div className="mb-8 sm:mb-12">
                <InteractiveMap />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredStates.map((state, index) => (
                <CulturalTransition key={state.name} type="mandala">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      rotateY: 5,
                      scale: 1.02,
                    }}
                    className="perspective-1000"
                    onMouseEnter={playHover}
                    data-cursor="product"
                  >
                    <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
                      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                        <RobustImage
                          src={state.image}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          context="state"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${state.color} opacity-60 group-hover:opacity-40 transition-opacity`}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-gray-800 font-medium text-xs">
                            {state.specialties.length} Crafts
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{state.name}</h3>
                          <p className="text-sm text-primary font-medium">{state.nameHindi}</p>
                          <p className="text-sm text-muted-foreground italic">{state.tagline}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {state.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="text-xs bg-muted text-muted-foreground"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CulturalTransition>
              ))}
            </div>

            <motion.div
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/states">
                <PremiumButton
                  size="lg"
                  variant="primary"
                  data-cursor="button"
                  onClick={playClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                >
                  Explore All 28 States
                  <ArrowRight className="ml-2 w-5 h-5" />
                </PremiumButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Cultural Impact Section */}
      <ParallaxSection speed={0.5}>
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-orange-600 to-amber-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/indian-mandala-pattern.png')] bg-repeat opacity-20" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
                Preserving Heritage, Empowering Artisans
              </h2>
              <p className="text-lg sm:text-xl text-yellow-100 max-w-4xl mx-auto text-pretty">
                Every purchase supports traditional craftspeople and helps preserve India's rich cultural legacy for
                future generations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                { number: "2000+", label: "Artisans Supported", desc: "Across 28 states" },
                { number: "₹50L+", label: "Earnings Generated", desc: "For rural communities" },
                { number: "500+", label: "Traditions Preserved", desc: "Ancient crafts saved" },
              ].map((impact, index) => (
                <motion.div
                  key={impact.label}
                  className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-yellow-300">{impact.number}</div>
                  <div className="text-lg sm:text-xl font-semibold mb-1">{impact.label}</div>
                  <div className="text-yellow-200 text-sm sm:text-base">{impact.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/impact">
                <PremiumButton
                  size="lg"
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent backdrop-blur-sm"
                >
                  Learn About Our Impact
                </PremiumButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Cultural Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">BharatKart</h3>
                  <p className="text-xs text-orange-400">भारत कार्ट</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting India's heritage with the world through authentic craftsmanship.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/states" className="hover:text-white transition-colors">
                    All States
                  </Link>
                </li>
                <li>
                  <Link href="/artisans" className="hover:text-white transition-colors">
                    Meet Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-white transition-colors">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/festivals" className="hover:text-white transition-colors">
                    Festivals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Connect</h4>
              <p className="text-gray-400 mb-4">
                Join our cultural community and stay updated with new artisan stories.
              </p>
              <div className="flex space-x-2">
                <PremiumButton size="sm" variant="primary" className="bg-gradient-to-r from-primary to-orange-600">
                  Subscribe
                </PremiumButton>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BharatKart. Celebrating India's Heritage. Made with ❤️ for our artisans.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}



================================================
FILE: app/api/payments/razorpay/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt, notes } = await request.json()

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Amount must be at least ₹1' },
        { status: 400 }
      )
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paisa
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    })
  } catch (error: any) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Order creation failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    const order = await razorpay.orders.fetch(orderId)

    return NextResponse.json({
      orderId: order.id,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      attempts: order.attempts,
    })
  } catch (error: any) {
    console.error('Razorpay fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { paymentId, orderId, signature } = await request.json()

    // Verify payment signature
    const crypto = require('crypto')
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(orderId + '|' + paymentId)
      .digest('hex')

    if (generated_signature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Fetch payment details
    const payment = await razorpay.payments.fetch(paymentId)

    return NextResponse.json({
      verified: true,
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: Number(payment.amount) / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
    })
  } catch (error: any) {
    console.error('Razorpay verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}


================================================
FILE: app/api/payments/stripe/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'inr', metadata } = await request.json()

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Amount must be at least ₹0.50' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to paisa/cents
      currency,
      metadata: {
        ...metadata,
        integration_check: 'accept_a_payment',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('Stripe payment intent error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment setup failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentIntentId = searchParams.get('payment_intent_id')

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID required' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    })
  } catch (error: any) {
    console.error('Stripe retrieve error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve payment' },
      { status: 500 }
    )
  }
}


================================================
FILE: app/api/states/route.ts
================================================
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    
    const region = searchParams.get("region")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "name"
    
    let query = supabase
      .from("states")
      .select("*")
    
    // Apply filters
    if (region && region !== "all") {
      query = query.eq("region", region)
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,name_hindi.ilike.%${search}%,description.ilike.%${search}%`)
    }
    
    // Apply sorting
    if (sortBy === "artisans") {
      query = query.order("artisans_count", { ascending: false })
    } else if (sortBy === "products") {
      query = query.order("products_count", { ascending: false })
    } else {
      query = query.order("name", { ascending: true })
    }
    
    const { data: states, error } = await query
    
    if (error) {
      console.error("Error fetching states:", error)
      return NextResponse.json(
        { error: "Failed to fetch states" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      states,
      total: states?.length || 0
    })
    
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


================================================
FILE: app/api/states/[slug]/route.ts
================================================
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = createClient()
    const { slug } = await params
    
    // Fetch state data
    const { data: state, error: stateError } = await supabase
      .from("states")
      .select("*")
      .eq("slug", slug)
      .single()
    
    if (stateError) {
      console.error("Error fetching state:", stateError)
      return NextResponse.json(
        { error: "State not found" },
        { status: 404 }
      )
    }
    
    // Fetch products for this state
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select(`
        *,
        artisan:artisans(name, craft, location)
      `)
      .eq("state_id", state.id)
      .eq("is_active", true)
      .limit(12)
    
    if (productsError) {
      console.error("Error fetching products:", productsError)
    }
    
    // Fetch artisans for this state
    const { data: artisans, error: artisansError } = await supabase
      .from("artisans")
      .select("*")
      .eq("state_id", state.id)
      .eq("is_verified", true)
      .limit(6)
    
    if (artisansError) {
      console.error("Error fetching artisans:", artisansError)
    }
    
    return NextResponse.json({
      state,
      products: products || [],
      artisans: artisans || []
    })
    
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


================================================
FILE: app/auth/page.tsx
================================================
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Mail, Lock, User, Phone, Sparkles, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [otpMethod, setOtpMethod] = useState<'email' | 'phone'>('email')
  const [otp, setOtp] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    fullName: '',
  })

  const { signInWithEmail, signUpWithEmail, signInWithPhone, verifyOTP, sendEmailOTP, verifyEmailOTP } = useAuth()
  const router = useRouter()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'login') {
        await signInWithEmail(formData.email, formData.password)
        router.push('/states')
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.fullName)
        toast.success('Account created! Please check your email for verification.')
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOTPAuth = async () => {
    setLoading(true)
    try {
      if (otpMethod === 'email') {
        await sendEmailOTP(formData.email)
      } else {
        await signInWithPhone(formData.phone)
      }
      setMode('otp')
      toast.success(`OTP sent to your ${otpMethod}!`)
    } catch (error) {
      console.error('OTP error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setLoading(true)
    try {
      if (otpMethod === 'email') {
        await verifyEmailOTP(formData.email, otp)
      } else {
        await verifyOTP(formData.phone, otp)
      }
      router.push('/states')
    } catch (error) {
      console.error('Verify OTP error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm0-20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BharatKart
              </h1>
              <p className="text-sm text-orange-600 font-medium">भारत कार्ट</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-orange-200 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to your account</p>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setOtpMethod('email')}
                      disabled={loading}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email OTP
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setOtpMethod('phone')}
                      disabled={loading}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Phone OTP
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('register')}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-orange-200 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join our community of heritage enthusiasts</p>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" 
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {mode === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-orange-200 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
                  <p className="text-gray-600">
                    Enter the OTP sent to your {otpMethod}
                  </p>
                </div>

                {otpMethod === 'email' ? (
                  <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {!otp && (
                      <Button
                        onClick={handleOTPAuth}
                        variant="outline"
                        className="w-full mt-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Email OTP'}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {!otp && (
                      <Button
                        onClick={handleOTPAuth}
                        variant="outline"
                        className="w-full mt-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Phone OTP'}
                      </Button>
                    )}
                  </div>
                )}

                {otp && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>

                    <Button 
                      onClick={handleVerifyOTP}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" 
                      disabled={loading || otp.length !== 6}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>

                    <Button
                      onClick={handleOTPAuth}
                      variant="outline"
                      className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                      disabled={loading}
                    >
                      Resend OTP
                    </Button>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setMode('login')}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    ← Back to sign in
                  </button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


================================================
FILE: app/cart/page.tsx
================================================
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RobustImage } from "@/components/ui/robust-image"
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Sparkles,
  Gift,
  Truck,
  Shield,
  Tag,
  ArrowRight,
  Star,
  Crown,
} from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "RAJ001",
      name: "Royal Kathputli Puppet",
      nameHindi: "राजकुमारी कठपुतली",
      price: 1250,
      originalPrice: 1800,
      quantity: 1,
      image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
      artisan: "Ramesh Kumar",
      state: "Rajasthan",
      stateColor: "from-red-500 to-orange-600",
      borderPattern: "border-red-200 bg-gradient-to-r from-red-50 to-orange-50",
      inStock: true,
      culturalSignificance: "Traditional Rajasthani string puppet art form dating back to 1000 years",
    },
    {
      id: "GUJ001",
      name: "Bandhani Silk Dupatta",
      nameHindi: "बांधनी रेशम दुपट्टा",
      price: 850,
      originalPrice: 1200,
      quantity: 2,
      image: "/gujarati-bandhani-silk-dupatta-colorful-tie-dye.jpg",
      artisan: "Meera Patel",
      state: "Gujarat",
      stateColor: "from-blue-500 to-green-600",
      borderPattern: "border-blue-200 bg-gradient-to-r from-blue-50 to-green-50",
      inStock: true,
      culturalSignificance: "Ancient tie-dye technique creating beautiful patterns",
    },
    {
      id: "TN001",
      name: "Bronze Ganesha Idol",
      nameHindi: "कांस्य गणेश मूर्ति",
      price: 2200,
      originalPrice: 2800,
      quantity: 1,
      image: "/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg",
      artisan: "Suresh Kumar",
      state: "Tamil Nadu",
      stateColor: "from-yellow-600 to-amber-700",
      borderPattern: "border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50",
      inStock: false,
      culturalSignificance: "Traditional Chola bronze casting technique from 9th century",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const playBellSound = () => {
    // Cultural temple bell sound effect (would be actual audio in production)
    console.log("🔔 Temple bell chime - item added to cart")
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
    playBellSound()
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode === "DIWALI20") {
      setAppliedPromo("DIWALI20")
      setPromoCode("")
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const promoDiscount = appliedPromo === "DIWALI20" ? Math.round(subtotal * 0.2) : 0
  const shipping = subtotal > 1500 ? 0 : 99
  const total = subtotal - promoDiscount + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f97316' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200 shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/explore"
                className="flex items-center text-orange-600 hover:text-orange-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                  <p className="text-xs text-orange-500 font-medium">Royal Shopping Basket</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
                <Heart className="w-5 h-5" />
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Royal Shopping Basket
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {cartItems.length} cultural {cartItems.length === 1 ? "treasure" : "treasures"} awaiting your blessing
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <ShoppingBag className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cultural Journey Awaits</h2>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Discover the magnificent heritage of India through authentic crafts from master artisans
            </p>
            <Link href="/states">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Explore States
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card
                      className={`p-6 border-2 ${item.borderPattern} hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.stateColor}`} />

                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-40 h-40 flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg transform rotate-1" />
                          <div className="relative bg-white p-2 rounded-lg shadow-lg">
                            <RobustImage
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded"
                              context="product"
                            />
                          </div>
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                            </div>
                          )}
                          <Badge
                            className={`absolute -top-2 -right-2 bg-gradient-to-r ${item.stateColor} text-white shadow-lg`}
                          >
                            {item.state}
                          </Badge>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                              <p className="text-orange-600 font-medium text-lg mb-1" style={{ fontFamily: "serif" }}>
                                {item.nameHindi}
                              </p>
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-4 h-4 text-orange-500 fill-current" />
                                <p className="text-sm text-gray-600">
                                  by <span className="font-medium text-orange-700">{item.artisan}</span>
                                </p>
                              </div>
                              <p className="text-xs text-gray-500 italic max-w-md">{item.culturalSignificance}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl font-bold text-gray-800">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{item.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Save ₹{(item.originalPrice - item.price).toLocaleString("en-IN")}
                              </Badge>
                            </div>

                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center bg-white border-2 border-orange-200 rounded-full shadow-inner">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="text-orange-600 hover:bg-orange-50 rounded-full w-10 h-10"
                                  disabled={!item.inStock}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <div className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center">
                                  <span className="text-gray-800">{item.quantity}</span>
                                  <div className="text-xs text-orange-600" style={{ fontFamily: "serif" }}>
                                    {/* Devanagari numerals option */}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-orange-600 hover:bg-orange-50 rounded-full w-10 h-10"
                                  disabled={!item.inStock}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {!item.inStock && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                            >
                              <p className="text-sm text-red-700 font-medium">
                                🙏 This sacred item is currently unavailable. Please remove it to continue your cultural
                                journey.
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-orange-600" />
                    Festival Blessings & Offers
                  </h3>
                  {appliedPromo ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-50" />
                      <div className="flex items-center relative z-10">
                        <Badge className="bg-green-500 text-white mr-3 shadow-lg">{appliedPromo}</Badge>
                        <span className="text-green-700 font-medium">
                          🎉 Diwali blessing applied! 20% divine discount
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedPromo(null)}
                        className="text-green-700 hover:bg-green-100 relative z-10"
                      >
                        Remove
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter sacred code (try DIWALI20 for divine blessings)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="border-orange-200 focus:border-orange-500 bg-white"
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg"
                      >
                        Apply Blessing
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 border-2 border-orange-100 sticky top-24 bg-gradient-to-br from-white to-orange-50 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Royal Treasury</h3>
                  <p className="text-sm text-orange-600">Sacred Purchase Summary</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal ({cartItems.length} treasures)</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Divine Savings</span>
                    <span>-₹{savings.toLocaleString("en-IN")}</span>
                  </div>
                  {appliedPromo && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between text-green-600 font-medium"
                    >
                      <span>Festival Blessing ({appliedPromo})</span>
                      <span>-₹{promoDiscount.toLocaleString("en-IN")}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between">
                    <span>Sacred Delivery</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "🆓 FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      Add ₹{(1500 - subtotal).toLocaleString("en-IN")} more for free sacred delivery
                    </p>
                  )}
                  <hr className="border-orange-200" />
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total Blessing</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                  <div className="flex items-center text-sm text-gray-700">
                    <Truck className="w-4 h-4 mr-2 text-orange-600" />
                    Sacred delivery blessed by tradition
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Shield className="w-4 h-4 mr-2 text-orange-600" />
                    Protected by cultural trust & security
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Gift className="w-4 h-4 mr-2 text-orange-600" />
                    Blessed gift wrapping available
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      disabled={cartItems.some((item) => !item.inStock)}
                    >
                      <Crown className="mr-2 w-5 h-5" />
                      Begin Sacred Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/states">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-orange-300 text-orange-600 bg-transparent hover:bg-orange-50"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Explore More Treasures
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="text-6xl">🎉</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}



================================================
FILE: app/checkout/page.tsx
================================================
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Truck,
  Shield,
  CheckCircle,
  Sparkles,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })
  
  const { items, totalAmount, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const steps = [
    { id: 1, title: "Address", icon: MapPin },
    { id: 2, title: "Delivery", icon: Truck },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Review", icon: CheckCircle },
  ]

  const shipping = 0 // Free shipping
  const total = totalAmount + shipping

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please sign in to complete your order')
      router.push('/auth')
      return
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setIsProcessing(true)

    try {
      let paymentResponse
      
      if (paymentMethod === 'razorpay' || paymentMethod === 'upi') {
        // Use Razorpay for UPI and card payments in India
        paymentResponse = await fetch('/api/payments/razorpay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
              userId: user.id,
              items: items.length,
            },
          }),
        })
      } else {
        // Use Stripe for international payments
        paymentResponse = await fetch('/api/payments/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'inr',
            metadata: {
              userId: user.id,
              items: items.length,
            },
          }),
        })
      }

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || 'Payment setup failed')
      }

      // For demo purposes, we'll simulate successful payment
      setTimeout(() => {
        toast.success('Payment successful! Order placed.')
        clearCart()
        router.push('/orders')
      }, 2000)

    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error(error.message || 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Cart
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-orange-600" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${currentStep > step.id ? "bg-orange-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter first name" 
                          value={shippingAddress.firstName}
                          onChange={(e) => handleAddressChange('firstName', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter last name" 
                          value={shippingAddress.lastName}
                          onChange={(e) => handleAddressChange('lastName', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter email address" 
                          value={shippingAddress.email}
                          onChange={(e) => handleAddressChange('email', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="+91 XXXXX XXXXX" 
                          value={shippingAddress.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          placeholder="House no, Building, Street" 
                          value={shippingAddress.address}
                          onChange={(e) => handleAddressChange('address', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          placeholder="Enter city" 
                          value={shippingAddress.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={shippingAddress.state} onValueChange={(value) => handleAddressChange('state', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="west-bengal">West Bengal</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input 
                          id="pincode" 
                          placeholder="Enter PIN code" 
                          value={shippingAddress.pincode}
                          onChange={(e) => handleAddressChange('pincode', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="mt-6 bg-gradient-to-r from-orange-500 to-red-600 text-white"
                    >
                      Continue to Delivery
                    </Button>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Delivery */}
              {currentStep === 2 && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Options</h2>
                    <div className="space-y-4">
                      <div className="p-4 border-2 border-orange-200 rounded-lg bg-orange-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">Standard Delivery</h3>
                            <p className="text-sm text-gray-600">5-7 business days</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600">FREE</span>
                            <p className="text-xs text-gray-500">Above ₹1500</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">Express Delivery</h3>
                            <p className="text-sm text-gray-600">2-3 business days</p>
                          </div>
                          <span className="text-lg font-bold text-gray-800">₹199</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <Button
                        onClick={() => setCurrentStep(1)}
                        variant="outline"
                        className="border-orange-300 text-orange-600 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
                    <div className="space-y-4">
                      {[
                        { id: "razorpay", label: "Razorpay (UPI/Cards)", icon: Smartphone, desc: "Pay using UPI, Cards, Wallets" },
                        { id: "stripe", label: "International Cards", icon: CreditCard, desc: "Visa, Mastercard (International)" },
                        { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="w-6 h-6 text-orange-600" />
                            <div>
                              <h3 className="font-semibold text-gray-800">{method.label}</h3>
                              <p className="text-sm text-gray-600">{method.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-1" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex space-x-4 mt-6">
                      <Button
                        onClick={() => setCurrentStep(2)}
                        variant="outline"
                        className="border-orange-300 text-orange-600 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(4)}
                        disabled={!paymentMethod}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      >
                        Review Order
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Review Your Order</h2>

                    <div className="space-y-6">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-4">Order Items</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.product.images?.[0] || "/placeholder.svg"}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.product.name}</h4>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <p className="text-gray-600 capitalize">{paymentMethod.replace(/([A-Z])/g, " $1")}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <Button
                        onClick={() => setCurrentStep(3)}
                        variant="outline"
                        className="border-orange-300 text-orange-600 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      >
                        {isProcessing ? "Processing..." : `Pay ₹${total}`}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 border-orange-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-700">
                  <Shield className="w-4 h-4 mr-2 text-orange-600" />
                  100% secure payment
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Truck className="w-4 h-4 mr-2 text-orange-600" />
                  Free delivery in 5-7 days
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}



================================================
FILE: app/explore/loading.tsx
================================================
export default function Loading() {
  return null
}



================================================
FILE: app/explore/page.tsx
================================================
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  MapPin,
  Users,
  Sparkles,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Play,
  Calendar,
  Award,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentFestival, setCurrentFestival] = useState(0)

  const festivals = [
    {
      name: "Diwali",
      nameHindi: "दीवाली",
      date: "Nov 12, 2024",
      description: "Festival of Lights",
      products: ["Diyas", "Rangoli", "Sweets"],
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Holi",
      nameHindi: "होली",
      date: "Mar 14, 2025",
      description: "Festival of Colors",
      products: ["Gulal", "Pichkari", "Sweets"],
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "Durga Puja",
      nameHindi: "दुर्गा पूजा",
      date: "Oct 9, 2024",
      description: "Divine Mother Festival",
      products: ["Idols", "Decorations", "Offerings"],
      color: "from-red-500 to-yellow-500",
    },
  ]

  const artisanStories = [
    {
      id: 1,
      name: "Ramesh Kumar",
      craft: "Kathputli Puppets",
      state: "Rajasthan",
      experience: "25 years",
      image: "/rajasthan-desert-palace.jpg",
      story: "Third generation puppet maker preserving ancient traditions",
      rating: 4.9,
      products: 45,
    },
    {
      id: 2,
      name: "Lakshmi Devi",
      craft: "Madhubani Paintings",
      state: "Bihar",
      experience: "18 years",
      image: "/kerala-backwaters-coconut.jpg",
      story: "Bringing mythological stories to life through vibrant art",
      rating: 4.8,
      products: 32,
    },
    {
      id: 3,
      name: "Suresh Patel",
      craft: "Bandhani Textiles",
      state: "Gujarat",
      experience: "30 years",
      image: "/gujarat-colorful-textiles-kites.jpg",
      story: "Master of tie-dye techniques passed down through generations",
      rating: 4.9,
      products: 67,
    },
  ]

  const collections = [
    {
      name: "Textiles",
      count: "2,500+ items",
      image: "/gujarat-colorful-textiles-kites.jpg",
      description: "Handwoven fabrics from across India",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Pottery",
      count: "1,800+ items",
      image: "/indian-artisan-crafting-pottery.jpg",
      description: "Clay creations from master potters",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Jewelry",
      count: "3,200+ items",
      image: "/tamil-nadu-bronze-temple.jpg",
      description: "Traditional ornaments and accessories",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Paintings",
      count: "950+ items",
      image: "/indian-mandala-pattern.png",
      description: "Folk and classical art forms",
      color: "from-green-500 to-teal-600",
    },
    {
      name: "Sculptures",
      count: "650+ items",
      image: "/tamil-nadu-bronze-temple.jpg",
      description: "Stone and metal masterpieces",
      color: "from-purple-500 to-pink-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFestival((prev) => (prev + 1) % festivals.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Cultural Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  BharatKart
                </h1>
                <p className="text-xs text-orange-600 font-medium">भारत कार्ट</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <Input
                  placeholder="Search for crafts, artisans, or states..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 border-orange-200 focus:border-orange-500 focus:ring-orange-500 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Cultural Carousel */}
      <section className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFestival}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${festivals[currentFestival].color}`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <motion.h2
                  className="text-5xl font-bold mb-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {festivals[currentFestival].name}
                </motion.h2>
                <motion.p
                  className="text-xl mb-2 text-yellow-100"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {festivals[currentFestival].nameHindi}
                </motion.p>
                <motion.p
                  className="text-lg mb-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {festivals[currentFestival].description} • {festivals[currentFestival].date}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {festivals[currentFestival].products.map((product) => (
                    <Badge key={product} className="bg-white/20 text-white border-white/30">
                      {product}
                    </Badge>
                  ))}
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                    Shop Festival Collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Festival Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {festivals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFestival(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentFestival ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* States Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Explore Our Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Journey through 28 states, each with unique traditions and masterful artisans
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="border-orange-300 text-orange-600"
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-600 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: MapPin, number: "28", label: "States Covered" },
              { icon: Users, number: "2000+", label: "Active Artisans" },
              { icon: ShoppingBag, number: "15K+", label: "Unique Products" },
              { icon: Star, number: "4.9", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white rounded-xl shadow-lg border border-orange-100"
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* States Grid - Showing first 8 states */}
          <div
            className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-8`}
          >
            {[
              {
                name: "Rajasthan",
                nameHindi: "राजस्थान",
                specialties: ["Blue Pottery", "Kathputli", "Block Prints"],
                image: "/rajasthan-desert-palace.jpg",
                color: "from-red-600 to-orange-500",
              },
              {
                name: "Kerala",
                nameHindi: "केरल",
                specialties: ["Coir Products", "Spices", "Ayurveda"],
                image: "/kerala-backwaters-coconut.jpg",
                color: "from-green-600 to-teal-500",
              },
              {
                name: "Gujarat",
                nameHindi: "गुजरात",
                specialties: ["Bandhani", "Mirror Work", "Patola"],
                image: "/gujarat-colorful-textiles-kites.jpg",
                color: "from-yellow-500 to-pink-500",
              },
              {
                name: "Tamil Nadu",
                nameHindi: "तमिल नाडु",
                specialties: ["Bronze Idols", "Silk Sarees", "Tanjore Art"],
                image: "/tamil-nadu-bronze-temple.jpg",
                color: "from-amber-600 to-red-500",
              },
              {
                name: "West Bengal",
                nameHindi: "पश्चिम बंगाल",
                specialties: ["Kantha Embroidery", "Terracotta", "Dokra Art"],
                image: "/indian-mandala-pattern.png",
                color: "from-purple-600 to-blue-500",
              },
              {
                name: "Uttar Pradesh",
                nameHindi: "उत्तर प्रदेश",
                specialties: ["Chikankari", "Brass Work", "Carpets"],
                image: "/indian-artisan-crafting-pottery.jpg",
                color: "from-indigo-600 to-purple-500",
              },
              {
                name: "Maharashtra",
                nameHindi: "महाराष्ट्र",
                specialties: ["Warli Art", "Paithani Sarees", "Kolhapuri Chappals"],
                image: "/rajasthan-desert-palace.jpg",
                color: "from-orange-600 to-yellow-500",
              },
              {
                name: "Karnataka",
                nameHindi: "कर्नाटक",
                specialties: ["Mysore Silk", "Sandalwood Crafts", "Channapatna Toys"],
                image: "/kerala-backwaters-coconut.jpg",
                color: "from-teal-600 to-green-500",
              },
            ].map((state, index) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/states/${state.name.toLowerCase().replace(" ", "-")}`}>
                  <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={state.image || "/placeholder.svg"}
                        alt={state.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${state.color} opacity-60 group-hover:opacity-40 transition-opacity`}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 font-medium">
                          {state.specialties.length} Crafts
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{state.name}</h3>
                        <p className="text-sm text-orange-600 font-medium">{state.nameHindi}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {state.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/states">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              >
                View All 28 States
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Artisan Stories Showcase */}
      <section className="py-20 bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Meet Our Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the passionate artisans behind every masterpiece
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisanStories.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={artisan.image || "/placeholder.svg"}
                      alt={artisan.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{artisan.rating}</span>
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30">{artisan.products} Products</Badge>
                    </div>
                    <Button
                      size="sm"
                      className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{artisan.name}</h3>
                      <p className="text-orange-600 font-medium">{artisan.craft}</p>
                      <p className="text-sm text-gray-600">
                        {artisan.state} • {artisan.experience}
                      </p>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{artisan.story}</p>

                    <Button
                      variant="outline"
                      className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      View Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cultural Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections of authentic Indian crafts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="perspective-1000"
              >
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
                  <div className="relative h-full">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-70 group-hover:opacity-50 transition-opacity`}
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                        <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                        <Badge className="bg-white/20 text-white border-white/30">{collection.count}</Badge>
                      </div>

                      <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                        Explore Collection
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Impact Dashboard */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/indian-mandala-pattern.png" alt="Pattern" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cultural Impact Dashboard</h2>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Real-time insights into how we're preserving heritage and empowering communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Users, number: "2,847", label: "Artisans Supported", change: "+12%" },
              { icon: Globe, number: "₹2.4Cr", label: "Earnings Generated", change: "+28%" },
              { icon: Award, number: "547", label: "Traditions Preserved", change: "+8%" },
              { icon: Calendar, number: "156", label: "Cultural Events", change: "+15%" },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-yellow-300" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2 text-yellow-300">{metric.number}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">{metric.change} this month</Badge>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
            >
              View Detailed Impact Report
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}



================================================
FILE: app/get-started/page.tsx
================================================
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { PremiumButton } from "@/components/cultural/premium-buttons"
import { PremiumInput } from "@/components/cultural/premium-inputs"
import { ThreeDBackground } from "@/components/cultural/three-d-background"
import { useSound } from "@/components/cultural/advanced-sound-manager"
import { useAuth } from "@/contexts/AuthContext"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function GetStartedPage() {
  const [mode, setMode] = useState<"choice" | "login" | "register">("choice")
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { playSound } = useSound()
  const { signInWithEmail, signUpWithEmail, user } = useAuth()
  const router = useRouter()

  const culturalPatterns = [
    "M12 2L2 7L12 12L22 7L12 2Z",
    "M12 2L2 7V17L12 22L22 17V7L12 2Z",
    "M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    } else if (currentStep === 2) {
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.location.trim()) newErrors.location = "State selection is required"
    } else if (currentStep === 3) {
      if (!formData.password.trim()) newErrors.password = "Password is required"
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      playSound("success")
      setStep(step + 1)
    } else {
      playSound("error")
    }
  }

  const handleBack = () => {
    playSound("click")
    setStep(step - 1)
  }

  const handleModeChange = (newMode: typeof mode) => {
    playSound("click")
    setMode(newMode)
  }

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : ""
      })
      playSound("error")
      return
    }

    setLoading(true)
    try {
      await signInWithEmail(formData.email, formData.password)
      playSound("success")
      router.push("/states")
    } catch (error) {
      console.error("Login error:", error)
      playSound("error")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!validateStep(3)) {
      playSound("error")
      return
    }

    setLoading(true)
    try {
      await signUpWithEmail(formData.email, formData.password, formData.name)
      playSound("success")
      toast.success("Account created! Please check your email for verification.")
      router.push("/states")
    } catch (error) {
      console.error("Registration error:", error)
      playSound("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      <ThreeDBackground scene="landing" intensity="low" />

      {/* Cultural Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" className="text-orange-600">
              <path fill="currentColor" d={culturalPatterns[i % culturalPatterns.length]} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  BharatKart
                </h1>
                <p className="text-sm text-orange-600 font-medium">भारत कार्ट</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {mode === "choice" && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Heritage Gateway</h2>
                    <p className="text-gray-600">Begin your journey through India's cultural treasures</p>
                  </div>

                  <div className="space-y-4">
                    <PremiumButton
                      onClick={() => handleModeChange("login")}
                      variant="primary"
                      size="lg"
                      className="w-full py-6 text-lg"
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      Sign In to Your Account
                    </PremiumButton>

                    <PremiumButton
                      onClick={() => handleModeChange("register")}
                      variant="secondary"
                      size="lg"
                      className="w-full py-6 text-lg"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Create New Account
                    </PremiumButton>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-4">Or continue as guest</p>
                    <Link href="/explore">
                      <PremiumButton variant="cultural" className="text-orange-600 hover:text-orange-700">
                        Explore Without Account
                      </PremiumButton>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )}

            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Heritage Gateway</h2>
                    <p className="text-gray-600">Welcome back to your cultural journey</p>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <PremiumInput
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      error={errors.email}
                      icon={<Mail className="w-5 h-5" />}
                    />

                    <PremiumInput
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(value) => handleInputChange("password", value)}
                      error={errors.password}
                      icon={<Lock className="w-5 h-5" />}
                    />

                    <PremiumButton variant="primary" size="lg" className="w-full py-3" onClick={handleLogin}>
                      Sign In
                    </PremiumButton>
                  </form>

                  <div className="mt-6 text-center">
                    <PremiumButton
                      onClick={() => handleModeChange("choice")}
                      variant="cultural"
                      className="text-orange-600 hover:text-orange-700 text-sm"
                    >
                      ← Back to options
                    </PremiumButton>
                  </div>
                </Card>
              </motion.div>
            )}

            {mode === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Cultural Discovery</h2>
                    <p className="text-gray-600">Join our community of heritage enthusiasts</p>

                    {/* Progress Mandala */}
                    <div className="flex justify-center mt-4">
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((s) => (
                          <motion.div
                            key={s}
                            className={`w-3 h-3 rounded-full transition-all ${s <= step ? "bg-orange-500" : "bg-orange-200"}`}
                            animate={{ scale: s === step ? 1.2 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.form
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <PremiumInput
                          label="Full Name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(value) => handleInputChange("name", value)}
                          error={errors.name}
                          icon={<User className="w-5 h-5" />}
                        />

                        <PremiumInput
                          label="Email Address"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(value) => handleInputChange("email", value)}
                          error={errors.email}
                          success={formData.email && !errors.email && /\S+@\S+\.\S+/.test(formData.email) ? true : undefined}
                          icon={<Mail className="w-5 h-5" />}
                        />

                        <PremiumButton
                          onClick={handleNext}
                          variant="primary"
                          size="lg"
                          className="w-full py-3"
                        >
                          Continue
                        </PremiumButton>
                      </motion.form>
                    )}

                    {step === 2 && (
                      <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <PremiumInput
                          label="Phone Number"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(value) => handleInputChange("phone", value)}
                          error={errors.phone}
                          icon={<Phone className="w-5 h-5" />}
                        />

                        <PremiumInput
                          label="Your State"
                          placeholder="Select your state"
                          value={formData.location}
                          onChange={(value) => handleInputChange("location", value)}
                          error={errors.location}
                          icon={<MapPin className="w-5 h-5" />}
                        />

                        <div className="flex space-x-3">
                          <PremiumButton
                            onClick={handleBack}
                            variant="secondary"
                            size="lg"
                            className="flex-1"
                          >
                            Back
                          </PremiumButton>
                          <PremiumButton
                            onClick={handleNext}
                            variant="primary"
                            size="lg"
                            className="flex-1"
                          >
                            Continue
                          </PremiumButton>
                        </div>
                      </motion.form>
                    )}

                    {step === 3 && (
                      <motion.form
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <PremiumInput
                          label="Create Password"
                          type="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(value) => handleInputChange("password", value)}
                          error={errors.password}
                          success={formData.password && formData.password.length >= 6 ? true : undefined}
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <PremiumInput
                          label="Confirm Password"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(value) => handleInputChange("confirmPassword", value)}
                          error={errors.confirmPassword}
                          success={formData.confirmPassword && formData.password === formData.confirmPassword ? true : undefined}
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <div className="flex space-x-3">
                          <PremiumButton
                            onClick={handleBack}
                            variant="secondary"
                            size="lg"
                            className="flex-1"
                          >
                            Back
                          </PremiumButton>
                          <PremiumButton
                            variant="primary"
                            size="lg"
                            className="flex-1"
                            onClick={() => {
                              if (validateStep(3)) {
                                playSound("success")
                                handleRegister()
                              } else {
                                playSound("error")
                              }
                            }}
                          >
                            Create Account
                          </PremiumButton>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 text-center">
                    <PremiumButton
                      onClick={() => handleModeChange("choice")}
                      variant="cultural"
                      className="text-orange-600 hover:text-orange-700 text-sm"
                    >
                      ← Back to options
                    </PremiumButton>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}



================================================
FILE: app/products/[id]/page.tsx
================================================
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Share2,
  ZoomIn,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Sparkles,
  Plus,
  Minus,
  Play,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Sample product data - in real app this would come from API
  const product = {
    id: "RAJ001",
    name: "Royal Kathputli Puppet",
    nameHindi: "राजकुमारी कठपुतली",
    price: 1250,
    originalPrice: 1800,
    discount: 30,
    rating: 4.8,
    reviewCount: 147,
    inStock: true,
    stockCount: 25,
    images: [
      "/rajasthan-desert-palace.jpg",
      "/indian-artisan-crafting-pottery.jpg",
      "/gujarat-colorful-textiles-kites.jpg",
      "/tamil-nadu-bronze-temple.jpg",
    ],
    description:
      "Handcrafted Kathputli puppet representing 500+ years of Rajasthani tradition. Each puppet is meticulously carved from mango wood and dressed in vibrant traditional attire with intricate embroidery and mirror work.",
    culturalSignificance:
      "Kathputli is an ancient string puppet theatre form that originated in Rajasthan over 1000 years ago. These puppets were traditionally used by traveling bards to tell stories of heroic deeds and romantic tales.",
    materials: ["Mango Wood", "Cotton Fabric", "Natural Colors", "Mirror Work"],
    dimensions: "30cm height, 15cm width",
    weight: "200g",
    deliveryTime: "5-7 days",
    artisan: {
      id: "ART001",
      name: "Ramesh Kumar",
      experience: "25 years",
      location: "Udaipur, Rajasthan",
      specialty: "Traditional Puppet Making",
      story: "Third generation puppet maker preserving ancient Rajasthani traditions",
      photo: "/rajasthan-desert-palace.jpg",
      rating: 4.9,
      totalSales: 1200,
    },
    features: {
      handmade: true,
      ecoFriendly: true,
      fastDelivery: true,
      giftWrapping: true,
      customizable: false,
    },
    reviews: [
      {
        id: 1,
        user: "Priya Sharma",
        rating: 5,
        comment: "Absolutely beautiful craftsmanship! The attention to detail is incredible.",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: 2,
        user: "Amit Patel",
        rating: 4,
        comment: "Great quality puppet. My daughter loves it. Fast delivery too.",
        date: "2024-01-10",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: "RAJ002",
        name: "Blue Pottery Vase",
        price: 850,
        image: "/indian-artisan-crafting-pottery.jpg",
        rating: 4.7,
      },
      {
        id: "RAJ003",
        name: "Block Print Bedsheet",
        price: 2200,
        image: "/gujarat-colorful-textiles-kites.jpg",
        rating: 4.9,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/explore" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Products
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button size="sm" className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                {product.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">{product.discount}% OFF</Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-lg text-orange-600 font-medium mb-2">{product.nameHindi}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                  <Badge variant="secondary" className="text-green-600">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                <Badge className="bg-green-100 text-green-800">Save ₹{product.originalPrice - product.price}</Badge>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features.handmade && (
                  <Badge variant="outline" className="border-orange-300 text-orange-600">
                    <Award className="w-3 h-3 mr-1" />
                    Handmade
                  </Badge>
                )}
                {product.features.ecoFriendly && (
                  <Badge variant="outline" className="border-green-300 text-green-600">
                    Eco-Friendly
                  </Badge>
                )}
                {product.features.fastDelivery && (
                  <Badge variant="outline" className="border-blue-300 text-blue-600">
                    <Truck className="w-3 h-3 mr-1" />
                    Fast Delivery
                  </Badge>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-orange-200 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-orange-600"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">({product.stockCount} available)</span>
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`border-orange-300 ${
                      isWishlisted ? "bg-orange-50 text-red-500" : "text-orange-600"
                    } hover:bg-orange-50`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-600">{product.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-600">30 day return</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-600">100% protected</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-1 bg-orange-100 rounded-lg p-1 mb-8 max-w-2xl">
            {[
              { id: "description", label: "Description" },
              { id: "artisan", label: "Meet the Artisan" },
              { id: "reviews", label: "Reviews" },
              { id: "shipping", label: "Shipping & Returns" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                    : "text-orange-600 hover:bg-orange-200"
                }
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Product Description</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Cultural Significance</h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.culturalSignificance}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Specifications</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Materials:</span>
                      <span className="text-gray-600">{product.materials.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Dimensions:</span>
                      <span className="text-gray-600">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Weight:</span>
                      <span className="text-gray-600">{product.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Delivery Time:</span>
                      <span className="text-gray-600">{product.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "artisan" && (
              <motion.div
                key="artisan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center space-x-6">
                      <img
                        src={product.artisan.photo || "/placeholder.svg"}
                        alt={product.artisan.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.artisan.name}</h3>
                        <p className="text-orange-600 font-medium mb-1">{product.artisan.specialty}</p>
                        <p className="text-gray-600 text-sm mb-2">
                          {product.artisan.location} • {product.artisan.experience}
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{product.artisan.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">{product.artisan.totalSales} sales</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800">Artisan's Story</h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">{product.artisan.story}</p>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Story
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h3>
                    <div className="space-y-4">
                      {product.reviews.map((review) => (
                        <Card key={review.id} className="p-6 border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.user}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-green-600 text-xs">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h4>
                    <Card className="p-6 border-orange-100">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Review</label>
                          <Textarea
                            placeholder="Share your experience with this product..."
                            className="border-orange-200 focus:border-orange-500"
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white">
                          Submit Review
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-800">₹{relatedProduct.price}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm">{relatedProduct.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                      View Product
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}



================================================
FILE: app/states/loading.tsx
================================================
export default function Loading() {
  return null
}



================================================
FILE: app/states/page.tsx
================================================
"use client"
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RobustImage } from "@/components/ui/robust-image"
import {
  ArrowLeft,
  MapPin,
  Search,
  Star,
  Heart,
  ShoppingBag,
  Filter,
  Grid3X3,
  List,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { getAllStates, getStatesByRegion } from "@/lib/states-data"

export default function StatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  
  const allStates = getAllStates()
  
  const regions = [
    { id: "all", name: "All Regions", count: allStates.length },
    { id: "North", name: "Northern States", count: getStatesByRegion("North").length },
    { id: "South", name: "Southern States", count: getStatesByRegion("South").length },
    { id: "East", name: "Eastern States", count: getStatesByRegion("East").length },
    { id: "West", name: "Western States", count: getStatesByRegion("West").length },
    { id: "Northeast", name: "Northeast States", count: getStatesByRegion("Northeast").length },
    { id: "Central", name: "Central States", count: getStatesByRegion("Central").length },
  ]

  const filteredStates = allStates
    .filter((state) => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           state.nameHindi.includes(searchTerm) ||
                           state.specialties.some(specialty => 
                             specialty.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      const matchesRegion = selectedRegion === "all" || state.region === selectedRegion
      return matchesSearch && matchesRegion
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "artisans":
          return b.statistics.artisans - a.statistics.artisans
        case "products":
          return b.statistics.products - a.statistics.products
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/indian-mandala-pattern.png')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Explore India's Heritage
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Journey through 28 states, each with unique traditions and masterful artisans
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">28</div>
                <div className="text-orange-200">States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2000+</div>
                <div className="text-orange-200">Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-orange-200">Crafts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15K+</div>
                <div className="text-orange-200">Products</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search states, crafts, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-500"
              />
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region.id)}
                  size="sm"
                  className={
                    selectedRegion === region.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {region.name} ({region.count})
                </Button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="name">Sort by Name</option>
                <option value="artisans">Sort by Artisans</option>
                <option value="products">Sort by Products</option>
              </select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                  className={
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                  className={
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-orange-50">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            Showing {filteredStates.length} of {allStates.length} states
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedRegion !== "all" && ` in ${regions.find(r => r.id === selectedRegion)?.name}`}
          </p>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${selectedRegion}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`grid gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}
            >
              {filteredStates.map((state, index) => (
                <motion.div
                  key={state.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={`/states/${state.slug}`}>
                    <Card
                      className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80 h-48" : "h-64"}`}>
                        <RobustImage
                          src={state.backgroundImage}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          context="state"
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                          style={{
                            background: `linear-gradient(to top, ${state.colors.primary}CC, transparent)`
                          }}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-gray-800">
                            {state.specialties.length} Crafts
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">{state.name}</h3>
                          <p className="text-orange-200">{state.nameHindi}</p>
                        </div>
                      </div>

                      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                              {state.region}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">4.8</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm italic mb-3">{state.tagline}</p>
                          <p className="text-gray-700 text-sm line-clamp-2">{state.description}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                          <div>
                            <div className="text-orange-600 font-bold">{state.statistics.artisans}</div>
                            <div className="text-xs text-gray-500">Artisans</div>
                          </div>
                          <div>
                            <div className="text-orange-600 font-bold">{state.statistics.products}</div>
                            <div className="text-xs text-gray-500">Products</div>
                          </div>
                          <div>
                            <div className="text-orange-600 font-bold">{state.statistics.festivals}</div>
                            <div className="text-xs text-gray-500">Festivals</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {state.specialties.slice(0, 3).map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="text-xs border-orange-200 text-orange-600"
                            >
                              {specialty}
                            </Badge>
                          ))}
                          {state.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
                              +{state.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                          Explore {state.name}
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No states found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("all")
                }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}



================================================
FILE: app/states/[slug]/loading.tsx
================================================
'use client'

import { CulturalLoading } from '@/components/cultural/cultural-loading'

export default function StateLoading() {
  return (
    <CulturalLoading 
      state="loading"
      theme="Cultural Heritage"
      colorPrimary="#DC143C"
      colorSecondary="#FFD700"
      colorAccent="#F4A460"
    />
  )
}


================================================
FILE: app/states/[slug]/page.tsx
================================================
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CulturalLoading } from "@/components/cultural/cultural-loading"
import { getStateData } from "@/lib/states-data"
import { useCart } from "@/contexts/CartContext"
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  Heart,
  ShoppingBag,
  Play,
  Calendar,
  Award,
  Sparkles,
  Filter,
  Grid3X3,
  List,
  Plus,
  Minus,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"

interface FeaturedProduct {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  artisan: string
  rating: number
  reviews: number
}

interface FeaturedArtisan {
  id: number
  name: string
  craft: string
  location: string
  experience: string
  story: string
  image: string
  rating: number
  products: number
}

export default function StatePage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState("products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [stateData, setStateData] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [artisans, setArtisans] = useState<any[]>([])
  
  const { addToCart, totalItems } = useCart()

  useEffect(() => {
    const loadStateData = async () => {
      setLoading(true)
      
      try {
        // First try to get data from API
        const response = await fetch(`/api/states/${slug}`)
        if (response.ok) {
          const apiData = await response.json()
          setStateData(apiData.state)
          setProducts(apiData.products)
          setArtisans(apiData.artisans)
        } else {
          // Fallback to static data
          const fallbackData = getStateData(slug)
          if (fallbackData) {
            setStateData(fallbackData)
            setProducts(fallbackData.featuredProducts || [])
            setArtisans(fallbackData.featuredArtisans || [])
          }
        }
      } catch (error) {
        console.error('Error loading state data:', error)
        // Fallback to static data
        const fallbackData = getStateData(slug)
        if (fallbackData) {
          setStateData(fallbackData)
          setProducts(fallbackData.featuredProducts || [])
          setArtisans(fallbackData.featuredArtisans || [])
        }
      }
      
      setLoading(false)
    }

    loadStateData()
  }, [slug])

  const handleAddToCart = async (product: any) => {
    try {
      // For now, we'll create a mock product object
      // In a real app, this would come from the API
      const mockProduct = {
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        images: [product.image],
        category: 'handicraft',
        state_id: slug,
        artisan_id: '1',
        rating: product.rating,
        reviews_count: product.reviews,
        stock_quantity: 10,
        features: [],
        materials: [],
        dimensions: '',
        weight: '',
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      await addToCart(mockProduct)
    } catch (error) {
      toast.error('Failed to add item to cart')
    }
  }

  if (loading || !stateData) {
    return (
      <CulturalLoading 
        state={slug}
        theme={stateData?.theme || 'Cultural Heritage'}
        colorPrimary={stateData?.colors.primary || '#DC143C'}
        colorSecondary={stateData?.colors.secondary || '#FFD700'}
        colorAccent={stateData?.colors.accent || '#F4A460'}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/states" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to States
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={stateData.backgroundImage || "/placeholder.svg"}
            alt={stateData.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${stateData.heroGradient}`} />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            className="text-white max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{stateData.name}</h1>
            <p className="text-2xl text-yellow-200 mb-2 font-medium">{stateData.nameHindi}</p>
            <p className="text-xl mb-6 italic">{stateData.tagline}</p>
            <p className="text-lg mb-8 leading-relaxed">{stateData.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Shop {stateData.name} Crafts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Cultural Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Users, number: stateData.artisans_count || artisans.length || 0, label: "Master Artisans" },
              { icon: ShoppingBag, number: stateData.products_count || products.length || 0, label: "Unique Products" },
              { icon: MapPin, number: stateData.heritage_sites || 12, label: "Heritage Sites" },
              { icon: Calendar, number: stateData.festivals || 8, label: "Annual Festivals" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cultural Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{stateData.cultural_story || stateData.culturalStory}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {(stateData.specialties || []).map((specialty: string, index: number) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Card className="p-4 text-center bg-white border-orange-200 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{specialty}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex space-x-1 bg-orange-100 rounded-lg p-1">
              {[
                { id: "products", label: "Products" },
                { id: "artisans", label: "Artisans" },
                { id: "heritage", label: "Heritage Sites" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "text-orange-600 hover:bg-orange-200"
                  }
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                  className={
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                  className={
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" className="border-orange-300 text-orange-600 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div
                  className={`grid gap-8 ${
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {products.map((product: any, index: number) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card
                        className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                          viewMode === "list" ? "flex" : ""
                        }`}
                      >
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 h-48" : "h-64"}`}>
                          <img
                            src={(product.images?.[0] || product.image) || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4">
                            <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white text-red-500">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-red-500 text-white">
                              {Math.round((((product.original_price || product.originalPrice) - product.price) / (product.original_price || product.originalPrice)) * 100)}% OFF
                            </Badge>
                          </div>
                        </div>

                        <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-sm text-orange-600 mb-2">by {product.artisan?.name || product.artisan}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium ml-1">{product.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                              <span className="text-lg text-gray-500 line-through ml-2">₹{product.original_price || product.originalPrice}</span>
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "artisans" && (
              <motion.div
                key="artisans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {artisans.map((artisan: any, index: number) => (
                    <motion.div
                      key={artisan.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={artisan.image || "/placeholder.svg"}
                            alt={artisan.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{artisan.rating}</span>
                            </div>
                            <Badge className="bg-white/20 text-white border-white/30">
                              {artisan.products} Products
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{artisan.name}</h3>
                            <p className="text-orange-600 font-medium">{artisan.craft}</p>
                            <p className="text-sm text-gray-600">
                              {artisan.location} • {artisan.experience}
                            </p>
                          </div>

                          <p className="text-gray-700 text-sm mb-4">{artisan.story}</p>

                          <Button
                            variant="outline"
                            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            View Profile & Products
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}



================================================
FILE: components/theme-provider.tsx
================================================
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}



================================================
FILE: components/cultural/advanced-sound-manager.tsx
================================================
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SoundContextType {
  isEnabled: boolean
  volume: number
  toggleSound: () => void
  setVolume: (volume: number) => void
  playSound: (soundType: SoundType, options?: { volume?: number; loop?: boolean }) => void
  stopSound: (soundType: SoundType) => void
  playAmbient: (scene: string) => void
  stopAmbient: () => void
}

type SoundType =
  | "hover"
  | "click"
  | "success"
  | "error"
  | "notification"
  | "scroll"
  | "loading"
  | "cultural-chime"
  | "traditional-bell"
  | "sitar-note"
  | "tabla-beat"

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within SoundProvider")
  }
  return context
}

interface SoundProviderProps {
  children: ReactNode
}

export function AdvancedSoundProvider({ children }: SoundProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [sounds, setSounds] = useState<Map<SoundType, AudioBuffer>>(new Map())
  const [ambientAudio, setAmbientAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined" && isEnabled) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)

      // Load sound files
      loadSounds(ctx)
    }

    return () => {
      if (audioContext) {
        audioContext.close()
      }
      if (ambientAudio) {
        ambientAudio.pause()
        ambientAudio.src = ""
      }
    }
  }, [isEnabled])

  const loadSounds = async (ctx: AudioContext) => {
    const soundFiles: Record<SoundType, string> = {
      hover: "/sounds/cultural-hover.mp3",
      click: "/sounds/traditional-click.mp3",
      success: "/sounds/celebration-chime.mp3",
      error: "/sounds/gentle-bell.mp3",
      notification: "/sounds/temple-bell.mp3",
      scroll: "/sounds/page-turn.mp3",
      loading: "/sounds/meditation-rhythm.mp3",
      "cultural-chime": "/sounds/cultural-chime.mp3",
      "traditional-bell": "/sounds/traditional-bell.mp3",
      "sitar-note": "/sounds/sitar-note.mp3",
      "tabla-beat": "/sounds/tabla-beat.mp3",
    }

    const loadedSounds = new Map<SoundType, AudioBuffer>()

    for (const [soundType, url] of Object.entries(soundFiles)) {
      try {
        // Create synthetic audio buffers for demo (in real app, load actual files)
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        // Generate different tones for different sound types
        const frequency = getSoundFrequency(soundType as SoundType)
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.sin((2 * Math.PI * frequency * i) / ctx.sampleRate) * 0.1
        }

        loadedSounds.set(soundType as SoundType, buffer)
      } catch (error) {
        console.warn(`Failed to load sound: ${soundType}`, error)
      }
    }

    setSounds(loadedSounds)
  }

  const getSoundFrequency = (soundType: SoundType): number => {
    const frequencies: Record<SoundType, number> = {
      hover: 800,
      click: 1000,
      success: 523, // C5
      error: 220, // A3
      notification: 659, // E5
      scroll: 440, // A4
      loading: 330, // E4
      "cultural-chime": 698, // F5
      "traditional-bell": 880, // A5
      "sitar-note": 293, // D4
      "tabla-beat": 110, // A2
    }
    return frequencies[soundType] || 440
  }

  const toggleSound = () => {
    setIsEnabled(!isEnabled)
    if (isEnabled && ambientAudio) {
      ambientAudio.pause()
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)))
  }

  const playSound = (soundType: SoundType, options: { volume?: number; loop?: boolean } = {}) => {
    if (!isEnabled || !audioContext || !sounds.has(soundType)) return

    try {
      const buffer = sounds.get(soundType)!
      const source = audioContext.createBufferSource()
      const gainNode = audioContext.createGain()

      source.buffer = buffer
      source.loop = options.loop || false
      gainNode.gain.value = (options.volume || volume) * 0.5 // Keep sounds subtle

      source.connect(gainNode)
      gainNode.connect(audioContext.destination)

      source.start()

      // Auto-stop after buffer duration if not looping
      if (!options.loop) {
        setTimeout(() => {
          try {
            source.stop()
          } catch (e) {
            // Source may already be stopped
          }
        }, buffer.duration * 1000)
      }
    } catch (error) {
      console.warn(`Failed to play sound: ${soundType}`, error)
    }
  }

  const stopSound = (soundType: SoundType) => {
    // In a real implementation, you'd track active sources to stop them
  }

  const playAmbient = (scene: string) => {
    if (!isEnabled) return

    const ambientFiles: Record<string, string> = {
      landing: "/sounds/ambient-india.mp3",
      rajasthan: "/sounds/ambient-desert.mp3",
      kerala: "/sounds/ambient-backwaters.mp3",
      gujarat: "/sounds/ambient-festival.mp3",
      "tamil-nadu": "/sounds/ambient-temple.mp3",
      punjab: "/sounds/ambient-fields.mp3",
    }

    const audioFile = ambientFiles[scene]
    if (audioFile) {
      if (ambientAudio) {
        ambientAudio.pause()
      }

      // Create placeholder ambient audio (in real app, use actual files)
      const audio = new Audio()
      audio.loop = true
      audio.volume = volume * 0.2 // Very subtle ambient

      // For demo, create a data URL with silence
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 1
      canvas.height = 1
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 1, 1)
      }

      setAmbientAudio(audio)

      // Play with user interaction
      const playAmbientAudio = () => {
        audio.play().catch(() => {
          // Autoplay blocked, will play on user interaction
        })
      }

      document.addEventListener("click", playAmbientAudio, { once: true })
    }
  }

  const stopAmbient = () => {
    if (ambientAudio) {
      ambientAudio.pause()
      ambientAudio.currentTime = 0
    }
  }

  return (
    <SoundContext.Provider
      value={{
        isEnabled,
        volume,
        toggleSound,
        setVolume,
        playSound,
        stopSound,
        playAmbient,
        stopAmbient,
      }}
    >
      {children}
      <SoundControls />
    </SoundContext.Provider>
  )
}

function SoundControls() {
  const { isEnabled, volume, toggleSound, setVolume } = useSound()

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-orange-200">
      <Button variant="ghost" size="sm" onClick={toggleSound} className="text-orange-600 hover:bg-orange-50">
        {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </Button>

      {isEnabled && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
          className="w-16 h-1 bg-orange-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${volume * 100}%, #fed7aa ${volume * 100}%, #fed7aa 100%)`,
          }}
        />
      )}
    </div>
  )
}

// Hook for easy sound integration in components
export function useCulturalSounds() {
  const { playSound } = useSound()

  return {
    playHover: () => playSound("hover"),
    playClick: () => playSound("click"),
    playSuccess: () => playSound("success"),
    playError: () => playSound("error"),
    playCulturalChime: () => playSound("cultural-chime"),
    playTraditionalBell: () => playSound("traditional-bell"),
    playSitarNote: () => playSound("sitar-note"),
    playTabla: () => playSound("tabla-beat"),
  }
}



================================================
FILE: components/cultural/cultural-loading.tsx
================================================
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CulturalLoadingProps {
  state: string
  theme: string
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
}

export function CulturalLoading({ state, theme, colorPrimary, colorSecondary, colorAccent }: CulturalLoadingProps) {
  const [loadingText, setLoadingText] = useState('')
  
  const stateTexts = {
    rajasthan: ['राजस्थान में आपका स्वागत है', 'Welcome to the Land of Kings', 'Discovering Royal Heritage...'],
    kerala: ['केरल में आपका स्वागत है', 'Welcome to Gods Own Country', 'Exploring Backwater Paradise...'],
    gujarat: ['गुजरात में आपका स्वागत है', 'Welcome to Vibrant Gujarat', 'Unveiling Colorful Traditions...'],
    'tamil-nadu': ['तमिल नाडु में आपका स्वागत है', 'Welcome to Tamil Heritage', 'Discovering Temple Arts...'],
    'west-bengal': ['पश्चिम बंगाल में आपका स्वागत है', 'Welcome to Cultural Renaissance', 'Exploring Artistic Heritage...'],
    punjab: ['पंजाब में आपका स्वागत है', 'Welcome to Land of Five Rivers', 'Discovering Harvest Traditions...'],
    maharashtra: ['महाराष्ट्र में आपका स्वागत है', 'Welcome to Cultural Capital', 'Exploring Maratha Heritage...'],
    karnataka: ['कर्नाटक में आपका स्वागत है', 'Welcome to Silicon Valley Heritage', 'Discovering Silk Traditions...'],
    'andhra-pradesh': ['आंध्र प्रदेश में आपका स्वागत है', 'Welcome to Pearl City', 'Exploring Spicy Heritage...'],
    telangana: ['तेलंगाना में आपका स्वागत है', 'Welcome to Nizami Heritage', 'Discovering Ikat Traditions...'],
    assam: ['असम में आपका स्वागत है', 'Welcome to Tea Gardens', 'Exploring Silk Heritage...'],
    odisha: ['ओडिशा में आपका स्वागत है', 'Welcome to Soul of India', 'Discovering Pattachitra Art...'],
    'madhya-pradesh': ['मध्य प्रदेश में आपका स्वागत है', 'Welcome to Heart of India', 'Exploring Tribal Heritage...'],
    'uttar-pradesh': ['उत्तर प्रदेश में आपका स्वागत है', 'Welcome to Heartland', 'Discovering Mughal Heritage...'],
    bihar: ['बिहार में आपका स्वागत है', 'Welcome to Land of Buddha', 'Exploring Madhubani Art...'],
    jharkhand: ['झारखंड में आपका स्वागत है', 'Welcome to Land of Forests', 'Discovering Tribal Crafts...'],
    haryana: ['हरियाणा में आपका स्वागत है', 'Welcome to Agricultural Heritage', 'Exploring Rural Traditions...'],
    'himachal-pradesh': ['हिमाचल प्रदेश में आपका स्वागत है', 'Welcome to Dev Bhoomi', 'Discovering Mountain Heritage...'],
    uttarakhand: ['उत्तराखंड में आपका स्वागत है', 'Welcome to Land of Gods', 'Exploring Himalayan Heritage...'],
    chhattisgarh: ['छत्तीसगढ़ में आपका स्वागत है', 'Welcome to Rice Bowl', 'Discovering Tribal Crafts...'],
    goa: ['गोवा में आपका स्वागत है', 'Welcome to Pearl of Orient', 'Exploring Coastal Heritage...'],
    manipur: ['मणिपुर में आपका स्वागत है', 'Welcome to Jewel of India', 'Discovering Dance Heritage...'],
    meghalaya: ['मेघालय में आपका स्वागत है', 'Welcome to Abode of Clouds', 'Exploring Bamboo Crafts...'],
    tripura: ['त्रिपुरा में आपका स्वागत है', 'Welcome to Land of Diversity', 'Discovering Tribal Heritage...'],
    mizoram: ['मिजोरम में आपका स्वागत है', 'Welcome to Blue Mountains', 'Exploring Mountain Traditions...'],
    nagaland: ['नागालैंड में आपका स्वागत है', 'Welcome to Land of Festivals', 'Discovering Festival Heritage...'],
    'arunachal-pradesh': ['अरुणाचल प्रदेश में आपका स्वागत है', 'Welcome to Rising Sun', 'Exploring Dawn Traditions...'],
    sikkim: ['सिक्किम में आपका स्वागत है', 'Welcome to Himalayan Paradise', 'Discovering Buddhist Art...'],
  }

  const texts = stateTexts[state.toLowerCase().replace(/\s+/g, '-') as keyof typeof stateTexts] || [
    'भारत में आपका स्वागत है',
    'Welcome to India',
    'Discovering Heritage...'
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setLoadingText(texts[index])
      index = (index + 1) % texts.length
    }, 2000)

    return () => clearInterval(interval)
  }, [texts])

  // Cultural patterns based on state
  const getStatePattern = () => {
    switch (state.toLowerCase().replace(/\s+/g, '-')) {
      case 'rajasthan':
        return (
          <motion.div className="relative">
            {/* Mandala pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="60" cy="60" r="50" fill="none" stroke={colorPrimary} strokeWidth="2" opacity="0.6" />
              <circle cx="60" cy="60" r="35" fill="none" stroke={colorSecondary} strokeWidth="2" opacity="0.8" />
              <circle cx="60" cy="60" r="20" fill="none" stroke={colorAccent} strokeWidth="2" />
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="60"
                  y1="10"
                  x2="60"
                  y2="30"
                  stroke={colorPrimary}
                  strokeWidth="3"
                  transform={`rotate(${i * 45} 60 60)`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'kerala':
        return (
          <motion.div className="relative">
            {/* Coconut and boat pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              <motion.path
                d="M20,60 Q60,20 100,60 Q60,100 20,60"
                fill="none"
                stroke={colorPrimary}
                strokeWidth="3"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.circle
                cx="60"
                cy="60"
                r="25"
                fill={colorSecondary}
                opacity="0.6"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
      
      case 'gujarat':
        return (
          <motion.div className="relative">
            {/* Rangoli pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {[...Array(6)].map((_, i) => (
                <motion.polygon
                  key={i}
                  points="60,20 80,50 60,80 40,50"
                  fill={i % 2 === 0 ? colorPrimary : colorSecondary}
                  opacity="0.7"
                  transform={`rotate(${i * 60} 60 60)`}
                  animate={{ 
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 0.9, 0.3] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.3 
                  }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'tamil-nadu':
        return (
          <motion.div className="relative">
            {/* Temple architecture pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {/* Temple base */}
              <motion.rect
                x="30"
                y="70"
                width="60"
                height="20"
                fill={colorPrimary}
                animate={{ scaleX: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Temple pillars */}
              {[...Array(3)].map((_, i) => (
                <motion.rect
                  key={i}
                  x={40 + i * 20}
                  y="50"
                  width="8"
                  height="20"
                  fill={colorSecondary}
                  animate={{ scaleY: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {/* Gopuram pattern */}
              <motion.polygon
                points="60,10 70,40 50,40"
                fill={colorAccent}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
      
      case 'west-bengal':
        return (
          <motion.div className="relative">
            {/* Alpona pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {/* Fish motif */}
              <motion.path
                d="M30,60 Q50,40 70,60 Q50,80 30,60 M70,60 L85,55 L85,65 Z"
                fill={colorPrimary}
                animate={{ 
                  x: [0, 20, 0],
                  opacity: [0.6, 1, 0.6] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Rice pattern */}
              {[...Array(5)].map((_, i) => (
                <motion.ellipse
                  key={i}
                  cx={25 + i * 15}
                  cy="90"
                  rx="3"
                  ry="8"
                  fill={colorSecondary}
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'punjab':
        return (
          <motion.div className="relative">
            {/* Wheat and phulkari pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {/* Wheat stalks */}
              {[...Array(5)].map((_, i) => (
                <motion.g key={i}>
                  <motion.line
                    x1={25 + i * 15}
                    y1="80"
                    x2={25 + i * 15}
                    y2="40"
                    stroke={colorPrimary}
                    strokeWidth="3"
                    animate={{ scaleY: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                  {/* Wheat grains */}
                  {[...Array(8)].map((_, j) => (
                    <motion.circle
                      key={j}
                      cx={25 + i * 15 + (j % 2 === 0 ? -3 : 3)}
                      cy={75 - j * 4}
                      r="2"
                      fill={colorSecondary}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: (i + j) * 0.1 }}
                    />
                  ))}
                </motion.g>
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'assam':
        return (
          <motion.div className="relative">
            {/* Tea leaf pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {[...Array(8)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M${60 + Math.cos(i * Math.PI / 4) * 30},${60 + Math.sin(i * Math.PI / 4) * 30} Q${60 + Math.cos(i * Math.PI / 4) * 40},${60 + Math.sin(i * Math.PI / 4) * 20} ${60 + Math.cos(i * Math.PI / 4) * 50},${60 + Math.sin(i * Math.PI / 4) * 40}`}
                  fill="none"
                  stroke={colorPrimary}
                  strokeWidth="2"
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0.3, 1, 0.3] 
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
              <motion.circle
                cx="60"
                cy="60"
                r="15"
                fill={colorSecondary}
                opacity="0.6"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
      
      default:
        return (
          <motion.div className="relative">
            {/* Generic lotus pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {[...Array(8)].map((_, i) => (
                <motion.ellipse
                  key={i}
                  cx="60"
                  cy="30"
                  rx="8"
                  ry="25"
                  fill={colorPrimary}
                  opacity="0.6"
                  transform={`rotate(${i * 45} 60 60)`}
                  animate={{ 
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.3, 0.8, 0.3] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                />
              ))}
              <motion.circle
                cx="60"
                cy="60"
                r="10"
                fill={colorAccent}
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${colorPrimary}15, ${colorSecondary}15, ${colorAccent}15)`
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: i % 3 === 0 ? colorPrimary : i % 3 === 1 ? colorSecondary : colorAccent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative text-center">
        {/* Cultural pattern */}
        <div className="mb-8 flex justify-center">
          {getStatePattern()}
        </div>

        {/* Loading text */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-2"
        >
          <h2 
            className="text-2xl font-bold"
            style={{ color: colorPrimary }}
          >
            {loadingText}
          </h2>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorSecondary }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Cultural quote */}
        <motion.p
          className="mt-6 text-lg italic max-w-md mx-auto"
          style={{ color: colorAccent }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &quot;Every craft tells a story, every artisan preserves history&quot;
        </motion.p>
      </div>
    </div>
  )
}


================================================
FILE: components/cultural/cultural-transitions.tsx
================================================
"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface CulturalTransitionProps {
  children: ReactNode
  type?: "kaleidoscope" | "scroll" | "mandala" | "fade"
  isVisible?: boolean
}

export function CulturalTransition({ children, type = "fade", isVisible = true }: CulturalTransitionProps) {
  const variants = {
    kaleidoscope: {
      initial: {
        scale: 0,
        rotate: -180,
        opacity: 0,
        filter: "hue-rotate(0deg)",
      },
      animate: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "hue-rotate(360deg)",
      },
      exit: {
        scale: 0,
        rotate: 180,
        opacity: 0,
        filter: "hue-rotate(720deg)",
      },
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        filter: { duration: 2 },
      },
    },
    scroll: {
      initial: {
        x: "100%",
        opacity: 0,
        rotateY: 90,
      },
      animate: {
        x: "0%",
        opacity: 1,
        rotateY: 0,
      },
      exit: {
        x: "-100%",
        opacity: 0,
        rotateY: -90,
      },
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    mandala: {
      initial: {
        scale: 0.8,
        opacity: 0,
        rotate: -45,
        borderRadius: "50%",
      },
      animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        borderRadius: "0%",
      },
      exit: {
        scale: 1.2,
        opacity: 0,
        rotate: 45,
        borderRadius: "50%",
      },
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4 },
    },
  }

  const currentVariant = variants[type]

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={currentVariant.initial}
          animate={currentVariant.animate}
          exit={currentVariant.exit}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}



================================================
FILE: components/cultural/custom-cursor.tsx
================================================
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  hoverType: "default" | "button" | "product" | "text" | "loading"
}

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    hoverType: "default",
  })

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }))
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let hoverType: CursorState["hoverType"] = "default"

      if (target.tagName === "BUTTON" || target.closest("button")) {
        hoverType = "button"
      } else if (target.closest('[data-cursor="product"]')) {
        hoverType = "product"
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        hoverType = "text"
      } else if (target.closest('[data-cursor="loading"]')) {
        hoverType = "loading"
      }

      setCursor((prev) => ({
        ...prev,
        isHovering: true,
        hoverType,
      }))
    }

    const handleMouseLeave = () => {
      setCursor((prev) => ({
        ...prev,
        isHovering: false,
        hoverType: "default",
      }))
    }

    document.addEventListener("mousemove", updateCursor)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  const getCursorVariant = () => {
    switch (cursor.hoverType) {
      case "button":
        return {
          scale: 1.5,
          backgroundColor: "#f97316",
          border: "2px solid #fed7aa",
        }
      case "product":
        return {
          scale: 2,
          backgroundColor: "transparent",
          border: "2px solid #f97316",
        }
      case "text":
        return {
          scaleX: 0.1,
          scaleY: 1.5,
          backgroundColor: "#f97316",
        }
      case "loading":
        return {
          scale: 1.2,
          rotate: 360,
          backgroundColor: "#fbbf24",
        }
      default:
        return {
          scale: 1,
          backgroundColor: "#f97316",
          border: "none",
        }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursor.x - 12,
          y: cursor.y - 12,
        }}
        animate={getCursorVariant()}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Lotus Petal Cursor */}
        <div className="w-full h-full relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #f97316 0%, #ea580c  70%, transparent 100%)",
              filter: "blur(1px)",
            }}
            animate={{
              rotate: cursor.hoverType === "loading" ? 360 : 0,
            }}
            transition={{
              duration: cursor.hoverType === "loading" ? 1 : 0,
              repeat: cursor.hoverType === "loading" ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />

          {/* Cultural Pattern Overlay */}
          {cursor.hoverType === "product" && (
            <motion.div
              className="absolute inset-0 border-2 border-orange-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <div className="absolute inset-1 border border-orange-300 rounded-full opacity-50" />
            </motion.div>
          )}

          {/* Traditional Hand Mudra for Buttons */}
          {cursor.hoverType === "button" && (
            <motion.div
              className="absolute -top-2 -left-2 text-white text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              🤏
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}



================================================
FILE: components/cultural/floating-elements.tsx
================================================
"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: "petal" | "particle" | "pattern"
}

export function FloatingElements({ count = 20 }: { count?: number }) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      type: ["petal", "particle", "pattern"][Math.floor(Math.random() * 3)] as FloatingElement["type"],
    }))
    setElements(newElements)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.sin(element.id) * 50, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.type === "petal" && (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-30" />
          )}
          {element.type === "particle" && (
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-400 rounded-full opacity-20" />
          )}
          {element.type === "pattern" && (
            <svg viewBox="0 0 24 24" className="w-full h-full text-orange-400 opacity-10">
              <path fill="currentColor" d="M12 2L2 7L12 12L22 7L12 2Z M12 12L2 17L12 22L22 17L12 12Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}



================================================
FILE: components/cultural/interactive-map.tsx
================================================
"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface StateInfo {
  name: string
  nameHindi: string
  specialties: string[]
  color: string
}

const statesData: Record<string, StateInfo> = {
  rajasthan: {
    name: "Rajasthan",
    nameHindi: "राजस्थान",
    specialties: ["Blue Pottery", "Kathputli", "Block Prints"],
    color: "#DC143C",
  },
  gujarat: {
    name: "Gujarat",
    nameHindi: "गुजरात",
    specialties: ["Bandhani", "Mirror Work", "Patola"],
    color: "#FFD700",
  },
  maharashtra: {
    name: "Maharashtra",
    nameHindi: "महाराष्ट्र",
    specialties: ["Warli Art", "Paithani", "Kolhapuri"],
    color: "#FF8C00",
  },
  kerala: {
    name: "Kerala",
    nameHindi: "केरल",
    specialties: ["Coir Products", "Spices", "Ayurveda"],
    color: "#228B22",
  },
  tamilnadu: {
    name: "Tamil Nadu",
    nameHindi: "तमिल नाडु",
    specialties: ["Bronze Idols", "Silk Sarees", "Tanjore Art"],
    color: "#B8860B",
  },
}

export function InteractiveMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Simplified India Map SVG */}
        <svg viewBox="0 0 400 500" className="w-full h-auto">
          {/* Rajasthan */}
          <motion.path
            d="M50 150 L150 140 L160 200 L80 220 Z"
            fill={hoveredState === "rajasthan" ? statesData.rajasthan.color : "#FFA500"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("rajasthan")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => setSelectedState("rajasthan")}
            whileHover={{ scale: 1.05 }}
            animate={{
              fill: hoveredState === "rajasthan" ? statesData.rajasthan.color : "#FFA500",
            }}
          />

          {/* Gujarat */}
          <motion.path
            d="M80 220 L160 200 L170 280 L90 290 Z"
            fill={hoveredState === "gujarat" ? statesData.gujarat.color : "#FFD700"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("gujarat")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => setSelectedState("gujarat")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Maharashtra */}
          <motion.path
            d="M170 280 L250 270 L260 350 L180 360 Z"
            fill={hoveredState === "maharashtra" ? statesData.maharashtra.color : "#FF8C00"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("maharashtra")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => setSelectedState("maharashtra")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Kerala */}
          <motion.path
            d="M200 400 L220 380 L240 450 L210 460 Z"
            fill={hoveredState === "kerala" ? statesData.kerala.color : "#228B22"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("kerala")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => setSelectedState("kerala")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Tamil Nadu */}
          <motion.path
            d="M240 380 L320 370 L330 450 L250 460 Z"
            fill={hoveredState === "tamilnadu" ? statesData.tamilnadu.color : "#B8860B"}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("tamilnadu")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => setSelectedState("tamilnadu")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Cultural waves animation */}
          {hoveredState && (
            <motion.circle
              cx="200"
              cy="300"
              r="20"
              fill="none"
              stroke={statesData[hoveredState].color}
              strokeWidth="2"
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 100, opacity: 0 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </svg>

        {/* State Info Tooltip */}
        {hoveredState && (
          <motion.div
            className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-orange-200 max-w-xs"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
          >
            <h3 className="font-bold text-lg text-gray-800">{statesData[hoveredState].name}</h3>
            <p className="text-orange-600 font-medium mb-2">{statesData[hoveredState].nameHindi}</p>
            <div className="space-y-1">
              {statesData[hoveredState].specialties.map((specialty, index) => (
                <motion.div
                  key={specialty}
                  className="text-sm text-gray-600 bg-orange-50 px-2 py-1 rounded"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {specialty}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Hover to explore states</p>
          <div className="flex space-x-2">
            {Object.entries(statesData)
              .slice(0, 3)
              .map(([key, state]) => (
                <div key={key} className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: state.color }} />
                  <span className="text-xs text-gray-600">{state.name}</span>
                </div>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}



================================================
FILE: components/cultural/loading-spinner.tsx
================================================
"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  type?: "chakra" | "lotus" | "mandala"
}

export function LoadingSpinner({ size = "md", type = "chakra" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  }

  if (type === "chakra") {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-orange-600">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
            {/* Ashoka Chakra spokes */}
            {[...Array(24)].map((_, i) => (
              <motion.line
                key={i}
                x1="12"
                y1="2"
                x2="12"
                y2="4"
                stroke="currentColor"
                strokeWidth="1"
                transform={`rotate(${i * 15} 12 12)`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.08,
                }}
              />
            ))}
          </svg>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-600 opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </div>
    )
  }

  if (type === "lotus") {
    return (
      <div className="flex items-center justify-center">
        <motion.div className={`${sizeClasses[size]} relative`}>
          {/* Lotus petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 45}deg)` }}>
              <motion.div
                className="w-2 h-6 bg-gradient-to-t from-pink-500 to-orange-400 rounded-full mx-auto"
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.25,
                }}
              />
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </div>
    )
  }

  // Mandala type
  return (
    <div className="flex items-center justify-center">
      <motion.div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 border-2 border-red-500 rounded-full border-r-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Inner circle */}
        <motion.div
          className="absolute inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </div>
  )
}



================================================
FILE: components/cultural/parallax-section.tsx
================================================
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  )
}



================================================
FILE: components/cultural/premium-buttons.tsx
================================================
"use client"

import { motion } from "framer-motion"
import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

interface PremiumButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "cultural" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  onMouseEnter?: () => void
  className?: string
  disabled?: boolean
}

export function PremiumButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  onMouseEnter,
  className,
  disabled = false,
}: PremiumButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    onClick?.()
  }

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-lg"

  const variantClasses = {
    primary: "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-orange-300 text-orange-600 bg-transparent hover:bg-orange-50",
    cultural: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg",
    ghost: "border-2 border-transparent text-orange-600 bg-transparent hover:bg-orange-50 hover:border-orange-200",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      whileHover={{
        scale: 1.02,
        boxShadow: variant === "primary" ? "0 10px 25px rgba(249, 115, 22, 0.4)" : "0 5px 15px rgba(249, 115, 22, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      data-cursor="button"
    >
      {/* Golden Scrollwork Border Animation */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-lg"
        style={{
          background:
            variant === "secondary"
              ? "linear-gradient(45deg, transparent, rgba(249, 115, 22, 0.3), transparent)"
              : "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Typewriter Effect for Text */}
      <motion.span
        className="relative z-10 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Diya Flame Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-yellow-400/30 via-orange-400/20 to-transparent rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Rangoli Pattern Ripple on Click */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-yellow-300/50 via-orange-300/30 to-transparent rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Lotus Bloom Success Animation */}
      {isClicked && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-4 h-4 text-yellow-300">🪷</div>
        </motion.div>
      )}
    </motion.button>
  )
}



================================================
FILE: components/cultural/premium-cursor.tsx
================================================
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PremiumCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<"default" | "button" | "product" | "text" | "loading">("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect cursor context
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorData = target.getAttribute("data-cursor")

      if (cursorData) {
        setCursorType(cursorData as any)
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorType("button")
      } else if (target.closest("[data-product]")) {
        setCursorType("product")
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorType("text")
      } else {
        setCursorType("default")
      }
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [])

  const getCursorContent = () => {
    switch (cursorType) {
      case "button":
        return (
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-white text-xs">👆</span>
          </motion.div>
        )
      case "product":
        return (
          <motion.div
            className="w-10 h-10 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="text-orange-600 text-sm">🔍</span>
          </motion.div>
        )
      case "text":
        return (
          <motion.div
            className="w-6 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-sm"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        )
      case "loading":
        return (
          <motion.div
            className="w-12 h-12 border-2 border-orange-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <motion.div
              className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        )
      default:
        return (
          <motion.div
            className="relative"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Golden Lotus Petal */}
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 shadow-lg" />
            {/* Trailing particles */}
            <motion.div
              className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.1,
              }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.3,
              }}
            />
          </motion.div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {getCursorContent()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}



================================================
FILE: components/cultural/premium-inputs.tsx
================================================
"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Check, AlertCircle } from "lucide-react"

interface PremiumInputProps {
  label?: string
  placeholder?: string
  type?: "text" | "email" | "password" | "tel"
  value?: string
  onChange?: (value: string) => void
  error?: string
  success?: boolean
  className?: string
  icon?: ReactNode
}

export function PremiumInput({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange,
  error,
  success,
  className,
  icon,
}: PremiumInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasContent, setHasContent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setHasContent(newValue.length > 0)
    onChange?.(newValue)
  }

  return (
    <div className={cn("relative group", className)}>
      {/* Traditional Scroll Pattern Border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(45deg, #f97316, #ea580c, #dc2626, #f97316)",
          backgroundSize: "300% 300%",
          padding: "2px",
        }}
        animate={{
          backgroundPosition: isFocused ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{
          duration: 2,
          repeat: isFocused ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-white rounded-lg" />
      </motion.div>

      {/* Input Container */}
      <div className="relative">
        {/* Floating Label */}
        {label && (
          <motion.label
            className={cn(
              "absolute left-3 transition-all duration-300 pointer-events-none",
              isFocused || hasContent ? "top-2 text-xs text-orange-600 font-medium" : "top-4 text-gray-500",
            )}
            animate={{
              y: isFocused || hasContent ? -8 : 0,
              scale: isFocused || hasContent ? 0.85 : 1,
              color: isFocused ? "#ea580c" : "#6b7280",
            }}
          >
            {label}
          </motion.label>
        )}

        {/* Input Field */}
        <motion.input
          type={type}
          placeholder={isFocused ? placeholder : ""}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "relative z-10 w-full px-3 py-4 bg-transparent border-none outline-none text-gray-800",
            label ? "pt-6" : "pt-4",
            icon ? "pl-12" : "pl-3",
          )}
        />

        {/* Icon */}
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">{icon}</div>}

        {/* Success/Error Icons */}
        <AnimatePresence>
          {(success || error) && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {success && <Check className="w-5 h-5 text-green-500" />}
              {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Golden Glow Focus Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.1) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Traditional Lamp Light Corners */}
      {isFocused && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-2 text-sm text-red-600 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div animate={{ x: [0, -2, 2, 0] }} transition={{ duration: 0.4, repeat: 2 }}>
              <AlertCircle className="w-4 h-4" />
            </motion.div>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="mt-2 text-sm text-green-600 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5 }}>
              <Check className="w-4 h-4" />
            </motion.div>
            Verified successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



================================================
FILE: components/cultural/premium-loading-states.tsx
================================================
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface PremiumLoadingProps {
  type?: "general" | "rajasthan" | "kerala" | "gujarat" | "tamil-nadu" | "punjab" | "product"
  message?: string
  isVisible: boolean
}

export function PremiumLoading({ type = "general", message, isVisible }: PremiumLoadingProps) {
  const [loadingText, setLoadingText] = useState("")

  useEffect(() => {
    if (!isVisible) return

    const messages = {
      general: ["Loading cultural treasures...", "Connecting with artisans...", "Preparing your journey..."],
      rajasthan: ["Crossing desert sands...", "Entering royal palaces...", "Meeting puppet masters..."],
      kerala: ["Sailing through backwaters...", "Gathering spices...", "Weaving coconut stories..."],
      gujarat: ["Flying colorful kites...", "Threading vibrant textiles...", "Dancing with traditions..."],
      "tamil-nadu": ["Crafting bronze sculptures...", "Weaving silk dreams...", "Painting temple stories..."],
      punjab: ["Harvesting golden fields...", "Beating dhol rhythms...", "Celebrating abundance..."],
      product: ["Handcrafting your selection...", "Adding cultural essence...", "Blessing your choice..."],
    }

    const typeMessages = messages[type]
    let index = 0

    const interval = setInterval(() => {
      setLoadingText(typeMessages[index])
      index = (index + 1) % typeMessages.length
    }, 2000)

    return () => clearInterval(interval)
  }, [type, isVisible])

  const getLoadingAnimation = () => {
    switch (type) {
      case "rajasthan":
        return (
          <div className="relative">
            {/* Camel caravan animation */}
            <motion.div
              className="flex items-center space-x-4"
              animate={{ x: [-100, 100, -100] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <span className="text-4xl">🐪</span>
              <span className="text-3xl">🐪</span>
              <span className="text-2xl">🐪</span>
            </motion.div>
            {/* Desert sunset background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )

      case "kerala":
        return (
          <div className="relative">
            {/* Boat sailing animation */}
            <motion.div
              animate={{
                x: [-50, 50, -50],
                y: [0, -10, 0],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-4xl">🛶</span>
            </motion.div>
            {/* Water ripples */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-400 rounded-full opacity-60"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )

      case "gujarat":
        return (
          <div className="relative">
            {/* Kite flying animation */}
            <motion.div
              animate={{
                y: [-40, 0, -40],
                x: [-20, 20, -20],
                rotate: [0, 360],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-4xl">🪁</span>
            </motion.div>
            {/* Colorful thread trail */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-purple-500 via-pink-500 to-yellow-500 rounded-full"
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )

      case "product":
        return (
          <div className="relative">
            {/* Artisan hands crafting */}
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-4xl">🙏</span>
            </motion.div>
            {/* Cultural patterns forming */}
            <motion.div
              className="absolute inset-0 border-2 border-orange-300 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
            />
          </div>
        )

      default:
        return (
          <div className="relative">
            {/* Ashoka Chakra spinning */}
            <motion.div
              className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Golden particle trails */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                }}
                animate={{
                  rotate: [i * 45, i * 45 + 360],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <div className="mb-6 flex justify-center">{getLoadingAnimation()}</div>

            <motion.h3
              className="text-xl font-bold text-gray-800 mb-2"
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {message || loadingText}
            </motion.h3>

            <p className="text-gray-600 text-sm">Crafting your cultural experience...</p>

            {/* Progress indicator */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-600 h-1 rounded-full"
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for easy loading state management
export function usePremiumLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingType, setLoadingType] = useState<PremiumLoadingProps["type"]>("general")
  const [loadingMessage, setLoadingMessage] = useState<string>()

  const showLoading = (type?: PremiumLoadingProps["type"], message?: string) => {
    setLoadingType(type || "general")
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  return {
    isLoading,
    loadingType,
    loadingMessage,
    showLoading,
    hideLoading,
    LoadingComponent: () => <PremiumLoading type={loadingType} message={loadingMessage} isVisible={isLoading} />,
  }
}



================================================
FILE: components/cultural/premium-notifications.tsx
================================================
"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, Truck, Bell, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "order" | "deal" | "restock" | "cultural"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface NotificationItemProps {
  notification: Notification
  onRemove: () => void
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      case "order":
        return <Truck className="w-5 h-5 text-orange-600" />
      case "deal":
        return <Gift className="w-5 h-5 text-purple-600" />
      case "restock":
        return <Bell className="w-5 h-5 text-teal-600" />
      case "cultural":
        return <div className="w-5 h-5 text-orange-600">🪷</div>
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const getColors = () => {
    switch (notification.type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      case "order":
        return "border-orange-200 bg-orange-50"
      case "deal":
        return "border-purple-200 bg-purple-50"
      case "restock":
        return "border-teal-200 bg-teal-50"
      case "cultural":
        return "border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn("relative overflow-hidden rounded-lg border-2 p-4 shadow-lg backdrop-blur-md", getColors())}
      style={{
        background:
          notification.type === "cultural"
            ? "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)"
            : undefined,
      }}
    >
      {/* Cultural Pattern Overlay for Cultural Notifications */}
      {notification.type === "cultural" && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/indian-mandala-pattern.png')] bg-repeat bg-center" />
        </div>
      )}

      {/* Traditional Scroll Unfurling Animation */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-orange-500 to-red-600"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <div className="relative z-10 flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          {getIcon()}
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h4
            className="text-sm font-semibold text-gray-800 mb-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {notification.title}
          </motion.h4>

          <motion.p
            className="text-sm text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {notification.message}
          </motion.p>

          {notification.action && (
            <motion.button
              onClick={notification.action.onClick}
              className="mt-2 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {notification.action.label}
            </motion.button>
          )}
        </div>

        <motion.button
          onClick={onRemove}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Traditional Brush Stroke Dismiss Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/50 to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      />
    </motion.div>
  )
}

// Helper hook for common notification patterns
export function useCulturalNotifications() {
  const { addNotification } = useNotifications()

  const showOrderUpdate = (message: string) => {
    addNotification({
      type: "order",
      title: "Order Update",
      message,
      duration: 6000,
    })
  }

  const showCulturalEvent = (title: string, message: string) => {
    addNotification({
      type: "cultural",
      title,
      message,
      duration: 8000,
    })
  }

  const showDeal = (title: string, message: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: "deal",
      title,
      message,
      action,
      duration: 10000,
    })
  }

  const showSuccess = (message: string) => {
    addNotification({
      type: "success",
      title: "Success!",
      message,
      duration: 4000,
    })
  }

  const showError = (message: string) => {
    addNotification({
      type: "error",
      title: "Error",
      message,
      duration: 6000,
    })
  }

  return {
    showOrderUpdate,
    showCulturalEvent,
    showDeal,
    showSuccess,
    showError,
  }
}



================================================
FILE: components/cultural/sound-manager.tsx
================================================
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SoundContextType {
  isEnabled: boolean
  volume: number
  toggleSound: () => void
  setVolume: (volume: number) => void
  playSound: (soundType: SoundType, context?: string) => void
}

type SoundType = "hover" | "click" | "success" | "error" | "ambient" | "scroll" | "loading"

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function useSoundManager() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSoundManager must be used within SoundProvider")
  }
  return context
}

interface SoundProviderProps {
  children: ReactNode
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined" && isEnabled) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)

      return () => {
        ctx.close()
      }
    }
  }, [isEnabled])

  const toggleSound = () => {
    setIsEnabled(!isEnabled)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)))
  }

  const playSound = (soundType: SoundType, context?: string) => {
    if (!isEnabled || !audioContext) return

    // Generate cultural sounds using Web Audio API
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Configure sound based on type and cultural context
    const soundConfig = getSoundConfig(soundType, context)

    oscillator.frequency.setValueAtTime(soundConfig.frequency, audioContext.currentTime)
    oscillator.type = soundConfig.waveType

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume * soundConfig.volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + soundConfig.duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + soundConfig.duration)
  }

  const getSoundConfig = (soundType: SoundType, context?: string) => {
    const baseConfigs = {
      hover: { frequency: 800, volume: 0.1, duration: 0.1, waveType: "sine" as OscillatorType },
      click: { frequency: 1200, volume: 0.2, duration: 0.15, waveType: "triangle" as OscillatorType },
      success: { frequency: 523.25, volume: 0.3, duration: 0.5, waveType: "sine" as OscillatorType }, // C5 note
      error: { frequency: 220, volume: 0.2, duration: 0.3, waveType: "sawtooth" as OscillatorType },
      ambient: { frequency: 432, volume: 0.05, duration: 2, waveType: "sine" as OscillatorType },
      scroll: { frequency: 660, volume: 0.05, duration: 0.1, waveType: "sine" as OscillatorType },
      loading: { frequency: 440, volume: 0.1, duration: 0.2, waveType: "triangle" as OscillatorType },
    }

    // Modify based on cultural context
    const config = { ...baseConfigs[soundType] }

    if (context) {
      switch (context) {
        case "rajasthan":
          config.frequency *= 1.2 // Higher pitch for desert theme
          break
        case "kerala":
          config.frequency *= 0.8 // Lower pitch for water theme
          break
        case "gujarat":
          config.frequency *= 1.1 // Slightly higher for vibrant theme
          break
        case "tamilnadu":
          config.frequency *= 0.9 // Traditional temple bell frequency
          break
      }
    }

    return config
  }

  return (
    <SoundContext.Provider value={{ isEnabled, volume, toggleSound, setVolume, playSound }}>
      {children}
      <SoundControls />
    </SoundContext.Provider>
  )
}

function SoundControls() {
  const { isEnabled, volume, toggleSound, setVolume } = useSoundManager()
  const [showControls, setShowControls] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        {/* Sound Toggle Button */}
        <motion.button
          onClick={toggleSound}
          className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="button"
        >
          {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>

        {/* Volume Control */}
        <AnimatePresence>
          {showControls && isEnabled && (
            <motion.div
              className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-orange-200"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs text-gray-600 font-medium">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                  className="w-20 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${volume * 100}%, #fed7aa ${volume * 100}%, #fed7aa 100%)`,
                  }}
                />
                <span className="text-xs text-gray-500">{Math.round(volume * 100)}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}



================================================
FILE: components/cultural/success-animation.tsx
================================================
"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function SuccessAnimation({ message = "Success!" }: { message?: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Lotus bloom animation */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        {/* Outer petals */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16"
            style={{
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: "center",
            }}
            initial={{ scale: 0, rotate: i * 45 - 90 }}
            animate={{ scale: 1, rotate: i * 45 }}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="w-6 h-12 bg-gradient-to-t from-pink-400 to-orange-300 rounded-full mx-auto opacity-80" />
          </motion.div>
        ))}

        {/* Center circle with checkmark */}
        <motion.div
          className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.3 }}>
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Sparkle effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${50 + 30 * Math.cos((i * 30 * Math.PI) / 180)}%`,
              top: `${50 + 30 * Math.sin((i * 30 * Math.PI) / 180)}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: 1.2 + i * 0.1,
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          />
        ))}
      </motion.div>

      {/* Success message */}
      <motion.h3
        className="text-2xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {message}
      </motion.h3>

      {/* Cultural blessing text */}
      <motion.p
        className="text-sm text-gray-600 mt-2 text-center italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        "सफलता आपके साथ हो" - May success be with you
      </motion.p>
    </motion.div>
  )
}



================================================
FILE: components/cultural/three-d-background.tsx
================================================
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ThreeDBackgroundProps {
  scene?: "landing" | "rajasthan" | "kerala" | "gujarat" | "tamilnadu"
  intensity?: "low" | "medium" | "high"
}

export function ThreeDBackground({ scene = "landing", intensity = "medium" }: ThreeDBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check WebGL support
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      setIsWebGLSupported(false)
      return
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Simple 3D-like animation using Canvas 2D (fallback for complex 3D)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      type: "diya" | "lotus" | "peacock" | "mandala"
    }> = []

    // Initialize particles based on scene
    const initParticles = () => {
      const colors = getSceneColors(scene)
      const particleCount = intensity === "low" ? 15 : intensity === "medium" ? 25 : 40

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: getSceneParticleType(scene),
        })
      }
    }

    const getSceneColors = (sceneType: string) => {
      switch (sceneType) {
        case "rajasthan":
          return ["#dc2626", "#ea580c", "#f59e0b", "#fbbf24"]
        case "kerala":
          return ["#059669", "#0d9488", "#0891b2", "#0284c7"]
        case "gujarat":
          return ["#dc2626", "#f59e0b", "#ec4899", "#8b5cf6"]
        case "tamilnadu":
          return ["#b45309", "#dc2626", "#ea580c", "#f59e0b"]
        default:
          return ["#f97316", "#ea580c", "#dc2626", "#fbbf24"]
      }
    }

    const getSceneParticleType = (sceneType: string) => {
      const types = ["diya", "lotus", "peacock", "mandala"] as const
      return types[Math.floor(Math.random() * types.length)]
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Calculate 3D perspective
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const x2d = particle.x * scale + (canvas.width / 2) * (1 - scale)
        const y2d = particle.y * scale + (canvas.height / 2) * (1 - scale)
        const size2d = particle.size * scale

        // Draw particle based on type
        ctx.save()
        ctx.globalAlpha = Math.max(0.1, scale)

        switch (particle.type) {
          case "diya":
            drawDiya(ctx, x2d, y2d, size2d, particle.color)
            break
          case "lotus":
            drawLotus(ctx, x2d, y2d, size2d, particle.color)
            break
          case "peacock":
            drawPeacock(ctx, x2d, y2d, size2d, particle.color)
            break
          case "mandala":
            drawMandala(ctx, x2d, y2d, size2d, particle.color)
            break
        }

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    // Drawing functions for cultural elements
    const drawDiya = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.ellipse(x, y, size * 0.6, size * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      // Flame
      ctx.fillStyle = "#fbbf24"
      ctx.beginPath()
      ctx.ellipse(x, y - size * 0.4, size * 0.2, size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawLotus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color
      for (let i = 0; i < 8; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((i * Math.PI) / 4)
        ctx.beginPath()
        ctx.ellipse(0, -size * 0.3, size * 0.2, size * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawPeacock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Feather pattern
      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((i * Math.PI) / 2.5)
        ctx.fillStyle = `${color}80`
        ctx.beginPath()
        ctx.ellipse(0, -size * 0.5, size * 0.1, size * 0.4, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawMandala = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      for (let i = 0; i < 12; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((i * Math.PI) / 6)
        ctx.beginPath()
        ctx.arc(0, -size * 0.3, size * 0.1, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
    }

    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [scene, intensity])

  if (!isWebGLSupported) {
    // Fallback for devices without WebGL
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)`,
          }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 20% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
    )
  }

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" style={{ zIndex: 1 }} />
}



================================================
FILE: components/cultural/three-d-environment.tsx
================================================
"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ThreeDEnvironmentProps {
  scene: "landing" | "rajasthan" | "kerala" | "gujarat" | "tamil-nadu" | "punjab"
  className?: string
}

export function ThreeDEnvironment({ scene, className }: ThreeDEnvironmentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 3D Scene Configuration
    const sceneConfig = {
      landing: {
        particles: 150,
        colors: ["#f97316", "#ea580c", "#dc2626", "#fbbf24"],
        objects: ["lotus", "diya", "peacock"],
        ambientColor: "#fff7ed",
      },
      rajasthan: {
        particles: 100,
        colors: ["#f59e0b", "#d97706", "#92400e", "#fbbf24"],
        objects: ["palace", "camel", "puppet"],
        ambientColor: "#fef3c7",
      },
      kerala: {
        particles: 120,
        colors: ["#059669", "#047857", "#065f46", "#10b981"],
        objects: ["coconut", "boat", "spice"],
        ambientColor: "#ecfdf5",
      },
      gujarat: {
        particles: 200,
        colors: ["#7c3aed", "#6d28d9", "#5b21b6", "#8b5cf6"],
        objects: ["kite", "textile", "garba"],
        ambientColor: "#f3e8ff",
      },
      "tamil-nadu": {
        particles: 80,
        colors: ["#b45309", "#92400e", "#78350f", "#d97706"],
        objects: ["bronze", "temple", "dancer"],
        ambientColor: "#fef3c7",
      },
      punjab: {
        particles: 90,
        colors: ["#eab308", "#ca8a04", "#a16207", "#facc15"],
        objects: ["wheat", "turban", "dhol"],
        ambientColor: "#fefce8",
      },
    }

    const config = sceneConfig[scene]
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      color: string
      size: number
      rotation: number
      rotationSpeed: number
    }> = []

    // Initialize particles
    for (let i = 0; i < config.particles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: Math.random() * 4 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016

      // Clear canvas with ambient color
      ctx.fillStyle = config.ambientColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position with 3D movement
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.5
        particle.y += particle.vy + Math.cos(time + index * 0.1) * 0.3
        particle.z += particle.vz

        // Mouse interaction
        const mouseInfluence = 50
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence
          particle.vx += dx * force * 0.001
          particle.vy += dy * force * 0.001
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Update rotation
        particle.rotation += particle.rotationSpeed

        // Calculate 3D perspective
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const x = particle.x * scale
        const y = particle.y * scale
        const size = particle.size * scale

        // Draw particle with cultural shape
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(particle.rotation)
        ctx.globalAlpha = 0.6 + Math.sin(time + index * 0.1) * 0.2

        // Draw different shapes based on scene
        ctx.fillStyle = particle.color
        if (scene === "landing" || scene === "rajasthan") {
          // Lotus petal shape
          ctx.beginPath()
          ctx.ellipse(0, 0, size, size * 1.5, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (scene === "kerala") {
          // Coconut leaf shape
          ctx.beginPath()
          ctx.ellipse(0, 0, size * 2, size * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (scene === "gujarat") {
          // Kite shape
          ctx.beginPath()
          ctx.moveTo(0, -size)
          ctx.lineTo(size, 0)
          ctx.lineTo(0, size)
          ctx.lineTo(-size, 0)
          ctx.closePath()
          ctx.fill()
        } else {
          // Default circle
          ctx.beginPath()
          ctx.arc(0, 0, size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()
    setIsLoaded(true)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [scene, mousePosition])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {/* Cultural Objects Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {scene === "rajasthan" && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 text-6xl opacity-20"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🏰
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/4 text-4xl opacity-30"
              animate={{
                x: [0, 30, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🐪
            </motion.div>
          </>
        )}

        {scene === "kerala" && (
          <>
            <motion.div
              className="absolute top-1/3 right-1/3 text-5xl opacity-25"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🥥
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 left-1/3 text-4xl opacity-30"
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🛶
            </motion.div>
          </>
        )}

        {scene === "gujarat" && (
          <>
            <motion.div
              className="absolute top-1/5 left-1/2 text-4xl opacity-40"
              animate={{
                y: [0, -40, 0],
                x: [0, 20, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🪁
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/5 text-3xl opacity-35"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🧵
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}



================================================
FILE: components/layout/footer.tsx
================================================
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-50 to-red-50 border-t border-orange-100">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Connected with Indian Heritage</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates on festivals, new artisan collections, and exclusive
            cultural insights from across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1 border-orange-200 focus:border-orange-400" />
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">भ</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BharatKart
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Celebrating India's rich cultural heritage through authentic handicrafts, textiles, and artisan creations
              from every corner of our diverse nation.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/states" className="text-gray-600 hover:text-orange-600 transition-colors">
                  All States
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Meet Artisans
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Heritage Sites
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>support@bharatkart.com</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Heritage House, Connaught Place
                  <br />
                  New Delhi, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Quote */}
        <motion.div
          className="text-center py-8 border-t border-orange-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg italic text-gray-700 mb-2">"वसुधैव कुटुम्बकम्"</p>
          <p className="text-sm text-gray-600">The world is one family - Ancient Sanskrit wisdom</p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-orange-200 text-sm text-gray-600">
          <div className="mb-4 md:mb-0">© 2024 BharatKart. All rights reserved. Made with ❤️ for Indian heritage.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-orange-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}



================================================
FILE: components/layout/header.tsx
================================================
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, User, Menu, X, Heart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-lg">भ</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              BharatKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Explore
            </Link>
            <Link href="/states" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              States
            </Link>
            <Link href="/artisans" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Artisans
            </Link>
            <Link href="/festivals" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Festivals
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for handicrafts, textiles, art..."
                className="pl-10 pr-4 py-2 w-full border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="hidden sm:flex relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>

            {/* Profile */}
            <Link href="/get-started">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-orange-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search for handicrafts, textiles, art..."
                  className="pl-10 pr-4 py-2 w-full border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-orange-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore India
                </Link>
                <Link
                  href="/states"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  States & Crafts
                </Link>
                <Link
                  href="/artisans"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meet Artisans
                </Link>
                <Link
                  href="/festivals"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Festivals
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}



================================================
FILE: components/ui/badge.tsx
================================================
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }



================================================
FILE: components/ui/button.tsx
================================================
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }



================================================
FILE: components/ui/card.tsx
================================================
import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}



================================================
FILE: components/ui/image-shimmer.tsx
================================================
"use client"

import { cn } from '@/lib/utils'

interface ImageShimmerProps {
  className?: string
  width?: number
  height?: number
}

export function ImageShimmer({ className, width, height }: ImageShimmerProps) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-shimmer",
        className
      )}
      style={{ width, height }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
    </div>
  )
}

// Alternative shimmer with cultural pattern
export function CulturalShimmer({ className, width, height }: ImageShimmerProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100",
        className
      )}
      style={{ width, height }}
    >
      {/* Mandala pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat bg-center" 
             style={{ backgroundImage: 'url("/indian-mandala-pattern.png")', backgroundSize: '100px 100px' }} />
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent animate-pulse" />
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}


================================================
FILE: components/ui/input.tsx
================================================
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }



================================================
FILE: components/ui/label.tsx
================================================
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Label }



================================================
FILE: components/ui/robust-image.tsx
================================================
"use client"

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getImageSource, getImageSourceWithFallbacks, imageConfig } from '@/lib/image-config'
import { CulturalShimmer } from './image-shimmer'

interface RobustImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackSrc?: string
  context?: 'state' | 'product' | 'artisan' | 'general'
  width?: number
  height?: number
  onLoad?: () => void
  onError?: () => void
  [key: string]: any
}

export function RobustImage({
  src,
  alt,
  className,
  fallbackSrc,
  context = 'general',
  width,
  height,
  onLoad,
  onError,
  ...props
}: RobustImageProps) {
  // Get the best available image source using the config
  const initialSrc = getImageSource(src, context)
  const allSources = getImageSourceWithFallbacks(
    src, 
    fallbackSrc ? [fallbackSrc] : [], 
    context
  )
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const currentSrc = allSources[currentIndex] || '/placeholder.svg'

  const handleError = useCallback(() => {
    // Try next source in the chain
    if (currentIndex < allSources.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
    onError?.()
  }, [currentIndex, allSources.length, onError])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  // If no valid src and no fallback, show placeholder div
  if (!currentSrc) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center text-gray-500",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">No Image</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading && "opacity-0",
          className
        )}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {isLoading && (
        <CulturalShimmer 
          className={cn(
            "absolute inset-0",
            className
          )}
        />
      )}
    </div>
  )
}

// Hook for managing image sources with fallbacks
export function useImageFallback(initialSrc: string | null | undefined, fallbacks: string[] = []) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allSources = [initialSrc, ...fallbacks, "/placeholder.svg"].filter(Boolean) as string[]
  
  const currentSrc = allSources[currentIndex] || "/placeholder.svg"
  
  const handleError = useCallback(() => {
    if (currentIndex < allSources.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, allSources.length])
  
  return { currentSrc, handleError, hasMoreFallbacks: currentIndex < allSources.length - 1 }
}


================================================
FILE: components/ui/select.tsx
================================================
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}



================================================
FILE: components/ui/textarea.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }



================================================
FILE: contexts/AuthContext.tsx
================================================
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>
  signInWithPhone: (phone: string) => Promise<void>
  verifyOTP: (phone: string, otp: string) => Promise<void>
  signOut: () => Promise<void>
  sendEmailOTP: (email: string) => Promise<void>
  verifyEmailOTP: (email: string, otp: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast.success('Successfully signed in!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      toast.success('Check your email for verification link!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signInWithPhone = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      })
      if (error) throw error
      toast.success('OTP sent to your phone!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms',
      })
      if (error) throw error
      toast.success('Phone verified successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const sendEmailOTP = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      })
      if (error) throw error
      toast.success('OTP sent to your email!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const verifyEmailOTP = async (email: string, otp: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      })
      if (error) throw error
      toast.success('Email verified successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithPhone,
        verifyOTP,
        signOut,
        sendEmailOTP,
        verifyEmailOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


================================================
FILE: contexts/CartContext.tsx
================================================
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  loading: boolean
  addToCart: (product: Product, quantity?: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  syncCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bharat-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
  }, [])

  // Sync cart with database when user logs in
  useEffect(() => {
    if (user) {
      syncCart()
    }
  }, [user])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('bharat-cart', JSON.stringify(items))
  }, [items])

  const syncCart = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // Get cart from database with proper typing
      const { data: dbCart, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          product_id,
          products!inner (
            id,
            name,
            description,
            price,
            original_price,
            images,
            category,
            state_id,
            artisan_id,
            rating,
            reviews_count,
            stock_quantity,
            features,
            materials,
            dimensions,
            weight,
            is_featured,
            is_active,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id)

      if (error) throw error

      // Merge local cart with database cart
      const mergedItems: CartItem[] = []
      
      // Add database items
      if (dbCart) {
        for (const dbItem of dbCart) {
          mergedItems.push({
            id: dbItem.id,
            product: dbItem.products as unknown as Product,
            quantity: dbItem.quantity
          })
        }
      }

      // Add local items that aren't in database
      for (const localItem of items) {
        const existsInDb = dbCart?.some(dbItem => 
          (dbItem.products as unknown as Product).id === localItem.product.id
        )
        if (!existsInDb) {
          // Add to database
          const { data, error } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: localItem.product.id,
              quantity: localItem.quantity
            })
            .select('id')
            .single()

          if (!error && data) {
            mergedItems.push({
              ...localItem,
              id: data.id
            })
          }
        }
      }

      setItems(mergedItems)
    } catch (error) {
      console.error('Failed to sync cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const existingItem = items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + quantity)
        return
      }

      if (user) {
        // Add to database
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity
          })
          .select('id')
          .single()

        if (error) throw error

        setItems(prev => [...prev, {
          id: data.id,
          product,
          quantity
        }])
      } else {
        // Add to local storage only
        setItems(prev => [...prev, {
          id: `local-${Date.now()}`,
          product,
          quantity
        }])
      }

      toast.success('Added to cart!')
    } catch (error: any) {
      toast.error('Failed to add to cart')
      console.error(error)
    }
  }

  const removeFromCart = async (productId: string) => {
    try {
      const item = items.find(item => item.product.id === productId)
      
      if (user && item?.id && !item.id.startsWith('local-')) {
        // Remove from database
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', item.id)

        if (error) throw error
      }

      setItems(prev => prev.filter(item => item.product.id !== productId))
      toast.success('Removed from cart')
    } catch (error) {
      toast.error('Failed to remove from cart')
      console.error(error)
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId)
      return
    }

    try {
      const item = items.find(item => item.product.id === productId)
      
      if (user && item?.id && !item.id.startsWith('local-')) {
        // Update in database
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', item.id)

        if (error) throw error
      }

      setItems(prev => prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      ))
    } catch (error) {
      toast.error('Failed to update quantity')
      console.error(error)
    }
  }

  const clearCart = async () => {
    try {
      if (user) {
        // Clear from database
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)

        if (error) throw error
      }

      setItems([])
      toast.success('Cart cleared')
    } catch (error) {
      toast.error('Failed to clear cart')
      console.error(error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}


================================================
FILE: lib/image-config.ts
================================================
// Image optimization and fallback configuration for BharatKart

export const imageConfig = {
  // Base paths for different image types
  basePaths: {
    states: '/states/',
    products: '/products/',
    artisans: '/artisans/',
    categories: '/categories/',
    patterns: '/patterns/'
  },
  
  // Available images in public directory
  availableImages: [
    '/gujarat-colorful-textiles-kites.jpg',
    '/gujarati-bandhani-silk-dupatta-colorful-tie-dye.jpg',
    '/indian-artisan-crafting-pottery.jpg',
    '/indian-mandala-pattern.png',
    '/kerala-backwaters-coconut.jpg',
    '/placeholder-logo.png',
    '/placeholder-logo.svg',
    '/placeholder-user.jpg',
    '/placeholder.jpg',
    '/placeholder.svg',
    '/rajasthan-desert-palace.jpg',
    '/rajasthani-kathputli-puppet-colorful-traditional.jpg',
    '/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg',
    '/tamil-nadu-bronze-temple.jpg'
  ],

  // Fallback chain for different contexts
  fallbacks: {
    state: ['/placeholder.svg'],
    product: ['/placeholder.svg'],
    artisan: ['/placeholder-user.jpg', '/placeholder.svg'],
    general: ['/placeholder.svg']
  },

  // External image sources with fallbacks
  externalSources: {
    unsplash: {
      baseUrl: 'https://images.unsplash.com/',
      categories: {
        indian_crafts: '?w=800&h=600&fit=crop&crop=center&q=80',
        textiles: '?w=800&h=600&fit=crop&crop=center&q=80',
        pottery: '?w=800&h=600&fit=crop&crop=center&q=80'
      }
    }
  }
}

// Helper function to get appropriate image source
export function getImageSource(
  primarySrc: string | null | undefined,
  context: keyof typeof imageConfig.fallbacks = 'general'
): string {
  // If primary source exists and is in available images, use it
  if (primarySrc && imageConfig.availableImages.includes(primarySrc)) {
    return primarySrc
  }

  // Check if it's a valid external URL
  if (primarySrc && (primarySrc.startsWith('http') || primarySrc.startsWith('https'))) {
    return primarySrc
  }

  // Use context-specific fallback
  const fallbacks = imageConfig.fallbacks[context]
  return fallbacks[0] || '/placeholder.svg'
}

// Helper to generate image source with multiple fallbacks
export function getImageSourceWithFallbacks(
  primarySrc: string | null | undefined,
  customFallbacks: string[] = [],
  context: keyof typeof imageConfig.fallbacks = 'general'
): string[] {
  const sources: string[] = []
  
  // Add primary source if valid
  if (primarySrc) {
    sources.push(primarySrc)
  }
  
  // Add custom fallbacks
  sources.push(...customFallbacks)
  
  // Add context fallbacks
  sources.push(...imageConfig.fallbacks[context])
  
  // Filter out duplicates and invalid sources
  return [...new Set(sources)].filter(Boolean)
}

// Real image mappings for states (using available images)
export const stateImageMap: Record<string, string> = {
  'rajasthan': '/rajasthan-desert-palace.jpg',
  'kerala': '/kerala-backwaters-coconut.jpg',
  'gujarat': '/gujarat-colorful-textiles-kites.jpg',
  'tamil-nadu': '/tamil-nadu-bronze-temple.jpg',
  // Add more mappings as needed
}

// Real image mappings for products
export const productImageMap: Record<string, string> = {
  'rajasthani-puppet': '/rajasthani-kathputli-puppet-colorful-traditional.jpg',
  'gujarati-dupatta': '/gujarati-bandhani-silk-dupatta-colorful-tie-dye.jpg',
  'bronze-ganesha': '/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg',
  'pottery': '/indian-artisan-crafting-pottery.jpg',
  // Add more mappings as needed
}

// Function to get the best available image for a given key
export function getBestImage(key: string, type: 'state' | 'product' | 'artisan' = 'product'): string {
  switch (type) {
    case 'state':
      return stateImageMap[key] || '/placeholder.svg'
    case 'product':
      return productImageMap[key] || '/placeholder.svg'
    case 'artisan':
      return '/placeholder-user.jpg'
    default:
      return '/placeholder.svg'
  }
}


================================================
FILE: lib/states-data.ts
================================================
export interface StateData {
  name: string
  nameHindi: string
  slug: string
  tagline: string
  description: string
  region: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  backgroundImage: string
  heroGradient: string
  culturalStory: string
  specialties: string[]
  statistics: {
    artisans: number
    products: number
    heritageSites: number
    festivals: number
  }
  culturalElements: {
    pattern: string
    motif: string
    festival: string
    dance: string
    music: string
  }
  featuredProducts: Array<{
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    artisan: string
    rating: number
    reviews: number
    description: string
  }>
  featuredArtisans: Array<{
    id: number
    name: string
    craft: string
    experience: string
    location: string
    image: string
    story: string
    rating: number
    products: number
  }>
}

export const statesData: Record<string, StateData> = {
  rajasthan: {
    name: "Rajasthan",
    nameHindi: "राजस्थान",
    slug: "rajasthan",
    tagline: "राजस्थान की शान - Land of Kings and Crafts",
    description: "Rajasthan's craft tradition spans over 1000 years, rooted in royal patronage and desert ingenuity. From the blue pottery of Jaipur to the intricate puppets of Udaipur, every craft tells a story of resilience and artistry.",
    region: "North",
    colors: {
      primary: "#DC143C",
      secondary: "#FFD700", 
      accent: "#F4A460"
    },
    backgroundImage: "/rajasthan-desert-palace.jpg",
    heroGradient: "from-red-900/80 via-orange-800/70 to-yellow-900/80",
    culturalStory: "The royal courts of Rajasthan have been patrons of arts and crafts for centuries. The Maharajas commissioned the finest artisans to create masterpieces that adorned their palaces. Today, these traditions continue in the hands of skilled craftspeople who have inherited techniques passed down through generations.",
    specialties: ["Kathputli Puppets", "Blue Pottery", "Block Print Textiles", "Kundan Jewelry", "Miniature Paintings", "Leather Crafts"],
    statistics: {
      artisans: 150,
      products: 1200,
      heritageSites: 35,
      festivals: 12
    },
    culturalElements: {
      pattern: "Mandala",
      motif: "Peacock & Lotus",
      festival: "Pushkar Fair",
      dance: "Ghoomar",
      music: "Folk Rajasthani"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Royal Kathputli Puppet",
        price: 1250,
        originalPrice: 1800,
        image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
        artisan: "Ramesh Kumar",
        rating: 4.9,
        reviews: 147,
        description: "Handcrafted traditional puppet with royal attire"
      },
      {
        id: 2,
        name: "Jaipur Blue Pottery Vase",
        price: 850,
        originalPrice: 1200,
        image: "/placeholder.svg",
        artisan: "Meera Devi",
        rating: 4.8,
        reviews: 89,
        description: "Authentic blue pottery from Jaipur artisans"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Ramesh Kumar",
        craft: "Kathputli Puppets",
        experience: "25 years",
        location: "Udaipur",
        image: "/placeholder.svg",
        story: "Third generation puppet maker preserving ancient traditions",
        rating: 4.9,
        products: 45
      }
    ]
  },

  kerala: {
    name: "Kerala",
    nameHindi: "केरल",
    slug: "kerala",
    tagline: "God's Own Country - स्वर्ग की भूमि",
    description: "Kerala's lush backwaters and spice gardens have nurtured crafts that reflect the harmony between nature and human creativity. From coconut shell art to Ayurvedic preparations, every creation embodies the essence of tropical paradise.",
    region: "South",
    colors: {
      primary: "#228B22",
      secondary: "#4682B4",
      accent: "#8B4513"
    },
    backgroundImage: "/kerala-backwaters-coconut.jpg",
    heroGradient: "from-green-900/80 via-teal-800/70 to-blue-900/80",
    culturalStory: "Kerala's maritime history and spice trade routes brought diverse influences that enriched local crafts. The state's artisans developed unique techniques using abundant coconut, spices, and natural materials, creating sustainable and beautiful products.",
    specialties: ["Coir Products", "Spice Blends", "Ayurvedic Items", "Kathakali Masks", "Coconut Shell Crafts", "Backwater Paintings"],
    statistics: {
      artisans: 120,
      products: 890,
      heritageSites: 28,
      festivals: 8
    },
    culturalElements: {
      pattern: "Paisley & Palm",
      motif: "Elephant & Coconut Tree",
      festival: "Onam",
      dance: "Kathakali",
      music: "Classical Carnatic"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Handwoven Coir Mat",
        price: 450,
        originalPrice: 650,
        image: "/placeholder.svg",
        artisan: "Lakshmi Nair",
        rating: 4.7,
        reviews: 234,
        description: "Eco-friendly coir mat with traditional patterns"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Lakshmi Nair",
        craft: "Coir Weaving",
        experience: "20 years",
        location: "Alappuzha",
        image: "/placeholder.svg",
        story: "Master weaver creating sustainable home decor",
        rating: 4.8,
        products: 38
      }
    ]
  },

  gujarat: {
    name: "Gujarat",
    nameHindi: "गुजरात",
    slug: "gujarat",
    tagline: "Vibrant Gujarat - रंगों का त्योहार",
    description: "Gujarat's entrepreneurial spirit and vibrant culture have produced some of India's most celebrated textiles and crafts. From the intricate mirror work of Kutch to the colorful Bandhani, every piece reflects the state's joyous spirit.",
    region: "West",
    colors: {
      primary: "#FFD700",
      secondary: "#FF1493",
      accent: "#C0C0C0"
    },
    backgroundImage: "/gujarat-colorful-textiles-kites.jpg",
    heroGradient: "from-yellow-600/80 via-pink-600/70 to-purple-700/80",
    culturalStory: "Gujarat's position as a major trading hub brought Persian, Arab, and European influences to its crafts. The state's artisans mastered techniques like Bandhani tie-dye and intricate embroidery, creating textiles celebrated worldwide.",
    specialties: ["Bandhani Textiles", "Mirror Work", "Patola Silk", "Kutch Embroidery", "Beadwork", "Ajrakh Prints"],
    statistics: {
      artisans: 200,
      products: 1500,
      heritageSites: 42,
      festivals: 15
    },
    culturalElements: {
      pattern: "Geometric & Floral",
      motif: "Mirror & Peacock",
      festival: "Navratri",
      dance: "Garba",
      music: "Folk Gujarati"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Kutch Embroidered Bag",
        price: 850,
        originalPrice: 1200,
        image: "/states/gujarat-embroidery.jpg",
        artisan: "Kiran Patel",
        rating: 4.9,
        reviews: 156,
        description: "Authentic Kutch embroidery with mirror work"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Kiran Patel",
        craft: "Kutch Embroidery",
        experience: "22 years",
        location: "Bhuj",
        image: "/artisans/kiran-patel.jpg",
        story: "Preserving centuries-old embroidery traditions",
        rating: 4.9,
        products: 52
      }
    ]
  },

  'tamil-nadu': {
    name: "Tamil Nadu",
    nameHindi: "तमिल नाडु", 
    slug: "tamil-nadu",
    tagline: "Tamil Heritage - तमिल संस्कृति की धरोहर",
    description: "Tamil Nadu's ancient temples and classical traditions have fostered an artistic heritage spanning millennia. From bronze sculptures to silk weaving, the state's crafts embody spiritual devotion and aesthetic perfection.",
    region: "South",
    colors: {
      primary: "#CD7F32",
      secondary: "#FFD700",
      accent: "#DC143C"
    },
    backgroundImage: "/states/tamil-nadu-temple.jpg",
    heroGradient: "from-amber-800/80 via-orange-700/70 to-red-800/80",
    culturalStory: "Tamil Nadu's Chola and Pallava dynasties established traditions of bronze casting and temple architecture that continue today. The state's artisans create intricate sculptures and textiles that reflect ancient spiritual and artistic ideals.",
    specialties: ["Bronze Idols", "Kanchipuram Silk", "Tanjore Paintings", "Stone Sculptures", "Temple Jewelry", "Kolam Art"],
    statistics: {
      artisans: 180,
      products: 1100,
      heritageSites: 45,
      festivals: 18
    },
    culturalElements: {
      pattern: "Temple Architecture",
      motif: "Lotus & Gopuram",
      festival: "Pongal",
      dance: "Bharatanatyam",
      music: "Carnatic Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Nataraja Bronze Statue",
        price: 2500,
        originalPrice: 3200,
        image: "/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg",
        artisan: "Murugan Swamy",
        rating: 4.9,
        reviews: 78,
        description: "Traditional bronze casting of Lord Nataraja"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Murugan Swamy",
        craft: "Bronze Casting",
        experience: "30 years",
        location: "Swamimalai",
        image: "/placeholder.svg",
        story: "Continuing ancient bronze casting traditions",
        rating: 4.9,
        products: 28
      }
    ]
  },

  'west-bengal': {
    name: "West Bengal",
    nameHindi: "पश्चिम बंगाल",
    slug: "west-bengal",
    tagline: "Cultural Renaissance - सांस्कृतिक पुनर्जागरण",
    description: "West Bengal's rich intellectual heritage and artistic traditions have created a unique blend of folk and classical arts. From Kantha embroidery to Durga Puja crafts, the state celebrates creativity in all forms.",
    region: "East",
    colors: {
      primary: "#DC143C",
      secondary: "#000080",
      accent: "#FFD700"
    },
    backgroundImage: "/placeholder.svg",
    heroGradient: "from-red-800/80 via-blue-800/70 to-purple-800/80",
    culturalStory: "Bengal's cultural renaissance in the 19th and 20th centuries revitalized traditional crafts while embracing modern influences. The state's artisans create works that bridge classical traditions and contemporary aesthetics.",
    specialties: ["Kantha Embroidery", "Terracotta Art", "Dokra Metal Work", "Baluchari Sarees", "Shola Pith Craft", "Alpona Art"],
    statistics: {
      artisans: 140,
      products: 950,
      heritageSites: 38,
      festivals: 22
    },
    culturalElements: {
      pattern: "Alpona & Floral",
      motif: "Fish & Rice",
      festival: "Durga Puja",
      dance: "Rabindra Nritya",
      music: "Rabindra Sangeet"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Kantha Embroidered Quilt",
        price: 1800,
        originalPrice: 2400,
        image: "/placeholder.svg",
        artisan: "Rashida Begum",
        rating: 4.8,
        reviews: 92,
        description: "Traditional Kantha stitching on soft cotton"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Rashida Begum",
        craft: "Kantha Embroidery",
        experience: "28 years",
        location: "Shantiniketan",
        image: "/placeholder.svg",
        story: "Reviving traditional Kantha needlework",
        rating: 4.8,
        products: 41
      }
    ]
  },

  maharashtra: {
    name: "Maharashtra",
    nameHindi: "महाराष्ट्र",
    slug: "maharashtra",
    tagline: "Economic Powerhouse - आर्थिक शक्ति",
    description: "Maharashtra's diverse culture blends Marathi traditions with cosmopolitan influences. From Warli paintings to Paithani silk, the state's crafts reflect both ancient wisdom and modern innovation.",
    region: "West",
    colors: {
      primary: "#FF9933",
      secondary: "#138808",
      accent: "#000080"
    },
    backgroundImage: "/placeholder.svg",
    heroGradient: "from-orange-800/80 via-green-700/70 to-blue-800/80",
    culturalStory: "Maharashtra's rich history as a center of trade and learning has fostered diverse artistic traditions. The state's crafts range from tribal Warli art to sophisticated Paithani weaving, each reflecting different aspects of Marathi culture.",
    specialties: ["Warli Paintings", "Paithani Silk", "Kolhapuri Chappals", "Bidriware", "Dhokra Art", "Bamboo Crafts"],
    statistics: {
      artisans: 250,
      products: 1800,
      heritageSites: 52,
      festivals: 25
    },
    culturalElements: {
      pattern: "Tribal Geometric",
      motif: "Peacock & Mango",
      festival: "Gudi Padwa",
      dance: "Lavani",
      music: "Folk Marathi"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Warli Art Canvas",
        price: 750,
        originalPrice: 1000,
        image: "/placeholder.svg",
        artisan: "Jivya Soma Mashe",
        rating: 4.8,
        reviews: 124,
        description: "Authentic tribal Warli painting on canvas"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Jivya Soma Mashe",
        craft: "Warli Painting",
        experience: "35 years",
        location: "Thane",
        image: "/placeholder.svg",
        story: "Master of traditional Warli tribal art",
        rating: 4.9,
        products: 32
      }
    ]
  },

  karnataka: {
    name: "Karnataka",
    nameHindi: "कर्नाटक",
    slug: "karnataka",
    tagline: "Silicon Valley of India - भारत की सिलिकॉन वैली",
    description: "Karnataka beautifully balances ancient temple traditions with modern technology. From Mysore silk to sandalwood crafts, the state's artisans create products that honor heritage while embracing innovation.",
    region: "South",
    colors: {
      primary: "#FFD700",
      secondary: "#DC143C",
      accent: "#000080"
    },
    backgroundImage: "/placeholder.svg",
    heroGradient: "from-yellow-700/80 via-red-700/70 to-blue-800/80",
    culturalStory: "Karnataka's Vijayanagara and Mysore kingdoms patronized arts and crafts, creating traditions that continue today. The state's artisans work with materials ranging from silk and sandalwood to modern sustainable materials.",
    specialties: ["Mysore Silk", "Sandalwood Crafts", "Channapatna Toys", "Bidriware", "Ilkal Sarees", "Kasuti Embroidery"],
    statistics: {
      artisans: 190,
      products: 1350,
      heritageSites: 41,
      festivals: 16
    },
    culturalElements: {
      pattern: "Temple Architecture",
      motif: "Elephant & Lotus",
      festival: "Dasara",
      dance: "Bharatanatyam",
      music: "Carnatic Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Channapatna Wooden Toy Set",
        price: 650,
        originalPrice: 850,
        image: "/placeholder.svg",
        artisan: "Babu Rao",
        rating: 4.7,
        reviews: 178,
        description: "Eco-friendly lacquered wooden toys"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Babu Rao",
        craft: "Channapatna Toys",
        experience: "26 years",
        location: "Channapatna",
        image: "/artisans/babu-rao.jpg",
        story: "Creating sustainable toys for children",
        rating: 4.8,
        products: 45
      }
    ]
  },

  'uttar-pradesh': {
    name: "Uttar Pradesh",
    nameHindi: "उत्तर प्रदेश",
    slug: "uttar-pradesh",
    tagline: "Heartland of India - भारत का हृदय",
    description: "Uttar Pradesh, home to the Taj Mahal, has a rich tradition of Mughal and Hindu craftsmanship. From Chikankari embroidery to brass work, the state's artisans continue centuries-old traditions.",
    region: "North",
    colors: {
      primary: "#4169E1",
      secondary: "#FFD700",
      accent: "#32CD32"
    },
    backgroundImage: "/states/uttar-pradesh-taj.jpg",
    heroGradient: "from-blue-800/80 via-yellow-600/70 to-green-700/80",
    culturalStory: "The Mughal influence in Uttar Pradesh created exquisite crafts like Chikankari and pietra dura inlay work. These traditions blend Persian techniques with local Indian aesthetics, creating unique artistic expressions.",
    specialties: ["Chikankari Embroidery", "Brass Work", "Carpet Weaving", "Zardozi", "Petha Sweets", "Wooden Crafts"],
    statistics: {
      artisans: 300,
      products: 2200,
      heritageSites: 65,
      festivals: 30
    },
    culturalElements: {
      pattern: "Mughal Motifs",
      motif: "Paisley & Rose",
      festival: "Kumbh Mela",
      dance: "Kathak",
      music: "Hindustani Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Chikankari Kurta",
        price: 1200,
        originalPrice: 1600,
        image: "/states/uttar-pradesh-chikan.jpg",
        artisan: "Fatima Khan",
        rating: 4.9,
        reviews: 203,
        description: "Hand-embroidered Lucknowi Chikankari"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Fatima Khan",
        craft: "Chikankari Embroidery",
        experience: "32 years",
        location: "Lucknow",
        image: "/artisans/fatima-khan.jpg",
        story: "Master of traditional Lucknowi embroidery",
        rating: 4.9,
        products: 67
      }
    ]
  },

  punjab: {
    name: "Punjab",
    nameHindi: "पंजाब",
    slug: "punjab",
    tagline: "Land of Five Rivers - पांच नदियों की भूमि",
    description: "Punjab's vibrant Sikh culture and agricultural prosperity have created colorful crafts and textiles. From Phulkari embroidery to jutis, every creation reflects the state's joyous spirit.",
    region: "North",
    colors: {
      primary: "#FF9933",
      secondary: "#138808",
      accent: "#FFD700"
    },
    backgroundImage: "/states/punjab-golden-temple.jpg",
    heroGradient: "from-orange-700/80 via-green-700/70 to-yellow-600/80",
    culturalStory: "Punjab's rich agricultural heritage and Sikh traditions have fostered crafts that celebrate abundance and spirituality. The state's artisans create vibrant textiles and accessories that reflect Punjabi exuberance.",
    specialties: ["Phulkari Embroidery", "Punjabi Jutis", "Sports Goods", "Parandas", "Textile Printing", "Agricultural Tools"],
    statistics: {
      artisans: 160,
      products: 1100,
      heritageSites: 28,
      festivals: 14
    },
    culturalElements: {
      pattern: "Floral Embroidery",
      motif: "Wheat & Sunflower",
      festival: "Baisakhi",
      dance: "Bhangra",
      music: "Folk Punjabi"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Phulkari Dupatta",
        price: 800,
        originalPrice: 1100,
        image: "/states/punjab-phulkari.jpg",
        artisan: "Gurpreet Kaur",
        rating: 4.8,
        reviews: 156,
        description: "Traditional Phulkari embroidered dupatta"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Gurpreet Kaur",
        craft: "Phulkari Embroidery",
        experience: "24 years",
        location: "Patiala",
        image: "/artisans/gurpreet-kaur.jpg",
        story: "Preserving traditional Phulkari needlework",
        rating: 4.8,
        products: 43
      }
    ]
  },

  'andhra-pradesh': {
    name: "Andhra Pradesh",
    nameHindi: "आंध्र प्रदेश",
    slug: "andhra-pradesh",
    tagline: "Classical Heritage - शास्त्रीय विरासत",
    description: "Andhra Pradesh's classical dance traditions and coastal culture have created elegant crafts. From Kalamkari paintings to Kondapalli toys, the state's artisans blend spirituality with artistry.",
    region: "South",
    colors: {
      primary: "#DC143C",
      secondary: "#FFD700",
      accent: "#4169E1"
    },
    backgroundImage: "/states/andhra-pradesh-temple.jpg",
    heroGradient: "from-red-800/80 via-yellow-600/70 to-blue-700/80",
    culturalStory: "Andhra Pradesh's rich tradition of classical arts and temple culture has fostered crafts that often depict mythological themes. The state's artisans create works that serve both aesthetic and spiritual purposes.",
    specialties: ["Kalamkari Paintings", "Kondapalli Toys", "Lepakshi Crafts", "Bidriware", "Pearl Jewelry", "Ikat Textiles"],
    statistics: {
      artisans: 170,
      products: 1250,
      heritageSites: 39,
      festivals: 20
    },
    culturalElements: {
      pattern: "Mythological Themes",
      motif: "Peacock & Gopuram",
      festival: "Ugadi",
      dance: "Kuchipudi",
      music: "Carnatic Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Kalamkari Wall Hanging",
        price: 950,
        originalPrice: 1300,
        image: "/states/andhra-pradesh-kalamkari.jpg",
        artisan: "Niranjan Das",
        rating: 4.7,
        reviews: 89,
        description: "Hand-painted Kalamkari textile art"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Niranjan Das",
        craft: "Kalamkari Painting",
        experience: "29 years",
        location: "Machilipatnam",
        image: "/artisans/niranjan-das.jpg",
        story: "Master of traditional Kalamkari art",
        rating: 4.8,
        products: 36
      }
    ]
  }
}

// Function to get state data
export function getStateData(slug: string): StateData | null {
  return statesData[slug] || null
}

// Function to get all states
export function getAllStates(): StateData[] {
  return Object.values(statesData)
}

// Function to get states by region
export function getStatesByRegion(region: string): StateData[] {
  return Object.values(statesData).filter(state => state.region === region)
}


================================================
FILE: lib/supabase.ts
================================================
import { createClient } from '@supabase/supabase-js'

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate required environment variables
if (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co') {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please check your .env.local file.'
  )
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_anon_key_here') {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. Please check your .env.local file.'
  )
}

// Validate service role key for admin client
if (!supabaseServiceRoleKey || supabaseServiceRoleKey === 'your_service_role_key_here') {
  console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations will not be available.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (only create if service role key is available)
export const supabaseAdmin = supabaseServiceRoleKey && supabaseServiceRoleKey !== 'your_service_role_key_here'
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null

// Database Tables Schema Types
export interface User {
  id: string
  email?: string
  phone?: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface State {
  id: string
  name: string
  name_hindi: string
  slug: string
  tagline: string
  description: string
  region: string
  specialties: string[]
  artisans_count: number
  products_count: number
  image_url: string
  color_primary: string
  color_secondary: string
  color_accent: string
  theme: string
  cultural_story: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price: number
  images: string[]
  category: string
  state_id: string
  artisan_id: string
  rating: number
  reviews_count: number
  stock_quantity: number
  features: string[]
  materials: string[]
  dimensions: string
  weight: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Artisan {
  id: string
  name: string
  craft: string
  experience: string
  location: string
  state_id: string
  image_url: string
  story: string
  rating: number
  products_count: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: {
    name: string
    phone: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: 'stripe' | 'razorpay' | 'cod'
  payment_id?: string
  tracking_number?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
}

// ===== API HELPER FUNCTIONS =====
// Note: These functions use the regular client for now. 
// Use supabaseAdmin for operations requiring elevated privileges when available.

// States API Functions
export const statesApi = {
  // Get all states
  async getAll(params?: { region?: string; search?: string; sortBy?: string }) {
    let query = supabase.from('states').select('*')
    
    if (params?.region && params.region !== 'all') {
      query = query.eq('region', params.region)
    }
    
    if (params?.search) {
      query = query.or(`name.ilike.%${params.search}%,name_hindi.ilike.%${params.search}%,description.ilike.%${params.search}%`)
    }
    
    // Apply sorting
    if (params?.sortBy === 'artisans') {
      query = query.order('artisans_count', { ascending: false })
    } else if (params?.sortBy === 'products') {
      query = query.order('products_count', { ascending: false })
    } else {
      query = query.order('name', { ascending: true })
    }
    
    return query
  },
  
  // Get state by slug
  async getBySlug(slug: string) {
    return supabase
      .from('states')
      .select('*')
      .eq('slug', slug)
      .single()
  },
  
  // Get state with products and artisans
  async getWithDetails(slug: string) {
    const { data: state, error: stateError } = await supabase
      .from('states')
      .select('*')
      .eq('slug', slug)
      .single()
      
    if (stateError) return { data: null, error: stateError }
    
    const [productsResult, artisansResult] = await Promise.all([
      supabase
        .from('products')
        .select(`
          *,
          artisan:artisans(name, craft, location)
        `)
        .eq('state_id', state.id)
        .eq('is_active', true)
        .limit(12),
      supabase
        .from('artisans')
        .select('*')
        .eq('state_id', state.id)
        .eq('is_verified', true)
        .limit(6)
    ])
    
    return {
      data: {
        state,
        products: productsResult.data || [],
        artisans: artisansResult.data || []
      },
      error: null
    }
  }
}

// Products API Functions
export const productsApi = {
  // Get all products
  async getAll(params?: { state_id?: string; category?: string; featured?: boolean; limit?: number }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        artisan:artisans(name, craft, location),
        state:states(name, slug)
      `)
      .eq('is_active', true)
    
    if (params?.state_id) {
      query = query.eq('state_id', params.state_id)
    }
    
    if (params?.category) {
      query = query.eq('category', params.category)
    }
    
    if (params?.featured) {
      query = query.eq('is_featured', true)
    }
    
    if (params?.limit) {
      query = query.limit(params.limit)
    }
    
    return query.order('created_at', { ascending: false })
  },
  
  // Get product by ID
  async getById(id: string) {
    return supabase
      .from('products')
      .select(`
        *,
        artisan:artisans(*),
        state:states(name, slug, color_primary)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()
  },
  
  // Get featured products
  async getFeatured(limit: number = 8) {
    return supabase
      .from('products')
      .select(`
        *,
        artisan:artisans(name, craft),
        state:states(name, slug)
      `)
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(limit)
      .order('rating', { ascending: false })
  }
}

// Artisans API Functions
export const artisansApi = {
  // Get all artisans
  async getAll(params?: { state_id?: string; craft?: string; verified?: boolean }) {
    let query = supabase
      .from('artisans')
      .select(`
        *,
        state:states(name, slug)
      `)
    
    if (params?.state_id) {
      query = query.eq('state_id', params.state_id)
    }
    
    if (params?.craft) {
      query = query.eq('craft', params.craft)
    }
    
    if (params?.verified !== undefined) {
      query = query.eq('is_verified', params.verified)
    }
    
    return query.order('rating', { ascending: false })
  },
  
  // Get artisan by ID
  async getById(id: string) {
    return supabase
      .from('artisans')
      .select(`
        *,
        state:states(name, slug),
        products:products(id, name, price, images, rating)
      `)
      .eq('id', id)
      .single()
  }
}

// Cart API Functions  
export const cartApi = {
  // Get user cart
  async getCart(userId: string) {
    return supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          id,
          name,
          price,
          images,
          stock_quantity,
          state:states(name, slug)
        )
      `)
      .eq('user_id', userId)
  },
  
  // Add item to cart
  async addItem(userId: string, productId: string, quantity: number = 1) {
    // Check if item already exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()
    
    if (existing) {
      // Update quantity
      return supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      // Add new item
      return supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity
        })
        .select()
        .single()
    }
  },
  
  // Update cart item quantity
  async updateQuantity(cartItemId: string, quantity: number) {
    return supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single()
  },
  
  // Remove item from cart
  async removeItem(cartItemId: string) {
    return supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
  },
  
  // Clear entire cart
  async clearCart(userId: string) {
    return supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
  }
}

// Orders API Functions
export const ordersApi = {
  // Create new order
  async create(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    return supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()
  },
  
  // Get user orders
  async getUserOrders(userId: string) {
    return supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(name, images)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },
  
  // Get order by ID
  async getById(orderId: string) {
    return supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(name, images, price)
        )
      `)
      .eq('id', orderId)
      .single()
  },
  
  // Update order status
  async updateStatus(orderId: string, status: Order['status']) {
    return supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()
  }
}

// User API Functions
export const userApi = {
  // Get user profile
  async getProfile(userId: string) {
    return supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
  },
  
  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>) {
    return supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
  },
  
  // Create user profile
  async createProfile(userData: Omit<User, 'created_at' | 'updated_at'>) {
    return supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
  }
}


================================================
FILE: lib/utils.ts
================================================
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



================================================
FILE: lib/supabase/server.ts
================================================
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Validate required environment variables
  if (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co') {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please check your .env.local file.'
    )
  }

  if (!supabaseServiceRoleKey || supabaseServiceRoleKey === 'your_service_role_key_here') {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Server-side operations require the service role key. Please check your .env.local file.'
    )
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}



================================================
FILE: scripts/seed-states.js
================================================
import { supabase } from '../lib/supabase'

const statesData = [
  {
    name: 'Rajasthan',
    name_hindi: 'राजस्थान',
    slug: 'rajasthan',
    tagline: 'Land of Kings and Crafts',
    description: 'Rajasthans craft tradition spans over 1000 years, rooted in royal patronage and desert ingenuity. From the blue pottery of Jaipur to the intricate puppets of Udaipur, every craft tells a story of resilience and artistry.',
    region: 'North',
    specialties: ['Blue Pottery', 'Kathputli Puppets', 'Block Print Textiles', 'Kundan Jewelry', 'Miniature Paintings'],
    artisans_count: 150,
    products_count: 1200,
    image_url: '/rajasthan-desert-palace.jpg',
    color_primary: '#DC143C',
    color_secondary: '#FFD700',
    color_accent: '#F4A460',
    theme: 'Royal Desert Palace',
    cultural_story: 'The royal courts of Rajasthan have been patrons of arts and crafts for centuries. The Maharajas commissioned the finest artisans to create masterpieces that adorned their palaces.'
  },
  {
    name: 'Kerala',
    name_hindi: 'केरल',
    slug: 'kerala',
    tagline: 'Gods Own Country',
    description: 'Tropical backwaters paradise with coconut crafts and spice heritage',
    region: 'South',
    specialties: ['Coir Products', 'Spice Blends', 'Ayurvedic Items', 'Kathakali Masks', 'Coconut Shell Crafts'],
    artisans_count: 120,
    products_count: 890,
    image_url: '/kerala-backwaters-coconut.jpg',
    color_primary: '#228B22',
    color_secondary: '#4682B4',
    color_accent: '#8B4513',
    theme: 'Tropical Backwaters Paradise',
    cultural_story: 'Kerala, known as Gods Own Country, has a rich tradition of coconut crafts, spice cultivation, and Ayurvedic medicine that dates back thousands of years.'
  },
  {
    name: 'Gujarat',
    name_hindi: 'गुजरात',
    slug: 'gujarat',
    tagline: 'Vibrant Gujarat',
    description: 'Festival of colors and mirrors with vibrant textile traditions',
    region: 'West',
    specialties: ['Bandhani Textiles', 'Mirror Work', 'Patola Silk', 'Kutch Embroidery', 'Beadwork'],
    artisans_count: 200,
    products_count: 1500,
    image_url: '/gujarat-colorful-textiles-kites.jpg',
    color_primary: '#FFD700',
    color_secondary: '#FF1493',
    color_accent: '#C0C0C0',
    theme: 'Festival of Colors & Mirrors',
    cultural_story: 'Gujarat is famous for its vibrant textiles, intricate mirror work, and the colorful festival of Navratri that celebrates the states rich cultural heritage.'
  },
  {
    name: 'Tamil Nadu',
    name_hindi: 'तमिल नाडु',
    slug: 'tamil-nadu',
    tagline: 'Tamil Heritage',
    description: 'Temple architecture and classical arts with bronze craftsmanship',
    region: 'South',
    specialties: ['Bronze Idols', 'Kanchipuram Silk', 'Tanjore Paintings', 'Stone Sculptures', 'Temple Jewelry'],
    artisans_count: 180,
    products_count: 1100,
    image_url: '/tamil-nadu-bronze-temple.jpg',
    color_primary: '#CD7F32',
    color_secondary: '#FFD700',
    color_accent: '#DC143C',
    theme: 'Temple Architecture & Classical Arts',
    cultural_story: 'Tamil Nadu is renowned for its ancient temple architecture, classical Bharatanatyam dance, and exquisite bronze sculptures that reflect the states deep spiritual heritage.'
  },
  {
    name: 'West Bengal',
    name_hindi: 'पश्चिम बंगाल',
    slug: 'west-bengal',
    tagline: 'Cultural Renaissance',
    description: 'Intellectual heritage and Durga Puja traditions with rich cultural arts',
    region: 'East',
    specialties: ['Kantha Embroidery', 'Terracotta Art', 'Dokra Metal Work', 'Baluchari Sarees', 'Shola Pith Craft'],
    artisans_count: 140,
    products_count: 950,
    image_url: '/west-bengal-terracotta.jpg',
    color_primary: '#DC143C',
    color_secondary: '#000080',
    color_accent: '#FFD700',
    theme: 'Intellectual Heritage & Durga Puja',
    cultural_story: 'West Bengal, the cultural capital of India, is famous for its intellectual traditions, grand Durga Puja celebrations, and exquisite handloom textiles.'
  }
]

async function seedStates() {
  console.log('Starting to seed states...')
  
  try {
    // Clear existing states (optional - remove if you want to keep existing data)
    console.log('Clearing existing states...')
    const { error: deleteError } = await supabase
      .from('states')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError) {
      console.error('Error clearing states:', deleteError)
    }

    // Insert new states
    console.log('Inserting new states...')
    const { data, error } = await supabase
      .from('states')
      .insert(statesData)
      .select()

    if (error) {
      console.error('Error inserting states:', error)
      throw error
    }

    console.log('Successfully seeded states:', data?.length)
    console.log('States seeded:', data?.map(s => s.name).join(', '))
    
  } catch (error) {
    console.error('Error in seedStates:', error)
    throw error
  }
}

// Run the seeding function
seedStates()
  .then(() => {
    console.log('Seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })


================================================
FILE: styles/globals.css
================================================
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}



================================================
FILE: supabase/seed.sql
================================================
-- Seed data for all 28 Indian states with cultural information
INSERT INTO states (name, name_hindi, slug, tagline, description, region, color_primary, color_secondary, color_accent, theme, cultural_story, specialties) VALUES
('Rajasthan', 'राजस्थान', 'rajasthan', 'राजस्थान की शान - Land of Kings and Crafts', 'Land of Kings - Known for majestic palaces, vibrant culture, and desert landscapes', 'North', '#FF6B35', '#F7931E', '#F4A460', 'Royal Desert', 'The royal courts of Rajasthan have been patrons of arts and crafts for centuries. The Maharajas commissioned the finest artisans to create masterpieces that adorned their palaces.', '["Textiles", "Jewelry", "Handicrafts", "Spices"]'),
('Maharashtra', 'महाराष्ट्र', 'maharashtra', 'आर्थिक शक्ति - Economic Powerhouse', 'Economic powerhouse known for Bollywood, business hubs, and rich history', 'West', '#FF9933', '#138808', '#000080', 'Bollywood Heritage', 'Maharashtra diverse culture blends Marathi traditions with cosmopolitan influences, creating vibrant arts and crafts.', '["Cotton Textiles", "Leather Goods", "Electronics", "Automobiles"]'),
('Karnataka', 'कर्नाटक', 'karnataka', 'भारत की सिलिकॉन वैली - Silicon Valley of India', 'Silicon Valley of India with ancient temples and modern IT industry', 'South', '#FF9933', '#000080', '#FFD700', 'Tech Heritage', 'Karnataka beautifully balances ancient temple traditions with modern technology and innovation.', '["Silk Sarees", "Sandalwood Products", "IT Services", "Coffee"]'),
('Tamil Nadu', 'तमिल नाडु', 'tamil-nadu', 'तमिल संस्कृति की धरोहर - Tamil Heritage', 'Land of Temples with rich cultural heritage and classical arts', 'South', '#FF9933', '#FFFFFF', '#DC143C', 'Temple Culture', 'Tamil Nadu ancient temples and classical traditions have fostered an artistic heritage spanning millennia.', '["Bronze Sculptures", "Silk Sarees", "Handicrafts", "Spices"]'),
('Gujarat', 'गुजरात', 'gujarat', 'रंगों का त्योहार - Vibrant Gujarat', 'Vibrant state known for entrepreneurship, textiles, and cultural festivals', 'West', '#FF9933', '#138808', '#C0C0C0', 'Entrepreneurial Spirit', 'Gujarat entrepreneurial spirit and vibrant culture have produced some of India most celebrated textiles and crafts.', '["Textiles", "Chemicals", "Diamonds", "Handicrafts"]'),
('West Bengal', 'पश्चिम बंगाल', 'west-bengal', 'सांस्कृतिक पुनर्जागरण - Cultural Renaissance', 'Cultural capital known for literature, arts, and intellectual heritage', 'East', '#FF6B35', '#FFFFFF', '#FFD700', 'Literary Heritage', 'Bengal cultural renaissance revitalized traditional crafts while embracing modern influences.', '["Textiles", "Jute Products", "Tea", "Handicrafts"]'),
('Uttar Pradesh', 'उत्तर प्रदेश', 'uttar-pradesh', 'भारत का हृदय - Heartland of India', 'Heartland of India with Taj Mahal and rich Mughal heritage', 'North', '#FF9933', '#138808', '#32CD32', 'Mughal Heritage', 'The Mughal influence in Uttar Pradesh created exquisite crafts like Chikankari and pietra dura inlay work.', '["Handicrafts", "Leather Goods", "Textiles", "Brassware"]'),
('Madhya Pradesh', 'मध्य प्रदेश', 'madhya-pradesh', 'भारत का हृदय - Heart of India', 'Heart of India known for wildlife, tribal culture, and ancient monuments', 'Central', '#FF9933', '#138808', '#F4A460', 'Tribal Heritage', 'Madhya Pradesh tribal communities have preserved ancient art forms and craft traditions for generations.', '["Handicrafts", "Textiles", "Tribal Art", "Forest Products"]'),
('Andhra Pradesh', 'आंध्र प्रदेश', 'andhra-pradesh', 'शास्त्रीय विरासत - Classical Heritage', 'Known for spicy cuisine, classical dance forms, and coastal beauty', 'South', '#FF9933', '#138808', '#4169E1', 'Classical Arts', 'Andhra Pradesh rich tradition of classical arts and temple culture has fostered crafts with mythological themes.', '["Textiles", "Leather Products", "Spices", "Pearls"]'),
('Telangana', 'तेलंगाना', 'telangana', 'निज़ामी संस्कृति - Nizami Culture', 'Youngest state known for IT industry, Nizami culture, and pearls', 'South', '#FF1493', '#FF6347', '#FFD700', 'Nizami Culture', 'Telangana blends ancient Nizami heritage with modern IT industry innovations.', '["IT Services", "Pearls", "Textiles", "Pharmaceuticals"]'),
('Kerala', 'केरल', 'kerala', 'स्वर्ग की भूमि - Gods Own Country', 'Gods Own Country known for backwaters, spices, and Ayurveda', 'South', '#006400', '#FFD700', '#8B4513', 'Ayurvedic Heritage', 'Kerala maritime history and spice trade routes brought diverse influences that enriched local crafts.', '["Spices", "Coir Products", "Ayurvedic Products", "Handicrafts"]'),
('Punjab', 'पंजाब', 'punjab', 'पांच नदियों की भूमि - Land of Five Rivers', 'Land of Five Rivers known for agriculture, Sikh culture, and vibrant festivals', 'North', '#FF9933', '#138808', '#FFD700', 'Sikh Culture', 'Punjab rich agricultural heritage and Sikh traditions have fostered crafts that celebrate abundance and spirituality.', '["Agricultural Products", "Textiles", "Sports Goods", "Handicrafts"]'),
('Haryana', 'हरियाणा', 'haryana', 'कृषि की धरती - Agricultural Land', 'Agricultural state known for rich culture and contribution to sports', 'North', '#FF9933', '#138808', '#32CD32', 'Agricultural Heritage', 'Haryana agricultural prosperity has supported traditional crafts and modern sports equipment manufacturing.', '["Agricultural Products", "Textiles", "Automobiles", "Sports Equipment"]'),
('Bihar', 'बिहार', 'bihar', 'आध्यात्मिक विरासत - Spiritual Heritage', 'Ancient land of Buddha and Mahavira with rich spiritual heritage', 'East', '#FF9933', '#138808', '#FFD700', 'Spiritual Heritage', 'Bihar spiritual significance as the birthplace of Buddhism and Jainism has influenced its artistic traditions.', '["Handicrafts", "Textiles", "Madhubani Paintings", "Agricultural Products"]'),
('Odisha', 'ओडिशा', 'odisha', 'मंदिरों की भूमि - Land of Temples', 'Land of Lord Jagannath known for classical dance, temples, and art', 'East', '#FF9933', '#138808', '#DC143C', 'Temple Heritage', 'Odisha ancient temple traditions and classical dance forms have created unique artistic expressions.', '["Handicrafts", "Textiles", "Silver Filigree", "Applique Work"]'),
('Jharkhand', 'झारखंड', 'jharkhand', 'आदिवासी संस्कृति - Tribal Culture', 'Mineral-rich state known for tribal culture and natural beauty', 'East', '#FF9933', '#138808', '#8B4513', 'Tribal Culture', 'Jharkhand tribal communities have preserved ancient craft traditions using natural materials and techniques.', '["Tribal Handicrafts", "Metals", "Silk Products", "Forest Products"]'),
('Chhattisgarh', 'छत्तीसगढ़', 'chhattisgarh', 'आदिवासी कला - Tribal Arts', 'Rice bowl of India known for tribal art and ancient temples', 'Central', '#FF9933', '#138808', '#8B4513', 'Tribal Arts', 'Chhattisgarh tribal communities have maintained ancient artistic traditions for centuries.', '["Handicrafts", "Tribal Art", "Textiles", "Forest Products"]'),
('Assam', 'असम', 'assam', 'चाय की विरासत - Tea Heritage', 'Gateway to Northeast known for tea, silk, and wildlife', 'Northeast', '#FF9933', '#138808', '#8B4513', 'Tea Heritage', 'Assam position as the gateway to Northeast India has created a unique blend of cultural influences in its crafts.', '["Tea", "Silk Products", "Handicrafts", "Bamboo Products"]'),
('Himachal Pradesh', 'हिमाचल प्रदेश', 'himachal-pradesh', 'देव भूमि - Dev Bhoomi', 'Dev Bhoomi known for mountains, spirituality, and apple orchards', 'North', '#4169E1', '#FFFFFF', '#32CD32', 'Mountain Heritage', 'Himachal Pradesh mountain culture and spiritual significance have influenced its traditional crafts and textiles.', '["Woolen Products", "Handicrafts", "Apple Products", "Herbal Products"]'),
('Uttarakhand', 'उत्तराखंड', 'uttarakhand', 'देवों की भूमि - Land of Gods', 'Land of Gods known for spiritual tourism and natural beauty', 'North', '#4169E1', '#FFFFFF', '#32CD32', 'Spiritual Tourism', 'Uttarakhand spiritual significance and natural beauty have created a tradition of religious and nature-inspired crafts.', '["Handicrafts", "Woolen Products", "Herbal Products", "Religious Items"]'),
('Goa', 'गोवा', 'goa', 'पुर्तगाली विरासत - Portuguese Heritage', 'Coastal paradise known for beaches, Portuguese heritage, and vibrant nightlife', 'West', '#FF6347', '#4169E1', '#FFD700', 'Portuguese Heritage', 'Goa Portuguese colonial history has created a unique blend of European and Indian artistic traditions.', '["Cashews", "Feni", "Handicrafts", "Beach Accessories"]'),
('Tripura', 'त्रिपुरा', 'tripura', 'बांस की संस्कृति - Bamboo Culture', 'Princely state known for bamboo products and tribal culture', 'Northeast', '#FF9933', '#138808', '#8B4513', 'Bamboo Culture', 'Tripura abundant bamboo resources have fostered a rich tradition of bamboo crafts and tribal art.', '["Bamboo Products", "Handicrafts", "Textiles", "Tribal Art"]'),
('Meghalaya', 'मेघालय', 'meghalaya', 'मातृसत्तात्मक विरासत - Matrilineal Heritage', 'Abode of Clouds known for living root bridges and matrilineal society', 'Northeast', '#006400', '#FFFFFF', '#8B4513', 'Matrilineal Heritage', 'Meghalaya unique matrilineal society and natural beauty have influenced its traditional crafts and lifestyle.', '["Handicrafts", "Shawls", "Honey", "Organic Products"]'),
('Manipur', 'मणिपुर', 'manipur', 'शास्त्रीय नृत्य - Classical Dance', 'Jewel of India known for classical dance and martial arts', 'Northeast', '#FF9933', '#138808', '#8B4513', 'Classical Dance', 'Manipur rich tradition of classical dance and martial arts has influenced its traditional crafts and textiles.', '["Handicrafts", "Handloom Products", "Pottery", "Bamboo Products"]'),
('Nagaland', 'नागालैंड', 'nagaland', 'त्योहारों की भूमि - Land of Festivals', 'Land of Festivals known for tribal culture and vibrant traditions', 'Northeast', '#FF0000', '#000000', '#FFD700', 'Festival Culture', 'Nagaland vibrant festival culture and tribal traditions have created colorful crafts and textiles.', '["Handicrafts", "Shawls", "Wood Carvings", "Tribal Jewelry"]'),
('Mizoram', 'मिज़ोरम', 'mizoram', 'बांस नृत्य - Bamboo Dance', 'Land of Blue Mountains known for bamboo dance and tribal heritage', 'Northeast', '#006400', '#FFFFFF', '#8B4513', 'Bamboo Dance', 'Mizoram bamboo dance tradition and tribal heritage have influenced its unique crafts and cultural expressions.', '["Bamboo Products", "Handicrafts", "Textiles", "Wood Products"]'),
('Arunachal Pradesh', 'अरुणाचल प्रदेश', 'arunachal-pradesh', 'आदिवासी विविधता - Tribal Diversity', 'Land of Dawn-lit Mountains known for tribal diversity and natural beauty', 'Northeast', '#FF9933', '#138808', '#8B4513', 'Tribal Diversity', 'Arunachal Pradesh diverse tribal communities have preserved unique craft traditions and artistic expressions.', '["Handicrafts", "Handloom Products", "Masks", "Wood Carvings"]'),
('Sikkim', 'सिक्किम', 'sikkim', 'बौद्ध संस्कृति - Buddhist Culture', 'Himalayan state known for organic farming and Buddhist culture', 'Northeast', '#4169E1', '#FFD700', '#FFFFFF', 'Buddhist Culture', 'Sikkim Buddhist culture and organic farming practices have influenced its traditional crafts and lifestyle.', '["Organic Products", "Handicrafts", "Woolen Products", "Herbal Products"]');

-- Sample products for different states
INSERT INTO products (name, description, price, original_price, category, state_id, images, stock_quantity, is_featured, is_active) VALUES
-- Rajasthan products
('Rajasthani Bandhani Saree', 'Traditional tie-dye saree with intricate patterns', 2500.00, 3500.00, 'textiles', (SELECT id FROM states WHERE slug = 'rajasthan'), '["https://example.com/bandhani1.jpg", "https://example.com/bandhani2.jpg"]', 15, true, true),
('Kundan Jewelry Set', 'Exquisite gold-plated jewelry with precious stones', 5000.00, 7000.00, 'jewelry', (SELECT id FROM states WHERE slug = 'rajasthan'), '["https://example.com/kundan1.jpg", "https://example.com/kundan2.jpg"]', 8, true, true),
('Blue Pottery Vase', 'Hand-painted ceramic vase with floral motifs', 1200.00, 1800.00, 'handicrafts', (SELECT id FROM states WHERE slug = 'rajasthan'), '["https://example.com/pottery1.jpg", "https://example.com/pottery2.jpg"]', 20, true, true),

-- Maharashtra products  
('Paithani Silk Saree', 'Luxurious handwoven silk saree with peacock motifs', 15000.00, 20000.00, 'textiles', (SELECT id FROM states WHERE slug = 'maharashtra'), '["https://example.com/paithani1.jpg", "https://example.com/paithani2.jpg"]', 5, true, true),
('Warli Art Painting', 'Traditional tribal art depicting rural life', 800.00, 1200.00, 'art', (SELECT id FROM states WHERE slug = 'maharashtra'), '["https://example.com/warli1.jpg", "https://example.com/warli2.jpg"]', 12, true, true),

-- Gujarat products
('Bandhej Dupatta', 'Colorful tie-dye dupatta with mirror work', 600.00, 900.00, 'textiles', (SELECT id FROM states WHERE slug = 'gujarat'), '["https://example.com/bandhej1.jpg", "https://example.com/bandhej2.jpg"]', 25, true, true),
('Kutch Embroidered Bag', 'Handcrafted bag with intricate embroidery', 1800.00, 2500.00, 'handicrafts', (SELECT id FROM states WHERE slug = 'gujarat'), '["https://example.com/kutch1.jpg", "https://example.com/kutch2.jpg"]', 10, true, true),

-- Kerala products
('Kasavu Saree', 'Traditional Kerala saree with gold border', 3500.00, 4500.00, 'textiles', (SELECT id FROM states WHERE slug = 'kerala'), '["https://example.com/kasavu1.jpg", "https://example.com/kasavu2.jpg"]', 7, true, true),
('Kathakali Mask', 'Colorful handcrafted mask used in classical dance', 2200.00, 3000.00, 'art', (SELECT id FROM states WHERE slug = 'kerala'), '["https://example.com/mask1.jpg", "https://example.com/mask2.jpg"]', 6, true, true);

-- Create sample artisans
INSERT INTO artisans (name, craft, experience, location, state_id, story, rating, products_count, is_verified) VALUES
('Ramesh Kumar', 'Kathputli Puppets', '25 years', 'Udaipur', (SELECT id FROM states WHERE slug = 'rajasthan'), 'Third generation puppet maker preserving ancient traditions', 4.9, 45, true),
('Meera Devi', 'Blue Pottery', '18 years', 'Jaipur', (SELECT id FROM states WHERE slug = 'rajasthan'), 'Master potter creating exquisite blue pottery', 4.8, 32, true),
('Jivya Soma Mashe', 'Warli Painting', '35 years', 'Thane', (SELECT id FROM states WHERE slug = 'maharashtra'), 'Renowned Warli artist preserving tribal art forms', 4.9, 28, true),
('Kiran Patel', 'Kutch Embroidery', '22 years', 'Bhuj', (SELECT id FROM states WHERE slug = 'gujarat'), 'Expert in traditional Kutch embroidery techniques', 4.7, 41, true),
('Lakshmi Nair', 'Coir Weaving', '20 years', 'Alappuzha', (SELECT id FROM states WHERE slug = 'kerala'), 'Skilled coir weaver creating sustainable products', 4.6, 38, true);



================================================
FILE: supabase/migrations/001_initial_schema.sql
================================================
-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('stripe', 'razorpay', 'cod');

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET row_security = on;

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

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Wishlist table
CREATE TABLE public.wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX idx_products_state_id ON public.products(state_id);
CREATE INDEX idx_products_artisan_id ON public.products(artisan_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_wishlist_user_id ON public.wishlist(user_id);

-- Row Level Security Policies

-- Users policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- States policies (public read)
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "States are viewable by everyone" ON public.states FOR SELECT USING (true);

-- Artisans policies (public read)
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Artisans are viewable by everyone" ON public.artisans FOR SELECT USING (true);

-- Products policies (public read)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);

-- Cart items policies
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- Reviews policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- Functions for triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Updated at triggers
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.states FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.artisans FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
