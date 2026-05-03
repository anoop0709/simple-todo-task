import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";

import { showGlobalSnackbar } from "./snackBarService";

const errorLink = new ErrorLink(({ error }) => {

  if (
    error instanceof Error &&
    (error.message.includes("aborted") ||
      error.message.includes("canceled") ||
      error.message.includes("AbortError"))
  ) {
    return;
  }
  if (!CombinedGraphQLErrors.is(error) && error instanceof Error) {
    if (error.message.toLowerCase().includes("abort")) return;
  }
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      showGlobalSnackbar(message, "error");
    });
  }
  else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      showGlobalSnackbar(message, "error");
    });
  }
  else {
    showGlobalSnackbar(
      "Something gone wrong. Please try again.",
      "error"
    );
  }
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: "include",
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});