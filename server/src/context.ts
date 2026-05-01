import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Models, models } from "./model";

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

  const user = parsed
    ? { id: parsed.id }
    : null;
  return {
    models,
    auth: {
      user,
      login: (args: { id: string }) => {
        const token = jwt.sign({ id: args.id }, process.env.JWT_SECRET!);
        res.cookie("token", token, { sameSite: "lax", httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
      },
      logout: () => {
        res.clearCookie("token", {
          sameSite: "lax",
          httpOnly: true,
          path: "/",
        });
      }
    }
  }
}