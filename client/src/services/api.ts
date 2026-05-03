import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";

import { showGlobalSnackbar } from "./snackBarService";

const errorLink = new ErrorLink(({ error }) => {
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
      "Server unreachable. Please try again.",
      "error"
    );
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});