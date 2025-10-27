import { auth, signOut } from "@/app/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-base-200" data-theme="cupcake">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Me-dev</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                {session.user?.name?.[0]?.toUpperCase()}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={`/${session.user?.name}`}>Perfil</Link>
              </li>
              <li>
                <a>Configurações</a>
              </li>
              <li>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit">Sair</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Bem-vindo, {session.user?.name}!
              </h2>
              <p className="text-base-content/70">
                Email: {session.user?.email}
              </p>

              <div className="divider my-6"></div>

              <h3 className="text-lg font-bold mb-4">
                Gerenciamento do Portfólio
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-base">Meus Projetos</h4>
                    <p className="text-sm text-base-content/70">
                      Adicione e gerencie seus projetos
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">
                        Ver Projetos
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-base">Editar Perfil</h4>
                    <p className="text-sm text-base-content/70">
                      Atualize suas informações pessoais
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">Editar</button>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-base">Habilidades</h4>
                    <p className="text-sm text-base-content/70">
                      Gerencie suas habilidades técnicas
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">
                        Gerenciar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-base">Configurações</h4>
                    <p className="text-sm text-base-content/70">
                      Altere preferências da sua conta
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
