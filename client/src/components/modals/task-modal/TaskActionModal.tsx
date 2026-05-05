import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Tag, type Task } from '../../../types';
import {
    normalizeDateToSendToBackend,
    formatDueDateInEdit,
} from '../../../utils/helper';
import { styles } from './TaskActionModal.styles';

type Props = {
    open: boolean;
    onClose: () => void;
    onAction: (task: Task) => void;
    task: Task;
};

export default function TaskModal({ open, onClose, onAction, task }: Props) {
    const [name, setName] = useState(task.name);
    const [dueDate, setDueDate] = useState(formatDueDateInEdit(task.dueDate));
    const [tag, setTag] = useState<Tag | '' | undefined>(task?.tag);
    const [note, setNote] = useState<string | null>(task?.note ?? null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = () => {
        if (!name.trim() || name.length < 3) {
            setIsError(true);
            return;
        }

        const newTask: Task = {
            id: task.id !== '' ? task.id : '',
            name,
            dueDate: normalizeDateToSendToBackend(dueDate) || undefined,
            tag: tag || undefined,
            note,
            completed: task.completed,
        };

        onAction(newTask);
        setName('');
        setDueDate('');
        setTag('');
        setNote(null);
        setIsError(false);

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={styles.modalBox}>
                <Typography
                    variant="h6"
                    sx={styles.title}
                >
                    {task.name ? 'Update Task' : 'Add New Task'}
                </Typography>

                <TextField
                    fullWidth
                    label="Task name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setIsError(false);
                    }}
                    margin="normal"
                    required
                    error={isError}
                    helperText={isError && 'Minimum 3 characters required'}
                />

                <TextField
                    fullWidth
                    type="date"
                    label="Due date"
                    value={dueDate}
                    slotProps={{
                        htmlInput: {
                            min: new Date().toISOString().split('T')[0],
                        },
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    onChange={(e) => setDueDate(e.target.value)}
                    margin="normal"
                />

                <TextField
                    select
                    fullWidth
                    label="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value as Tag)}
                    margin="normal"
                >
                    {Object.values(Tag).map((tagItem) => (
                        <MenuItem
                            key={tagItem}
                            value={tagItem}
                        >
                            {tagItem.replace('_', ' ')}
                        </MenuItem>
                    ))}
                </TextField>

                <Box sx={styles.actions}>
                    <Button
                        onClick={onClose}
                        sx={styles.cancelButton}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={styles.submitButton}
                    >
                        {task.name ? 'Update Task' : 'Add Task'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
