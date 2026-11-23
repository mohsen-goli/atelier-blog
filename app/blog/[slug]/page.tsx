import { posts } from "@/data/posts";
import LikeButton from "@/components/LikeButton";
import type { Metadata } from "next";
import Image from "next/image";
type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;

  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | MiniBlog",
      description: "The article you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} | MiniBlog`,
    description: post.description,
  };
}
export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;

  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return <h1>Article not found!</h1>;
  }

  return (
    <main>
      <h1>{post.title}</h1>

      <p>{post.content}</p>
      <Image src={post.image} alt={post.title} width={800} height={450} />
      <LikeButton />
    </main>
  );
}
