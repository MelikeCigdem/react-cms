// SectionTwo.jsx
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import DropZone from '../../../../components/DndKit/DndKit';

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SectionTwo() {
    const [imageList, setImageList] = useState([...itemData]);
    const [popup, setPopup] = useState({ photoPopup: false, photoPopupIndex: 0 });
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDragEnd = (event) => {
        const { over, active } = event;

        // fotoğraflar için sıralama
        if (over && active.id !== over.id) {
            setImageList((prev) => {
                const oldIndex = prev.findIndex((x) => x.id === active.id);
                const newIndex = prev.findIndex((x) => x.id === over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }

        // drop-zone'a bırakma mantığı
        if (over?.id === 'drop-zone') {
            const droppedItem = imageList.find((i) => i.img === active.id);
            if (droppedItem) {
                setDroppedItems((prev) =>
                    prev.some((x) => x.img === droppedItem.img) ? prev : [...prev, droppedItem]
                );
            }
        }
    };

    const handleRemoveFromDrop = (imgUrl) => {
        setDroppedItems((prev) => prev.filter((x) => x.img !== imgUrl));
    };

    return (
        <Box>
            <DndContext onDragEnd={handleDragEnd}>
                <Box sx={{ mt: 3, boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)", borderRadius:"4px", border:"1px solid #dae1e9", padding:"1rem 12px", marginBottom:"1.2rem" }}>
                    <Typography sx={{ display: 'flex', color: '#0667D0', fontWeight: 'bold', mb: 2 }}>
                        FOTOĞRAFLAR
                    </Typography>

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
                        {imageList.map((item, index) => (
                            <DraggableImage
                                key={item.img}
                                item={item}
                                onImageClick={() => setPopup({ photoPopup: true, photoPopupIndex: index })}
                            />
                        ))}
                    </Grid>

                </Box>

                {/* Fotoğraf popup */}
                <Dialog open={popup.photoPopup} onClose={() => setPopup({ ...popup, photoPopup: false })}>
                    <Box p={2}>
                        <img
                            src={imageList[popup.photoPopupIndex]?.img}
                            alt={imageList[popup.photoPopupIndex]?.title}
                            style={{ height: 450, maxWidth: '100%', display: 'block', margin: '0 auto' }}
                        />
                        <Box sx={{ p: 2, backgroundColor: '#0667d0', color: '#fff' }}>
                            {imageList[popup.photoPopupIndex]?.description}
                        </Box>
                    </Box>
                    <DialogActions>
                        <Button onClick={() => setPopup({ ...popup, photoPopup: false })}>Çıkış</Button>
                    </DialogActions>
                </Dialog>

                {/* --------- DROP ZONE --------- */}
                {/* Dışa Bırakılabilir Alan */}
                {/* <DropZone id="drop-zone" items={droppedItems} /> */}

                {/* --------- METİN HABER LİSTESİ (sortable) --------- */}
                <Box sx={{ mt: 4, boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.05)", borderRadius:"4px", border:"1px solid #dae1e9", padding:"1rem 12px", marginBottom:"1.2rem" }}>
                    {/* Üst başlık çubuğu – görseldeki gibi */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', mb: 1, gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                            <Typography sx={{ color: '#0667D0', fontWeight: 700 }}>IHA</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>/ Haber</Typography>
                        </Box>

                        <Typography sx={{ color: 'text.secondary', fontSize: 13, textAlign: 'right' }}>
                            11.08.2025 16:30:32
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: '#0667D0', fontWeight: 700 }}>Haber</Typography>
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    bgcolor: '#0667D0',
                                    display: 'grid',
                                    placeItems: 'center',
                                    color: '#fff',
                                    cursor: 'pointer',
                                }}
                                title="+"
                            >
                                <AddIcon fontSize="small" />
                            </Box>
                        </Box>
                    </Box>

                    <SortableContext items={imageList} strategy={verticalListSortingStrategy}>
                        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
                            {imageList.map((n) => (
                                <NewsItem key={n.id} item={n} />
                            ))}
                        </Box>
                    </SortableContext>
                </Box>
            </DndContext>
        </Box>
    );
}


function DraggableImage({ item, onImageClick }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.img });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        cursor: 'grab',
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card ref={setNodeRef} style={style} sx={{ position: 'relative', width: '100%', cursor: 'pointer' }}>
                <CardMedia
                    onClick={onImageClick}
                    component="img"
                    height="110"
                    src={item.img}
                    alt={item.title}
                    sx={{ objectFit: 'cover', width: '100%' }}
                />
                <div
                    {...listeners}
                    {...attributes}
                    title="Sürükle"
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        cursor: 'grab',
                        padding: '0px 5px 2px 5px',
                        color: 'black',
                        borderRadius: '4px',
                        background: '#fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,.15)',
                        userSelect: 'none',
                    }}
                >
                    ☰
                </div>
            </Card>
        </Grid>
    );
}


function NewsItem({ item }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
        data: { type: 'news' },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
        background: isDragging ? 'rgba(0,0,0,0.03)' : 'transparent',
        textAlign: 'start',
        padding: '2px',
    };

    return (
        <Box ref={setNodeRef} style={style} sx={{ borderColor: 'divider' }} className="deneme">
            <Box sx={{ display: 'grid', gap: 1 }}>
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                    <DragIndicatorIcon fontSize="small" {...listeners} {...attributes} color="primary" />
                    <Typography sx={{ lineHeight: 1.5 }}>{item.description}</Typography>
                </Box>
            </Box>
        </Box>
    );
}


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        description:
            "Erzurum'da Atatürk Üniversitesine ait tarlada kurak hava ve kış şartlarına dayanıklı tescilli 'Alturna' tohumundan yetiştirilen buğdayın hasadı yapıldı.",
        id: 'n1',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        description:
            "Erzurum'da Atatürk Üniversitesine ait tarlada kurak hava ve kış şartlarına dayanıklı tescilli 'Alturna' tohumundan yetiştirilen buğdayın hasadı yapıldı.",
        id: 'n2',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        description:
            "Erzurum'da Atatürk Üniversitesine ait tarlada kurak hava ve kış şartlarına dayanıklı tescilli 'Alturna' tohumundan yetiştirilen buğdayın hasadı yapıldı.",
        id: 'n3',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        description:
            "Erzurum'da Atatürk Üniversitesine ait tarlada kurak hava ve kış şartlarına dayanıklı tescilli 'Alturna' tohumundan yetiştirilen buğdayın hasadı yapıldı. Bitkisel Üretim Uygulama ve Araştırma Merkezi Müdürü Haluk Çağlar Kaymak, gazetecilere açıklama yaptı.",
        id: 'n4',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        description:
            "Erzurum'da Atatürk Üniversitesine ait tarlada kurak hava ve kış şartlarına dayanıklı tescilli 'Alturna' tohumundan yetiştirilen buğdayın hasadı yapıldı.",
        id: 'n5',
    },
];