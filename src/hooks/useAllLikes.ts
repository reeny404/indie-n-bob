"use client";

import getLikes from "@/utils/getLikes"
import { useQuery } from "@tanstack/react-query";

const useAllLikes = () => {
    return useQuery({
        queryKey: ['allLikes'],
        queryFn: getLikes,
        staleTime: Infinity
    });
}

export default useAllLikes;