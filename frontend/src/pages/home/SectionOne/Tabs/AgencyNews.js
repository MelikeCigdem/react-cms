import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AgencyNews() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={1}
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
            className="deneme2"
            minHeight={60}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 4,
            }}
          >
            <Card>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 0.5,
                  paddingX: 0.5
                }}
              >
                <Typography color='#0667d0' variant="caption" gutterBottom sx={{  display: 'block', fontWeight: 'bold', fontSize: "11px"}}>AA</Typography>
                <Typography color='#0667d0' variant="caption" gutterBottom sx={{  display: 'block', fontWeight: 'bold', fontSize: "11px"}}>Haber</Typography>
              </Box>

              <CardMedia
                component="img"
                height="110"
                image="http://tmcms.turkmedya.com.tr/cdn/AgencyThumbImages/2025/08/06/38758475.jpg"
                alt="Paella dish"
              />
              <CardContent sx={{ px: 1, py: 1 }}>
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textAlign: "left", m: 0, p: 0, fontSize: "11px" }}>
                  06.08.2025 10:08
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "left", m: 0, p: 0, fontSize: "12px" }}>
                  ABD'nin California eyaletindeki yangınlarda 330
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
