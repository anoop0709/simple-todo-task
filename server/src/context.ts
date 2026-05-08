import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Models, models } from "./model";
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: string;
}
export interface Context {
  models: Models,
  auth: {
    user: { id: string } | null;
    login: (args: { id: string }) => void;
    logout: () => void;
  }
}

const parseToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};

export async function createContext({ req, res }: { req: Request; res: Response }): Promise<Context> {
  const token = req.cookies.token;
  const parsed = token ? parseToken(token) : null;
  const isProd = process.env.NODE_ENV === "production";
  const maxAge = 7 * 24 * 60 * 60 * 1000

  const user = parsed
    ? { id: parsed.id }
    : null;
  return {
    models,
    auth: {
      user,
      login: (args: { id: string }) => {
        const token = jwt.sign({ id: args.id }, process.env.JWT_SECRET!);

        res.cookie("token", token, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
          path: "/",
          maxAge
        } );
      },
      logout: () => {
        res.clearCookie("token", {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
          path: "/",
        });
      }
    }
  }
}