import { useQuery, useMutation } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries";
import {
  CREATE_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../graphql/mutations";
import type { CreateTaskResponse, CreateTaskVariables, GetTasksQuery, UpdateTaskResponse, UpdateTaskVariables } from "../types";

export function useTasks() {
  const { data, loading, refetch } = useQuery<GetTasksQuery>(GET_TASKS, {
    fetchPolicy: "network-only",
  });

  const [createTask] = useMutation<
    CreateTaskResponse,
    CreateTaskVariables
  >(CREATE_TASK);

  const [toggleTask] = useMutation(TOGGLE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [updateTask] = useMutation<
    UpdateTaskResponse,
    UpdateTaskVariables
  >(UPDATE_TASK);

  return {
    tasks: data?.tasks ?? [],
    loading,
    refetch,
    createTask,
    toggleTask,
    deleteTask,
    updateTask
  };
}