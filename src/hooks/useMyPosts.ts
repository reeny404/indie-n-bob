"use client";

import getMyPosts from "@/utils/getMyPosts";
import { useInfiniteQuery } from "@tanstack/react-query";

const useMyPosts = () => {
    return useInfiniteQuery({
        queryKey: ['myPosts'],
        queryFn: ({ pageParam = 0 }) => getMyPosts(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor !== null ? lastPage.nextCursor : undefined;
        },
        initialPageParam: 0,
        staleTime: Infinity
    });
};

export default useMyPosts;