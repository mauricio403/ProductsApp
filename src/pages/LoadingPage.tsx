import { CircularProgress, Typography } from '@mui/material';

import Box from '@mui/material/Box';

export const LoadingPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginY: 50

        }}>
            <CircularProgress size={50} />
            <Typography variant='h3' > Cargando......</Typography>
        </Box>
    )
}
