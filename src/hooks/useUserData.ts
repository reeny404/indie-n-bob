"use client";

import getMyInfo from "@/utils/getMyInfo";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
    return useQuery({
        queryKey: ['myInfo'],
        queryFn: getMyInfo,
        staleTime: Infinity
    });
};

export default useUserData;