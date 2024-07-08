const PostList = ({ posts }: { posts: any[] }) => {
    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-start space-x-4 p-4 bg-white shadow rounded">
            <img src="https://stfauxrjudaltlmspsnv.supabase.co/storage/v1/object/public/posts/public/post_default.png" alt={post.title} className="w-24 h-24 rounded" />
            <div className="flex-1">
              <p className="text-lg font-medium ">{post.title}</p>
              <p className="mt-2 text-gray-600">{post.content}</p>
              <div className="flex items-center space-x-2 mt-2 text-gray-500 text-sm">
                <span>💙 10</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PostList;