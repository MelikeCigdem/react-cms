import { useEffect, useState } from 'react';
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
import UploadPhoto from './Tabs/UploadPhoto';
import UploadVideo from './Tabs/UploadVideo';
import StatisticsNews from './Tabs/StatisticsNews';

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

export default function SectionOne({ tabValue, setTabValue }) {
    const [age, setAge] = useState(0);
    const [residentiai, setResidentia] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue)
    }
    const handleNews = (event) => setAge(event.target.value);
    const residentialArea = (event) => setResidentia(event);



    const renderTabs = () => (
        <Tabs value={tabValue} onChange={handleChange} aria-label="tabs" sx={{ border: "1px solid #dae1e9",height:40, minHeight:40, background:"fff", borderRadius:"4px"}}>
            {tabIcons.map((tab, index) => (
                <Tab
                    key={index}
                    sx={{height:40, minHeight:40, minWidth: 40, width: 40, p: 0 ,   border: "1px solid #dae1e9", borderBottom:"unset"}}
                    icon={
                        <Tooltip arrow title={tab.title} >
                            {tab.icon}
                        </Tooltip>
                    }
                    {...{ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }}
                />
            ))}
        </Tabs>
    );

    const renderControls = () => {
        if (tabValue === 0) {
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

        if (tabValue === 1 || tabValue === 2) {
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
        if (tabValue === 3 || tabValue === 4) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton>
                        <FormatListBulletedIcon sx={iconButtonStyle} />
                    </IconButton>

                </Box>
            );
        }
        if (tabValue === 6) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControl sx={{ flex: 1, width: 90 }}>
                        <Select
                            value={age}
                            onChange={residentialArea}
                            size="small"
                            sx={{ height: 32, fontSize: '0.75rem' }}
                        >
                            <MenuItem value={0}>Tümü</MenuItem>
                            <MenuItem value={10}>Sür Manşet Yanı</MenuItem>
                            <MenuItem value={20}>Manşet Üstü 3'lü</MenuItem>
                            <MenuItem value={30}>Manşet</MenuItem>
                            <MenuItem value={40}>Sür Manşet</MenuItem>
                        </Select>
                    </FormControl>
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
        return null;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, gap: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>{renderTabs()}</Box>
                {renderControls()}
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                <AgencyNews />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <OnAirNews setTabValue={setTabValue} />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
                <MyNews setTabValue={setTabValue}/>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={3}>
                <SortingNews/>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={4}>
                <UploadPhoto />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={5}>
                <UploadVideo />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={6}>
                <StatisticsNews setTabValue={setTabValue}/>
            </CustomTabPanel>
            {[7].map((index) => (
                <CustomTabPanel key={index} value={tabValue} index={index}>
                    Sonuç bulunamadı
                </CustomTabPanel>
            ))}
        </Box>
    );
}
