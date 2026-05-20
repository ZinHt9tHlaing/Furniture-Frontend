import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

interface BlogListProps {
  posts: Post[];
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="flex-col">
          <Link href={`/blogs/${post.id}`} key={post.id}>
            <Image
              src={post.image}
              alt={post.title}
              loading="eager"
              decoding="async"
              className="mb-4 w-full rounded-xl"
            />
          </Link>
          <h2 className="line-clamp-1 text-xl font-extrabold">{post.title}</h2>
          <h3 className="my-2 line-clamp-3 text-base font-normal">
            {post.content}
          </h3>
          <div className="text-sm">
            <span>
              by<span className="font-semibold"> {post.author} </span>on
              <span className="font-semibold"> {post.updated_at}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
