import { useQuery, useMutation } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries";
import {
  CREATE_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../graphql/mutations";
import type { CreateTaskResponse, CreateTaskVariables, GetTasksQuery, UpdateTaskResponse, UpdateTaskVariables } from "../types";
import { useApolloClient } from "@apollo/client/react";


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


  const client = useApolloClient();
  const reorderTasks = (
    sourceIndex: number,
    destinationIndex: number,
    isTodo: boolean
  ) => {
    if (!data?.tasks) return;


    const todo = data.tasks.filter(task => !task.completed);
    const done = data.tasks.filter(task => task.completed);

    const list = isTodo ? [...todo] : [...done];

    const [moved] = list.splice(sourceIndex, 1);
    list.splice(destinationIndex, 0, moved);

    const updatedTasks = isTodo
      ? [...list, ...done]
      : [...todo, ...list];

    client.writeQuery({
      query: GET_TASKS,
      data: { tasks: updatedTasks },
    });
  };

  return {
    tasks: data?.tasks ?? [],
    loading,
    refetch,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTasks
  };
}