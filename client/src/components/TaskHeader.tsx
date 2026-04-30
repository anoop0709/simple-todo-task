import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from '@apollo/client/react';
import { LOGOUT } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client/react';
import { useState } from 'react';
import type { Task } from '../types';
import { useTasks } from '../hooks/useTask';
import { GET_TASKS } from '../graphql/queries';
import AddTaskModal from './AddTaskModal';

export default function TaskHeader() {
    const { createTask } = useTasks();
    const [logout] = useMutation(LOGOUT);
    const navigate = useNavigate();
    const [openTaskModal, setOpenTaskModal] = useState(false);

    const client = useApolloClient();

    const handleLogout = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        try {
            e.preventDefault();
            await logout();
            await client.resetStore();
            navigate('/login');
        } catch (err) {
            console.log('Expected logout error:', err);
        }
    };

    const handleAddTask = async (task: Task) => {
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
                const existing = cache.readQuery<{ tasks: Task[] }>({
                    query: GET_TASKS,
                });

                if (!existing || !data?.createTask) return;

                cache.writeQuery({
                    query: GET_TASKS,
                    data: {
                        tasks: [data.createTask, ...existing.tasks],
                    },
                });
            },
        });
    };

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    padding: '24px 32px',
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
                        fontSize: { xs: '20px', md: '32px' },
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
                        placeholder="Search"
                        size="small"
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                            width: { xs: '140px', md: '220px' },
                            color: '#64615E',
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#1E1E1E' }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        onClick={(e) => handleLogout(e)}
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        sx={{
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
                    padding: '24px 32px',
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
                    }}
                >
                    + Add task
                </Button>
            </Box>
            {openTaskModal && (
                <AddTaskModal
                    open={openTaskModal}
                    onClose={() => setOpenTaskModal(false)}
                    onAdd={handleAddTask}
                />
            )}
        </>
    );
}
