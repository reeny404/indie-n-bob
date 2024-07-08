const PostGallery = ({ posts }: { posts: any[] }) => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.post_id} className="p-4 bg-white shadow rounded">
            <img src="https://stfauxrjudaltlmspsnv.supabase.co/storage/v1/object/public/posts/public/post_default.png" alt={post.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-medium">{post.title}</h3>
            <p className="mt-2 text-gray-600">{post.content}</p>
            <div className="flex items-center space-x-2 mt-2 text-gray-500 text-sm">
              <span>💙 10</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PostGallery;