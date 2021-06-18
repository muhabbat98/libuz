import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useQuery} from '@apollo/client'
import {MOST_DOWNLOADED} from '../../Graphql/Queries'
import {Link} from 'react-router-dom'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
	margin:'0 auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 355,
    display: 'block',
    maxWidth: 600,
    overflow: 'hidden',
    width: '100%',
  },
  card: {
    display: 'flex',
	margin:'20px 20px'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 260,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default ()=> {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = tutorialSteps.length;
	const {data} = useQuery(MOST_DOWNLOADED)
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};
	// console.log(data.mostDownloaded)

  return (<>
	<Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://static.toiimg.com/photo/80507427.cms)` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src="https://nccde.org/ImageRepository/Document?documentID=25042" alt="image" />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
				Virtual Service of Library 
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
				One of the service is ask a librarian. You can easily send your question to the librarian with our service.
            </Typography>
            {/* <Link variant="subtitle1" href="#"> */}
				Ask a librarian
            {/* </Link> */}
          </div>
        </Grid>
      </Grid>
    </Paper>
	<Typography element = 'h2' variant="h2" text='center' > The most readed</Typography>
	<Grid container display="flex">
		{
			data&&data.mostDownloaded ?
			data.mostDownloaded.map((element, index)=>
			<Grid item xs={12} md={6} key={index}>
				<CardActionArea component="a" href="#">
					<Card className={classes.card}>
						<div className={classes.cardDetails}>
							<CardContent>
								<Typography component="h2" variant="h5">
									{element.title}
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{element.date||"2011"}
								</Typography>
								<Typography variant="subtitle1" paragraph>
									{element.description}
								</Typography>
								<Typography variant="subtitle1" color="primary">
									<Link to='list'>
										view all
									</Link>
								</Typography>
							</CardContent>
						</div>
						<Hidden xsDown>
							<CardMedia className={classes.cardMedia} image={"http://localhost:5000/"+element.imageId.filename }title="image for title" imageTitle="image" />
						</Hidden>
					</Card>
				</CardActionArea>
			</Grid>
			)
		:
		<></>

		}
		
	</Grid>
    <div className={classes.root}>
		<Paper square elevation={0} className={classes.header}>
			<Typography>{tutorialSteps[activeStep].label}</Typography>
		</Paper>
		<AutoPlaySwipeableViews
			axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
			index={activeStep}
			onChangeIndex={handleStepChange}
			enableMouseEvents
		>
			{tutorialSteps.map((step, index) => (
			<div key={step.label}>
				{Math.abs(activeStep - index) <= 2 ? (
				<img className={classes.img} src={step.imgPath} alt={step.label} />
				) : null}
			</div>
			))}
		</AutoPlaySwipeableViews>
		<MobileStepper
			steps={maxSteps}
			position="static"
			variant="text"
			activeStep={activeStep}
			nextButton={
			<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
				Next
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</Button>
			}
			backButton={
			<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				Back
			</Button>
			}
		/>
    </div>
	</>
  );
}

// export default SwipeableTextMobileStepper;
// export default ()=>{
//   return<>Hello</>
// }