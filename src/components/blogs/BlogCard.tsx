import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

interface BlogCardProps {
  posts: Post[];
}

const BlogCard = ({ posts }: BlogCardProps) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {posts.slice(0, 3).map((post) => (
        <div key={post.id} className="flex-col">
          <Link href={`/blogs/${post.id}`}>
            <Image
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="mb-4 w-full rounded-2xl transition-all duration-500 ease-in-out lg:hover:scale-105"
            />
            <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
            <div className="mt-2 ml-4 text-sm">
              <span>
                by<span className="font-medium"> {post.author} </span>
                on
                <span className="font-medium"> {post.updated_at}</span>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
