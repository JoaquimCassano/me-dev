"use client";
import Iphone15Pro from "@/components/ui/shadcn-io/iphone-15-pro";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { FaRocket, FaCode, FaDollarSign } from "react-icons/fa";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export default function MainPage() {
  const features = [
    {
      title: "Rápido",
      description: "Crie seu portifólio em minutos",
      icon: FaRocket,
      href: "/create",
      cta: "Começar",
    },
    {
      title: "Bonito",
      description:
        "Apresente seus projetos de forma bonita e profissional, mesmo sem conhecimento em front-end!",
      icon: FaCode,
      href: "/create",
      cta: "Começar",
    },
    {
      title: "Grátis",
      description:
        "De graça, até injeção na testa: use todas as funcionalidades sem pagar nada.",
      icon: FaDollarSign,
      href: "/create",
      cta: "Começar",
    },
  ];
  return (
    <div className="min-h-screen bg-base-200" data-theme="cupcake">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Iphone15Pro
            className="w-72 h-auto sm:w-96 md:w-[400px]"
            src="/screenshot.png"
          />
          <div>
            <TypingAnimation className="text-5xl font-bold" cursorStyle="block">
              Apresente-se ao mundo
            </TypingAnimation>
            <p className="py-6">
              Tenha um portifólio profissional em poucos minutos.{" "}
            </p>
            <button className="btn btn-primary justify-center">
              Crie seu perfil agora
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-12">
        <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-max gap-6">
          {features.map((feature, index) => (
            <BentoCard
              key={index}
              name={feature.title}
              description={feature.description}
              Icon={feature.icon}
              href={feature.href}
              cta={feature.cta}
              className="col-span-1"
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
