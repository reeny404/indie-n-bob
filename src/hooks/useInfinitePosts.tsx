"use client";

import SITE_URL from "@/constant";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

function useInfinitePosts() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const {
        data: { posts, hasNext, currentPageNo },
      } = await axios.get(`${SITE_URL}/api/posts?pageNo=${pageParam}`);

      return { posts, nextCursor: hasNext ? currentPageNo + 1 : null };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const posts = useMemo(() => {
    if (!data?.pages) return;
    return data.pages.flatMap((page) => page.posts || []);
  }, [data]);

  return {
    posts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export default useInfinitePosts;
