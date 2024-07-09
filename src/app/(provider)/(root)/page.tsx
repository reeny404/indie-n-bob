"use client";
import MainPage from "@/components/MainPage/MainPage";
import { Auth } from "@/types/Auth";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<Auth[]>([]);
  useEffect(() => {
    const supabase = createClient();
    const fetchData = async () => {
      const { data, error: getUserError } = await supabase.auth.getUser();
      //setUser(data);
      return data;
    };
    fetchData();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.delete("/api/auth/signup");
      if (response.status === 200) {
        alert("로그아웃 성공");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      } else {
        console.error("로그아웃 실패:", response.data.error);
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };
  console.log(user);
  return (
    <main>
      <MainPage />
    </main>
  );
}
