import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    // Pakistan ki live rate site se raw data uthana
    const { data } = await axios.get("https://solarpanelprices.pk/", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    
    const $ = cheerio.load(data);
    let scrapedRates = [];

    // Table rows se data clean karke array mein save karna
    $("table tr").each((index, element) => {
      const itemName = $(element).find("td").eq(0).text().trim(); 
      const itemPrice = $(element).find("td").eq(1).text().trim(); 

      if (itemName && itemPrice && index > 0) { // Heading skip karne ke liye index > 0
        const numericPrice = parseFloat(itemPrice.replace(/[^0-9.]/g, ""));
        
        if (!isNaN(numericPrice)) {
          scrapedRates.push({
            item_name: itemName,
            price: numericPrice,
            updated_at: new Date()
          });
        }
      }
    });

    if (scrapedRates.length === 0) {
      return NextResponse.json({ error: "Scraping fail hui, data nahi mila!" }, { status: 400 });
    }

    // Supabase table ko purane data se saaf karke naye records insert karna
    await supabase.from("solar_rates").delete().neq("id", 0); 
    const { error } = await supabase.from("solar_rates").insert(scrapedRates);

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: "Pakistan market rates updated automatically in Supabase!", 
      count: scrapedRates.length 
    }, { status: 200 });

  } catch (err) {
    console.error("Scraping Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}