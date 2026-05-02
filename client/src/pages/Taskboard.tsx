import { Box, Typography } from '@mui/material';
import TaskHeader from '../components/task/TaskBoardHeader';
import { useTasks } from '../hooks/useTask';
import React, { useMemo, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Tasks } from '../components/task/Tasks';
import { TasksMobileVersion } from '../components/task/TasksMobileVersion';

export default function Taskboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isTaskToDoExpanded, setIsTaskToDoExpanded] = useState(true);
    const [isTaskDoneExpanded, setIsTaskDoneExpanded] = useState(false);
    const [search, setSearch] = useState('');
    const { tasks, reorderTasks } = useTasks();
    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase()),
    );
    const [taskTodo, taskDone] = useMemo(() => {
        return filteredTasks.reduce<[typeof tasks, typeof tasks]>(
            (acc, task) => {
                if (task.completed) acc[1].push(task);
                else acc[0].push(task);
                return acc;
            },
            [[], []],
        );
    }, [filteredTasks]);

    return (
        <Box
            sx={{
                width: '95%',
                margin: '0 auto',
                padding: '24px',
            }}
        >
            <TaskHeader
                search={search}
                setSearch={setSearch}
            />
            {!tasks.length && (
                <Box
                    sx={{
                        width: '100%',
                        margin: '200px 0px',
                        padding: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ color: '#878787' }}
                    >
                        No tasks are added, Please start with add a task
                    </Typography>
                </Box>
            )}
            {isMobile ? (
                <React.Fragment>
                    <TasksMobileVersion
                        tasks={taskTodo}
                        expandTasks={isTaskToDoExpanded}
                        setExpandTask={setIsTaskToDoExpanded}
                        isTodo={true}
                    />
                    <TasksMobileVersion
                        tasks={taskDone}
                        expandTasks={isTaskDoneExpanded}
                        setExpandTask={setIsTaskDoneExpanded}
                        isTodo={false}
                    />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Tasks
                        tasks={taskTodo}
                        expandTasks={isTaskToDoExpanded}
                        setExpandTask={setIsTaskToDoExpanded}
                        isTodo={true}
                        reorderTasks={reorderTasks}
                    />
                    <Tasks
                        tasks={taskDone}
                        expandTasks={isTaskDoneExpanded}
                        setExpandTask={setIsTaskDoneExpanded}
                        isTodo={false}
                        reorderTasks={reorderTasks}
                    />
                </React.Fragment>
            )}
        </Box>
    );
}
