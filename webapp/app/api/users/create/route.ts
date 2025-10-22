import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";
import type { User } from "@/app/types/models";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  try {
    await client.connect();
    const database = client.db("me-dev");
    const users = database.collection<User>("users");

    const newUser: User = req.body;
    const existingUser = await users.findOne({ username: newUser.username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }