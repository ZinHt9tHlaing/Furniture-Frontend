"use client";

import Link from "next/link";
import Image from "next/image";

import Couch from "@/data/images/couch.png";
import { Button } from "@/components/ui/button";
import CarouselCard from "@/components/products/CarouselCard";
import { products } from "@/data/products";
import Title from "@/components/Title";
import { posts } from "@/data/posts";
import BlogCard from "@/components/blogs/BlogCard";
import ProductCard from "@/components/products/ProductCard";

// const samplePosts = posts.slice(0, 3);
const sampleProducts = products.slice(0, 4);

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="lg:text-lef my-8 text-center lg:mt-16 lg:mb-0 lg:w-2/5">
          <h1 className="text-own mb-4 text-4xl font-extrabold lg:mb-8 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="text-own mb-6 lg:mb-8 px-5">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold duration-200 hover:bg-orange-400 active:scale-90"
            >
              <Link href="#">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-own rounded-full px-8 py-6 text-base font-bold duration-200 active:scale-90"
            >
              <Link href="#">Explore</Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <Image
          src={Couch}
          alt={"Couch"}
          loading="eager"
          className="w-full lg:w-3/5"
        />
      </div>
      {products && <CarouselCard products={products} />}

      {/* Featured Products */}
      <Title
        title="Featured Products"
        href={"/products"}
        sideText="View All Products"
      />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-0">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Recent Blog  */}
      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
      {posts && <BlogCard posts={posts} />}
    </div>
  );
};

export default HomePage;
