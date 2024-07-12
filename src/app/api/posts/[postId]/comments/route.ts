import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "recommendation_comments";
const PK_COLUMN_NAME = "post_id";

type GetParameter = {
  params: { postId: number };
};

type DeleteParameter = {
  commentId: number;
};

// 게시물 당 댓글목록 Read (페이지네이션)
export async function GET(request: NextRequest, params: GetParameter) {
  const {
    params: { postId: id },
  } = params;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "5");
  const offset = parseInt(searchParams.get("offset") || "0");

  const supabase = createClient();
  const { data: comments } = await supabase
    .from(TABLE_NAME)
    .select("*, users:author_id(*)")
    .eq(PK_COLUMN_NAME, id)
    .order("created_at", { ascending: true }) 
    .range(offset, offset + limit - 1);

  return NextResponse.json(comments);
}

// 댓글 등록
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const item = await request.json();
  const { data: postedComment } = await supabase.from(TABLE_NAME).insert(item);

  return NextResponse.json(postedComment);
}

// 댓글 수정
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const item = await request.json();
    const { comment_id } = item;
    const { data: editedComment, error } = await supabase
      .from(TABLE_NAME)
      .update(item)
      .eq("comment_id", comment_id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(editedComment);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
