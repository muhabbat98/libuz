import React,{useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
// import {useUser} from '../../../Hooks/User'
import {useQuery} from'@apollo/client'
// import {UNREADED_ANSWERS} from '../../Graphql/Queries'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
	
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	
	const [anchorEl, setAnchorEl] = useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const [variable, setVariable] = useState(null)
	const [isReader, setReader] = useState(false)
	// const [user] = useUser(false)
	const [unreadRooms, setUnread] = useState(null)
    // console.log("readerId",readerId)
	// useEffect(async()=>{
	// 	// console.log(data)
	// 	// setVariable(user.reader.reader_id)
	// 	// const { loading, error, data } = useQuery(UNREADED_ANSWERS, {variables:{readerId: user.reader.reader_id}})
	// 	// console.log( await data)
    //         if(user){
    //             localStorage.getItem('token')&&localStorage.getItem('usertype')==="3"?setReader(true):setReader(false)
    //         }
		
	// },[user])
	

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};


	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
    const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
  return (
    <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="primary-search-account-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
        <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={unreadRooms} color="secondary">
                <MailIcon />
            </Badge>
            </IconButton>
            <p>Messages</p>
        </MenuItem>
        <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
            </Badge>
            </IconButton>
            <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
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
}
