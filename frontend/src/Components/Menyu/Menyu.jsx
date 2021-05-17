import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import User from './User'

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
        background:{
            paper: '#3C1874',
			secondary:'#F3F3F3'
        },
        primary:{
            main:'#F3F3F3'
        },
        secondary:{
            main:'#3C1874'
        }
    },
  });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}



export default function Menyu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
         <div >
            <AppBar position="static">
                <Grid container>
                    <Grid item xs = {11}>
						<Tabs
							variant="fullWidth"
							value={value}
							onChange={handleChange}
							aria-label="nav tabs example"
							textColor="secondary"
						>
							<LinkTab label="Page One" href="/drafts" {...a11yProps(0)} />
							<LinkTab label="Page Two" href="/trash" {...a11yProps(1)} />
							<LinkTab label="Page Three" href="/spam" {...a11yProps(2)} />
						</Tabs>
					</Grid>
					<Grid item xs={1}>
						<User/>
					</Grid>
                </Grid>
            </AppBar>
            <TabPanel value={value} index={0}>
                Page One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Page Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>
        </div>
    </ThemeProvider>
  );
}