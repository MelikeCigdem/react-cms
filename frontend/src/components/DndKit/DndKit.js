import { useDroppable } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

export default function DropZone({ id, items, setValue }) {
       const [image, setImage] = useState(null);
       const fileInputRef = useRef(null);
       console.log("items", items)
       // resimin sürüklenip geldiği yer

       const { isOver, setNodeRef } = useDroppable({ id });

       const removeImage = () => {
              setImage(null);
              setValue("image2Source", []);
              if (fileInputRef.current) fileInputRef.current.value = null;
       };

       const handleDrop = (event) => {
              event.preventDefault();
              processFiles(Array.from(event.dataTransfer.files));
       };

       const handleDragOver = (event) => {
              event.preventDefault();
       };

       const processFiles = (files) => {
              const jpegFiles = files.filter(file => file.type === 'image/jpeg');
              if (jpegFiles.length === 0) return;

              const file = jpegFiles[jpegFiles.length - 1]; // sadece son seçilen
              const reader = new FileReader();
              reader.onload = (e) => {
                     const imgObj = { img: e.target.result, title: file.name };
                     setImage(imgObj);
                     setValue("image2Source", [imgObj]);
                     if (fileInputRef.current) fileInputRef.current.value = null;
              };
              reader.readAsDataURL(file);
       };

       const openImageInNewTab = () => {
              if (!image) return;
              fetch(image.img)
                     .then(res => res.blob())
                     .then(blob => {
                            const url = URL.createObjectURL(blob);
                            window.open(url, "_blank");
                            setTimeout(() => URL.revokeObjectURL(url), 1000);
                     });
       };
       useEffect(() => {
              if (items && items.length > 0) {
                     setImage(items[0]);
              }
       }, [items]);

       return (
              <Box ref={setNodeRef} sx={{ mb: 3, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", backgroundColor: isOver ? '#f0f0f0' : '#fafafa', }}>
                     <Box
                            sx={{
                                   position: "relative",
                                   borderRadius: 1,
                                   overflow: "hidden",
                                   width: 200,
                                   height: 200,
                                   border: "1px dashed #ccc",
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   "&:hover .overlay": { opacity: image ? 1 : 0 },
                            }}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                     >
                            {image ? (
                                   <>
                                          <img
                                                 src={image.img}
                                                 alt={image.title}
                                                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                          />
                                          <Box
                                                 className="overlay"
                                                 sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        bgcolor: "rgba(0,0,0,0.4)",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        opacity: 0,
                                                        transition: "opacity 0.3s",
                                                 }}
                                          >
                                                 <IconButton sx={{ color: "white" }} onClick={openImageInNewTab}>
                                                        <OpenInNewIcon />
                                                 </IconButton>
                                                 <IconButton sx={{ color: "white" }} onClick={removeImage}>
                                                        <DeleteIcon />
                                                 </IconButton>
                                          </Box>
                                   </>
                            ) : (
                                   <Typography sx={{ textAlign: "center", fontSize: 13, color: "#666" }}>
                                          Dosyayı sürükleyin veya tıklayın
                                   </Typography>
                            )}
                            <input
                                   ref={fileInputRef}
                                   type="file"
                                   accept="image/jpeg"
                                   onChange={(e) => processFiles(Array.from(e.target.files))}
                                   style={{ display: "none" }}
                            />
                     </Box>

                     {/* Buton yerine box’a tıklayınca input aç */}
                     {!image && (
                            <Box
                                   component="label"
                                   sx={{ mt: 1, cursor: "pointer", color: "#0667D0", fontSize: 13 }}
                                   onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            >
                                   Yüklemek için tıklayınız
                            </Box>
                     )}
              </Box>
              // <Box
              //        ref={setNodeRef}
              //        sx={{
              //               width: 300,
              //               height: 450,
              //               border: '2px dashed #aaa',
              //               borderRadius: '8px',
              //               padding: 2,
              //               backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
              //               overflow: 'auto',
              //        }}
              // >
              //        <strong>Dropped Images:</strong>
              //        {items.map((item) => (
              //               <img
              //                      key={item.img}
              //                      src={`${item.img}?w=100&h=100&fit=crop&auto=format`}
              //                      alt={item.title}
              //                      style={{ width: '100%', marginTop: 8 }}
              //               />
              //        ))}
              // </Box>
       );
}