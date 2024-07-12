"use client";

import SITE_URL from "@/constant";
import { NewCommentType } from "@/types/Comments";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const CommentUpload = ({ postId }: Params) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
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

  const { mutate: createComment } = useMutation({
    mutationFn: async (item: NewCommentType) => {
      await fetch(`${SITE_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(item),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      Swal.fire({
        title: "댓글이 등록되었습니다.",
        text: "",
        icon: "success",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contentRef?.current?.value) {
      Swal.fire({
        title: "댓글이 입력되지 않았습니다.",
        text: "댓글은 40자 이내로 작성해주세요.",
        icon: "warning",
        cancelButtonText: "확인",
        cancelButtonColor: "#A04741",
      });
      return;
    }
    const newComment: NewCommentType = {
      post_id: +postId,
      author_nickname: user?.nickname,
      content: contentRef.current.value,
      author_id: user?.sub,
    };
    createComment(newComment);
    contentRef.current.value = "";
  };

  return (
    <form
      className="w-full flex justify-between items-center mt-[27px]"
      onSubmit={handleSubmit}
    >
      <input
        ref={contentRef}
        type="text"
        placeholder="댓글을 입력해주세요."
        className="w-[87%] h-[70px] rounded-[10px] bg-[#f4f4f4] text-[18px] indent-[25px] focus:outline-none"
      />
      <button className="w-[12%] h-[70px] rounded-[10px] bg-[#10AF86] text-white text-[22px] hover:bg-[#0e9a77] transition duration-200">
        등록
      </button>
    </form>
  );
};

export default CommentUpload;
