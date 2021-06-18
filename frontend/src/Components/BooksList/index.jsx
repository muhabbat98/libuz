
import {BOOKS} from '../../Graphql/Queries'
import {DOWNLOADED} from '../../Graphql/Mutation'
import {SUBSCRIBE_DOWNLOAD} from '../../Graphql/Subscription'


import {useQuery, useMutation, useSubscription} from '@apollo/client'
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import GetApp from '@material-ui/icons/GetApp';
import Close from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Cover from '../../images/defaultbook.jpg'
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
const useStyles = makeStyles((theme) => ({
    container:{
        width:'1000px',
        marginRight:'auto',
        marginLeft:'auto'
    },
    root: {
        boxSizing:'border-box',
        width:'100%',
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent:'space-between',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '240px',
        height:'310px',
        objectFit:'cover'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        position:'relative'
      },
      close_button:{
          position:'absolute',
          right:'0.5rem',
          top:'0.5rem'
      },
    //   root: {
    //     width: '100%',
    //     backgroundColor: theme.palette.background.paper,
    //   },
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

export default function MediaControlCard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = useState(1) 
    const {data, loading, error} =useQuery(BOOKS,{variables: {page, limit:5}})
    const [downloaded] = useMutation(DOWNLOADED)
    const {data:downloadCount} = useSubscription(SUBSCRIBE_DOWNLOAD)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
  
//    console.log((data&&data.records))



  return (
        <Grid className={classes.container} container>
            {
                !(data&&data.records) ?
                   <></>
                :
                data.records.map((element, index)=>
                    <List width="100%" className={classes.root} key={index}>
                        <ListItem width="100%">
                            <Card className={classes.root}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                            {element.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {"Author: " + element.creator ||''}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {"Date: " + element.date ||''}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {"Identifier: " + element.identifier ||''}
                                        </Typography>
                                        {/* <Typography variant="subtitle1" color="textSecondary">
                                            {"Description: " + element.description ||''}
                                        </Typography> */}
                                    </CardContent>
                                    <div className={classes.controls}>
                                        <Typography component="p">
                                        
                                            {downloadCount&&element.fileId&&downloadCount.subscribeDownload.file_id===element.fileId.fileId ?
                                                downloadCount.subscribeDownload.count
                                                :
                                                element.countOfDownloads || ''
                                            }
                                        </Typography>
                                        { element.fileId ?
                                        <a download href={"http://localhost:5000/"+ element.fileId.filename} target="_blank" >
                                            <IconButton 
                                            onClick={()=>{downloaded({variables:{fileId:element.fileId.fileId}})}}
                                            tabIndex={-1} >
                                                <GetApp className={classes.playIcon}/>
                                            </IconButton>
                                        </a>:
                                        "doesn't have full text"
                                        }
                                        <IconButton  onClick={handleOpen}>
                                            <Visibility className={classes.playIcon}/>
                                        </IconButton>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={open}
                                            onClose={handleClose}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                            timeout: 500,
                                            }}
                                        >
                                            <Fade in={open}>
                                                <div className={classes.paper}>
                                                    <IconButton onClick={handleClose}className={classes.close_button}>
                                                        <Close/>
                                                    </IconButton>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            {"Description: " + element.description ||''}
                                                        </Typography> 
                                                </div>
                                            </Fade>
                                        </Modal>
                                    
                                    </div>
                                </div>
                            {element.imageId?
                                <CardMedia
                                    className='book-cover-image'
                                    image={"http://localhost:5000/"+ element.imageId.filename}
                                    title={element.imageId.filename}
                                />:
                                <CardMedia
                                    className={classes.cover}
                                    image={Cover}
                                    title="unaviable cover"
                                />
                            }
                            </Card>
                        </ListItem>
                    
                    </List> )
                }   
                   <ButtonGroup className={classes.pagination_button} disableElevation variant="contained" color="primary">
                            <Button disabled={page===1? true :false} onClick = {()=>setPage(page-1)}>
								<ArrowBackIos/>
							</Button>
                                <Typography className={classes.pagination_page} p={2}>{page}</Typography>
                            <Button disabled={ data&&data.records.length < 5 ? true:false} onClick = {()=>setPage(page+1)} >
								<ArrowForwardIos/>
							</Button>
                    </ButtonGroup>          
            </Grid>
        )
    }     
