import { useDroppable } from '@dnd-kit/core';
import { Box, IconButton, Typography, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useRef, useState } from 'react';
import { useDndKit } from "../../context/DndProvider";
import { styled } from '@mui/material/styles';

const CustomUploadButton = styled(Button)(() => ({
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#fff',
       color: '#606266',
       borderRadius: '8px',
       textTransform: 'none',
       boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
       transition: 'all 0.3s ease',
       border: '1px dashed #d9d9d9',
       cursor: 'pointer',
       '&:hover': {
              border: '1px dashed #0d47a1',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
       },
       '&:active': {
              border: '1px dashed #0d47a1',
              transform: 'scale(0.98)',
       },
}));

const HiddenInput = styled('input')({
       position: 'absolute',
       width: 1,
       height: 1,
       padding: 0,
       margin: -1,
       overflow: 'hidden',
       clip: 'rect(0,0,0,0)',
       border: 0,
});

export default function DropZone({ id, setValue, title, fieldName }) {
       const { isOver, setNodeRef } = useDroppable({ id });
       const { dropped, clearZone } = useDndKit();
       const [image, setImage] = useState(null);
       const fileInputRef = useRef(null);

       const zoneItems = dropped[id] ?? [];

       const urlToBase64 = async (url) => {
              const response = await fetch(url);
              const blob = await response.blob();
              return new Promise((resolve, reject) => {
                     const reader = new FileReader();
                     reader.onloadend = () => resolve(reader.result);
                     reader.onerror = reject;
                     reader.readAsDataURL(blob);
              });
       };

       const updateImage = (imgObj) => {
              setImage(imgObj);
              if (setValue) setValue(fieldName, imgObj?.img || null);
       };

       useEffect(() => {
              if (!zoneItems.length) return;

              const lastItem = zoneItems[zoneItems.length - 1];
              if (lastItem?.img?.startsWith("http")) {
                     urlToBase64(lastItem.img).then((base64) =>
                            updateImage({ img: base64, title: lastItem.title || "uploaded" })
                     );
              } else {
                     updateImage(lastItem);
              }
       }, [zoneItems]);

       const processFiles = (files) => {
              const jpegFile = files.find((f) => f.type === "image/jpeg");
              if (!jpegFile) return;

              const reader = new FileReader();
              reader.onload = (e) =>
                     updateImage({ img: e.target.result, title: jpegFile.name });
              reader.readAsDataURL(jpegFile);

              if (fileInputRef.current) fileInputRef.current.value = null;
       };

       const handleDrop = (e) => {
              e.preventDefault();
              processFiles(Array.from(e.dataTransfer.files));
       };

       const removeImage = () => {
              updateImage(null);
              clearZone(id);
              if (fileInputRef.current) fileInputRef.current.value = null;
       };

       return (
              <Box
                     ref={setNodeRef}
                     sx={{
                            mb: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
                            width: '100%',
                     }}
              >
                     {image ? (
                            <Box
                                   onDrop={handleDrop}
                                   onDragOver={(e) => e.preventDefault()}
                                   sx={{
                                          position: "relative",
                                          borderRadius: 1,
                                          overflow: "hidden",
                                          width: "100%",
                                          height: 150,
                                          border: "1px dashed #ccc",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          "&:hover .overlay": { opacity: 1 },
                                   }}
                            >
                                   <img
                                          src={image.img}
                                          alt={image.title}
                                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                   />

                                   <Box
                                          className="overlay"
                                          sx={{
                                                 position: "absolute",
                                                 inset: 0,
                                                 bgcolor: "rgba(0,0,0,0.4)",
                                                 display: "flex",
                                                 justifyContent: "center",
                                                 alignItems: "center",
                                                 gap: 1,
                                                 opacity: 0,
                                                 transition: "opacity 0.3s",
                                          }}
                                   >
                                          <IconButton sx={{ color: "white" }} onClick={() => window.open(image.img, "_blank")}>
                                                 <OpenInNewIcon />
                                          </IconButton>
                                          <IconButton sx={{ color: "white" }} onClick={removeImage}>
                                                 <DeleteIcon />
                                          </IconButton>
                                   </Box>

                                   <HiddenInput
                                          ref={fileInputRef}
                                          type="file"
                                          accept="image/jpeg"
                                          multiple
                                          onChange={(e) => processFiles(Array.from(e.target.files))}
                                   />
                            </Box>
                     ) : (
                            <CustomUploadButton
                                   onClick={() => fileInputRef.current?.click()}
                                   sx={{ height: 150, width: '100%' }}
                                   startIcon={<CloudUploadIcon color="primary" sx={{ width: 40, height: 40 }} />}
                            >
                                   <Typography sx={{ fontSize: 13, textAlign: "center" }}>{title}</Typography>
                                   <HiddenInput
                                          ref={fileInputRef}
                                          type="file"
                                          accept="image/jpeg"
                                          multiple
                                          onChange={(e) => processFiles(Array.from(e.target.files))}
                                   />
                            </CustomUploadButton>
                     )}
              </Box>
       );
}
