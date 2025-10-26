import { ReactElement } from "react";

interface SocialMediaItem {
  name: string;
  url: string;
  icon: ReactElement;
}

interface SocialMediaListProps {
  items: SocialMediaItem[];
}

export default function SocialMediaList({ items }: SocialMediaListProps) {
  return (
    <ul className="menu bg-base-100 rounded-box w-full shadow-md divide-y divide-base-200 border border-base-200">
      {items.map((item) => (
        <li key={item.name} className="p-0">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors rounded-none"
          >
            <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              {item.icon}
            </span>
            <span className="font-medium text-sm sm:text-base">
              {item.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
