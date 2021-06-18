import React,{ useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import { Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { TEXT_ROOM} from '../../../Graphql/Queries'
import {ROOM_QUESTION} from '../../../Graphql/Mutation'
import {ROOM_QUESTION_SUBSCRIBE} from '../../../Graphql/Subscription'
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
 
  button: {
    margin:'0 auto'
  },
  send_message_parent:{
      position:'relative',
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: '0 auto',
        width: "60%",
        // minHeight: '50vh',
        padding:'3rem'
      },
  },
  bottom_send_question:{
      position:'absolute',
      bottom:0,
      left:'20%',
      width:'60%',
      padding:'1.3rem',
      boxSizing:'border-box',
      display:'flex',
      alignItems:'center'
  },
  formControl: {
    margin: theme.spacing(1),
  },
  question_box:{
      color:'#FBEEC1',
      background:'#659DBD',
      fontSize:"1.2em"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  form_roomQuestion:{
      display:'flex'
  }
}));

const SubscribeQuestion = (readerRooms)=>{
    const classes = useStyles();
    const [all, setAll] = useState([])
    
    const { data: newRoomQuestion } = useSubscription( ROOM_QUESTION_SUBSCRIBE,
        {variables:{roomId: parseInt(readerRooms.readerRooms.roomData.room_id)} } );

        // for create new array for questions 
    useEffect(()=>{
        if(newRoomQuestion){
            setAll([...all, newRoomQuestion])
        }
    },[newRoomQuestion,all])



        return <>
            {
                all.length ? all.map((element, index)=>
                    <div key={index}> 
                        <Box className={classes.question_box} marginTop={1} padding={2} borderRadius={16} maxWidth="70%" minWidth="30%">
                            {element.newRoomQuestion.question_text} 
                        </Box>
                        <Box component="span">{element.newRoomQuestion.question_text.question_created_at} </Box> 
                    </div>):<></>
            }
        </>
}

export default function SimplePaper(readerRooms) {
    const classes = useStyles();
    console.log(readerRooms)
    
    const {loading:room_loading, data:room_data} =useQuery(TEXT_ROOM, {variables:{roomId: readerRooms.roomData.room_id}})
    const [createQuestion] = useMutation(ROOM_QUESTION);
   
    const [text, setText] = useState({text:'', blured:false})

    
    const sendQuestion = ()=>{
        
        if(text.text.length&&readerRooms&&readerRooms.roomData.room_id){
            createQuestion({ variables: { roomId:parseInt(readerRooms.roomData.room_id), questionText: text.text } })
           
        }        
    }
    const textBlured = (e)=>{
        e.target.value.length ? setText({text:e.target.value, blured:true}) : setText({text:'', blured:true})
    }
   
   
  return (<>
        {room_loading?
            <Backdrop className={classes.backdrop} open={true}  >
				<CircularProgress color="inherit" />
			</Backdrop>:
            <div className={classes.send_message_parent}>
                
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h5" component="h2">
                                <span>LIBRARIAN: </span>
                            {readerRooms.roomData.first_name + "  "+ readerRooms.roomData.last_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} display="flex" flexDirection="column" justifyContent="space-between">
                                {
                                    room_data&&room_data.rooms[0].answers.question.theme?(
                                        <Grid item>theme:{ room_data.rooms[0].answers.question.theme}</Grid>
                                    ):null
                                }
                                 {
                                    room_data&&room_data.rooms[0].answers.question.library?(
                                        <Grid item>library:{ room_data.rooms[0].answers.question.library}</Grid>
                                    ):null
                                }
                        </Grid>
                    </Grid>
                    <div  className="room-messages">
                        {
                            room_data&&room_data.rooms? (
                                room_data.rooms.map((one, index)=>(
                                    <div  key = {index}>
                                        <Box display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="flex-start">
                                            <Box className={classes.question_box} marginTop={1} padding={2} borderRadius={16} maxWidth="70%" minWidth="30%">
                                                {one.answers.answerText} 
                                            </Box>
                                            <Box component="span">{one.answers.createdAt} </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="flex-end">
                                            <Box className={classes.question_box} marginTop={1} padding={2} borderRadius={16} maxWidth="70%" minWidth="30%">
                                                {one.answers.question.questionText} 
                                            </Box>
                                            <Box component="span">{one.answers.question.createdAt} </Box>
                                        </Box>
                                    </div>
                                ))
                            ):null
                        }
                        <Box display="flex" flexDirection="column" width="100%" justifyContent="center"     alignItems="flex-end">
                         {room_data&&room_data.notAnsweredRoom ? (
                             room_data.notAnsweredRoom.map((question, index)=>
                                    <div key={index}>
                                        <Box className={classes.question_box} marginTop={1} padding={2} borderRadius={16} maxWidth="70%" minWidth="30%">
                                            {question.questionText} 
                                        </Box>
                                        <Box component="span">{question.createdAt} </Box>
                                    </div>
                               )

                            ):null 
                        }
                        <SubscribeQuestion readerRooms={readerRooms}></SubscribeQuestion>
                      
                        </Box>

                    </div>
                    <div className={classes.bottom_send_question}>
                               
                        {(text.blured&&(!text.text.length))? 
                            <TextField
                             error
                             id="standard-error-helper-text"
                             label="Enter your question"
                             helperText="Empty entry."
                             onBlur={textBlured}
                            />
                                :
                            <TextField
                                id="standard-full-width"
                                style={{ margin: 8 }}
                                placeholder="type your question"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{shrink: true }}
                                onBlur={textBlured}
                                onChange= {e=>e.target.value.length?setText({ blured:false, text:e.target.value}):null}
                            />
                                            }
                                   
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<Send/>}
                                onClick={sendQuestion}
                             >
                                 Send
                            </Button>         
                    </div>
          </div>
        
        }
  </>);
}
