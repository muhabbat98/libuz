import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {QUESTIONS} from '../../../Graphql/Queries'
import {CREATE_ROOM} from '../../../Graphql/Mutation'
import {useQuery, useMutation} from '@apollo/client'
import {useRoom} from '../../../Hooks/NewRoom'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  pagination_button:{
    display:"flex",
    justifyContent:"center",
    padding:'15px'
  },
  pagination_page:{
    textAlign:'center',
    padding:'15px'
  }
}));

export default function FolderList(librarian) {
    const classes = useStyles();
    const [page, setPage] = useState(1) 
    const {data, loading, error} = useQuery(QUESTIONS, {variables: {page, limit:5}})
	const [createRoom,{data:roomdata}] = useMutation(CREATE_ROOM)
	const [setRoom ]= useRoom(true)

	useEffect(()=>{
		if(roomdata){
			setRoom({roomdata})
		}
	},[roomdata])
  return (
        <Container maxWidth="sm">
             <Paper>
               
                        {data?
                            data.unreaded.map((element, index)=>
                                <List width="100%" className={classes.root} key={index}>
                                    <ListItem width="100%" onClick={()=>createRoom({variables: {questionId:element.questionId, librarianId: parseInt(librarian.librarian.id)}})} button divider>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={element.questionText} secondary={element.createdAt} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                              <WorkIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                    
                                </List>
                            )
                            :
                            <></>
                        }
                        <ButtonGroup className={classes.pagination_button} disableElevation variant="contained" color="primary">
                            <Button disabled={page===1? true :false} onClick = {()=>setPage(page-1)}>
								<ArrowBackIos/>
							</Button>
                                <Typography className={classes.pagination_page} p={2}>{page}</Typography>
                            <Button disabled={ data&&data.unreaded.length < 5 ? true:false} onClick = {()=>setPage(page+1)} >
								<ArrowForwardIos/>
							</Button>
                        </ButtonGroup>
                 
             </Paper>
        </Container> 
  );
}

