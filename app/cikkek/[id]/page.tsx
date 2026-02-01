import { blogData } from "@/lib/data";
import BlogPostDetailClient from "./BlogPostDetailClient";

export async function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = blogData.find(p => p.id === Number(resolvedParams.id));

  return <BlogPostDetailClient post={post} />;
}
