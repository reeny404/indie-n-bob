import { getAuthUesrOnServer } from '@/utils/getAuthUesrOnServer';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "recommendation_likes";
const POST_ID = "post_id";
const LIKED_USER_ID = "liked_user_id";


type parameter = {
  params : { postId : number }
}

export async function GET(_: NextRequest) {
  const user = await getAuthUesrOnServer();
  if (!user) {
    return NextResponse.json({ isLiked : false, userId : null });
  }

  const supabase = createClient();
  const { count } = await supabase
    .from(TABLE_NAME)
    .select("*", { count: 'exact' })
    .eq(LIKED_USER_ID, user.id);

  return NextResponse.json({ isLiked : Boolean(count), count, userId : user.id });
}

export async function POST(_: NextRequest, { params : {postId: id} }: parameter) {
  const user = await getAuthUesrOnServer();
  if (!user){
    return NextResponse.json({error : {message : "로그인 후 이용해주세요"}}, { status : 403 } );
  }

  const supabase = createClient();
  const { data: post } = await supabase
    .from(TABLE_NAME)
    .insert({
      post_id : id,
      liked_user_id : user.id 
    })
    .select();

  return NextResponse.json({ post, userId: user.id, postId : id });
}

export async function DELETE(_: NextRequest, { params : {postId: id} }: parameter) {
  const user = await getAuthUesrOnServer();
  if (!user){
    return NextResponse.json({error : {message : "로그인 후 이용해주세요"}}, { status : 403 } );
  }
  
  const supabase = createClient();
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq(POST_ID, id)
    .eq(LIKED_USER_ID, user.id)

  return NextResponse.json({ error }, {status : (!error ? 200 : 403) });
}
