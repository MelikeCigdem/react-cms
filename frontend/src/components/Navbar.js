// import styles from './Navbar.module.css';
// import AppBar  from '@mui/material/AppBar';
// import Box  from '@mui/material/Box';
// import Typography  from '@mui/material/Typography';
// import Toolbar  from '@mui/material/Toolbar';
// import Button  from '@mui/material/Button';
// import { Link } from 'react-router-dom';

// export default function Navbar(){
//     return(
//         <Box sx={{flexGrow:1}}>
//             <AppBar position='static' color='primary'>
//                 <Toolbar>
//                     <Typography variant='h6' component='div' sx={{flexGrow:1}}>
//                         <Link component='button' to='/' className={styles.link}>Harcama Takip App</Link>
//                     </Typography>

//                         <Button variant='outlined' color='inherit'>
//                             <Link component='button' className={styles.link} to='/login'>GİRİŞ</Link>
//                         </Button>

//                         <Typography variant='caption'>
//                            Merhaba Melike ÇİĞDEM
//                         </Typography>


//                 </Toolbar>
//             </AppBar>
//         </Box>
//     )
// }
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from "../assets/logo.svg";
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShareIcon from '@mui/icons-material/Share';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useSelectedBrand } from "../context/SelectedBrandContext";
import brandColors from '../constants/brandColors';
import styles from './Navbar.module.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [auth, setAuth] = React.useState(true);
    const { selectedBrand, setSelectedBrand } = useSelectedBrand();
    const [trSelectedBrand, setTRSelectedBrand]  = React.useState("Akşam")
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

     const currentColor = brandColors[selectedBrand] || '#1976d2';

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (brand, trBrand) => {
        setAnchorEl(null);
        handleMobileMenuClose();
        if(brand) setSelectedBrand(brand);
        if(trBrand) setTRSelectedBrand(trBrand);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleMenuClose("aksam", "Akşam")}>  <span className={styles.aksam}> </span>Akşam</MenuItem>
            <MenuItem onClick={() => handleMenuClose("star", "Star")}>  <span className={styles.star}> </span>Star</MenuItem>
            <MenuItem onClick={() => handleMenuClose("gunes", "Güneş")}>  <span className={styles.gunes}> </span>Güneş</MenuItem>
            <MenuItem onClick={() => handleMenuClose("gazete", "Gazete")}>  <span className={styles.gazete}> </span>Gazete</MenuItem>
            <MenuItem onClick={() => handleMenuClose("alem", "Alem")}>  <span className={styles.alem}> </span>Alem</MenuItem>
            <MenuItem onClick={() => handleMenuClose("platin", "Platin")}>  <span className={styles.platin}> </span>Platin</MenuItem>
            <MenuItem onClick={() => handleMenuClose("qcore", "Qcore")}>  <span className={styles.qcore}> </span>Qcore</MenuItem>
            <MenuItem onClick={() => handleMenuClose("tmsavunma", "Tmsavunma")}>  <span className={styles.tmsavunma}> </span>Tmsavunma</MenuItem>
            <MenuItem onClick={() => handleMenuClose("yirmidorthaber", "Yirmidörthaber")}>  <span className={styles.yirmidorthaber}> </span>Yirmidorthaber</MenuItem>
            <MenuItem onClick={handleMenuClose}>Çıkış</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: currentColor }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <img
                        style={{ width: 36, height: 48 }}
                        srcSet={`${Logo}`}
                        src={`${Logo}`}
                        alt="Turkmedya"
                        loading="lazy"
                    />
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ width: "400px" }}
                            placeholder="Yayınlanmış Haberleri Ara"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <FilterListIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <TrendingUpIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <InsertPhotoIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <VisibilityIcon />
                            <Typography component="p" sx={{ ml: 1 }}>
                                Work And Travel
                            </Typography>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <AddIcon />
                            <Typography component="p" sx={{ ml: 1 }}>
                                Yeni Sekme
                            </Typography>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <ContactSupportIcon />
                            <Typography component="p" sx={{ ml: 1 }}>
                                Destek
                            </Typography>
                        </IconButton>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                                <Typography component="p" sx={{ ml: 1 }}>
                                    {trSelectedBrand}
                                </Typography>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>


                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
