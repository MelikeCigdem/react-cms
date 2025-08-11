import { useDroppable } from '@dnd-kit/core';
import Box from '@mui/material/Box';

export default function DropZone({ id, items }) {
       console.log("items",items)
       // resimin sürüklenip geldiği yer
     
       const { isOver, setNodeRef } = useDroppable({ id });

       return (
              <Box
                     ref={setNodeRef}
                     sx={{
                            width: 300,
                            height: 450,
                            border: '2px dashed #aaa',
                            borderRadius: '8px',
                            padding: 2,
                            backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
                            overflow: 'auto',
                     }}
              >
                     <strong>Dropped Images:</strong>
                     {items.map((item) => (
                            <img
                                   key={item.img}
                                   src={`${item.img}?w=100&h=100&fit=crop&auto=format`}
                                   alt={item.title}
                                   style={{ width: '100%', marginTop: 8 }}
                            />
                     ))}
              </Box>
       );
}