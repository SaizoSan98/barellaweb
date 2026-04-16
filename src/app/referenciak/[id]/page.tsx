import { projectsData } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

// Define generateStaticParams to statically generate routes at build time
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find(p => p.id === Number(resolvedParams.id));

  const settingsRows = await db.select().from(siteSettings);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  return <ProjectDetailClient project={project} settings={settings} />;
}
