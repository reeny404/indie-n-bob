import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const PerformanceInfo: FC = () => {
  const {
    data: concerts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["mainConcerts"],
    queryFn: async () => {
      const supabase = createClient();
      const { data: post } = await supabase
        .from("concert_posts")
        .select("*, users:author_id(*)");

      return post;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/loading-circle.gif" alt="Loading" width={50} height={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sortedConcerts =
    concerts &&
    concerts.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="text-center p-5">
      <div className="mb-5">
        <h2 className="text-40px text-[#10AF86] text-left">공연정보</h2>
        <div className="flex justify-between items-center">
          <p className="text-25px text-left">이번 달 공연정보 입니다.</p>
          <Link href="/concerts" legacyBehavior>
            <p className="text-gray-500 text-sm cursor-pointer">더보기 &gt;</p>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedConcerts &&
          sortedConcerts.slice(0, 3).map((concert) => (
            <Link
              key={concert.post_id}
              href={`/concerts/${concert.post_id}`}
              legacyBehavior
            >
              <a className="relative w-80 h-80 lg:w-80 lg:h-80 sm:w-50 sm:h-50 rounded-full overflow-hidden group cursor-pointer transition duration-200">
                <Image
                  src={concert.image ?? "/post/fallback.svg"}
                  alt={`Performance ${concert.post_id}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition z-1"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center text-[#ffffff00] bg-opacity-0 hover:text-[white] hover:bg-[#00000076]">
                  <p className="text-xl">{concert.title}</p>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PerformanceInfo;
