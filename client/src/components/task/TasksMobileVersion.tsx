import { Tag, type Task } from '../../types';
import { Box, Typography, Chip, Checkbox } from '@mui/material';
import { ExpandMoreOutlined as ExpandMoreIcon } from '@mui/icons-material';
import { formatDueDateForMobile } from '../../utils/helper';

type TasksProps = {
    tasks: Task[];
    expandTasks: boolean;
    setExpandTask: React.Dispatch<React.SetStateAction<boolean>>;
    isTodo: boolean;
};

const tagStyles: Record<Tag, { label: string; bg: string }> = {
    [Tag.URGENT]: { label: 'Urgent', bg: '#F5D78E' },
    [Tag.NOT_URGENT]: { label: 'Not urgent', bg: '#E0E0E0' },
    [Tag.HIGH]: { label: 'High', bg: '#FFCDD2' },
    [Tag.MEDIUM]: { label: 'Medium', bg: '#FFE082' },
    [Tag.LOW]: { label: 'Low', bg: '#C8E6C9' },
};
export const TasksMobileVersion = ({
    tasks,
    expandTasks,
    setExpandTask,
    isTodo,
}: TasksProps) => {
    const handleToggle = () => {
        setExpandTask((prev) => !prev);
    };

    if (!tasks.length) return null;
    return (
        <>
            <Box
                sx={{
                    width: '96%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: '50px auto 20px',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                >
                    {isTodo ? 'Task to do' : 'Tasks done'}
                </Typography>

                <ExpandMoreIcon
                    onClick={handleToggle}
                    sx={{
                        cursor: 'pointer',
                        ml: 1,
                        transition: 'transform 0.3s ease',
                        transform: expandTasks
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                    }}
                />
            </Box>
            {expandTasks ? (
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                    {tasks.map((task) => (
                        <Box
                            key={task.id}
                            sx={{
                                p: 2,
                                borderRadius: '8px',
                                border: '1px solid #E0E0E0',
                                display: 'flex',
                                gap: 1.5,
                                alignItems: 'flex-start',
                            }}
                        >
                            <Checkbox checked={task.completed} />

                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 500 }}>
                                    {task.name}
                                </Typography>

                                {task.dueDate && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#666', mt: 0.5 }}
                                    >
                                        {formatDueDateForMobile(task.dueDate)}
                                    </Typography>
                                )}

                                {task.note && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#666', mt: 0.5 }}
                                    >
                                        {task.note}
                                    </Typography>
                                )}

                                {task.tag && (
                                    <Chip
                                        label={tagStyles[task.tag].label}
                                        size="small"
                                        sx={{
                                            backgroundColor:
                                                tagStyles[task.tag].bg,
                                            mt: 1,
                                            width: 'fit-content',
                                            borderRadius: '5px',
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : null}
        </>
    );
};
