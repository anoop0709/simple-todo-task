import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Typography,
    Paper,
} from '@mui/material';
import { ExpandMoreOutlined as ExpandMoreIcon } from '@mui/icons-material';

import TaskRow from '../task-row/TaskRow';
import TaskRowHeader from '../task-row-header/TaskRowHeader';
import { type Task } from '../../../types';
import React, { useCallback, useState } from 'react';
import { styles } from './Tasks.styles';

type TasksProps = {
    tasks: Task[];
    expandTasks: boolean;
    setExpandTask: React.Dispatch<React.SetStateAction<boolean>>;
    isTodo: boolean;
    reorderTasks: (
        sourceIndex: number,
        destinationIndex: number,
        isTodo: boolean,
    ) => void;
};

export const Tasks = ({
    tasks,
    expandTasks,
    setExpandTask,
    isTodo,
    reorderTasks,
}: TasksProps) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleToggle = () => {
        setExpandTask((prev) => !prev);
    };

    const handleDrop = useCallback(
        (dropIndex: number) => {
            if (draggedIndex === null) return;

            reorderTasks(draggedIndex, dropIndex, isTodo);
            setDraggedIndex(null);
        },
        [draggedIndex, reorderTasks, isTodo],
    );

    const onDragStart = useCallback((index: number) => {
        setDraggedIndex(index);
    }, []);

    if (!tasks.length) return null;

    return (
        <>
            <Box sx={styles.headerContainer}>
                <Typography
                    variant="h6"
                    sx={styles.title}
                >
                    {isTodo ? 'Task to do' : 'Tasks done'}
                </Typography>

                <ExpandMoreIcon
                    onClick={handleToggle}
                    sx={{
                        ...styles.expandIcon,
                        transform: expandTasks
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                    }}
                />
            </Box>

            {expandTasks && (
                <TableContainer
                    component={Paper}
                    sx={styles.tableContainer}
                >
                    <Table>
                        <TableHead>
                            <TaskRowHeader />
                        </TableHead>

                        <TableBody>
                            {tasks.map((task, index) => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    setDraggedIndex={onDragStart}
                                    handleDrop={handleDrop}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};
