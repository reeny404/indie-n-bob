import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * 게시글 목록 Read
 *
 * @returns post[]
 */
export async function GET() {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("recommendation_posts")
    .select("*");

    
  return NextResponse.json(posts);
}
