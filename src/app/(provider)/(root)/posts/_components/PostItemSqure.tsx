import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../../../../../components/HeartIcon";
import { PostWithAuthor } from "@/types/Post";
import useAllLikes from "@/hooks/useAllLIkes";

type PostSqureProps = {
  post: PostWithAuthor;
};

function PostItemSqure({ post }: PostSqureProps) {
  const {
    post_id: id,
    title,
    content,
    author_nickname: nickname,
    image,
    created_at,
  } = post;
  const createdAt = moment(created_at).format("yyyy.MM.DD");

  const { data: likesData } = useAllLikes();
  const likes = likesData?.likes?.filter((like) => like.post_id === id).length;

  return (
    <Link
      href={`/posts/${id}`}
      className="flex flex-col justify-center items-center"
    >
      <div className="w-full h-[260px] relative">
        <Image
          src={image ?? "/post/fallback.svg"}
          fill
          alt={`이미지: ${title}`}
          className="w-full h-48 rounded-lg object-cover"
        />
      </div>
      <div className="w-full flex flex-col mt-4 space-y-2">
        <header className="flex items-center justify-between gap-x-4">
          <h2 className="h-7 text-lg font-semibold text-gray-900 util-ellipsis">
            {title}
          </h2>
          <span className="flex flex-row items-center text-green-600">
            <HeartIcon className="w-4 h-4 mr-1" />
            {likes}
          </span>
        </header>
        <p className="text-sm text-gray-600 util-ellipsis">{content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>작성자 {nickname}</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostItemSqure;