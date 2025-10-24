import { MongoClient, ServerApiVersion } from "mongodb";
import type { User } from "@/app/types/models";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function POST(request: Request) {
  try {
    const newUser: User = await request.json();
    console.log("Received new user data:", newUser);

    await client.connect();
    const database = client.db("me-dev");
    const users = database.collection<User>("users");

    const existingUser = await users.findOne({ username: newUser.username });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    await users.insertOne(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
