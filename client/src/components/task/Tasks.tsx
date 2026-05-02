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

import TaskRow from '../task/TaskRow';
import TaskRowHeader from '../task/TaskRowHeader';
import { type Task } from '../../types';
import React, { useCallback, useState } from 'react';

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
        <React.Fragment>
            <Box
                sx={{
                    width: '96%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: '50px auto 20px',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                >
                    {isTodo ? 'Task to do' : 'Tasks done'}
                </Typography>

                <ExpandMoreIcon
                    onClick={handleToggle}
                    sx={{
                        cursor: 'pointer',
                        ml: 1,
                        transition: 'transform 0.3s ease',
                        transform: expandTasks
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                    }}
                />
            </Box>

            {expandTasks && (
                <TableContainer
                    component={Paper}
                    sx={{
                        width: '96%',
                        margin: '0 auto',
                        boxShadow: '0.1px 0.1px 0.1px 1px #e8e8e8',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TaskRowHeader />
                        </TableHead>

                        <TableBody>
                            {tasks.length > 0
                                ? tasks.map((task, index) => (
                                      <TaskRow
                                          key={task.id}
                                          task={task}
                                          index={index}
                                          setDraggedIndex={onDragStart}
                                          handleDrop={handleDrop}
                                      />
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </React.Fragment>
    );
};
