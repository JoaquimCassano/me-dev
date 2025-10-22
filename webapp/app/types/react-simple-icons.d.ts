declare module "react-simple-icons" {
  import { ReactNode } from "react";

  interface IconProps {
    name: string;
    size?: number | string;
    color?: string;
    title?: string;
    role?: string;
    className?: string;
  }

  export default function Icon(props: IconProps): ReactNode;
}
