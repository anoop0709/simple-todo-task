import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { LOGIN, LOGOUT, REGISTER } from "../graphql/mutations";
import { GET_ME_WITH_TASKS } from "../graphql/queries";
import type { GetMeWithTasks } from "../types";
import { handleError } from "../services/errorHandler";
import { useSnackbar } from "./useSnackbar";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../utils/helper";

type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};
export function useAuth() {
  const [register] = useMutation(REGISTER);
  const [login] = useMutation(LOGIN);
  const [logout] = useMutation(LOGOUT)
  const { data, loading, refetch } = useQuery<GetMeWithTasks>(GET_ME_WITH_TASKS, {
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const client = useApolloClient();

  const handleRegister = async (values: AuthFormValues) => {
    try {
      const { cleanEmail, cleanPassword, cleanName } =
        validateInput(values);

      await register({
        variables: {
          input: {
            email: cleanEmail,
            password: cleanPassword,
            userName: cleanName,
          },
        },
      });

      showSnackbar('User registered successfully');
      await refetch();
      navigate('/');
    } catch (error) {
      const message = handleError(error);
      showSnackbar(message, 'error');
    }
  }

  const handleLogin = async (values: AuthFormValues) => {
    try {
      const { cleanEmail, cleanPassword } = validateInput(values);

      await login({
        variables: {
          input: {
            email: cleanEmail,
            password: cleanPassword,
          },
        },
      });

      showSnackbar('User login successful', 'success');
      await refetch();
    } catch (error) {
      const message = handleError(error);
      showSnackbar(message, 'error');
    }
  }

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    try {
      e.preventDefault();
      await logout();
      showSnackbar('User logout successfull', 'success');
      await client.resetStore();
      navigate('/login');
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('abort')
      ) {
        return;
      }
      const message = handleError(error);
      showSnackbar(message, 'error');
    }
  };

  return {
    user: data?.me ?? null,
    loading,
    refetch,
    handleLogout,
    handleLogin,
    handleRegister
  };
}