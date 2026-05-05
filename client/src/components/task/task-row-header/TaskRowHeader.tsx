import { Checkbox, TableRow, TableCell, Typography, Box } from '@mui/material';
import {
  SellOutlined,
  CalendarToday,
  FormatAlignLeft,
} from '@mui/icons-material';
import { styles } from './TaskRowHeader.styles';

export default function TaskRowHeader() {
  return (
    <TableRow hover>
      <TableCell sx={styles.checkboxCell}>
        <Checkbox />
      </TableCell>

      <TableCell sx={[styles.cell, styles.nameCell]}>
        <Box sx={styles.headerContent}>
          <FormatAlignLeft sx={styles.icon} />
          <Typography sx={styles.text}>Task name</Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ ...styles.cell, ...styles.dateCell }}>
        <Box sx={styles.headerContent}>
          <CalendarToday sx={styles.icon} />
          <Typography sx={styles.text}>Due date</Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ ...styles.cell, ...styles.tagCell }}>
        <Box sx={styles.headerContent}>
          <SellOutlined sx={styles.icon} />
          <Typography sx={styles.text}>Tag</Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ ...styles.cell, ...styles.noteCell }}>
        <Box sx={styles.headerContent}>
          <FormatAlignLeft sx={styles.icon} />
          <Typography sx={styles.text}>Note</Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ ...styles.cell, ...styles.actionsCell }}>
        <Typography sx={styles.text}>Actions</Typography>
      </TableCell>
    </TableRow>
  );
}