import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from "react-datepicker";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/filterSlice';
import "react-datepicker/dist/react-datepicker.css";
import styles from './Navbar.module.scss';


export default function FilterWeb({ open, onClose }) {
    const filterValues = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const filterOnSubmit = (event) => {
        event.preventDefault();
        // console.log("filterValues", filterValues)
        onClose();
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event) => {
                        filterOnSubmit(event);
                    },
                },
            }}
        >
            <DialogTitle>Filtrele</DialogTitle>
            <DialogContent>
                <DatePicker
                    wrapperClassName={styles.datePicker}
                    selectsRange={true}
                    startDate={filterValues.dateRange[0]}
                    endDate={filterValues.dateRange[1]}
                    onChange={(range) => dispatch(setFilter({ dateRange: range }))}
                    isClearable={true}
                    placeholderText="Tarih Aralığı Seçiniz"
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePickerInput}
                    required
                    name="dateRange"
                    id="dateRange"
                    style={{ width: '100%' }}
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="ajans">Ajans</InputLabel>
                    <Select
                        labelId="ajans"
                        id="ajans-select"
                        value={filterValues.ajans}
                        label="Ajans"
                        onChange={(e) => dispatch(setFilter({ ajans: e.target.value }))}
                        name="ajans"
                    >
                        <MenuItem value={10}>AA</MenuItem>
                        <MenuItem value={20}>DHA</MenuItem>
                        <MenuItem value={30}>IHA</MenuItem>
                        <MenuItem value={30}>Türkmedya</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="category">Kategori</InputLabel>
                    <Select
                        labelId="category"
                        id="category-select"
                        value={filterValues.category}
                        label="Ajans"
                        onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
                    >
                        <MenuItem value={10}>Spor</MenuItem>
                        <MenuItem value={20}>Ekonomi</MenuItem>
                        <MenuItem value={30}>Yaşam</MenuItem>
                        <MenuItem value={30}>Dünya</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="type">Tip</InputLabel>
                    <Select
                        labelId="type"
                        id="type-select"
                        value={filterValues.type}
                        label="Tip"
                        onChange={(e) => dispatch(setFilter({ type: e.target.value }))}
                    >
                        <MenuItem value={10}>Spor</MenuItem>
                        <MenuItem value={20}>Ekonomi</MenuItem>
                        <MenuItem value={30}>Yaşam</MenuItem>
                        <MenuItem value={30}>Dünya</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="importance">Önem</InputLabel>
                    <Select
                        labelId="importance"
                        id="importance-select"
                        value={filterValues.importance}
                        label="Önem"
                        onChange={(e) => dispatch(setFilter({ importance: e.target.value }))}
                    >
                        <MenuItem value={10}>Son Dakika</MenuItem>
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Kapat</Button>
                <Button type="submit">Filtrele</Button>
            </DialogActions>
        </Dialog>
    );
}