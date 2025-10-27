"use client";
import Link from "next/link";
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
        <div className="hero-content flex-col lg:flex-row-reverse gap-6 lg:gap-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full sm:w-auto flex justify-center lg:justify-end">
            <Iphone15Pro
              className="w-56 sm:w-72 md:w-80 lg:w-96 h-auto"
              src="/screenshot.png"
            />
          </div>
          <div className="w-full lg:w-auto flex flex-col justify-center">
            <TypingAnimation
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
              cursorStyle="block"
            >
              Apresente-se ao mundo
            </TypingAnimation>
            <p className="py-4 sm:py-6 text-sm sm:text-base">
              Tenha um portifólio profissional em poucos minutos.{" "}
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link
                href="/signup"
                className="btn btn-primary justify-center w-full sm:w-auto"
              >
                Crie seu perfil agora
              </Link>
              <Link
                href="/login"
                className="btn btn-outline justify-center w-full sm:w-auto"
              >
                Fazer Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-4 sm:gap-6">
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
