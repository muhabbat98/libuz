import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/client';
import {OTHER_QUESTION} from'../../../Graphql/Queries'
const useStyles = makeStyles(theme=>({
    root: {
      maxWidth: 300,
      margin:'5px'
    },
    questions_list:{
        width:"80%",
        margin:'0 auto',
        display:'flex',
        flexWrap:'wrap',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function ImgMediaCard() {
    const classes = useStyles();

    const {loading,  data} = useQuery(OTHER_QUESTION, { variables: {readerId:parseInt(localStorage.getItem('readerId'))}})
    
    return (<>
        <Typography component="h2" >Your questions successfully send and will be answeres soon..</Typography>
        <div className={classes.questions_list}>
        
            {loading? 
                    <Backdrop className={classes.backdrop} open={true}  >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    data&&data.libUnread?
                        data.libUnread.map((element, index)=>
                            <Card className={classes.root} key={index}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    image={"https://picsum.photos/300/200?random="+ index}
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        {element.library ?
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {element.library}
                                            </Typography>:<></>
                                        }
                                        {element.theme ?
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {element.theme}
                                            </Typography>:<></>
                                        }
                                        <Typography variant="body2" color="primary" component="h6">
                                            {element.questionText}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {element.createdAt}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card> 
                        )
                        :
                        <></>
            }  
        </div>
    </>);
}
