export { auth as middleware } from "@/app/auth";

export const runtime = "nodejs";

export const config = {
  matcher: ["/dashboard/:path*"],
};
