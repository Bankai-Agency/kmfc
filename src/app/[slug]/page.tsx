"use client";

import { notFound, useParams } from "next/navigation";
import { PAGES_DATA } from "@/lib/data";
import Hero from "@/components/sections/Hero";
import HeroForm from "@/components/sections/HeroForm";
import TrustSignals from "@/components/sections/TrustSignals";
import Benefits from "@/components/sections/Benefits";
import Steps from "@/components/sections/Steps";
import Conditions from "@/components/sections/Conditions";
import Calculator from "@/components/sections/Calculator";
import CTABanner from "@/components/sections/CTABanner";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Guarantee from "@/components/sections/Guarantee";
import ForWhom from "@/components/sections/ForWhom";
import Testimonials from "@/components/sections/Testimonials";
import OtherCollateral from "@/components/sections/OtherCollateral";
import LeadForm from "@/components/sections/LeadForm";
import FAQ from "@/components/sections/FAQ";
import Contacts from "@/components/sections/Contacts";

export default function LandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const page = PAGES_DATA[slug];
  if (!page) notFound();

  return (
    <>
      <Hero data={page.hero} collateralImageLabel={page.heroImageLabel ?? ""} collateralImage={page.heroImage} />
      <HeroForm collateralType={page.slug} />
      <TrustSignals />
      <Benefits data={page.benefits} />
      <Steps data={page.steps} />
      <Conditions data={page.conditions} />
      <Calculator {...page.calculator} />
      <CTABanner
        title="Готовы получить деньги?"
        subtitle="Оставьте заявку — узнайте решение за 15 минут"
        variant="dark"
      />
      <Testimonials />
      <ComparisonTable />
      <Guarantee />
      <ForWhom />
      <OtherCollateral current={page.slug} />
      <LeadForm collateralType={page.slug} />
      <FAQ />
      <Contacts />
    </>
  );
}
