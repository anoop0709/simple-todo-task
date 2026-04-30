import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Typography,
} from '@mui/material';
import TaskHeader from '../components/TaskHeader';
import { useTasks } from '../hooks/useTask';
import TaskRow from '../components/TaskRow';
import TaskRowHeader from '../components/TaskRowHeader';
import Paper from '@mui/material/Paper';
import { ExpandMoreOutlined as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';

export default function Taskboard() {
    const [taskToDoExpanded, setTaskToDoExpanded] = useState(true);
    const [taskDoneExpanded, setDoneExpanded] = useState(false);
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
            {taskTodo?.length ? (
                <>
                    <Box
                        sx={{
                            width: '96%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            margin: '0 auto',
                            marginBottom: '20px',
                            marginTop: '50px',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600 }}
                        >
                            Task to do
                        </Typography>
                        <ExpandMoreIcon
                            onClick={() => setTaskToDoExpanded((prev) => !prev)}
                            sx={{
                                transition: 'transform 0.3s ease',
                                transform: taskToDoExpanded
                                    ? 'rotate(0deg)'
                                    : 'rotate(180deg)',
                            }}
                        />
                    </Box>
                    {taskToDoExpanded && (
                        <TableContainer
                            component={Paper}
                            sx={{
                                width: '96%',
                                margin: '0 auto',
                                boxShadow: '0.1px 0.1px 0.1px 1px #e8e8e8',
                            }}
                        >
                            <Table sx={{ width: '100%' }}>
                                <TableHead>
                                    <TaskRowHeader />
                                </TableHead>

                                <TableBody>
                                    {taskTodo.map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            ) : null}
            {taskDone?.length ? (
                <>
                    <Box
                        sx={{
                            width: '96%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            margin: '0 auto',
                            marginBottom: '20px',
                            marginTop: '50px',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600 }}
                        >
                            Task done
                        </Typography>
                        <ExpandMoreIcon
                            onClick={() => setDoneExpanded((prev) => !prev)}
                            sx={{
                                transition: 'transform 0.3s ease',
                                transform: taskDoneExpanded
                                    ? 'rotate(0deg)'
                                    : 'rotate(180deg)',
                            }}
                        />
                    </Box>
                    {taskDoneExpanded && (
                        <TableContainer
                            component={Paper}
                            sx={{
                                width: '96%',
                                margin: '0 auto',
                                boxShadow: '0.1px 0.1px 0.1px 1px #e8e8e8',
                            }}
                        >
                            <Table sx={{ width: '100%' }}>
                                <TableHead>
                                    <TaskRowHeader />
                                </TableHead>

                                <TableBody>
                                    {taskDone.map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            ) : null}
        </Box>
    );
}
