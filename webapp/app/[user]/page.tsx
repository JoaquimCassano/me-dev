import SocialMediaList from "../../components/SocialMediaList";
import Icon from "react-simple-icons";

export default async function UserPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;

  const socialMediaItems = [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: <Icon name="github" size={24} />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Icon name="linkedin" size={24} />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: <Icon name="twitter" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100" data-theme="cupcake">
      <div className="hero py-6 sm:py-8 md:py-12">
        <div className="hero-content flex-col gap-4 sm:gap-6 px-4">
          <img
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
            src="https://avatar.iran.liara.run/public"
            alt={`Avatar de ${user}`}
          />
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              {user}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-base-content/70">
              Você está vendo o perfil de @{user}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 sm:gap-8 px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
          Redes sociais
        </h2>
        <div className="w-full max-w-sm sm:max-w-md">
          <SocialMediaList items={socialMediaItems} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 sm:gap-8 px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
          Projetos
        </h2>
        <div className="w-full max-w-sm sm:max-w-md card">
          <figure>
            <img src="https://placehold.co/400x200/png" alt="Projeto 1" />
          </figure>
          <div className="card-body">
            <h3 className="card-title">
              Projeto 1
              {[
                { label: "Python" },
                { label: "NextJS" },
                { label: "TypeScript" },
              ].map((badge, index) => {
                const colors = [
                  "badge-primary",
                  "badge-secondary",
                  "badge-accent",
                ];
                return (
                  <div key={index} className={`badge ${colors[index]}`}>
                    {badge.label}
                  </div>
                );
              })}
            </h3>
            <p>Descrição do Projeto 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
