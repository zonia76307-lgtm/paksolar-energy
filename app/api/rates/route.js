import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Next.js static caching ko disable karne ke liye (Taake har bar database se taaza rate aaye)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // solar_rates table se data fetch karna
    const { data, error } = await supabase
      .from("solar_rates")
      .select("id, item_name, price, category, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase Database Stream Error:", error.message);
      return NextResponse.json(
        { error: `Database error: ${error.message}` }, 
        { status: 400 }
      );
    }

    // Response headers set karna taake browser cache bilkul zero ho jaye
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "Pragma": "no-cache",
      },
    });

  } catch (err) {
    console.error("Server Crash Handling Matrix:", err);
    return NextResponse.json(
      { error: "Internal Server Error inside API Stream Route" }, 
      { status: 500 }
    );
  }
}