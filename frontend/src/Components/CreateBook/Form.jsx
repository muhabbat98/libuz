import React, { useRef, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FileUpload from '../FileUpload'
import ImageUpload from '../ImageUpload'
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {CREATE_RECORD} from '../../Graphql/Mutation'
import {useMutation} from'@apollo/client'
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 'calc( 50% - 16px)',
    },
  },
}));
export default function App(){
    const classes = useStyles()
    const [fileId, setFileid] = useState(null)
    const [imageId, setImage] = useState(null)
    const [open, setOpen] = React.useState(false)

	const[createRecord, {data}] = useMutation(CREATE_RECORD)

    let title = useRef()
    let creator = useRef()
	let subject =useRef()
	let description =useRef()
	let 	type =useRef()
	let  source =useRef()
	let  relation =useRef()
	let  coverage =useRef()
	let  publisher =useRef()
	let contributor =useRef()
	let  rights =useRef()
	let  date =useRef()
	let  format =useRef()
	let  identifier =useRef()
	let  language =useRef()
	let audience =useRef()
	let 	provenance =useRef()
	let 	right_holders =useRef()
	let  instructional_method =useRef()
	let  accrual_method =useRef()
	let  accrual_periodicity =useRef()
	let  accrual_policy  =useRef()

    const sendDataToParent = (index) => { 
        setFileid(index);
      };
    const sendImageId = (index) => {
        setImage(index);
      };

    const sendRecord = (e)=>{
        let bookTitle = title.current.childNodes[1].childNodes[0]

		subject = subject.current.childNodes[1].childNodes[0].value
		creator = creator.current.childNodes[1].childNodes[0].value

		description = description.current.childNodes[1].childNodes[0].value
		type = type.current.childNodes[1].childNodes[0].value 
		source = source.current.childNodes[1].childNodes[0].value
		relation = relation.current.childNodes[1].childNodes[0].value 
		coverage = coverage.current.childNodes[1].childNodes[0].value 
		publisher =	publisher.current.childNodes[1].childNodes[0].value
		contributor = contributor.current.childNodes[1].childNodes[0].value 
		rights 	= rights.current.childNodes[1].childNodes[0].value
		date = date.current.childNodes[1].childNodes[0].value
		format = format.current.childNodes[1].childNodes[0].value
		identifier =identifier.current.childNodes[1].childNodes[0].value
		language =	language.current.childNodes[1].childNodes[0].value
		audience =	audience.current.childNodes[1].childNodes[0].value
		provenance 	= provenance.current.childNodes[1].childNodes[0].value
		right_holders =	right_holders.current.childNodes[1].childNodes[0].value
		instructional_method = instructional_method.current.childNodes[1].childNodes[0].value
		accrual_method 	= accrual_method.current.childNodes[1].childNodes[0].value
		accrual_periodicity =	accrual_periodicity.current.childNodes[1].childNodes[0].value
		accrual_policy = accrual_policy.current.childNodes[1].childNodes[0].value
		// console.log(subject, description, creator, audience)
        if(bookTitle.tagName==="INPUT"&&bookTitle.value){
            createRecord({variables:{
				title:bookTitle.value, 
				fileId, 
				imageId,
				creator,
				subject,
				description,
				type, source,
				relation, 
				coverage, 
				publisher,
				contributor, 
				rights,
				date,
				format,
				identifier,
				language,audience,
				provenance,
				right_holders,
				instructional_method,
				accrual_method,
				accrual_periodicity,
				accrual_policy
			}})
        }
        

    }
    // console.log(imageId, fileId)
	// console.log(data)
  
        useEffect(()=>{
            if(data){
				console.log(data)
                setOpen(true);
            }
        },[data])
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
      };
    return <>
        <Typography align="center" color="secondary" variant="h3" component="h2" >Create Bibliographic Record </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container display = 'flex' justify='space-between' >
	  			{/* <Grid item xs={12} lg={6} > */}
				<TextField required ref={title} label="title" title = "The name is given to the resource. Typically, a Title will be a name by which the resource is formally known" />
				<TextField required ref={creator} label="creator"  />
				<TextField title="The topic of the content of the resource. Typically, a Subject will be expressed as keywords or key phrases, or classification codes that describe the topic of the resource. Recommended best practice is to select a value from a controlled vocabulary or formal classification scheme" ref={subject} label="subject and keywords" />

				<TextField  ref={description} label="description" />
				<TextField  ref={type } label="Resource Type" />
				<TextField  ref={ source } label="source" />
				<TextField  ref={ relation } label="relation" />
				<TextField  ref={ coverage } title= "The extent or scope of the content of the resource. Coverage will typically include spatial location (a place name or geographic coordinates), temporal period (a period label, date, or date range), or jurisdiction (such as a named administrative entity). Recommended best practice is to select a value from a controlled vocabulary (for example, the Thesaurus of Geographic Names). Where appropriate, named places or periods should be used in preference to numeric identifiers such as sets of coordinates or date ranges" label="coverage" />
				<TextField  ref={ publisher } label="publisher" />
				<TextField  ref={ contributor } label="contributor" />
				<TextField  ref={ rights } label="rights" />
				<TextField  ref={ date } label="date " />
				<TextField title="The physical or digital manifestation of the resource. Typically, the Format may include the media type or dimensions of the resource. Examples of dimensions include size and duration. The format may be used to determine the software, hardware, or other equipment needed to display or operate the resource"  ref={ format } label="format" />
				<TextField  ref={ identifier } title="An unambiguous reference to the resource within a given context. Recommended best practice is to identify the resource utilizing a string or number conforming to a formal identification system. Examples of formal identification systems include the Uniform Resource Identifier (URI) (including the Uniform Resource Locator (URL), the Digital Object Identifier (DOI), and the International Standard Book Number (ISBN)" label="identifier" />
				<TextField  ref={ language } label="language" />
				<TextField  ref={audience } label="audience" />
				<TextField  ref={provenance } label="provenance" />
				<TextField  ref={ right_holders } label="right holders" />
				<TextField  ref={ instructional_method } label="instructional method" />
				<TextField  ref={ accrual_method } label="accrual method" />
				<TextField  ref={ accrual_periodicity } label="accrual periodicity" />
				<TextField  ref={ accrual_policy} label="accrual policy" />
				{/* </Grid> */}
			</Grid>

            <FileUpload sendDataToParent={sendDataToParent}/>
            <ImageUpload sendImageId={sendImageId}/>
            <Button variant="contained" color="primary" onClick={sendRecord}>
                Send
            </Button>
        </form>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Your record successfully send"
            action={
            <React.Fragment>
				{data ?
					<a href ={"http://localhost:5000/" +data.createRecord.path}>
						<Button color="secondary" size="small" onClick={handleClose} >
							Open Record
						</Button>
						{console.log(data.createRecord.path)}
					</a>:
					null
				}
                
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
    </>
 }