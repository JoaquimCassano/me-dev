import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/hash";

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthUser {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export async function POST(request: Request) {
  try {
    const body: SignupRequest = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, senha e nome são obrigatórios" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const client = await clientPromise;
    const database = client.db("me-dev");
    const authCollection = database.collection<AuthUser>("auth");

    const existingUser = await authCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser: AuthUser = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    };

    await authCollection.insertOne(newUser);

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: { email, name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
