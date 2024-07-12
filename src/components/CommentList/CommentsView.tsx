"use client";

import { useQuery } from "@tanstack/react-query";
import SITE_URL from "@/constant";
import LoadingComments from "./LoadingComments";
import Comment from "./Comment";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";
import ErrorGetComments from "./ErrorGetComments";

const CommentsView = ({ postId }: Params) => {
  const [pageNo, setPageNo] = useState(1); // 페이지 넘버
  const [pageSize, setPageSize] = useState(1); // 클릭 가능한 페이지 수
  const COMMENT_COUNT = 5;

  const { data: cmtLength } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await fetch(
        `${SITE_URL}/api/posts/${postId}/comments/length`
      );
      return await response.json();
    },
  });

  const {
    data: comments,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["comments", postId, pageNo],
    queryFn: async () => {
      const response = await fetch(
        `${SITE_URL}/api/posts/${postId}/comments?limit=${COMMENT_COUNT}&offset=${
          (pageNo - 1) * COMMENT_COUNT
        }`
      );
      return await response.json();
    },
  });

  useEffect(() => {
    if (comments && cmtLength) {
      setPageSize(Math.ceil(cmtLength / COMMENT_COUNT));
    }
  }, [comments, cmtLength]);

  const handleClickPageBtn = async (num: number) => {
    setPageNo(num);
  };

  if (isPending) {
    return <LoadingComments />;
  }

  if (isError) {
    return <ErrorGetComments />;
  }
  return (
    <div className="w-full mt-[5px] text-[18px]">
      <span className="w-full h-[90px] flex items-center text-[#8D8D8D] ">
        댓글 ({cmtLength})
      </span>
      {comments?.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} />
      ))}
      <div className="w-full h-[100px] flex justify-center items-center gap-5">
        {[...Array(pageSize)].map((_, index) => {
          return (
            <button
              key={index + 1}
              onClick={() => handleClickPageBtn(index + 1)}
              className={`hover:cursor-pointer ${
                pageNo === index + 1 ? "text-[#10AF86]" : "text-[#616161]"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsView;
