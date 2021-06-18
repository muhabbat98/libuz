import React, {useEffect} from 'react';
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
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useUser} from '../../Hooks/User'
import{useRoom} from'../../Hooks/NewRoom'
import Questions from'./Questions'
import NewRoom from './NewRoom'
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
					{children}
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
}));

export default function ScrollableTabsButtonForce() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
			setValue(newValue);
	};
	const [user] = useUser(false)
	const [room] =useRoom(false)
	// console.log(room)
	useEffect(()=>{
		
		if(room.roomdata){
			setValue(1)
		}
	},[room.roomdata])


  return (
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
			<Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
			{
				room&&room.roomdata?
					<Tab label="New Room" icon={<FavoriteIcon />} {...a11yProps(1)} /> :
					null
			}
			
			<Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
			<Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
			<Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
			<Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
			<Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
			<Questions librarian={user}/>
      </TabPanel>
      	{
		  room&&room.roomdata?
		  	<TabPanel  value={value} index={1}>
				<NewRoom room = {room.roomdata.createRoom} librarian={user}/>
			</TabPanel>:
			null
	  	}
		<TabPanel value={value} index={2}>
			Item mish
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
			Item Seven
		</TabPanel>
    </div>
  );
}
