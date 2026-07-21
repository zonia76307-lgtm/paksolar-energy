import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// 1. GET: Fetch all items with images
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("solar_rates")
      .select("id, item_name, price, category, image_url, updated_at")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    const sanitizedData = data.map((item) => ({
      ...item,
      category: item.category || "Other",
      image_url: item.image_url || "" // Default handle kiya
    }));

    return NextResponse.json(sanitizedData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. POST: Add product with Image URL
export async function POST(req) {
  try {
    const { item_name, price, category, image_url } = await req.json();

    if (!item_name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("solar_rates")
      .insert([{ 
        item_name, 
        price: Number(price), 
        category, 
        image_url: image_url || null, // Image URL column map ho gaya
        updated_at: new Date().toISOString() 
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. DELETE: Same as before
export async function DELETE(req) {
  try {
    const { url } = req;
    const id = url.split("?id=")[1];

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("solar_rates")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}