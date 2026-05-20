import BlogList from "@/components/blogs/BlogList";
import { posts } from "@/data/posts";

const Blog = () => {
  return (
    <div className="container mx-auto">
      <h1 className="mt-8 text-center text-2xl font-bold md:text-left">
        Latest Blog Posts
      </h1>
      <BlogList posts={posts} />
    </div>
  );
};

export default Blog;
