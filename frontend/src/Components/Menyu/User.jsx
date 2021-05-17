import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { makeStyles} from '@material-ui/core/styles';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import Login from '../Login'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center'
    },
    profile_icon:{
        minWidth:'30px',
        minHeight:'30px',
        fill:theme.palette.background.paper
    },
    profile_button:{
        padding:0,
        width:'100%',
        height:'100%'

    },
  }));
  

function Nav() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
      <>
            <Button aria-controls="fade-menu" className={classes.profile_button} aria-haspopup="true" onClick={handleClick}>
                <AccountCircleTwoToneIcon className={classes.profile_icon}/>
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                className="profile-menyu"
            >
                <MenuItem onClick={handleClose}><Login/></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
      </>  
  );
}

export default Nav;