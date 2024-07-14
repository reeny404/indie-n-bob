"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/Loading";
import useMyPosts from "@/hooks/useMyPosts";
import Image from "next/image";
import HowManyLikes from "./HowManyLikes";
import { useRouter } from "next/navigation";

const MyPostGalleryView = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts?.map((post) => {
                if (!post) return null;
                return (
                    <div
                        key={post.post_id}
                        className="p-4 ease-in-out duration-400 transition-transform transform hover:-translate-y-2"
                        onClick={() => handlePostClick(post.post_id)}
                    >
                        <div className="w-52 h-52 relative">
                            <Image
                                src={post.image || "/default-image.jpg"} // 어차피 이미지 없을 리 없음
                                alt={post.title || "기본 이미지"}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-2xl"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-lg mt-3 font-medium truncate">{post.title}</span>
                            <div className="flex mt-3 items-center space-x-2">
                                <HowManyLikes postId={post.post_id} />
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600 line-clamp-4 min-h-[100px]">{post.content}</p>
                        <div className="flex items-center space-x-2 mt-2 text-gray-500 text-sm">
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                );
            })}
            <div ref={ref} />
            {isPending && <Loading />}
        </div>
    );
};

export default MyPostGalleryView;