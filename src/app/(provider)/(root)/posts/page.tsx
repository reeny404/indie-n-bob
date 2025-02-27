import Hashtag from "@/components/Hashtag";
import PostListView from "./_components/PostListView";

const tags: string[] = ["내요듣", "숨듣명", "내밴소"];

type PostListPageProps = {
  searchParams: { [key: string]: string | undefined };
};

function PostListPage({ searchParams: { keyword } }: PostListPageProps) {
  return (
    <main className="flex flex-col justify-center items-center mb-38">
      <h2 className="py-8 font-bold text-3xl text-main-color">게시판</h2>
      <Hashtag selectedTag={keyword} size="lg" tags={tags}></Hashtag>
      <PostListView keyword={keyword}></PostListView>
    </main>
  );
}

export default PostListPage;
