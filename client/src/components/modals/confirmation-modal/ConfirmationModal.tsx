import { Modal, Box, Typography, Button } from '@mui/material';
import { styles } from './ConfirmationModal.styles';

type Props = {
    open: boolean;
    onClose: () => void;
    onDelete: (id: string | undefined) => void;
    id: string | undefined;
};

export default function ConfirmDeleteTaskModal({
    open,
    onClose,
    onDelete,
    id,
}: Props) {
    const handleSubmit = () => {
        if (!id) {
            onClose();
            return;
        }

        onDelete(id);
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
                    Confirm deletion
                </Typography>

                <Typography
                    variant="body2"
                    sx={styles.message}
                >
                    Are you sure you want to delete this task? This action
                    cannot be undone.
                </Typography>

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
                        sx={styles.deleteButton}
                    >
                        Delete Task
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
