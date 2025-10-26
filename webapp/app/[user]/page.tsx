import SocialMediaList from "../../components/SocialMediaList";
import * as SimpleIcons from "@icons-pack/react-simple-icons";
import { User } from "../types/models";
import { notFound } from "next/navigation";
import type React from "react";

function toUpperCamelCase(name: string): string {
  return `Si${name
    .split(/[\s\-_/+.&]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")}`;
}

function getIconComponent(name: string) {
  const componentName = toUpperCamelCase(name);
  const icons = SimpleIcons as Record<string, unknown>;
  return (
    (icons[componentName] as
      | React.ComponentType<{ size?: number }>
      | undefined) || null
  );
}

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

  const socialMediaItems = userInfo.social.map((item) => {
    const IconComponent = getIconComponent(item.name);
    return {
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      url: item.url,
      icon: IconComponent ? <IconComponent size={24} /> : <div />,
    };
  });
  return (
    <div className="min-h-screen bg-base-100" data-theme="cupcake">
      <div className="hero py-2 sm:py-4 md:py-6">
        <div className="hero-content flex-col gap-2 sm:gap-3 px-4">
          <img
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
            src={userInfo.avatar}
            alt={`Avatar de ${user}`}
          />
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
              {userInfo.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-base-content/70">
              {userInfo.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 sm:gap-4 px-4 py-4 sm:py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
          Redes sociais
        </h2>
        <div className="w-full max-w-sm sm:max-w-md">
          <SocialMediaList items={socialMediaItems} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 sm:gap-4 px-4 py-4 sm:py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
          Projetos
        </h2>
        <div
          className={` ${
            userInfo.projects.length === 1 ? "justify-items-center" : "grid"
          } grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl`}
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
