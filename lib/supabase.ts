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