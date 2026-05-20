"use client";

import { Icons } from "@/components/Icons";
import RichTextRenderer from "@/components/blogs/RichTextRenderer";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const BlogDetail = () => {
  const { postId } = useParams();

  const post = posts.find((post) => post.id === postId);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button
            variant={"outline"}
            className="group mt-8 mb-6 duration-200 active:ring-1 active:ring-gray-500"
            asChild
          >
            <Link href={"/blogs"}>
              <Icons.arrowLeft className="duration-200 group-hover:-translate-x-1" />
              All Posts
            </Link>
          </Button>
          {post ? (
            <>
              <h2 className="mb-3 text-3xl font-extrabold">{post.title}</h2>
              <div className="text-sm">
                <span>
                  by
                  <span className="px-1 font-semibold">{post.author}</span>
                  on <span className="font-semibold">{post.updated_at}</span>
                </span>
              </div>
              <h3 className="my-6 text-base font-normal">{post.content}</h3>
              <Image
                src={post.image}
                alt={post.title}
                loading="eager"
                decoding="async"
                className="mb-4 w-full rounded-xl"
              />
              <RichTextRenderer content={post.body} className="mb-8" />
              <div className="mb-12 space-x-2">
                {post.tags.map((tag, index: number) => (
                  <Button variant={"secondary"} key={index}>
                    {tag}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground mt-8 mb-16 text-center text-xl font-bold lg:mt-24">
              No post found
            </p>
          )}
        </section>
        {/* other blog posts */}
        <section className="w-full lg:mt-24 lg:w-1/4">
          <div className="mb-8 flex items-center gap-4 text-base font-semibold">
            <Icons.layers />
            <h3 className="">Other Blog Posts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.id}`}
                onClick={scrollToTop}
                className="mb-6 flex items-start gap-2"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-1/4 rounded"
                />
                <div className="text-muted-foreground w-3/4 text-sm font-medium">
                  <p className="line-clamp-2">{post.content}</p>
                  <i>... see more</i>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default BlogDetail;
