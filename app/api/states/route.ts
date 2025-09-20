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