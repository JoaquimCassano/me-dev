"use client";
import Iphone15Pro from "@/components/ui/shadcn-io/iphone-15-pro";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-base-100" data-theme="cupcake">
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
            <button className="btn btn-primary">Crie seu perfil agora</button>
          </div>
        </div>
      </div>
    </div>
  );
}
