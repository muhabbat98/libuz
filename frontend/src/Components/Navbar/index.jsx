import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

import Login from '../Login/'
import {useUser} from '../../Hooks/User'
import {useQuery} from'@apollo/client'
import {UNREADED_ANSWERS, LIBRARIAN} from '../../Graphql/Queries'
import ReaderNav from '../ReaderProfile/ReaderNav'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
		padding:0
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		// padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	list_link:{
		color:'inherit',
		textDecoration:'none'
	},
	grow: {
		flexGrow: 1,
	  },
	}))

const ReaderElement = (user)=>{
		const classes = useStyles();
		const { loading, error, data } = useQuery(UNREADED_ANSWERS, { variables:{
				readerId:parseInt(user.id)||(user.reader?user.reader.reader_id:null)
			}})

  	return(
		  <>
		  	   {
				  loading ? (
						<Backdrop className={classes.backdrop} open={true}  >
							<CircularProgress color="inherit" />
						</Backdrop>
					)
						: 
				 data  ?
                    <ReaderNav data={data} />
                                :
                    <Button color="inherit"><Login/></Button>
                } 
		  </>
	  )
}

const LibrarianElement = (user)=>{
	const classes = useStyles();
	const { loading, data } = useQuery(LIBRARIAN, {variables:{librarianId:parseInt(user.user.id)}})
	const logOut =()=>{
		window.localStorage.removeItem('token')
		window.localStorage.removeItem('usertype')
		window.localStorage.removeItem('librarianId')
		window.location.reload();
	}
  	return(
		  <>
        	{	loading ? (
               	<Backdrop className={classes.backdrop} open={true}  >
                	<CircularProgress color="inherit" />
              	</Backdrop>
            )
                :
		  	   data  ?
                    <>
						{
							data.librarians[0].firstName + " "+ data.librarians[0].lastName
						}
						<Button color="inherit" onClick={logOut}>
							<Link to='/' className={classes.list_link} replace>
								Log out
							</Link>
						</Button>
					</>
                                :
					<Button color="inherit"><Login/></Button>
                
			}
		  </>
	  )
}
export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [user] = useUser(false)

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
				LibUz
          </Typography>
		  <div className={classes.grow} />
		  	{
				user&&parseInt(user.userType)===2?

					<LibrarianElement user={user}/>				
				:
				user&&parseInt(user.userType)===3?

					<ReaderElement user={user} />
				:
					<Button color="inherit"><Login/></Button>
			}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
			<Link to='list' className={classes.list_link} replace>
				<ListItem button >
					<ListItemIcon> <InboxIcon /> </ListItemIcon>
					<ListItemText primary="Books" />
				</ListItem>
			</Link>
			{
				user&&parseInt(user.userType)===3?

				
					<Link to = "reader" className={classes.list_link} replace>
						<ListItem button >
							<ListItemIcon> <MailIcon /> </ListItemIcon>
							<ListItemText primary="Ask a librarian" />
						</ListItem>
					</Link>
				
				:
				<></>
			}
			{
				user&&parseInt(user.userType)===2?

				
					<Link to="books" className={classes.list_link} replace = {true}>
						<ListItem button  >
							<ListItemIcon> <InboxIcon /> </ListItemIcon>
							<ListItemText primary="Create new Bibliographic Record" />
						</ListItem>
					</Link>
				
				:
				<></>
			}
			{
				user&&parseInt(user.userType)===2?

				
					<Link to="librarian" className={classes.list_link} replace={true}>
						<ListItem button >
							<ListItemIcon> <MailIcon /> </ListItemIcon>
							<ListItemText primary="Answer to readers questions" />
						</ListItem>
					</Link>

				
				:
				<></>
			}
		
        </List>
        <Divider />
        <List>
          {['About us', 'About Project', 'News'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
			
      </main>
    </div>
  );
}
