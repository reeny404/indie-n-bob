"use client";

import SITE_URL from "@/constant";
import { CommentType, NewCommentType } from "@/types/Comments";
import { formatDateString } from "@/utils/formatDateString";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useRef } from "react";
import Swal from "sweetalert2";

interface PropsType {
  comment: CommentType;
  onClose: () => void;
}

const CmtToModi = ({ comment, onClose }: PropsType) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const { post_id, author_id, author_nickname, comment_id } = comment;
  const profileImgSrc = comment?.users?.profile_image;
  const queryClient = useQueryClient();

  const { mutate: editComment } = useMutation({
    mutationFn: async (item: NewCommentType) => {
      await fetch(`${SITE_URL}/api/posts/${item.post_id}/comments`, {
        method: "PUT",
        body: JSON.stringify(item),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", String(post_id)],
      });
    },
  });

  const handleEditBtn = () => {
    if (contentRef.current) {
      if (contentRef.current.value.length > 40) {
        Swal.fire({
          title: "수정이 제한되었습니다.",
          text: "댓글은 40자 이내로 작성해주세요.",
          icon: "warning",
          cancelButtonText: "확인",
          cancelButtonColor: "#A04741",
        });
        return;
      }

      const editedComment = {
        post_id,
        author_id,
        author_nickname,
        comment_id,
        content: contentRef?.current?.value,
      };

      editComment(editedComment);
      onClose();
    }
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
          <span className="w-auto ml-[15px] text-black hover:cursor-default">
            {comment?.users?.nickname}
          </span>
        </div>
        <div className="w-[250px] flex justify-end items-center gap-[16px] text-[#A0A0A0]">
          <span className="hover:cursor-default">
            {formatDateString(comment?.created_at)}
          </span>
        </div>
      </div>
      <input
        ref={contentRef}
        placeholder="수정할 내용을 입력하세요."
        defaultValue={comment?.content}
        className="w-[850px] h-[25px] text-black text-[20px] mt-[20px] focus:outline-none"
      />
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
          onClick={handleEditBtn}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default CmtToModi;
