import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ME_WITH_TASKS } from "../graphql/queries";
import {
  CREATE_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../graphql/mutations";
import type { CreateTaskResponse, CreateTaskVariables, GetMeWithTasks, UpdateTaskResponse, UpdateTaskVariables } from "../types";
import { useApolloClient } from "@apollo/client/react";


export function useTasks() {
  const { data, loading, refetch } = useQuery<GetMeWithTasks>(GET_ME_WITH_TASKS, {
    fetchPolicy: "cache-first",
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
    if (!data?.me?.tasks) return;


    const todo = data.me.tasks.filter(task => !task.completed);
    const done = data.me.tasks.filter(task => task.completed);

    const list = isTodo ? [...todo] : [...done];

    const [moved] = list.splice(sourceIndex, 1);
    list.splice(destinationIndex, 0, moved);

    const updatedTasks = isTodo
      ? [...list, ...done]
      : [...todo, ...list];

    client.writeQuery({
      query: GET_ME_WITH_TASKS,
      data: {
        me: {
          ...data?.me,
          tasks: updatedTasks,
        }
      },
    });
  };

  return {
    tasks: data?.me?.tasks ?? [],
    loading,
    refetch,
    createTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTasks
  };
}