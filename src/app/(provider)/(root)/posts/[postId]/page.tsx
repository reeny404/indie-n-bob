import BreakLine from "@/components/BreakLine";
import Comments from "@/components/CommentList/Comments";
import Hashtag from "@/components/Hashtag";
import Loading from "@/components/Loading";
import SITE_URL from "@/constant";
import { getAuthUesrOnServer } from "@/utils/getAuthUesrOnServer";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import ButtonsChangePostStatus from "./_components/ButtonsChangePostStatus";
import LikeButton from "./_components/LikeButton";

type PostDetailPageProps = {
  params: { postId: number };
};

async function PostDetailPage({ params: { postId } }: PostDetailPageProps) {
  const response = await fetch(`${SITE_URL}/api/posts/${postId}`);
  const { data: post, error } = await response.json();

  if (error) {
    return (
      <section className="min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="pb-10 text-2xl font-semibold">
          데이터를 불러오지 못했습니다. <br />
        </h2>
        에러메세지 : {JSON.stringify(error)}
        <Link href="/posts" className="pt-10">
          다른 게시글 보러가기
        </Link>
      </section>
    );
  } else if (!post) {
    return <Loading />;
  }

  const {
    title,
    content,
    author_id,
    image,
    created_at,
    hashtag,
    author: { nickname, profile_file: profileImg },
  } = post;
  const createdAt = moment(created_at).format("yyyy.MM.DD");

  const user = await getAuthUesrOnServer();
  console.log(user, author_id);
  const isOwnedUser: boolean = user ? user.id === author_id : false;

  return (
    <main className="py-8">
      <div className="flex flex-row items-center gap-x-3">
        <Image
          src={profileImg ?? "/user/fallback-avatar.svg"}
          alt="프로필 이미지"
          width="45"
          height="45"
        />
        <span className="text-lg font-semibold">{nickname}</span>
        <div className={`ml-auto ${!isOwnedUser && "hidden"}`}>
          <ButtonsChangePostStatus postId={postId} />
        </div>
      </div>
      <h2 className="py-6 text-3xl font-bold">{title}</h2>
      <div className="pb-4 text-gray-400">작성일자 {createdAt}</div>
      <BreakLine />
      <div className="py-10">
        {image && (
          <Image
            src={image}
            alt="사용자 첨부 이미지"
            width="300"
            height="300"
            className="max-w-full max-h-full rounded-xl"
          />
        )}
        <div className="py-10">{content}</div>
      </div>
      <div className="pt-18 pb-4 flex justify-between items-center">
        <Hashtag tags={hashtag?.tags} size="sm" />
        <LikeButton postId={postId} />
      </div>
      <BreakLine />
      <Comments postId={postId} />
    </main>
  );
}

export default PostDetailPage;
