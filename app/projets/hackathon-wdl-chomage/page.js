import CaseStudy from "@/components/sections/CaseStudy";

export const metadata = {
  title: "Étude de cas — Chômage des jeunes femmes en Côte d'Ivoire (2025–2035) | Traoré Zié",
  description:
    "Hackathon Data for Development (World Data Lab) : données, méthode (régression OLS, IC 95 %), graphiques et recommandations sur le chômage des jeunes femmes en Côte d'Ivoire.",
};

export default function Page() {
  return <CaseStudy slug="hackathon-wdl-chomage" />;
}
