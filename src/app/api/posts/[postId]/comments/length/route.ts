import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "recommendation_comments";
const PK_COLUMN_NAME = "post_id";

type GetParameter = {
  params: { postId: number };
};


// 댓글 목록 길이 가져오기
export async function GET(request: NextRequest, params: GetParameter) {
    const {
      params: { postId: id },
    } = params
  
    const supabase = createClient();
    const { count: commentsLength } = await supabase
      .from(TABLE_NAME)
      .select("*, users:author_id(*)", {count:'exact', head: true})
      .eq(PK_COLUMN_NAME, id)

    return NextResponse.json(commentsLength);
  }