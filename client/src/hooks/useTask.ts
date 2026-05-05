import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ME_WITH_TASKS } from "../graphql/queries";
import {
  CREATE_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../graphql/mutations";
import type { CreateTaskResponse, CreateTaskVariables, GetMeWithTasks, Task, UpdateTaskResponse, UpdateTaskVariables } from "../types";
import { useApolloClient } from "@apollo/client/react";
import { useSnackbar } from "./useSnackbar";
import { handleError } from "../services/errorHandler";


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

  const { showSnackbar } = useSnackbar();
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

  const handleDeleteTask = async (id: string | undefined) => {
    try {
      await deleteTask({ variables: { id: id } });
      showSnackbar('Task deleted', 'success');
      await refetch();
    } catch (error) {
      showSnackbar(handleError(error), 'error');
    }
  };

  const handleToggleTask = async (id: string | undefined) => {
    try {
      await toggleTask({ variables: { id: id } });
      showSnackbar('Task updated successfully', 'success');
    } catch (error) {
      showSnackbar(handleError(error), 'error');
    }
  };

  const handleEditTask = async (updatedTask: Task) => {
    try {
      await updateTask({
        variables: {
          id: updatedTask.id ?? null,
          input: {
            name: updatedTask.name,
            dueDate: updatedTask.dueDate ?? null,
            tag: updatedTask.tag ?? null,
            note: updatedTask.note ?? null,
            completed: updatedTask.completed,
          },
        },
        update(cache, { data }) {
          const existing = cache.readQuery<{ me: { tasks: Task[] } }>({
            query: GET_ME_WITH_TASKS,
          });

          if (!existing || !data?.updateTask) return;

          cache.writeQuery({
            query: GET_ME_WITH_TASKS,
            data: {
              me: {
                ...existing.me,
                tasks: existing.me.tasks.map((t) =>
                  t.id === data.updateTask.id ? data.updateTask : t
                ),
              },
            },
          });
        },
        refetchQueries: [{ query: GET_ME_WITH_TASKS }],
      });

      showSnackbar('Task updated successfully', 'success');
    } catch (error) {
      showSnackbar(handleError(error), 'error');
    }
  };

  const handleAddTask = async (task: Task) => {
    try {
      await createTask({
        variables: {
          input: {
            name: task.name,
            dueDate: task.dueDate ?? null,
            tag: task.tag ?? null,
            note: task.note ?? null,
          },
        },
        update(cache, { data }) {
          const existing = cache.readQuery<{ me: { tasks: Task[] } }>(
            {
              query: GET_ME_WITH_TASKS,
            },
          );

          if (!existing || !data?.createTask) return;

          cache.writeQuery({
            query: GET_ME_WITH_TASKS,
            data: {
              me: {
                ...existing.me,
                tasks: [data.createTask, ...existing.me.tasks],
              },
            },
          });
        },
        refetchQueries: [{ query: GET_ME_WITH_TASKS }],
      });

      showSnackbar('New Task created successfully!', 'success');
    } catch (error) {
      const message = handleError(error);
      showSnackbar(message, 'error');
    }
  };

  return {
    tasks: data?.me?.tasks ?? [],
    loading,
    refetch,
    handleAddTask,
    handleDeleteTask,
    handleToggleTask,
    handleEditTask,
    reorderTasks
  };
}