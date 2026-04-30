import { Checkbox, TableRow, TableCell, Typography, Box } from '@mui/material';
import {
    SellOutlined,
    CalendarToday,
    FormatAlignLeft,
} from '@mui/icons-material';

export default function TaskRowHeader() {
    return (
        <TableRow hover>
            <TableCell sx={{ width: '5%', paddingBottom: 0, paddingLeft: 0.5 }}>
                <Checkbox />
            </TableCell>

            <TableCell sx={{ width: '35%', paddingBottom: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 2,
                    }}
                >
                    <FormatAlignLeft
                        sx={{ fontSize: '16px', color: '#6a6969' }}
                    />
                    <Typography sx={{ fontWeight: 500, color: '#6a6969' }}>
                        Task name
                    </Typography>
                </Box>
            </TableCell>

            <TableCell sx={{ width: '15%', paddingBottom: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 2,
                    }}
                >
                    <CalendarToday
                        sx={{ fontSize: '16px', color: '#6a6969' }}
                    />
                    <Typography sx={{ fontWeight: 500, color: '#6a6969' }}>
                        Due date
                    </Typography>
                </Box>
            </TableCell>

            <TableCell sx={{ width: '15%', paddingBottom: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 2,
                    }}
                >
                    <SellOutlined sx={{ fontSize: '16px', color: '#6a6969' }} />
                    <Typography sx={{ fontWeight: 500, color: '#6a6969' }}>
                        Tag
                    </Typography>
                </Box>
            </TableCell>

            <TableCell sx={{ width: '15%', paddingBottom: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 2,
                    }}
                >
                    <FormatAlignLeft
                        sx={{ fontSize: '16px', color: '#6a6969' }}
                    />
                    <Typography sx={{ fontWeight: 500, color: '#6a6969' }}>
                        Note
                    </Typography>
                </Box>
            </TableCell>

            <TableCell sx={{ width: '15%', paddingBottom: 0 }}>
                <Typography sx={{ fontWeight: 500, color: '#6a6969' }}>
                    Actions
                </Typography>
            </TableCell>
        </TableRow>
    );
}
