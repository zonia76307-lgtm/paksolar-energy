import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Frontend se bheja hua data receive karna
    const body = await request.json();
    const { customer_name, phone_number, city, system_size_kw, estimated_total_price } = body;

    // Validation Check (Name aur Phone zaroori hain)
    if (!customer_name || !phone_number) {
      return NextResponse.json(
        { error: "Customer name and phone number are required." },
        { status: 400 }
      );
    }

    // Supabase ke 'quotes' table mein data insert karna
    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
          customer_name,
          phone_number,
          city,
          system_size_kw: system_size_kw ? parseFloat(system_size_kw) : null,
          estimated_total_price: estimated_total_price ? parseInt(estimated_total_price) : null,
        }
      ])
      .select();

    if (error) {
      console.error("Supabase Insertion Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Quote saved successfully!", data }, { status: 201 });

  } catch (err) {
    console.error("Quotes API Internal Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}