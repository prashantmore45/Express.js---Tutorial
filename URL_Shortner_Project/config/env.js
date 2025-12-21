import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_URL: z.string().min(1),
  MONGODB_DB_NAME: z.string().min(1),
}).parse(process.env);
