import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import { Search, LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client/react';
import React, { useState } from 'react';
import { type Task } from '../../types';
import { useTasks } from '../../hooks/useTask';
import { GET_ME_WITH_TASKS } from '../../graphql/queries';
import TaskModal from '../modals/TaskActionModal';
import { useSnackbar } from '../../hooks/useSnackbar';
import { handleError } from '../../services/errorHandler';
import { useAuth } from '../../hooks/useAuth';

export default function TaskHeader({
    search,
    setSearch,
}: {
    search: string;
    setSearch: (e: string) => void;
}) {
    const { createTask } = useTasks();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const client = useApolloClient();

    const taskInput = {
        id: '',
        name: '',
        dueDate: '',
        tag: undefined,
        note: null,
        completed: false,
    };

    const handleLogout = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        try {
            e.preventDefault();
            await logout();
            showSnackbar('User logout successfull', 'success');
            await client.resetStore();
            navigate('/login');
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.toLowerCase().includes('abort')
            ) {
                return;
            }
            const message = handleError(error);
            showSnackbar(message, 'error');
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
            showSnackbar('New Task created congratulations!', 'success');
        } catch (error) {
            const message = handleError(error);
            showSnackbar(message, 'error');
        }
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: '100%',
                    padding: { xs: '0px 0px', md: '24px 32px' },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: '#000000',
                        fontSize: { xs: '24px', md: '32px' },
                        fontWeight: 900,
                    }}
                >
                    My Tasks for the next month
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        size="small"
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'none',
                                md: 'inline-flex',
                            },
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                            width: { xs: '140px', md: '220px' },
                            '& .MuiInputBase-input::placeholder': {
                                color: '#1E1E1E',
                                opacity: 1,
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#1E1E1E' }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        onClick={(e) => handleLogout(e)}
                        variant="outlined"
                        startIcon={<LockOutlined />}
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'none',
                                md: 'inline-flex',
                            },
                            color: '#000000',
                            borderColor: '#000000',
                            textTransform: 'none',
                            borderRadius: '5px',
                            '&:hover': {
                                borderColor: '#565656',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    padding: { xs: '20px 0px', md: '24px 32px' },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => setOpenTaskModal(true)}
                    sx={{
                        height: 48,
                        borderRadius: '5px',
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: 'none',
                        color: '#efefef',
                        padding: { xs: '4px 25px' },
                    }}
                >
                    + Add task
                </Button>
            </Box>
            {openTaskModal && (
                <TaskModal
                    open={openTaskModal}
                    onClose={() => setOpenTaskModal(false)}
                    onAction={handleAddTask}
                    task={taskInput}
                />
            )}
        </React.Fragment>
    );
}
