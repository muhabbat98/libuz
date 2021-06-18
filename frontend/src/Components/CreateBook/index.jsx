import Form from './Form'
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    book_form_paper: {
        marginTop:'1rem',
        padding:'1rem'
    },
  
}));
export default function SimpleContainer() {
    const classes = useStyles();
  return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
            <Paper className= {classes.book_form_paper}> <Form/> </Paper>
        </Container>
    </React.Fragment>
  );
}
