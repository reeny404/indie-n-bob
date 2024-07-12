"use client";

import SITE_URL from "@/constant";
import { CommentType } from "@/types/Comments";
import { formatDateString } from "@/utils/formatDateString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

interface PropsType {
  comment: CommentType;
  onClose: () => void;
}

const CmtToDel = ({ comment, onClose }: PropsType) => {
  const { post_id } = comment;
  const queryClient = useQueryClient();
  const profileImgSrc = comment?.users?.profile_image;

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: number) => {
      await fetch(`${SITE_URL}/api/posts/${post_id}/comments/${commentId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", String(post_id)],
      });
      Swal.fire({
        title: "댓글이 삭제되었습니다.",
        text: "",
        icon: "success",
      });
    },
  });

  const handleDelbtn = (commentId: number) => {
    deleteComment(commentId);
    onClose();
  };

  return (
    <>
      <div className="w-[900px] h-[80px] flex justify-between items-center border-t border-b border-[#dddddd] text-[18px]">
        <div className="w-[850px] h-[80px] flex justify-start items-center">
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
          <span className="w-auto ml-[15px] text-black">
            {comment?.users?.nickname}
          </span>
        </div>
        <div className="w-[250px] flex justify-end items-center gap-[16px] text-[#A0A0A0]">
          <span>{formatDateString(comment?.created_at)}</span>
        </div>
      </div>
      <span className="w-[850px] h-[25px] text-black text-[20px] mt-[20px]">
        {comment?.content}
      </span>
      <div className="flex gap-[20px] pt-[70px] pl-[475px]">
        <button
          type="button"
          className="w-[200px] h-[55px] rounded-[10px] bg-[#EFEFEF] text-[#747474] hover:bg-[#d7d7d7] transition duration-200"
          onClick={onClose}
        >
          취소
        </button>
        <button
          type="button"
          className="w-[200px] h-[55px] rounded-[10px] bg-[#10AF86] text-white hover:bg-[#0e9a77] transition duration-200"
          onClick={() => handleDelbtn(comment?.comment_id)}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default CmtToDel;
