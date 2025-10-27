"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao criar conta");
        setIsLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Erro ao criar conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200" data-theme="cupcake">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full  max-w-md">
          <div className="text-center mb-8">
            <TypingAnimation
              className="text-3xl md:text-4xl font-bold mb-2"
              cursorStyle="line"
            >
              Criar Conta
            </TypingAnimation>
            <p className="text-base-content/70">
              Cadastre-se para criar seu portfólio
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl w-full ">
            <form className="card-body gap-4 " onSubmit={handleSubmit}>
              {error && (
                <div role="alert" className="alert alert-error">
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
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-2">Nome</span>
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="input input-bordered w-3/4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-2">
                    Username
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Seu nome de usuário"
                  className="input input-bordered w-3/4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-2">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="input input-bordered w-3/4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-2">Senha</span>
                </label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="input input-bordered w-3/4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mr-2">
                    Confirmar Senha
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Digite a senha novamente"
                  className="input input-bordered w-3/4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-base-content/70 mt-6">
            Já tem uma conta?{" "}
            <Link href="/login" className="link link-primary">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
