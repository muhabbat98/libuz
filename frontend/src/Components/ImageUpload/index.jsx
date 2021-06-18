import React, {useCallback} from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	  backgroundColor: theme.palette.background.paper,
	  
	},
	drag_drop:{
		background:'linear-gradient(to left,  #fff,#50B6F1)',
		padding:'2rem',
		cursor:'pointer'
	}
}));

export default function MyDropzone({sendImageId}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
    

  const onDrop = useCallback( async(acceptedFiles) => {
        let formData = new FormData();
        for(let one of acceptedFiles){
            formData.append('images', one);
        }
       console.log(acceptedFiles)
        await axios({
            method:'POST',
            url: 'http://localhost:5000/upload/image',
            data:formData,
            headers: {
                  'Content-Type': `multipart/form-data boundary=${formData._boundary}`
                }
            
             
        }).then(function (e) {
            sendImageId(e.data.image_id)
            setChecked(true)
            console.log('SUCCESS!!',e);
          })
          .catch(function () {
            console.log('FAILURE!!');
            setChecked(false)
          });


  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
 
  return (
	<List className={classes.root}>
	<ListItem >
		<ListItemText>
			<div {...getRootProps()}>
					<input {...getInputProps() } name="images" />
			{
				isDragActive ?
				<p className={classes.drag_drop}>Drop the images here ...</p> :
				<p className={classes.drag_drop}>Drag and drop image</p>
			}
			</div>
		</ListItemText>
			<ListItemIcon>
				<Checkbox
					edge="start"
					color="primary"
					checked={checked}
					tabIndex={-1}
					disableRipple
				/>
			</ListItemIcon>
		</ListItem>
	</List>
  )
}