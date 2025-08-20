import { useRef, useState } from "react";
import { useForm, Controller, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
       TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Grid, FormControlLabel, Switch, FormGroup, Chip, Alert, Snackbar, Typography, Card,
       CardContent,
       IconButton,
       InputBase,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DropZone from "../DndKit/DndKit";
import AddIcon from "@mui/icons-material/Add";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';



// Validation schema
const schema = yup.object({
       // username: yup.string().required("Kullanıcı adı zorunlu"),
       // email: yup.string().email("Geçerli email girin").required("Email zorunlu"),
       // password: yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunlu"),
       // role: yup.string().required("Rol seçmek zorunlu")
});


export default function MUIForm() {
       const [open, setOpen] = useState(false);
       const [showAlert, setShowAlert] = useState(false);
       const [items, setItems] = useState([]);
       const [inputValue, setInputValue] = useState("");
       const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
              resolver: yupResolver(schema),
              defaultValues: {
                     // Switch'ler
                     shareSwitch: false,
                     titleSwitch: false,
                     dateSwitch: false,
                     notification: false,
                     urlSwitch: false,
                     relatedSwitch: false,
                     updateDate: false,
                     // Conditional alanlar
                     publishDate: null,
                     shareDate: null,
                     shareTitle: "",
                     alternateTitle: "",
                     title: "",
                     spot: "",
                     alternateSpot: "",
                     seoTitle: "",
                     videoSource: "",
                     audio: "",
                     urlChange: "",
                     urlLink: "",

                     // Select ve diğer alanlar  
                     share: null,
                     type: "",
                     category: "",
                     property: "",
                     status: "",
                     image2Source: "",
                     image1Source: "",
                     contentList: []
              }
       });
       const shareValue = watch("shareSwitch");
       const titleValue = watch("titleSwitch");
       const dateValue = watch("dateSwitch");
       const relatedValue = watch("relatedSwitch");
       const urlValue = watch("urlSwitch")
       const spotValue = watch("spot");
       const contentListValue = watch("contentList");


       const onSubmit = (data) => {
              console.log("Form Data:", data);
       };
       const onError = (errors) => {
              console.log("Validasyon hataları:", errors);
       };
       // Bildirim switch modalı
       const handleClickOpen = () => {
              setOpen(true);
       };

       const handleClose = () => {
              setValue("notification", false);
              setOpen(false);
       };

       const handleConfirm = () => {
              setValue("notification", true);
              setOpen(false);
       };
       const generatetitle = () => {
              console.log("v", spotValue.length)
              if (spotValue.length > 0) {
                     setValue("title", "başlık üretimi")
              } else {
                     setShowAlert(true);
              }
       }
       const handleCloseAlert = (event, reason) => {
              if (reason === "clickaway") return;
              setShowAlert(false);
       };

     
       return (

              <Box
                     component="form"
                     onSubmit={handleSubmit(onSubmit, onError)}
                     sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 2 }}
              >
                     <Snackbar
                            open={showAlert}
                            autoHideDuration={3000}
                            onClose={handleCloseAlert}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                     >
                            <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: "100%" }}>
                                   Spot bilgisi olmadan başlık oluşturulamıyor.
                            </Alert>
                     </Snackbar>
                     <FormGroup row sx={{ mb: 1, display: "flex", justifyContent: "end" }}>
                            <Chip label="Başlık Üret" color="primary" size="small" sx={{ mr: 2, mt: 1, cursor: "pointer" }} onClick={generatetitle} />
                            <Controller
                                   name="shareSwitch"
                                   control={control}
                                   defaultValue={false}
                                   render={({ field }) => (
                                          <FormControlLabel
                                                 control={<Switch {...field} checked={field.value} />}
                                                 label="Paylaş"
                                          />
                                   )}
                            />
                            <Controller
                                   name="titleSwitch"
                                   control={control}
                                   defaultValue={false}
                                   render={({ field }) => (
                                          <FormControlLabel
                                                 control={<Switch {...field} checked={field.value} />}
                                                 label="Başlık"
                                          />
                                   )}
                            />
                            <Controller
                                   name="dateSwitch"
                                   control={control}
                                   defaultValue={false}
                                   render={({ field }) => (
                                          <FormControlLabel
                                                 control={<Switch {...field} checked={field.value} />}
                                                 label="Tarih"
                                          />
                                   )}
                            />
                            <Controller
                                   name="notification"
                                   control={control}
                                   defaultValue={false}
                                   render={({ field }) => (
                                          <FormControlLabel
                                                 control={<Switch checked={field.value} onChange={handleClickOpen} />}
                                                 label="Bildirim"
                                          />
                                   )}
                            />
                            <Dialog
                                   open={open}
                                   onClose={handleClose}
                                   aria-labelledby="alert-dialog-title"
                                   aria-describedby="alert-dialog-description"
                            >
                                   <DialogTitle id="alert-dialog-title">
                                          <Box display="flex" alignItems="center" gap={1}>
                                                 <WarningAmberIcon color="warning" fontSize="large" />
                                                 <span>Bildirim Gönderilecek</span>
                                          </Box>
                                   </DialogTitle>

                                   <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                                 Bu işlemi gerçekleştirmek istediğinize emin misiniz?
                                          </DialogContentText>
                                   </DialogContent>

                                   <DialogActions sx={{ px: 3, pb: 2 }}>
                                          <Button
                                                 onClick={handleClose}
                                                 startIcon={<CancelIcon />}
                                                 variant="outlined"
                                                 color="error"
                                          >
                                                 Hayır
                                          </Button>
                                          <Button
                                                 onClick={handleConfirm}
                                                 startIcon={<CheckCircleIcon />}
                                                 variant="contained"
                                                 color="success"
                                                 autoFocus
                                          >
                                                 Evet
                                          </Button>
                                   </DialogActions>
                            </Dialog>

                            <Controller
                                   name="urlSwitch"
                                   control={control}
                                   defaultValue={false}
                                   render={({ field }) => (
                                          <FormControlLabel
                                                 control={<Switch {...field} checked={field.value} />}
                                                 label="Url"
                                          />
                                   )}
                            />
                            <Controller
                                   name="relatedSwitch"
                                   control={control}
                                   defaultValue={false}
                                   render={({ field }) => (
                                          <FormControlLabel
                                                 control={<Switch {...field} checked={field.value} />}
                                                 label="İlgili"
                                          />
                                   )}
                            />
                     </FormGroup>
                     {shareValue &&
                            <Box>
                                   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                          <Grid size={6}>
                                                 <Controller
                                                        name="share"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <FormControl size="small" fullWidth error={!!errors.share}>
                                                                      <InputLabel>Sosyal Medya</InputLabel>
                                                                      <Select
                                                                             {...field}
                                                                             label="Sosyal Medya"
                                                                             value={field.value || ""}
                                                                             sx={{
                                                                                    textAlign: "left",
                                                                                    "& .MuiSelect-select": {
                                                                                           textAlign: "left"
                                                                                    }
                                                                             }}

                                                                      >
                                                                             <MenuItem value="haber">Twitter-Life</MenuItem>
                                                                             <MenuItem value="galeri">Twitter-AksamSpor</MenuItem>
                                                                             <MenuItem value="video">Twitter-Mor Papatya</MenuItem>
                                                                             <MenuItem value="yazar">Twitter-Akşam Tv</MenuItem>
                                                                             <MenuItem value="tumu">Twitter-aksamcumartesi</MenuItem>
                                                                      </Select>


                                                                      {errors.share && (
                                                                             <p style={{ color: "red", fontSize: 12 }}>{errors.share.message}</p>
                                                                      )}
                                                               </FormControl>
                                                        )}
                                                 />
                                          </Grid>
                                          <Grid size={6}>
                                                 <Controller
                                                        name="shareDate"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DateTimePicker
                                                                             label="Paylaşım Tarihi & Saati"
                                                                             value={field.value}
                                                                             onChange={(newValue) => field.onChange(newValue)}
                                                                             slotProps={{
                                                                                    textField: {
                                                                                           error: !!errors.shareDate,
                                                                                           helperText: errors.shareDate?.message,
                                                                                           fullWidth: true,
                                                                                           size: "small",
                                                                                           sx: {
                                                                                                  "& .MuiInputBase-root": {
                                                                                                         minHeight: 36,
                                                                                                  },
                                                                                                  "& .MuiInputBase-input": {
                                                                                                         padding: "6px 8px",
                                                                                                         fontSize: 16,
                                                                                                  },
                                                                                                  "& .MuiFormLabel-root": {
                                                                                                         fontSize: 16,
                                                                                                  }
                                                                                           }
                                                                                    }
                                                                             }}
                                                                      />
                                                               </LocalizationProvider>
                                                        )}
                                                 />
                                          </Grid>
                                   </Grid>
                                   <Controller
                                          name="shareTitle"
                                          control={control}
                                          render={({ field }) => (
                                                 <TextField
                                                        {...field}
                                                        label="Sosyal Medya Başlık"
                                                        error={!!errors.shareTitle}
                                                        helperText={errors.shareTitle?.message}
                                                        fullWidth
                                                        size="small"
                                                        sx={{
                                                               marginTop: "12px",
                                                        }}
                                                 />
                                          )}
                                   />
                            </Box>
                     }
                     {dateValue &&
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                   <Grid size={9}>
                                          <Controller
                                                 name="publishDate"
                                                 control={control}
                                                 defaultValue={null}
                                                 render={({ field }) => (
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                               <DateTimePicker
                                                                      label="İleri tarihli yayın"
                                                                      value={field.value}
                                                                      onChange={(newValue) => field.onChange(newValue)}
                                                                      slotProps={{
                                                                             textField: {
                                                                                    error: !!errors.publishDate,
                                                                                    helperText: errors.publishDate?.message,
                                                                                    fullWidth: true,
                                                                                    size: "small",
                                                                                    sx: {
                                                                                           "& .MuiInputBase-root": {
                                                                                                  minHeight: 36,
                                                                                           },
                                                                                           "& .MuiInputBase-input": {
                                                                                                  padding: "6px 8px",
                                                                                                  fontSize: 16,
                                                                                           },
                                                                                           "& .MuiFormLabel-root": {
                                                                                                  fontSize: 16,
                                                                                           }
                                                                                    }
                                                                             }
                                                                      }}
                                                               />
                                                        </LocalizationProvider>
                                                 )}
                                          />
                                   </Grid>
                                   <Grid size={3}>
                                          <Controller
                                                 name="updateDate"
                                                 control={control}
                                                 defaultValue={false}
                                                 render={({ field }) => (
                                                        <FormControlLabel
                                                               control={<Switch {...field} checked={field.value} />}
                                                               label="Tarihi Güncelle"
                                                        />
                                                 )}
                                          />
                                   </Grid>
                            </Grid>
                     }

                     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid size={3}>
                                   <Controller
                                          name="type"
                                          control={control}
                                          render={({ field }) => (
                                                 <FormControl size="small" fullWidth error={!!errors.type}>
                                                        <InputLabel>Tip</InputLabel>
                                                        <Select
                                                               {...field}
                                                               label="Tip"
                                                               sx={{
                                                                      textAlign: "left",
                                                                      "& .MuiSelect-select": {
                                                                             textAlign: "left"
                                                                      }
                                                               }}
                                                        >
                                                               <MenuItem value="haber">Haber</MenuItem>
                                                               <MenuItem value="galeri">Galeri</MenuItem>
                                                               <MenuItem value="video">Video</MenuItem>
                                                               <MenuItem value="yazar">Yazar</MenuItem>
                                                               <MenuItem value="tumu">Tümü</MenuItem>
                                                        </Select>


                                                        {errors.type && (
                                                               <p style={{ color: "red", fontSize: 12 }}>{errors.type.message}</p>
                                                        )}
                                                 </FormControl>
                                          )}
                                   />
                            </Grid>
                            <Grid size={3}>
                                   <Controller
                                          name="category"
                                          control={control}
                                          render={({ field }) => (
                                                 <FormControl size="small" fullWidth error={!!errors.category}>
                                                        <InputLabel>Kategori</InputLabel>
                                                        <Select {...field} label="Kategori"
                                                               sx={{
                                                                      textAlign: "left",
                                                                      "& .MuiSelect-select": {
                                                                             textAlign: "left"
                                                                      }
                                                               }}>
                                                               <MenuItem value="admin">Güncel</MenuItem>
                                                               <MenuItem value="editor">Siyaset</MenuItem>
                                                               <MenuItem value="viewer">Ekonomi</MenuItem>
                                                        </Select>
                                                        {errors.category && (
                                                               <p style={{ color: "red", fontSize: 12 }}>{errors.category.message}</p>
                                                        )}
                                                 </FormControl>
                                          )}
                                   />
                            </Grid>
                            <Grid size={3}>
                                   <Controller
                                          name="property"
                                          control={control}
                                          render={({ field }) => (
                                                 <FormControl size="small" fullWidth error={!!errors.property}>
                                                        <InputLabel>Özellikler</InputLabel>
                                                        <Select {...field} label="Özellikler"
                                                               sx={{
                                                                      textAlign: "left",
                                                                      "& .MuiSelect-select": {
                                                                             textAlign: "left"
                                                                      }
                                                               }}>
                                                               <MenuItem value="admin">Son Dakika</MenuItem>
                                                               <MenuItem value="editor">Seo</MenuItem>
                                                               <MenuItem value="viewer">Haber Takas</MenuItem>
                                                        </Select>
                                                        {errors.property && (
                                                               <p style={{ color: "red", fontSize: 12 }}>{errors.property.message}</p>
                                                        )}
                                                 </FormControl>
                                          )}
                                   />
                            </Grid>
                            <Grid size={3}>
                                   <Controller
                                          name="status"
                                          control={control}
                                          render={({ field }) => (
                                                 <FormControl size="small" fullWidth error={!!errors.status}>
                                                        <InputLabel>Durum</InputLabel>
                                                        <Select {...field} label="Durum"
                                                               sx={{
                                                                      textAlign: "left",
                                                                      "& .MuiSelect-select": {
                                                                             textAlign: "left"
                                                                      }
                                                               }}>
                                                               <MenuItem value="admin">Yayında</MenuItem>
                                                               <MenuItem value="editor">Pasif</MenuItem>
                                                               <MenuItem value="viewer">Gizli</MenuItem>
                                                        </Select>
                                                        {errors.status && (
                                                               <p style={{ color: "red", fontSize: 12 }}>{errors.status.message}</p>
                                                        )}
                                                 </FormControl>
                                          )}
                                   />
                            </Grid>
                     </Grid>
                     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid size={6}>
                                   <Controller
                                          name="title"
                                          control={control}
                                          render={({ field }) => (
                                                 <TextField
                                                        {...field}
                                                        label="Başlık"
                                                        multiline
                                                        minRows={2}
                                                        fullWidth
                                                        error={!!errors.title}
                                                        helperText={errors.title?.message}
                                                 />
                                          )}
                                   />
                            </Grid>
                            <Grid size={6}>
                                   <Controller
                                          name="alternateTitle"
                                          control={control}
                                          render={({ field }) => (
                                                 <TextField
                                                        {...field}
                                                        label="Alternatif Başlık"
                                                        multiline
                                                        minRows={2}
                                                        fullWidth
                                                        error={!!errors.alternateTitle}
                                                        helperText={errors.alternateTitle?.message}
                                                 />
                                          )}
                                   />
                            </Grid>
                     </Grid>
                     <Controller
                            name="spot"
                            control={control}
                            render={({ field }) => (
                                   <TextField
                                          {...field}
                                          label="Spot"
                                          multiline
                                          minRows={2}
                                          fullWidth
                                          error={!!errors.spot}
                                          helperText={errors.spot?.message}
                                   />
                            )}
                     />

                     {titleValue &&
                            <>
                                   <Controller
                                          name="alternateSpot"
                                          control={control}
                                          render={({ field }) => (
                                                 <TextField
                                                        {...field}
                                                        label="Seo Spot"
                                                        error={!!errors.alternateSpot}
                                                        helperText={errors.alternateSpot?.message}
                                                        fullWidth
                                                        size="small"
                                                 />
                                          )}
                                   />
                                   <Controller
                                          name="seoTitle"
                                          control={control}
                                          render={({ field }) => (
                                                 <TextField
                                                        {...field}
                                                        label="Seo Başlık"
                                                        error={!!errors.seoTitle}
                                                        helperText={errors.seoTitle?.message}
                                                        fullWidth
                                                        size="small"
                                                 />
                                          )}
                                   />
                            </>
                     }
                     {relatedValue &&
                            <>
                                   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                          <Grid size={6}>
                                                 <Controller
                                                        name="videoSource"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <TextField
                                                                      {...field}
                                                                      label="Video url"
                                                                      error={!!errors.videoSource}
                                                                      helperText={errors.videoSource?.message}
                                                                      fullWidth
                                                                      size="small"
                                                               />
                                                        )}
                                                 />
                                          </Grid>
                                          <Grid size={6}>
                                                 <Controller
                                                        name="audio"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <TextField
                                                                      {...field}
                                                                      label="Mp3 url"
                                                                      error={!!errors.audio}
                                                                      helperText={errors.audio?.message}
                                                                      fullWidth
                                                                      size="small"
                                                               />
                                                        )}
                                                 />
                                          </Grid>
                                   </Grid>
                                   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                          <Grid size={6}>
                                                 <Controller
                                                        name="relatedGallery"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <TextField
                                                                      {...field}
                                                                      label="Galeri Id"
                                                                      error={!!errors.relatedGallery}
                                                                      helperText={errors.relatedGallery?.message}
                                                                      fullWidth
                                                                      size="small"
                                                               />
                                                        )}
                                                 />
                                          </Grid>
                                          <Grid size={6}>
                                                 <Controller
                                                        name="relatedVideo"
                                                        control={control}
                                                        render={({ field }) => (
                                                               <TextField
                                                                      {...field}
                                                                      label="Video Id"
                                                                      error={!!errors.relatedVideo}
                                                                      helperText={errors.relatedVideo?.message}
                                                                      fullWidth
                                                                      size="small"
                                                               />
                                                        )}
                                                 />
                                          </Grid>
                                   </Grid>

                            </>
                     }
                     {urlValue &&
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                   <Grid size={6}>
                                          <Controller
                                                 name="urlChange"
                                                 control={control}
                                                 render={({ field }) => (
                                                        <TextField
                                                               {...field}
                                                               label="Url Değiştirme"
                                                               error={!!errors.urlChange}
                                                               helperText={errors.urlChange?.message}
                                                               fullWidth
                                                               size="small"
                                                        />
                                                 )}
                                          />
                                   </Grid>
                                   <Grid size={6}>
                                          <Controller
                                                 name="urlLink"
                                                 control={control}
                                                 render={({ field }) => (
                                                        <TextField
                                                               {...field}
                                                               label="Doğrudan Link"
                                                               error={!!errors.urlLink}
                                                               helperText={errors.urlLink?.message}
                                                               fullWidth
                                                               size="small"
                                                        />
                                                 )}
                                          />
                                   </Grid>
                            </Grid>
                     }

                     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            {/* Dışa Bırakılabilir Alan image2Source */}
                            <Grid size={6}>
                                   <DropZone id="detay"
                                          items={watch("image2Source") || []}
                                          setValue={setValue}
                                          title={"Detay fotoğrafını sürükle bırak"}
                                          fieldName="image2Source"
                                   />
                            </Grid>
                            <Grid size={6}>
                                   <DropZone id="manset"
                                          items={watch("image2Source") || []}
                                          setValue={setValue}
                                          title={"Manşet fotoğrafını sürükle bırak"}
                                          fieldName="image1Source"
                                   />
                            </Grid>
                     </Grid>

                     <Card variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent>
                                   {/* Droggable olacak yer */}
                                   {/* Üst kısım: contentList'ten gelen div listesi  */}
                                   <Box sx={{ mb: 2, minHeight: "6rem", bgcolor: "#f7fafd" }}>
                                          {contentListValue?.map((item, index) => (
                                                 <Box
                                                        key={index}
                                                        sx={{
                                                               display: "flex",
                                                               justifyContent: "space-between",
                                                               alignItems: "center",
                                                               mb: 1,
                                                               bgcolor: "#f7fafd",
                                                               borderRadius: 1,
                                                               wordBreak: "break-word",
                                                               transition: "all 0.2s ease",
                                                               "&:hover": {
                                                                      bgcolor: "#f0f0f0", 
                                                                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)", 
                                                                      "& .item-actions": {
                                                                             opacity: 1,
                                                                             visibility: "visible",
                                                                      },
                                                               },
                                                        }}
                                                 >
                                                        {/* Düzenlenebilir input */}
                                                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
                                                               <DragIndicatorIcon
                                                                      fontSize="small"
                                                                      color="primary"
                                                                      style={{ marginTop: "6px" }}
                                                               />
                                                               <InputBase
                                                                      value={item}
                                                                      onChange={(e) => {
                                                                             const newItems = [...contentListValue];
                                                                             newItems[index] = e.target.value;
                                                                             setValue("contentList", newItems);
                                                                      }}
                                                                      sx={{ flex: 1, mr: 1 }}
                                                               />
                                                        </Box>

                                                        {/* Hover'da çıkan butonlar */}
                                                        <Box
                                                               className="item-actions"
                                                               sx={{
                                                                      display: "flex",
                                                                      gap: 0.5,
                                                                      opacity: 0,
                                                                      visibility: "hidden",
                                                                      transition: "opacity 0.2s ease",
                                                               }}
                                                        >
                                                               <IconButton
                                                                      size="small"
                                                                      color="primary"
                                                                      onClick={() => {
                                                                             const newItems = [...contentListValue];
                                                                             newItems.splice(index, 0, "");
                                                                             setValue("contentList", newItems);
                                                                      }}
                                                               >
                                                                      <AddIcon fontSize="small" />
                                                               </IconButton>

                                                               <IconButton
                                                                      size="small"
                                                                      style={{ color: "red" }}
                                                                      onClick={() => {
                                                                             const newItems = contentListValue.filter(
                                                                                    (_, i) => i !== index
                                                                             );
                                                                             setValue("contentList", newItems);
                                                                      }}
                                                               >
                                                                      <CloseIcon fontSize="small" />
                                                               </IconButton>
                                                        </Box>
                                                 </Box>
                                          ))}
                                   </Box>

                                   <Box sx={{ borderBottom: "1px solid #cfd8dc", my: 2 }} />

                                   {/* Alt kısım: yeni item ekleme */}
                                   <Box
                                          sx={{
                                                 display: "flex",
                                                 alignItems: "center",
                                                 bgcolor: "#fafafa",
                                                 borderRadius: 1,
                                                 px: 1,
                                                 py: 0.5,
                                          }}
                                   >
                                          {/* Artı butonu */}
                                          <IconButton
                                                 size="small"
                                                 sx={{ color: "primary.main" }}
                                                 onClick={() => {
                                                        if (inputValue.trim() !== "") {
                                                               setValue("contentList", [...contentListValue, inputValue]);
                                                               setInputValue("");
                                                        }
                                                 }}
                                          >
                                                 <AddIcon />
                                          </IconButton>

                                          {/* Input alanı */}
                                          <InputBase
                                                 placeholder="İçerik girin"
                                                 value={inputValue}
                                                 onChange={(e) => setInputValue(e.target.value)}
                                                 sx={{ flex: 1, ml: 1, fontStyle: "italic", color: "#424242" }}
                                          />

                                          {/* Video ikonu */}
                                          <IconButton size="small" color="primary">
                                                 <OndemandVideoIcon />
                                          </IconButton>
                                   </Box>

                                   {/* Karakter sayısı */}
                                   <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 2 }}>
                                          <Typography variant="body2" color="text.secondary">
                                                 Toplam karakter sayısı: {contentListValue?.join("").length || 0}
                                          </Typography>
                                   </Box>
                            </CardContent>
                     </Card>



                     {/* Submit */}
                     <Button type="submit" variant="contained" color="primary">
                            Gönder
                     </Button>
              </Box>
       );
}

