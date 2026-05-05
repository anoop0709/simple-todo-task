import {
  Checkbox,
  IconButton,
  TableRow,
  TableCell,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  WbSunny,
} from '@mui/icons-material';

import { Tag, type Task } from '../../../types';
import { formatDateToDisplay } from '../../../utils/helper';
import { useTasks } from '../../../hooks/useTask';
import React, { useState } from 'react';
import TaskModal from '../../modals/task-modal/TaskActionModal';
import ConfirmDeleteTaskModal from '../../modals/confirmation-modal/ConfirmationModal';
import { styles } from './TaskRow.styles';

const tagStyles: Record<Tag, { label: string; bg: string }> = {
  [Tag.URGENT]: { label: 'Urgent', bg: '#f5bb8e' },
  [Tag.NOT_URGENT]: { label: 'Not urgent', bg: '#E0E0E0' },
  [Tag.HIGH]: { label: 'High', bg: '#FFCDD2' },
  [Tag.MEDIUM]: { label: 'Medium', bg: '#FFE082' },
  [Tag.LOW]: { label: 'Low', bg: '#C8E6C9' },
};

type Props = {
  task: Task;
  index: number;
  setDraggedIndex: (i: number) => void;
  handleDrop: (i: number) => void;
};

function TaskRow({ task, index, setDraggedIndex, handleDrop }: Props) {
  const { handleEditTask, handleDeleteTask, handleToggleTask } = useTasks();
//   const { showSnackbar } = useSnackbar();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

//   const handleDeleteTask = async () => {
//     try {
//       await deleteTask({ variables: { id: task.id } });
//       showSnackbar('Task deleted', 'success');
//       await refetch();
//     } catch (error) {
//       showSnackbar(handleError(error), 'error');
//     }
//   };

//   const handleToggleTask = async () => {
//     try {
//       await toggleTask({ variables: { id: task.id } });
//       showSnackbar('Task updated successfully', 'success');
//     } catch (error) {
//       showSnackbar(handleError(error), 'error');
//     }
//   };

//   const handleEditTask = async (updatedTask: Task) => {
//     try {
//       await updateTask({
//         variables: {
//           id: updatedTask.id ?? null,
//           input: {
//             name: updatedTask.name,
//             dueDate: updatedTask.dueDate ?? null,
//             tag: updatedTask.tag ?? null,
//             note: updatedTask.note ?? null,
//             completed: updatedTask.completed,
//           },
//         },
//         update(cache, { data }) {
//           const existing = cache.readQuery<{ me: { tasks: Task[] } }>({
//             query: GET_ME_WITH_TASKS,
//           });

//           if (!existing || !data?.updateTask) return;

//           cache.writeQuery({
//             query: GET_ME_WITH_TASKS,
//             data: {
//               me: {
//                 ...existing.me,
//                 tasks: existing.me.tasks.map((t) =>
//                   t.id === data.updateTask.id ? data.updateTask : t
//                 ),
//               },
//             },
//           });
//         },
//         refetchQueries: [{ query: GET_ME_WITH_TASKS }],
//       });

//       showSnackbar('Task updated successfully', 'success');
//     } catch (error) {
//       showSnackbar(handleError(error), 'error');
//     }
//   };

  return (
    <>
      <TableRow
        hover
        draggable
        onDragStart={() => setDraggedIndex(index)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(index)}
        sx={styles.row}
      >
        <TableCell padding="checkbox" sx={styles.checkboxCell}>
          <Checkbox
            checked={task.completed ?? false}
            onClick={() => handleToggleTask(task.id)}
          />
        </TableCell>

        <TableCell sx={styles.nameCell}>
          <Typography sx={styles.nameText}>{task.name}</Typography>
        </TableCell>

        <TableCell sx={styles.dateCell}>
          {formatDateToDisplay(task.dueDate) || '-'}
        </TableCell>

        <TableCell sx={styles.tagCell}>
          {task.tag ? (
            <Chip
              label={tagStyles[task.tag].label}
              sx={{
                ...styles.tagChip,
                bgcolor: tagStyles[task.tag].bg,
              }}
            />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell sx={styles.noteCell}>
          {task.note ? (
            <Box sx={styles.noteBox}>
              (<WbSunny sx={styles.noteIcon} /> {task.note})
            </Box>
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell sx={styles.actionsCell}>
          <Box sx={styles.actionBox}>
            <IconButton size="small" onClick={() => setEditModalOpen(true)}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={() => setConfirmDelete(true)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      {editModalOpen && (
        <TaskModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onAction={handleEditTask}
          task={task}
        />
      )}

      {confirmDelete && (
        <ConfirmDeleteTaskModal
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onDelete={handleDeleteTask}
          id={task.id}
        />
      )}
    </>
  );
}

export default React.memo(TaskRow);