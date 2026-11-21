import { notFound } from "next/navigation";
import CaseStudy from "@/components/sections/CaseStudy";
import { caseStudies } from "@/data/caseStudies";

const KIND = "projets";

export function generateStaticParams() {
  return Object.entries(caseStudies)
    .filter(([, cs]) => cs.kind === KIND)
    .map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) return {};
  return { title: `${cs.fr.title} | Traoré Zié`, description: cs.fr.subtitle };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs || cs.kind !== KIND) notFound();
  return <CaseStudy slug={slug} />;
}
