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