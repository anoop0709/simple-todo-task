import {
    Checkbox,
    IconButton,
    TableRow,
    TableCell,
    Chip,
    Typography,
} from '@mui/material';
import {
    EditOutlined as EditIcon,
    DeleteOutlined as DeleteIcon,
} from '@mui/icons-material';

import { Tag } from '../types';
import type { Task } from '../types';
import { formatDate } from '../utils/helper';
import { useTasks } from '../hooks/useTask';
import { GET_TASKS } from '../graphql/queries';
import { useState } from 'react';
import EditTaskModal from './EditTaskModal';

const tagStyles: Record<Tag, { label: string; bg: string }> = {
    [Tag.URGENT]: { label: 'Urgent', bg: '#F5D78E' },
    [Tag.NOT_URGENT]: { label: 'Not urgent', bg: '#E0E0E0' },
    [Tag.HIGH]: { label: 'High', bg: '#FFCDD2' },
    [Tag.MEDIUM]: { label: 'Medium', bg: '#FFE082' },
    [Tag.LOW]: { label: 'Low', bg: '#C8E6C9' },
};

export default function TaskRow({ task }: { task: Task }) {
    const { deleteTask, toggleTask, refetch, updateTask } = useTasks();
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleDeleteTask = async () => {
        await deleteTask({
            variables: { id: task.id },
        });
        await refetch();
    };
    const handleToggleTask = async () => {
        await toggleTask({
            variables: { id: task.id },
        });
    };
    const handleEditTask = async (task: Task) => {
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

                <TableCell sx={{ width: '35%' }}>
                    <Typography sx={{ fontWeight: 500 }}>
                        {task?.name}
                    </Typography>
                </TableCell>

                <TableCell sx={{ width: '15%' }}>
                    {formatDate(task?.dueDate) || '-'}
                </TableCell>

                <TableCell sx={{ width: '15%' }}>
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

                <TableCell sx={{ width: '15%' }}>{task?.note || '-'}</TableCell>

                <TableCell sx={{ width: '15%' }}>
                    <IconButton
                        size="small"
                        onClick={() => setEditModalOpen(true)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={handleDeleteTask}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>
            {editModalOpen && (
                <EditTaskModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onEdit={() => handleEditTask(task)}
                    task={task}
                />
            )}
        </>
    );
}
