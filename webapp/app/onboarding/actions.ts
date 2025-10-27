"use server";

import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export async function completeOnboarding(data: {
  fullName: string;
  bio: string;
  portfolio: string;
  skills: string[];
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/users/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        ...data,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || "Erro ao salvar dados" };
    }

    return { success: true };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { error: "Erro ao salvar dados. Tente novamente." };
  }
}
