import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN, LOGOUT, REGISTER } from "../graphql/mutations";
import { GET_ME_WITH_TASKS } from "../graphql/queries";
import type { GetMeWithTasks } from "../types";


export function useAuth() {
  const [register] = useMutation(REGISTER);
  const [login] = useMutation(LOGIN);
  const [logout] = useMutation(LOGOUT)
  const { data, loading, refetch } = useQuery<GetMeWithTasks>(GET_ME_WITH_TASKS, {
    fetchPolicy: "network-only",
  });

  return {
    user: data?.me ?? null,
    loading,
    register,
    login,
    logout,
    refetch,
  };
}