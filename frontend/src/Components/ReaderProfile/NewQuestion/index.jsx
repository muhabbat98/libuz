import React,{useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import {LIBRARIES,THEMES} from '../../../Graphql/Queries'
import {READER_CREATE_QUESTION} from '../../../Graphql/Mutation'
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 auto',
      width: "60%",
      height: '50vh',
      padding:'3rem'
    },
  },
  button: {
    margin: 8,
    margin:'0 auto'
  },
  send_message_parent:{
      position:'relative'
  },
  bottom_send_question:{
      position:'absolute',
      bottom:0,
      left:0,
      width:'100%',
      padding:'1.3rem',
      boxSizing:'border-box',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  question_box:{
      color:'#FBEEC1',
      background:'#659DBD',
      fontSize:"1.2em"
  }
}));

export default function SimplePaper() {
    const classes = useStyles();
    const [lib, setLib] = React.useState('');
    const [theme, setTheme] = React.useState('');
    const { loading:lib_loading, error:lib_error, data:lib_data } = useQuery(LIBRARIES);
    const { loading:theme_loading, error:theme_error, data:theme_data } = useQuery(THEMES);   
    const [createQuestion,{data:question_data}] = useMutation(READER_CREATE_QUESTION);
    const [text, setText] = useState({text:'', blured:false})
   
    const handleChange = (event) => {
        setLib(event.target.value);
    };
    const themeChange = (event) => {
        setTheme(event.target.value);
    };
    
    const sendQuestion = ()=>{
        let readerId = localStorage.getItem('readerId')
        if(text.text.length&& readerId){
            createQuestion({ variables: { readerId:parseInt(readerId), questionText: text.text, theme:theme.length? theme:null, library:lib.length? lib:null } })
        }        
    }
    const textBlured = (e)=>{
        e.target.value.length ? setText({text:e.target.value, blured:true}) : setText({text:'', blured:true})
    }
   
   
  return (<>
        {lib_loading||theme_loading? <>Loading</>:
            <div className={classes.root}>
                <Paper elevation={3} className={classes.send_message_parent}> 
                    <Typography variant="h4" component="h2">
                        Your question Section
                    </Typography>
                    {question_data&&question_data.createQuestion ? (
                            <Box display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="flex-end">
                                <Box className={classes.question_box} marginTop={1} padding={2} borderRadius={16} maxWidth="70%" minWidth="30%">
                                    {question_data.createQuestion.questionText} 
                                </Box>
                                <Box component="span">{question_data.createQuestion.createdAt} </Box>
                            </Box>
                        ):null 
                    }
                    <div className={classes.bottom_send_question}>
                        <Grid container>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">Theme</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={theme}
                                        onChange={themeChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { theme_data.themes.map((theme, index)=> 
                                            <MenuItem key={index} value={theme.themeId}>{theme.themeName}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">Library</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={lib}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { lib_data.lib.map((lib, index)=> 
                                            <MenuItem key={index} value={lib.libraryId}>{lib.libraryName}</MenuItem>)
                                        }
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid  container>
                            <Grid item xs={10}>
                               <form noValidate autoComplete="off">
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
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onBlur={textBlured}
                                            />
                                        }

                               </form>
                              
        
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Send/>}
                                    onClick={sendQuestion}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
          </div>
        
        }
  </>);
}
