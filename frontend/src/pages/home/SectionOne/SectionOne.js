import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Home.module.css';
import {
    Box,
    Tabs,
    Tab,
    IconButton,
    Badge,
    Tooltip,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';
import {
    ExitToApp as ExitToAppIcon,
    Podcasts as PodcastsIcon,
    Person as PersonIcon,
    FormatListNumbered as FormatListNumberedIcon,
    CameraAlt as CameraAltIcon,
    Videocam as VideocamIcon,
    Insights as InsightsIcon,
    AccessAlarmSharp as AccessAlarmSharpIcon,
    FormatListBulleted as FormatListBulletedIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

import AgencyNews from './Tabs/AgencyNews';
import OnAirNews from './Tabs/OnAirNews';
import MyNews from './Tabs/MyNews';
import SortingNews from './Tabs/SortingNews';

function CustomTabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const tabIcons = [
    { icon: <ExitToAppIcon fontSize="small" />, title: 'Ajans Haberleri' },
    { icon: <PodcastsIcon fontSize="small" />, title: 'Yayındaki Haberler' },
    { icon: <PersonIcon fontSize="small" />, title: 'Benim Haberlerim' },
    { icon: <FormatListNumberedIcon fontSize="small" />, title: 'Haberleri Sıralama' },
    { icon: <CameraAltIcon fontSize="small" />, title: 'Fotoğraf Yükle' },
    { icon: <VideocamIcon fontSize="small" />, title: 'Video veya Mp3 Yükle' },
    { icon: <InsightsIcon fontSize="small" />, title: 'İstatistikler' },
    { icon: <AccessAlarmSharpIcon fontSize="small" />, title: 'Takas Haberler' },
];

const iconButtonStyle = {
    background: '#fff',
    color: '#5c6979',
    borderRadius: '50%',
    p: '8px',
    border: '1px solid #e0e0e0',
};

export default function SectionOne({ setTabValue }) {
    const [value, setValue] = useState(0);
    const [age, setAge] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setTabValue(newValue)
    }
    const handleNews = (event) => setAge(event.target.value);

    const renderTabs = () => (
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
            {tabIcons.map((tab, index) => (
                <Tab
                    key={index}
                    sx={{ minWidth: 50, width: 50, p: 0 }}
                    icon={
                        <Tooltip arrow title={tab.title}>
                            {tab.icon}
                        </Tooltip>
                    }
                    {...{ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }}
                />
            ))}
        </Tabs>
    );

    const renderControls = () => {
        if (value === 0) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <FormatListBulletedIcon sx={iconButtonStyle} />
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={4} color="warning">
                            <RefreshIcon sx={{ ...iconButtonStyle, background: '#67c23a', color: '#fff' }} />
                        </Badge>
                    </IconButton>
                </Box>
            );
        }

        if (value === 1 || value === 2) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton>
                        <FormatListBulletedIcon sx={iconButtonStyle} />
                    </IconButton>
                    <FormControl sx={{ flex: 1, width: 90 }}>
                        <Select
                            value={age}
                            onChange={handleNews}
                            size="small"
                            sx={{ height: 32, fontSize: '0.75rem' }}
                        >
                            <MenuItem value={0}>Haber</MenuItem>
                            <MenuItem value={10}>Galeri</MenuItem>
                            <MenuItem value={20}>Video</MenuItem>
                            <MenuItem value={30}>Yazar</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            );
        }
        if (value === 3) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton>
                        <FormatListBulletedIcon sx={iconButtonStyle} />
                    </IconButton>
                    
                </Box>
            );
        }

        return null;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, gap: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>{renderTabs()}</Box>
                {renderControls()}
            </Box>

            <CustomTabPanel value={value} index={0}>
                <AgencyNews />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <OnAirNews />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <MyNews />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <SortingNews />
            </CustomTabPanel>
            {[4, 5, 6, 7].map((index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    Item {index + 1}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
