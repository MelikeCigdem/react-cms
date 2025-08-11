
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { MenuItem, Select, FormControl, } from '@mui/material';
import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';
import ReorderIcon from '@mui/icons-material/Reorder';

const iconButtonStyle = {
       background: '#fff',
       color: '#5c6979',
       borderRadius: '50%',
       p: '8px',
       border: '1px solid #e0e0e0',
};
export default function SortingNews() {
       const [age, setAge] = useState(0);
       const [hoveredIndex, setHoveredIndex] = useState(null);
       const handleNews = (event) => setAge(event.target.value);
 
       return (
              <>
                     <Box sx={{ display: 'flex', gap: 1, justifyContent: "space-between", mb: 3 }}>
                            <FormControl sx={{ width: 200 }}>
                                   <Select
                                          value={age}
                                          onChange={handleNews}
                                          size="small"
                                          sx={{
                                                 height: 32,
                                                 fontSize: '0.75rem',
                                                 textAlign: 'left',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'flex-start',
                                                 pl: 1,
                                          }}
                                   >
                                          <MenuItem value={0}>Haber</MenuItem>
                                          <MenuItem value={10}>Galeri</MenuItem>
                                          <MenuItem value={20}>Video</MenuItem>
                                          <MenuItem value={30}>Yazar</MenuItem>
                                   </Select>
                            </FormControl>
                            <Button variant="contained">Uygula</Button>
                     </Box>
                     <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                   className="deneme1"
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
                                   {[...Array(12)].map((_, index) => (
                                          <Grid
                                                 key={index}
                                                 className="deneme2"
                                                 minHeight={60}
                                                 size={{
                                                        xs: 12,
                                                        sm: 6,
                                                        md: 4,
                                                        lg: 2,
                                                 }}
                                          >
                                                 <Card onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                                                        <Box
                                                               sx={{
                                                                      display: 'flex',
                                                                      justifyContent: 'space-between',
                                                                      alignItems: 'center',
                                                                      paddingTop: 0.5,
                                                                      paddingX: 0.5
                                                               }}
                                                        >
                                                               <Typography color='#0667d0' variant="caption" gutterBottom sx={{ display: 'block', fontWeight: 'bold', fontSize: "11px" }}>IHA Haber</Typography>
                                                               {hoveredIndex === index ?
                                                                      <Box display={'flex'}>
                                                                             <Typography variant="caption" mr={1} gutterBottom sx={{ display: 'block', fontSize: "11px" }}>1591652</Typography>
                                                                             <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                                                                                    <LinkIcon sx={{ mr: 1, fontSize: "16px", color: '#0667d0', cursor: 'pointer' }} />
                                                                             </a>
                                                                      </Box>
                                                                      : <Typography color='#0667d0' variant="caption" gutterBottom sx={{ display: 'block', fontWeight: 'bold', fontSize: "11px" }}>GÜNCEL</Typography>}
                                                        </Box>

                                                        <CardMedia
                                                               component="img"
                                                               height="110"
                                                               image="https://img3.aksam.com.tr/imgsdisk/2025/08/06/t3_besiktasin-st-patricks-ma-891.jpg"
                                                               alt="Paella dish"
                                                        />
                                                        <CardContent sx={{ px: 1, py: 1 }}>
                                                               <Typography variant="caption" sx={{ display: 'block', color: "#0667d0", textAlign: "left", m: 0, p: 0, fontSize: "10px" }}>
                                                                      Melike Çiğdem
                                                               </Typography>
                                                               <Box
                                                                      sx={{
                                                                             display: 'flex',
                                                                             justifyContent: 'space-between',
                                                                             alignItems: 'center',
                                                                             padding: 0
                                                                      }}
                                                               >
                                                                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textAlign: "left", m: 0, p: 0, fontSize: "11px" }}>
                                                                             06.08.2025 10:08
                                                                      </Typography>
                                                                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textAlign: "left", m: 0, p: 0, fontSize: "11px" }}>
                                                                             9
                                                                      </Typography>
                                                               </Box>
                                                               <Typography variant="body2" sx={{ textAlign: "left", m: 0, p: 0, fontSize: "12px" }}>
                                                                      ABD'nin California eyaletindeki yangınlarda 330
                                                               </Typography>
                                                        </CardContent>
                                                 </Card>
                                          </Grid>
                                   ))}
                            </Grid>
                     </Box>
              </>

       );
}
