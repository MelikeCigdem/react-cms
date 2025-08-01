import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function AgencyNews() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2} 
        sx={{
          '--Grid-borderWidth': '1px',
          '& > div': {
            border: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        {[...Array(6)].map((_, index) => (
          <Grid
            key={index}
            minHeight={160}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 4,
            }}
          >
            Melike
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
