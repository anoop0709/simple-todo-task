import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400, xl: '20%' },
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 'none',
    p: 3,
};

export default function ConfirmDeleteTaskModal({
    open,
    onClose,
    onDelete,
    id,
}: {
    open: boolean;
    onClose: () => void;
    onDelete: (id: string | undefined) => void;
    id: string | undefined;
}) {
    const handleSubmit = () => {
        if (id === undefined) {
            onClose();
        }
        onDelete(id);
        onClose();
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Typography sx={{ variant: 'h5', mb: 2, fontWeight: 600 }}>
                    Confirm deletion
                </Typography>
                <Typography sx={{ variant: 'body2', mt: 2, mb: 3 }}>
                    Are you sure do you want to delete this task, this action
                    cannot be undone
                </Typography>
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
                        Delete Task
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
