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

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  try {
    await client.connect();
    const database = client.db("me-dev");
    const users = database.collection<User>("users");

    const username = req.query.username as string;
    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
