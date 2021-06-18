import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Send from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
import ReaderQuestion from '../NewQuestion'
import{ READER_ROOMS} from '../../../Graphql/Queries'
import { useQuery } from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReaderRoom from '../ReaderRooms'
import OtherQuestion from'../OtherQuestion'
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
		role="tabpanel"
		hidden={value !== index}
		id={`scrollable-force-tabpanel-${index}`}
		aria-labelledby={`scrollable-force-tab-${index}`}
		{...other}
		>
		{value === index && (
			<Box p={3}>
				<>{children}</>
			</Box>
		)}
		</div>
	);
	}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
	padding:0
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ScrollableTabsButtonForce() {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [index, setIndex] = useState(-1)
	const {loading,  data} = useQuery(READER_ROOMS, { variables: {readerId:parseInt(localStorage.getItem("readerId"))}})

	const handleChange = (event, newValue) => {
		setValue(newValue);
	}
	useEffect(()=>{
		data ? setIndex(data.readerRooms.length - 1) :setIndex(-1)
		// console.log("reader room data",data)
	},[data])
  return (
	<>
		{ loading ? 
			<Backdrop className={classes.backdrop} open={true}  >
				<CircularProgress color="inherit" />
			</Backdrop>
			:
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						variant="scrollable"
						scrollButtons="on"
						indicatorColor="primary"
						textColor="primary"
						aria-label="scrollable force tabs example"
					>
						{data&&data.readerRooms? 
							data.readerRooms.map((room, index)=> 
							{	
								return(<Tab label={"room "+(index)} icon={<PersonPinIcon />}{...a11yProps(index)} />)}
							)
						:<></>}
						<Tab label="Other Question" icon={<HelpIcon />} {...a11yProps(index+1)} />
						<Tab label="Send Question" icon={<Send/>} {...a11yProps(index+2)} />
					</Tabs>
				</AppBar>
				{
					data&&data.readerRooms ? 
					(	data.readerRooms.map((room, ind)=> 
									<TabPanel value={value} index={ind}>
										<ReaderRoom roomData = {room}/>
									</TabPanel>
						))
					:<></>
				}
			
				<TabPanel value={value} index={index+1}>
					<OtherQuestion/>
				</TabPanel>
				<TabPanel value={value} index={index+2}>
					<ReaderQuestion/>
				</TabPanel>
			</div>
			
		}
	</>
  );
}
