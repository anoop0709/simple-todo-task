import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Tag } from '../../types';
import type { Task } from '../../types';
import { normalizeDate, toDateInputValue } from '../../utils/helper';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400, xl: '50%' },
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 'none',
    p: 3,
};

export default function EditTaskModal({
    open,
    onClose,
    onEdit,
    task,
}: {
    open: boolean;
    onClose: () => void;
    onEdit: (task: Task) => void;
    task: Task;
}) {
    const [name, setName] = useState(task.name);
    const [dueDate, setDueDate] = useState(toDateInputValue(task.dueDate));
    const [tag, setTag] = useState<Tag | '' | undefined>(task?.tag);
    const [note, setNote] = useState(null);

    const handleSubmit = () => {
        if (!name.trim()) return;

        const editedTask: Task = {
            id: task.id,
            name,
            dueDate: normalizeDate(dueDate) || undefined,
            tag: tag || undefined,
            note: note || null,
            completed: task.completed,
        };
        onEdit(editedTask);

        setName('');
        setDueDate('');
        setTag('');
        setNote(null);

        onClose();
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Typography sx={{ variant: 'h6', mb: 2 }}>
                    Add New Task
                </Typography>

                <TextField
                    fullWidth
                    label="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    type="date"
                    value={dueDate}
                    slotProps={{
                        htmlInput: {
                            min: new Date().toISOString().split('T')[0],
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

                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={onClose}
                        sx={{ color: '#878787' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
 sx={{ color: '#efefef' }}
                        onClick={handleSubmit}
                    >
                        Update Task
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
