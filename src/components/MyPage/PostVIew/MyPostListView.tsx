"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/Loading";
import useMyPosts from "@/hooks/useMyPosts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HowManyLikes from "../PostVIew/HowManyLikes";

const MyPostListView = () => {
  const { data, isPending, isError, fetchNextPage, hasNextPage } = useMyPosts();
  const posts = data?.pages?.flatMap(page => page.posts);
  const { ref, inView } = useInView();
  const router = useRouter();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handlePostClick = (postId) => {
    router.push(`/posts/${postId}`);
  };

  if (!posts || posts.length === 0) {
    return <div>게시글을 불러올 수 없습니다.</div>;
  }

  if (isPending) return <Loading />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="post-container flex items-start space-x-4 p-4 ease-in-out duration-400 transition-transform transform hover:-translate-y-2"
          onClick={() => handlePostClick(post.post_id)}
        >
          <div className="w-48 h-32 relative flex-shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-1 flex-col min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium truncate w-5/6">{post.title}</span>
              <span className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="mt-2 h-16 flex-1 text-gray-600">
              <p className="line-clamp-2 min-h-12">{post.content}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-gray-500 text-sm">
              <HowManyLikes postId={post.post_id} />
            </div>
          </div>
        </div>
      ))}
      <div ref={ref} />
      {isPending && <Loading />}
    </div>
  );
};

export default MyPostListView;