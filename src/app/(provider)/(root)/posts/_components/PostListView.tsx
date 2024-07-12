"use client";

import Loading from "@/components/Loading";
import SITE_URL from "@/constant";
import { Post, PostWithAuthor } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import PostItemSqure from "./PostItemSqure";
import Link from "next/link";
import useUserData from "@/hooks/useUserData";

type PostListViewProps = {
  keyword?: string;
};

function PostListView({ keyword }: PostListViewProps) {
  const { data: userData } = useUserData();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<PostWithAuthor[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`${SITE_URL}/api/posts`);

      return await response.json();
    },
  });

  // TODO 무한 스크롤 기능 구현 필요

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return "오류로 인하여 데이터를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요";
  }

  const filteredPosts = keyword
    ? posts?.filter((post: Post) => {
        const { hashtag = { tags: [] } } = post;
        return hashtag
          ? hashtag["tags"]?.find((tag: string) => tag === keyword)
          : false;
      })
    : posts;

  // TODO filteredPosts.length === 0 일 때 처리 필요
  if (!filteredPosts) {
    return "검색 결과가 없습니다.";
  }

  return (
    <>
      <div className="relative w-full">
        <div className="absolute left-0 bottom-0">
          {userData && (
            <Link
              className="text-white bg-main-color px-4 py-2 rounded-[10px]"
              href={"/posts/create"}
            >
              <button>글쓰기</button>
            </Link>
          )}
        </div>
      </div>
      <ol className="w-full grid grid-cols-1 gap-10 mt-8 md:grid-cols-2 lg:grid-cols-3 p-0">
        {filteredPosts.map((post) => (
          <li key={post.post_id} className="flex flex-col w-full max-w-sm">
            <PostItemSqure post={post}></PostItemSqure>
          </li>
        ))}
      </ol>
    </>
  );
}

export default PostListView;
