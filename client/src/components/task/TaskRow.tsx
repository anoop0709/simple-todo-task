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

import { Tag, type Task } from '../../types';
import { formatDateToDisplay } from '../../utils/helper';
import { useTasks } from '../../hooks/useTask';
import { GET_TASKS } from '../../graphql/queries';
import { useState } from 'react';
import TaskModal from '../modals/TaskActionModal';
import ConfirmDeleteTaskModal from '../modals/ConfirmationModal';
import { useSnackbar } from '../../hooks/useSnackbar';
import { handleError } from '../../services/errorHandler';

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

export default function TaskRow(props: Props) {
    const { task, index, setDraggedIndex, handleDrop } = props;
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
            const message = handleError(error);
            showSnackbar(message, 'error');
        }
    };
    const handleToggleTask = async () => {
        try {
            await toggleTask({
                variables: { id: task.id },
            });
            showSnackbar('Task updated successfully', 'success');
        } catch (error) {
            const message = handleError(error);
            showSnackbar(message, 'error');
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
            showSnackbar('Task updated successfully', 'success');
        } catch (error) {
            const message = handleError(error);
            showSnackbar(message, 'error');
        }
    };
    return (
        <>
            <TableRow
                hover
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                sx={{
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                }}
            >
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
                    {formatDateToDisplay(task?.dueDate) || '-'}
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

                <TableCell sx={{ width: '5%' }}>
                    {task?.note ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            (
                            <WbSunny
                                sx={{ fontSize: 16, mr: 0.5, color: '#878787' }}
                            />
                            {task.note})
                        </Box>
                    ) : (
                        '-'
                    )}
                </TableCell>

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
