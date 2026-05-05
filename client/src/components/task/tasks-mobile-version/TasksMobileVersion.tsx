import { Tag, type Task } from '../../../types';
import { Box, Typography, Chip, Checkbox } from '@mui/material';
import { ExpandMoreOutlined as ExpandMoreIcon } from '@mui/icons-material';
import { formatDueDateForMobile } from '../../../utils/helper';
import React from 'react';
import { styles } from './TasksMobileVersion.style';

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
      <Box sx={styles.headerContainer}>
        <Typography variant="h6" sx={styles.title}>
          {isTodo ? 'Task to do' : 'Tasks done'}
        </Typography>

        <ExpandMoreIcon
          onClick={handleToggle}
          sx={{
            ...styles.expandIcon,
            transform: expandTasks ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      </Box>

      {expandTasks && (
        <Box sx={styles.listContainer}>
          {tasks.map((task) => (
            <Box key={task.id} sx={styles.card}>
              <Checkbox checked={task.completed} />

              <Box sx={styles.content}>
                <Typography sx={styles.titleText}>
                  {task.name}
                </Typography>

                {task.dueDate && (
                  <Typography variant="body2" sx={styles.secondaryText}>
                    {formatDueDateForMobile(task.dueDate)}
                  </Typography>
                )}

                {task.note && (
                  <Typography variant="body2" sx={styles.secondaryText}>
                    {task.note}
                  </Typography>
                )}

                {task.tag && (
                  <Chip
                    label={tagStyles[task.tag].label}
                    size="small"
                    sx={{
                      ...styles.chip,
                      bgcolor: tagStyles[task.tag].bg,
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};