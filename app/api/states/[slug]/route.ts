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