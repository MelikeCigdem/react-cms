import React, { useState } from 'react';
import './Home.module.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PersonIcon from '@mui/icons-material/Person';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsightsIcon from '@mui/icons-material/Insights';
import AccessAlarmSharpIcon from '@mui/icons-material/AccessAlarmSharp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Badge, Tooltip } from '@mui/material';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function SectionOne() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, gap: 20 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Ajans Haberleri">
                                <ExitToAppIcon fontSize="small" />
                            </Tooltip>
                        } {...a11yProps(0)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Yayındaki Haberler">
                                <PodcastsIcon fontSize="small" />
                            </Tooltip>
                        } {...a11yProps(1)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Benim Haberlerim">
                                <PersonIcon fontSize="small" />
                            </Tooltip>
                        }  {...a11yProps(2)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Haberleri Sıralama">
                                <FormatListNumberedIcon fontSize="small" />
                            </Tooltip>
                        }  {...a11yProps(3)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Fotoğraf Yükle">
                                <CameraAltIcon fontSize="small" />
                            </Tooltip>
                        }  {...a11yProps(4)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Video veya Mp3 Yükle">
                                <VideocamIcon fontSize="small" />
                            </Tooltip>
                        }  {...a11yProps(5)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="İstatistikler">
                                <InsightsIcon fontSize="small" />
                            </Tooltip>
                        }  {...a11yProps(6)} />
                        <Tab sx={{ minWidth: 50, width: 50, padding: 0 }} label={
                            <Tooltip arrow title="Takas Haberler">
                                <AccessAlarmSharpIcon fontSize="small" />
                            </Tooltip>
                        }  {...a11yProps(7)} />
                    </Tabs>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    padding: 1
                }}>
                    <IconButton>
                        <FormatListBulletedIcon fontSize="small" sx={{ background: "#fff", color: "#5c6979", borderRadius: "100%", padding: "8px", border: "1px solid #e0e0e0" }} />
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={4} color="warning">
                            <RefreshIcon fontSize="small" sx={{ background: "#67c23a", color: "#fff", borderRadius: "100%", padding: "8px" }} />
                        </Badge>
                    </IconButton>

                </Box>

            </Box>

            <CustomTabPanel value={value} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Item Four
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                Item Five
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                Item Six
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
                Item Seven
            </CustomTabPanel>
            <CustomTabPanel value={value} index={7}>
                Item Eight
            </CustomTabPanel>
        </Box>
    );
}