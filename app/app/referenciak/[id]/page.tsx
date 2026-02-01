import { projectsData } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

// Define generateStaticParams to statically generate routes at build time
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("Page params:", params);
  const resolvedParams = await params;
  console.log("Resolved params:", resolvedParams);
  
  const project = projectsData.find(p => p.id === Number(resolvedParams.id));
  console.log("Found project:", project?.id);

  return <ProjectDetailClient project={project} />;
}
