"use client";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import {
  HiOutlineMusicalNote,
  HiOutlineLockClosed,
  HiOutlineStar,
} from "react-icons/hi2";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuthStore } from "@/zustand/auth.store";
import { useAlertStore } from "@/zustand/alert.store";
import { AlertUi } from "@/components/Alert";

export default function SignUpPage(): JSX.Element {
  const {
    email,
    password,
    nickname,
    is_admin,
    favorite_artist,
    error,
    setEmail,
    setPassword,
    setNickname,
    setIsAdmin,
    setFavoriteArtists,
    setError,
  } = useAuthStore();
  const { setAlert } = useAlertStore();
  const router = useRouter();

  const onChangeEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if (!passwordRegex.test(e.target.value)) {
      setError({
        ...error,
        password: "영문, 숫자, 특수문자 포함 6~10자입니다.",
      });
    } else {
      setError({
        ...error,
        password: "",
      });
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 10) {
      setError({
        ...error,
        nickname: "닉네임은 최소 4자 이상입니다.",
      });
    } else {
      setError({
        ...error,
        nickname: "",
      });
    }
  };

  const onChangeFavoriteArtists = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const artists = value.split(",").map((artist) => artist.trim());
    setFavoriteArtists(artists);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error.password) {
      setAlert(true, "비밀번호 오류 🥲", "비밀번호 조건을 확인해주세요.");
      return;
    }

    if (error.nickname) {
      setAlert(true, "닉네임 오류 🥲", "닉네임 조건을 확인해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          nickname,
          is_admin,
          favorite_artist,
        }
      );

      if (response.data) {
        setAlert(
          true,
          `${nickname}님 반갑습니다!👋`,
          "로그인 페이지로 이동합니다."
        );

        setEmail("");
        setPassword("");
        setNickname("");
        setIsAdmin(false);
        setFavoriteArtists([]);

        setTimeout(() => {
          router.replace("/auth/login");
        }, 1500);
      } else {
        setAlert(true, "회원가입 오류 🥲", response.data.error);
      }
    } catch (error) {
      setAlert(
        true,
        `Sorry! 🥲`,
        "서버 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-2xl font-bold text-main-color my-10">
          회원가입
        </h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center text-left w-[500px] mx-auto"
        >
          <div className="relative">
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="formflet@email.com"
            />
            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <label htmlFor="nickname">닉네임</label>
            <Input
              type="text"
              id="nickname"
              value={nickname}
              onChange={onChangeNickname}
              placeholder="영문, 숫자 포함 4~10자"
            />
            <HiOutlineMusicalNote className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            {error.nickname && (
              <p className="text-red-500 absolute bottom-0 text-[11px]">
                {error.nickname}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              placeholder="영문, 숫자, 특수문자 포함 6~10자"
            />
            <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            {error.password && (
              <p className="text-red-500 absolute bottom-0 text-[11px]">
                {error.password}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="favoriteArtist">선호하는 아티스트</label>
            <Input
              type="text"
              id="favoriteArtist"
              value={favorite_artist}
              placeholder="실리카겔, 잔나비, 유다빈밴드, 데이브레이크"
              onChange={onChangeFavoriteArtists}
            />
            <HiOutlineStar className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <p className="mb-2">사용자 유형</p>
          <div className="flex gap-2">
            <input
              type="radio"
              value="false"
              checked={is_admin === false}
              onChange={(e) => setIsAdmin(false)}
            />
            일반사용자
            <input
              type="radio"
              value="true"
              checked={is_admin === true}
              onChange={(e) => setIsAdmin(true)}
            />
            관리자
          </div>
          <p className="text-[11px] text-gray-400 py-2">
            * 관리자는 공연일정을 등록할 수 있습니다.
          </p>

          <div className="flex flex-col gap-3 ">
            <button
              type="submit"
              className="bg-main-color text-white rounded-md p-3"
            >
              회원가입
            </button>
            <Link href="/auth/login" className="block">
              <button className="w-[100%] border-2 border-main-color rounded-md text-main-color p-3 transition-all duration-300 ease-in-out hover:bg-main-color hover:text-white">
                로그인
              </button>
            </Link>
          </div>
          <AlertUi />
        </form>
      </div>
    </>
  );
}

const Input = styled.input`
  background: #efefef;
  border-radius: 5px;
  padding: 10px 10px 10px 35px;
  width: 100%;
  font-size: 15px;
  margin: 5px 0 30px 0;
`;
