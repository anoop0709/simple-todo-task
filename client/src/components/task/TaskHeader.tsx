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
import { LOGOUT } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client/react';
import { useState } from 'react';
import type { Task } from '../../types';
import { useTasks } from '../../hooks/useTask';
import { GET_TASKS } from '../../graphql/queries';
import AddTaskModal from '../modals/AddTaskModal';
import { useSnackbar } from '../../hooks/useSnackBar';

export default function TaskHeader() {
    const { createTask } = useTasks();
    const [logout] = useMutation(LOGOUT);
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [openTaskModal, setOpenTaskModal] = useState(false);

    const client = useApolloClient();

    const handleLogout = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        try {
            e.preventDefault();
            await logout();
            showSnackbar('User logout successfull', 'success');
            await client.resetStore();
            navigate('/login');
        } catch (err) {
            console.log('Expected logout error:', err);
            showSnackbar('Something went wrong, please try again', 'error');
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
            showSnackbar('New Task created congratulations!', 'success');
        } catch (error) {
            console.log(error);
            showSnackbar('Something went wrong, please try again', 'error');
        }
    };

    return (
        <>
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
                <AddTaskModal
                    open={openTaskModal}
                    onClose={() => setOpenTaskModal(false)}
                    onAdd={handleAddTask}
                />
            )}
        </>
    );
}
