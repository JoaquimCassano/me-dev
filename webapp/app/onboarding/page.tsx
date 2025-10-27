"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { completeOnboarding } from "./actions";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [skills, setSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const steps = [
    {
      title: "Qual é o seu nome completo?",
      subtitle: "Vamos começar com o básico",
      field: "fullName",
      type: "text",
      placeholder: "Ex: João Silva",
      value: fullName,
      setValue: setFullName,
    },
    {
      title: "Fale um pouco sobre você",
      subtitle: "Uma breve bio (máx. 150 caracteres)",
      field: "bio",
      type: "textarea",
      placeholder: "Ex: Desenvolvedor Full Stack apaixonado por tecnologia",
      value: bio,
      setValue: setBio,
      maxLength: 150,
    },
    {
      title: "Link do seu portfólio",
      subtitle: "Onde as pessoas podem ver seu trabalho",
      field: "portfolio",
      type: "url",
      placeholder: "https://seu-portfolio.com",
      value: portfolio,
      setValue: setPortfolio,
    },
    {
      title: "Quais são suas principais habilidades?",
      subtitle: "Separe por vírgula (ex: React, TypeScript, Node.js)",
      field: "skills",
      type: "text",
      placeholder: "React, TypeScript, Node.js",
      value: skills,
      setValue: setSkills,
    },
  ];

  const currentStep = steps[step];

  useEffect(() => {
    if (currentStep.type === "textarea") {
      textareaRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [step, currentStep.type]);

  const handleNext = (e?: FormEvent) => {
    e?.preventDefault();

    if (!currentStep.value.trim()) {
      setError("Este campo é obrigatório");
      return;
    }

    setError("");

    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
      setError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!skills.trim()) {
      setError("Este campo é obrigatório");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await completeOnboarding({
      fullName,
      bio,
      portfolio,
      skills: skills.split(",").map((s) => s.trim()),
    });

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-base-200" data-theme="cupcake">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full max-w-md">
          <div className="w-full">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-sm font-semibold text-base-content/60">
                  Etapa {step + 1} de {steps.length}
                </h1>
                <span className="text-xs text-base-content/50">
                  {Math.round(((step + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-base-300 h-1 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-2 text-base-content">
                  {currentStep.title}
                </h2>
                <p className="text-base-content/60">{currentStep.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 alert alert-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l4-4m0 0l4-4m-4 4L6 6m4 4l4 4"
                  />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}

            <form
              onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}
              className="w-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep.type === "textarea" ? (
                    <textarea
                      ref={textareaRef}
                      className="textarea textarea-bordered w-full mb-6"
                      placeholder={currentStep.placeholder}
                      value={currentStep.value}
                      onChange={(e) => {
                        currentStep.setValue(e.target.value);
                        setError("");
                      }}
                      disabled={isLoading}
                      maxLength={currentStep.maxLength}
                      rows={3}
                    />
                  ) : (
                    <input
                      ref={inputRef}
                      type={currentStep.type}
                      className="input input-bordered w-full mb-6"
                      placeholder={currentStep.placeholder}
                      value={currentStep.value}
                      onChange={(e) => {
                        currentStep.setValue(e.target.value);
                        setError("");
                      }}
                      disabled={isLoading}
                      required
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline flex-1"
                    onClick={handlePrevious}
                    disabled={isLoading}
                  >
                    Voltar
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Salvando...
                    </>
                  ) : step === steps.length - 1 ? (
                    "Concluir"
                  ) : (
                    "Próximo"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
