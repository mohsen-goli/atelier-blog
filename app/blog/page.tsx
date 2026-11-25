import BlogExplorer from "@/components/BlogExplorer";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return <BlogExplorer posts={posts} />;
}
