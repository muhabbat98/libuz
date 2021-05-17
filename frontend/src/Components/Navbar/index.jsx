import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from '../Login'
import {useUser} from '../../Hooks/User'
import {useQuery} from'@apollo/client'
import {UNREADED_ANSWERS} from '../../Graphql/Queries'
import ReaderNav from '../ReaderProfile/ReaderNav'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [user] = useUser(false)
 

  const { loading, error, data } = useQuery(UNREADED_ANSWERS, {variables:{readerId:parseInt(user.id)||(user.reader?user.reader.reader_id:null)}})
    console.log("reader Hook", user)
    console.log("error Hook", error)
    console.log("readerNav", ReaderNav)
    console.log("data unread",data)

  return (
        <>
            {loading ? (
               	<Backdrop className={classes.backdrop} open={true}  >
                	<CircularProgress color="inherit" />
              	</Backdrop>
            )
                :
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                News
                            </Typography>
                            {data?
                                <ReaderNav data={data} />
                                :
                                <Button color="inherit"><Login/></Button>
                            } 
                        </Toolbar>
                    </AppBar>
                </div>
            }
        </>
  );
}
