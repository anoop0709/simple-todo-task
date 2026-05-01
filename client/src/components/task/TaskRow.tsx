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
} from '@mui/icons-material';

import { Tag } from '../../types';
import type { Task } from '../../types';
import { formatDate } from '../../utils/helper';
import { useTasks } from '../../hooks/useTask';
import { GET_TASKS } from '../../graphql/queries';
import { useState } from 'react';
import EditTaskModal from '../modals/EditTaskModal';
import ConfirmDeleteTaskModal from '../modals/ConfirmationModal';
import { useSnackbar } from '../../hooks/useSnackBar';

const tagStyles: Record<Tag, { label: string; bg: string }> = {
    [Tag.URGENT]: { label: 'Urgent', bg: '#F5D78E' },
    [Tag.NOT_URGENT]: { label: 'Not urgent', bg: '#E0E0E0' },
    [Tag.HIGH]: { label: 'High', bg: '#FFCDD2' },
    [Tag.MEDIUM]: { label: 'Medium', bg: '#FFE082' },
    [Tag.LOW]: { label: 'Low', bg: '#C8E6C9' },
};

export default function TaskRow({ task }: { task: Task }) {
    const { deleteTask, toggleTask, refetch, updateTask } = useTasks();
    const { showSnackbar } = useSnackbar();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteTask = async () => {
        try {
            await deleteTask({
                variables: { id: task.id },
            });
            showSnackbar('Task deleted', 'success');
            await refetch();
        } catch (error) {
            console.log(error);
            showSnackbar('Something went wrong, please try again', 'error');
        }
    };
    const handleToggleTask = async () => {
        try {
            await toggleTask({
                variables: { id: task.id },
            });
            showSnackbar('Task done', 'success');
        } catch (error) {
            console.log(error);
            showSnackbar('Something went wrong, please try again', 'error');
        }
    };
    const handleEditTask = async (task: Task) => {
        try {
            await updateTask({
                variables: {
                    id: task.id ?? null,
                    input: {
                        name: task.name,
                        dueDate: task.dueDate ?? null,
                        tag: task.tag ?? null,
                        note: task.note ?? null,
                        completed: task.completed,
                    },
                },
                update(cache, { data }) {
                    const existing = cache.readQuery<{ tasks: Task[] }>({
                        query: GET_TASKS,
                    });

                    if (!existing || !data?.updateTask) return;

                    cache.writeQuery({
                        query: GET_TASKS,
                        data: {
                            tasks: existing.tasks.map((task) =>
                                task.id === data.updateTask.id
                                    ? data.updateTask
                                    : task,
                            ),
                        },
                    });
                },
            });
          showSnackbar('Task updated successfully', 'success')
        } catch (error) {
            console.log(error);
            showSnackbar('Something went wrong, please try again', 'error');
        }
    };
    return (
        <>
            <TableRow hover>
                <TableCell
                    padding="checkbox"
                    sx={{ width: '5%' }}
                >
                    <Checkbox
                        checked={task.completed ?? false}
                        onClick={handleToggleTask}
                    />
                </TableCell>

                <TableCell sx={{ width: '50%' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineClamp: 2,
                            textWrap: 'nowrap',
                            maxWidth: { md: '250px', lg: '350px', xl: '400px' },
                        }}
                    >
                        {task?.name}
                    </Typography>
                </TableCell>

                <TableCell sx={{ width: '18%' }}>
                    {formatDate(task?.dueDate) || '-'}
                </TableCell>

                <TableCell sx={{ width: '5%' }}>
                    {task.tag ? (
                        <Chip
                            label={tagStyles[task.tag].label}
                            sx={{
                                backgroundColor: tagStyles[task.tag].bg,
                                fontWeight: 500,
                                borderRadius: '5px !important',
                            }}
                        />
                    ) : (
                        '-'
                    )}
                </TableCell>

                <TableCell sx={{ width: '5%' }}>{task?.note || '-'}</TableCell>

                <TableCell sx={{ width: '5%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 1,
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={() => setEditModalOpen(true)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => setConfirmDelete(true)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
            {editModalOpen && (
                <EditTaskModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onEdit={handleEditTask}
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
