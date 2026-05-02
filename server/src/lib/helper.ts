import { Context } from "../context";
import { AuthError } from "./error";
import nlp from "compromise";

export function ensureAuthenticated(context: Context) {
  if (!context.auth.user) {
    throw new AuthError('You must be logged in to perform this action.');
  }
  return context.auth.user.id;
}

export function parseToISOString(date?: string): string | undefined {
  if (!date) return undefined;

  const parsed = new Date(date);

  return isNaN(parsed.getTime())
    ? undefined
    : parsed.toISOString();
}

export function detectCityWithNLP(text: string): string | undefined {
  try {

    const doc = nlp(text);
    const places = doc.places().out("array");
    return places.length ? places[0] : undefined;

  } catch (error) {
    throw error;
  }
}