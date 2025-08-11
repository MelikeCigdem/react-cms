import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Button, Chip, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
// import DropZone from '../../../../components/DndKit/DndKit';

const CustomUploadButton = styled(Button)(({ theme }) => ({
       display: 'block',
       backgroundColor: '#1976d2',
       color: '#606266',
       padding: '20px 20px',
       borderRadius: '8px',
       textTransform: 'none',
       boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
       transition: 'all 0.3s ease',
       background: '#fff',
       border: '1px dashed #d9d9d9',
       '&:hover': {
              border: '1px dashed #0d47a1',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
       },
       '&:active': {
              border: '1px dashed #0d47a1',
              transform: 'scale(0.98)',
       },
       width: '100%',
       height: '120px',
}));

const VisuallyHiddenInput = styled('input')({
       clip: 'rect(0 0 0 0)',
       clipPath: 'inset(50%)',
       height: 1,
       overflow: 'hidden',
       position: 'absolute',
       bottom: 0,
       left: 0,
       whiteSpace: 'nowrap',
       width: 1,
});

export default function UploadVideo() {
       const [droppedItems, setDroppedItems] = useState([]);
       const [videoList, setVideoList] = useState([...itemData]);



       const handleDragEnd = (event) => {
              const { over, active } = event;
              if (over?.id === 'drop-zone') {
                     const droppedItem = itemData.find((item) => item.img === active.id);
                     if (droppedItem) {
                            setDroppedItems((prev) => [...prev, droppedItem]);
                     }
              }
       };

       const uploadVideo = (event) => {
              const files = Array.from(event.target.files);
              const mp4Files = files.filter(file => file.type.includes('video'));

              const newVideos = mp4Files.map(file => ({
                     src: URL.createObjectURL(file),
                     title: file.name,
              }));
              setVideoList(prev => [...newVideos, ...prev]);
       };

       return (
              <Box>
                     <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                            <CustomUploadButton
                                   component="label"
                                   role={undefined}
                                   tabIndex={-1}
                                   startIcon={<CloudUploadIcon color='primary' sx={{ width: '40px', height: '40px' }} />}
                            >
                                   <Typography display={'flex'} sx={{ fontSize: "13px", justifyContent: 'center' }}>Dosyaları buraya sürükleyiniz veya  <Typography variant="caption" sx={{ display: 'block', color: '#0667D0', ml: 0.5, fontSize: "13px" }}> yüklemek için tıklayınız</Typography></Typography>

                                   <VisuallyHiddenInput
                                          type="file"
                                          accept="video/*"
                                          multiple
                                          onChange={(event) => uploadVideo(event)}
                                   />
                            </CustomUploadButton>
                     </Box>
                     <DndContext onDragEnd={handleDragEnd}>
                            <Typography sx={{ display: 'flex', color: '#0667D0', fontWeight: 'bold', justifyContent: 'left', mb: 2 }}>VIDEO, MP3</Typography>
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
                                          {videoList.map((item, index) => (
                                                 <DraggableVideo key={index} item={item} />

                                          ))}
                                   </Grid>
                            </Box>
                            {/* Dışa Bırakılabilir Alan */}
                            {/* <DropZone id="drop-zone" items={droppedItems} /> */}
                     </DndContext>
              </Box>

       );
}

function DraggableVideo({ item }) {

       // her bir resimin bulunduğu droggble
       const { attributes, listeners, setNodeRef, transform } = useDraggable({
              id: item.img,
       });

       const style = {
              transform: transform
                     ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                     : undefined,
              cursor: 'grab',
              border: 'unset',
       };

       return (
              <Grid
                     ref={setNodeRef}
                     style={style}
                     {...listeners}
                     {...attributes}
                     minHeight={60}
                     size={{
                            xs: 12,
                            sm: 12,
                            md: 6,
                            lg: 6,
                     }}
              >
                     <Card sx={{ position: 'relative', width: '100%' }}>

                            <CardMedia
                                   controls
                                   component="video"
                                   height="110"
                                   src={`${item.src}`}
                                   sx={{ height: "180px"}}
                            />

                     </Card>

              </Grid>
       );
}

const itemData = [
       {
              src: "https://www.w3schools.com/html/mov_bbb.mp4",
              title: "Örnek Video 1"
       },
       {
              src: "https://www.w3schools.com/html/movie.mp4",
              title: "Örnek Video 2"
       }
];