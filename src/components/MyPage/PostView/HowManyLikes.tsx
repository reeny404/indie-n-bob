import useAllLikes from "@/hooks/useAllLikes";

const HowManyLikes = ({ postId }) => {
  const { data, isPending, isError } = useAllLikes();

  if (isPending) return <span>좋아요 불러오는 중...</span>;
  if (isError) return <span>에러 발생</span>;

  const likes = data.likes.filter((like) => like.post_id === postId).length;

  return (
    <>
      <span className="text-main-color">❤</span>
      <span>{likes}</span>
    </>
  );
};

export default HowManyLikes;
