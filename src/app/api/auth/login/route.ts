import { Auth } from "@/types/Auth";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { email, password }: Auth = await request.json();

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      return NextResponse.json({ error: signInError.message }, { status: 400 });
    }

    return NextResponse.json(signInData);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   const supabase = createClient();
//   try {
//     const { data: getUser } = await supabase.auth.getUser();

//     const { data: userData, error: userDataError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("user_id", getUser.user.id);

//     if (userDataError) {
//       return NextResponse.json(
//         { error: userDataError.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(userData);
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
