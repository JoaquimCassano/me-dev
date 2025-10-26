import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-100" data-theme="cupcake">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col gap-6 text-center px-4">
          <div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Página não encontrada
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-base-content/70 mb-8 max-w-md">
              Desculpe, a página que você está procurando não existe.
            </p>
          </div>
          <div className="flex gap-4 flex-col sm:flex-row justify-center">
            <Link href="/" className="btn btn-primary">
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
