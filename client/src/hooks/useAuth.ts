import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import { ME } from "../graphql/queries";



type User = {
  id: string;
  email: string;
  userName: string;
};

type MeQuery = {
  me: User | null;
};

export function useAuth() {
  const [login] = useMutation(LOGIN);
  const { data, loading, refetch } = useQuery<MeQuery>(ME, {
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  return {
    user: data?.me ?? null,
    loading,
    login,
    refetch,
  };
}