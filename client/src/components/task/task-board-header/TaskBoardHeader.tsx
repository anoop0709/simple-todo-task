import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import { Search, LockOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { type Task } from '../../../types';
import { useTasks } from '../../../hooks/useTask';
import TaskModal from '../../modals/task-modal/TaskActionModal';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './TaskBoardHeader.styles';

const initialTask: Task = {
    id: '',
    name: '',
    dueDate: '',
    tag: undefined,
    note: null,
    completed: false,
};

type Props = {
    search: string;
    setSearch: (e: string) => void;
};

export default function TaskHeader({ search, setSearch }: Props) {
    const { handleAddTask } = useTasks();
    const { handleLogout } = useAuth();

    const [openTaskModal, setOpenTaskModal] = useState(false);

    return (
        <React.Fragment>
            <Box sx={styles.container}>
                <Typography
                    variant="h3"
                    sx={styles.title}
                >
                    My Tasks for the next month
                </Typography>

                <Box sx={styles.rightSection}>
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        size="small"
                        sx={styles.searchField}
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
                        onClick={handleLogout}
                        variant="outlined"
                        startIcon={<LockOutlined />}
                        sx={styles.logoutButton}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            <Box sx={styles.bottomContainer}>
                <Button
                    variant="contained"
                    onClick={() => setOpenTaskModal(true)}
                    sx={styles.addButton}
                >
                    + Add task
                </Button>
            </Box>

            {openTaskModal && (
                <TaskModal
                    open={openTaskModal}
                    onClose={() => setOpenTaskModal(false)}
                    onAction={handleAddTask}
                    task={initialTask}
                />
            )}
        </React.Fragment>
    );
}
