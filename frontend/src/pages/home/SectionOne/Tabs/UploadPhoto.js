import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Button, Chip, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import DropZone from '../../../../components/DndKit/DndKit';

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

export default function UploadPhoto() {
       const [droppedItems, setDroppedItems] = useState([]);
       const [imageList, setImageList] = useState([...itemData]);



       const handleDragEnd = (event) => {
              const { over, active } = event;
              if (over?.id === 'drop-zone') {
                     const droppedItem = itemData.find((item) => item.img === active.id);
                     if (droppedItem) {
                            setDroppedItems((prev) => [...prev, droppedItem]);
                     }
              }
       };

       const uploadImage = (event) => {
              const files = Array.from(event.target.files);
              const jpegFiles = files.filter(file => file.type === 'image/jpeg');

              const getImageDimensions = (file) => {
                     return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                   const img = new Image();
                                   img.onload = () => {
                                          resolve({
                                                 img: e.target.result,
                                                 title: file.name,
                                                 size: `${img.width}x${img.height}`
                                          });
                                   };
                                   img.src = e.target.result;
                            };
                            reader.readAsDataURL(file);
                     });
              };

              Promise.all(jpegFiles.map(getImageDimensions)).then((newImages) => {
                     setImageList((prev) => [...newImages, ...prev]);
              });
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
                                          accept="image/jpeg"
                                          multiple
                                          onChange={(event) => uploadImage(event)}
                                   />
                            </CustomUploadButton>
                     </Box>
                     <DndContext onDragEnd={handleDragEnd}>
                            <Typography sx={{ display: 'flex', color: '#0667D0', fontWeight: 'bold', justifyContent: 'left', mb: 2 }}>FOTOĞRAFLAR</Typography>
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
                                          {imageList.map((item, index) => (
                                                 <DraggableImage key={index} item={item} />

                                          ))}
                                   </Grid>
                            </Box>
                            {/* Dışa Bırakılabilir Alan
                            <DropZone id="drop-zone" items={droppedItems} /> */}
                            <DropZone
                                   id="drop-zone"
                                   items={droppedItems}
                                   setItems={setDroppedItems}
                            />
                     </DndContext>
              </Box>

       );
}

function DraggableImage({ item }) {
       // her bir resimin bulunduğu droggble
       const { attributes, listeners, setNodeRef, transform } = useDraggable({
              id: item.img,
       });

       const style = {
              transform: transform
                     ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                     : undefined,
              cursor: 'grab',
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
                            sm: 6,
                            md: 4,
                            lg: 4,
                     }}
              >
                     <Card sx={{ position: 'relative', width: '100%' }}>
                            <Chip size="small" label={item.size} sx={{
                                   position: 'absolute',
                                   top: 8,
                                   left: 8,
                                   zIndex: 2,
                                   backgroundColor: 'rgba(5, 103, 208, 0.65)',
                                   color: '#fff',
                                   border: '1px solid #fff',
                                   fontSize: '11px'
                            }} />
                            <CardMedia
                                   component="img"
                                   height="110"
                                   src={`${item.img}`}
                                   alt={item.title}
                                   sx={{
                                          objectFit: 'cover',
                                          width: '100%',
                                   }}
                            />
                     </Card>

              </Grid>
       );
}

const itemData = [
       {
              img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
              title: 'Breakfast',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
              title: 'Burger',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
              title: 'Camera',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
              title: 'Coffee',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
              title: 'Hats',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
              title: 'Honey',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
              title: 'Basketball',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
              title: 'Fern',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
              title: 'Mushrooms',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
              title: 'Tomato basil',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
              title: 'Sea star',
              size: '1200x700'
       },
       {
              img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
              title: 'Bike',
              size: '1200x700'
       },
];