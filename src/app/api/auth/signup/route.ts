import { Auth } from "@/types/Auth";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { email, password, nickname, is_admin, favorite_artist }: Auth =
      await request.json();
  

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            nickname,
            is_admin,
            favorite_artist,
          },
        },
      }
    );

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        user_id: signUpData?.user?.id,
        email,
        nickname,
        is_admin,
        favorite_artist,
      },
    ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json(signUpData);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient();
  try {
    const { data: userData, error:userError } = await supabase.auth.getUser();

    if (userError || !userData || !userData.user) {
      return NextResponse.json(
        { error: userError?.message || "사용자 정보를 가져올 수 없습니다." },
        { status: 400 }
      );
    }

    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      return NextResponse.json(
        { error: signOutError.message },
        { status: 400 }
      );
    }

    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("user_id", userData.user.id);
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
