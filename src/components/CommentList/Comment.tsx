"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CmtEditBtn from "./modal/CmtEditBtn";
import CmtDelBtn from "./modal/CmtDelBtn";
import { CommentType, CommentWriter } from "@/types/Comments";
import { formatDateString } from "@/utils/formatDateString";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface PropsType {
  comment: CommentType;
}

const Comment = ({ comment }: PropsType) => {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const supabase = createClient();
    const fetchData = async (): Promise<void> => {
      const {
        data: { user },
        error: getUserError,
      } = await supabase.auth.getUser();
      if (user) {
        setUserData(user);
      }
      return;
    };
    fetchData();
  }, []);

  const user = userData?.user_metadata;
  const profileImgSrc = comment?.users?.profile_image;

  return (
    <div className="w-full h-[95px] flex justify-between items-center border-b border-[#dddddd]">
      <div className="w-full h-[95px] flex justify-start items-center">
        {profileImgSrc ? (
          <Image
            src={profileImgSrc}
            width={50}
            height={50}
            alt="프로필 이미지"
            priority
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        ) : (
          <Image
            src="/concert-default-image.png"
            width={50}
            height={50}
            alt="프로필 이미지"
            priority
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        )}
        <span className="w-32 max-w-[130px] ml-[15px]">
          {comment?.users?.nickname}
        </span>
        <span className="w-auto max-w-[700px]">{comment.content}</span>
      </div>
      <div className="ml-auto flex justify-end items-center gap-[10px] text-[#A0A0A0]">
        <span className="w-auto min-w-[140px]">
          {formatDateString(comment.created_at)}
        </span>
        {user?.sub !== comment?.author_id ? (
          <></>
        ) : (
          <div className="w-[95px] h-[20px] flex justify-between items-center">
            <CmtEditBtn comment={comment} />
            <span>|</span>
            <CmtDelBtn comment={comment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
