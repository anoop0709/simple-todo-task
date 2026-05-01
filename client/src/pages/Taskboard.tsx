import { Box } from '@mui/material';
import TaskHeader from '../components/task/TaskHeader';
import { useTasks } from '../hooks/useTask';
import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Tasks } from '../components/task/Tasks';
import { TasksMobileVersion } from '../components/task/TasksMobileVersion';

export default function Taskboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isTaskToDoExpanded, setIsTaskToDoExpanded] = useState(true);
    const [isTaskDoneExpanded, setIsTaskDoneExpanded] = useState(false);
    const { tasks } = useTasks();
    const [taskTodo, taskDone] = tasks.reduce<[typeof tasks, typeof tasks]>(
        (acc, task) => {
            if (task.completed) {
                acc[1].push(task);
            } else {
                acc[0].push(task);
            }
            return acc;
        },
        [[], []],
    );
    return (
        <Box
            sx={{
                width: '95%',
                margin: '0 auto',
                padding: '24px',
            }}
        >
            <TaskHeader />
            {isMobile ? (
                <>
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
                </>
            ) : (
                <>
                    <Tasks
                        tasks={taskTodo}
                        expandTasks={isTaskToDoExpanded}
                        setExpandTask={setIsTaskToDoExpanded}
                        isTodo={true}
                    />
                    <Tasks
                        tasks={taskDone}
                        expandTasks={isTaskDoneExpanded}
                        setExpandTask={setIsTaskDoneExpanded}
                        isTodo={false}
                    />
                </>
            )}
        </Box>
    );
}
