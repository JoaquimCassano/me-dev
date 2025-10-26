import SocialMediaList from "../../components/SocialMediaList";
import Icon from "react-simple-icons";
import { User } from "../types/models";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const userDataRequest = await fetch(`${baseUrl}/api/users?username=${user}`);
  if (!userDataRequest.ok) {
    notFound();
  }
  const userInfo: User = await userDataRequest.json();

  const socialMediaItems = userInfo.social.map((item) => ({
    name: item.name,
    url: item.url,
    icon: <Icon name={item.name} />,
  }));
  return (
    <div className="min-h-screen bg-base-100" data-theme="cupcake">
      <div className="hero py-6 sm:py-8 md:py-12">
        <div className="hero-content flex-col gap-4 sm:gap-6 px-4">
          <img
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
            src={userInfo.avatar}
            alt={`Avatar de ${user}`}
          />
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              {userInfo.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-base-content/70">
              {userInfo.description}
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
        <div
          className={` ${
            userInfo.projects.length === 1 ? "justify-items-center" : "grid"
          } grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl`}
        >
          {userInfo.projects.map((project) => (
            <div key={project.name} className="card">
              <figure>
                <img src={project.image} alt={project.name} />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{project.name}</h3>
                <p>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tag, index) => {
                    const colors = [
                      "badge-primary",
                      "badge-secondary",
                      "badge-accent",
                    ];
                    return (
                      <div
                        key={index}
                        className={`badge ${colors[index % colors.length]}`}
                      >
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
