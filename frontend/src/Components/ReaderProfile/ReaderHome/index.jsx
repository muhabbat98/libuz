import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Send from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReaderQuestion from '../NewQuestion'
import{ READER_ROOMS} from '../../../Graphql/Queries'
import { useQuery } from '@apollo/client';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReaderRoom from '../ReaderRooms/index'
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
			<Typography>{children}</Typography>
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ScrollableTabsButtonForce() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const {loading, error, data} = useQuery(READER_ROOMS, {variables:{readerId:2}})
	// const {loading, error, data} = useQuery(READER_ROOMS, { variables: {readerId: localStorage.getItem('readerId') ? parseInt(localStorage.getItem('readerId')):null}})
	// console.log(data)
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	console.log("error",error)
	// console.log("data",data.readerRooms)
	console.log("loading",loading)


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
							<Tab label={"room "+(index)} icon={<PersonPinIcon />}{...a11yProps(index)} />)
						:<></>}
						<Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
						<Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
						<Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
						<Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
						<Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
						<Tab label="Send Question" icon={<Send/>} {...a11yProps(6)} />
					</Tabs>
				</AppBar>
				{data&&data.readerRooms? 
					data.readerRooms.map((room, index)=> 
						<TabPanel value={value} index={index}>
							<ReaderRoom roomData = {room}/>
						</TabPanel>)
				:<></>}
				
				<TabPanel value={value} index={1}>
				Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
				Item Three
				</TabPanel>
				<TabPanel value={value} index={3}>
				Item Four
				</TabPanel>
				<TabPanel value={value} index={4}>
				Item Five
				</TabPanel>
				<TabPanel value={value} index={5}>
				Item Six
				</TabPanel>
				<TabPanel value={value} index={6}>
					<ReaderQuestion/>
				</TabPanel>
			</div>
			
		}
	</>
  );
}
