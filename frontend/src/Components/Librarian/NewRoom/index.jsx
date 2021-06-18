import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import {useMutation, useQuery, useSubscription} from '@apollo/client'
import {CREATE_ANSWER, UPDATE_STATUS_QUESTION} from '../../../Graphql/Mutation'
import {SUBSCRIBE_STATUS} from '../../../Graphql/Subscription'
import {IS_PUBLIC} from '../../../Graphql/Queries'


import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  text_field:{
      display:'flex'
  },
  question_box:{
    color:'#FBEEC1',
    background:'#659DBD',
    fontSize:"1.2em"
},
}));

export default function RecipeReviewCard({room, librarian}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = React.useState({text:'', blured:false})
    // const [statusIcon, setStatus] =React.useState({})
    const [createAnswer,{data}] = useMutation(CREATE_ANSWER)
    const [UpdataQuestionStatus,{data:statusQuestion}] = useMutation(UPDATE_STATUS_QUESTION)

    const {data:subscribeStatus} = useSubscription(SUBSCRIBE_STATUS, {variables:{questionId:room.question_id}})
    const {data:isPublic, error, loading} = useQuery(IS_PUBLIC, {variables:{questionId:room.question_id}})

    let time = time=>moment(time).format('dddd, MMMM DD YYYY')

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const textBlured = (e)=>{
        e.target.value.length ? setText({text:e.target.value, blured:true}) : setText({text:'', blured:true})
    }
    const sendQuestion = ()=>{
        if(text.text.length&&room&&room.question_id&&librarian){
            createAnswer({variables:{questionId:room.question_id, librarianId:parseInt(librarian.id), answerText:text.text}})           
        }        
    }
    useEffect(()=>{
        // if(room){
        //     setStatus({variables:{questionId:room.question_id}})
        // }
    }, room)
    // if(loading){
    //     return<>loading...</>
    // }
    console.log(isPublic)
    console.log(statusQuestion)
    console.log(subscribeStatus)
  return (<>
        {            
            room && room.username ?
                <Card className={classes.root}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {room.username.slice(0,1)}
                        </Avatar>
                    }
               
                    title={room.username}
                    subheader={time(room.question_created_at)}
                    />
                  
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {room.question_text}
                    </Typography>
                    {data&&data.createAnswer ? (
                        <Box display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="flex-end">
                            <Box className={classes.question_box} marginTop={1} padding={2} borderRadius={16} maxWidth="70%" minWidth="30%">
                                {data.createAnswer.answer_text} 
                            </Box>
                            <Box component="span">{time(data.createAnswer.created_at)} </Box>
                        </Box>
                            ):null 
                    }
                    </CardContent>
                    <CardContent className={classes.text_field}>
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
                            disabled = {data&&data.createAnswer ? true : false}
                        >
                            Send
                        </Button>         
                    </CardContent>
                    <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={()=>{UpdataQuestionStatus({variables:{questionId:room.question_id}})}}>
                        {
                            isPublic&&statusQuestion===undefined&&isPublic.isPublic || subscribeStatus&&subscribeStatus.isPublicSubscript ?                            
                            <FavoriteIcon/>:
                            <FavoriteBorder/>
                        }
                    </IconButton>
                  
                    <IconButton
                        className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                        
                    </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            bu oynada
                            bir marta javob qaytarishingiz mumkin keyingi javoblar shaxsiy xonalarda bo'ladi
                        </Typography>
                       
                    </CardContent>
                    </Collapse>
                </Card>
            :
            <>Smth get wrong</>
        }
    </>);
}
