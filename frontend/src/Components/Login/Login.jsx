import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import {READER_LIB_DATA} from'../../Graphql/Queries'
import {CREATE_LIBRARIAN, CREATE_READER} from'../../Graphql/Mutation'
import {useQuery, useMutation} from'@apollo/client'
import {setUser, useUser} from '../../Hooks/User'
import{LOGIN_READER} from '../../Graphql/Mutation'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
        inputRef: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
  };
  
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  }
}));

export default function SignUp() {
    const classes = useStyles();
	const [logIn, setLogin] = useState(false)
    const username  = useRef()
    const usernameLogin  = useRef()
    const password= useRef()
    const passwordLogin= useRef()
    const email = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const [value, setValue] = useState("3");
    const[setUser] =useUser(true)
    const [values, setValues] = useState({
        textmask: '(998)',
        numberformat: '1320',
    });
    const [role, setRole] = useState('');
    const [lib, setLib] = useState('')
    const phoneChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value,
        });
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const roleChange = (event) => {
        setRole(event.target.value);
      };
    const libChange = (event) => {
        setLib(event.target.value);
      };
    //   Mutation and Query 
    const { loading:lib_loading,  data:lib_data } = useQuery(READER_LIB_DATA);
    const [addLibrarian, {data:librarian_data, error:create_lib_error}] = useMutation(CREATE_LIBRARIAN)
    const [addReader,{data:reader_data,error:create_reader_error}] = useMutation(CREATE_READER)
	const [ logInReader, { data:reader_login_data }] = useMutation(LOGIN_READER)
    const [err, setError] = useState('')
            // localStorage.setItem('readerId', reader_login_data.loginReader.data.reader_id)
			console.log(reader_login_data&&reader_login_data.loginReader.data)
    useEffect(()=>{
        if(create_lib_error) setError(create_lib_error)
        else if(create_reader_error) setError(create_reader_error)
        else if(reader_data&&reader_data.addReader.status!==200 ) setError(reader_data.addReader.message) 
		else if(reader_login_data&&reader_login_data.loginReader.status!==200) setError(reader_login_data.loginReader.message) 
        else if(librarian_data&&librarian_data.addLibrarian.status!==200) setError(librarian_data.addLibrarian.message)
        else if(reader_data&&reader_data.addReader.status===200) {

            setError('')

            localStorage.setItem('token',  reader_data.addReader.token)
            localStorage.setItem('usertype',  reader_data.addReader.data.user_status)
            localStorage.setItem('readerId', reader_data.addReader.data[0].reader_id)

            setUser({token:reader_data.addReader.token,
                userType:reader_data.addReader.data.user_status,
                id:reader_data.addReader.data[0].reader_id})
        }
		else if(reader_login_data&&reader_login_data.loginReader.status ===200) {

            setError('')

            localStorage.setItem('token',  reader_login_data.loginReader.token)
            localStorage.setItem('usertype',  reader_login_data.loginReader.data.user_status)
            localStorage.setItem('readerId', reader_login_data.loginReader.data.reader_id)

            setUser({token:reader_login_data.loginReader.token,
                userType:reader_login_data.loginReader.data.user_status,
                id:reader_login_data.loginReader.reader_id})
        }
        else if(librarian_data&&librarian_data.addLibrarian.status===200) {
            setError('')
            localStorage.setItem('token', librarian_data.addLibrarian.token)
            localStorage.setItem('usertype', librarian_data.addLibrarian.data.user_status)
            localStorage.setItem('librarianId', librarian_data.addLibrarian.data.librarian_id)
            setUser({token:librarian_data.addLibrarian.token,
                userType:librarian_data.addLibrarian.data.user_status,
                id:librarian_data.addLibrarian.data.librarian_id})
        }

    },[create_lib_error,create_reader_error, librarian_data, reader_data, reader_login_data])

	const loginUser = (e)=>{
		e.preventDefault()
		// console.log(usernameLogin.current, passwordLogin.current)
		if(value==="3"&&logIn===true){
			
			logInReader({
				variables:{
					username:usernameLogin.current.childNodes[1].childNodes[0].value,
                    password:passwordLogin.current.childNodes[1].childNodes[0].value,
				}
			})
		}
	}

    const createUser = (e)=>{
        e.preventDefault()

        if(value==="3"&&logIn===false){
           try{
            addReader({ variables:{
                username:username.current.childNodes[1].childNodes[0].value,
                password:password.current.childNodes[1].childNodes[0].value,
                readerEmail: email.current.childNodes[1].childNodes[0].value||null,
                readerRole: role||null,
                readerPhone: values.textmask||null
                }
            })
           }
           catch (err){
               setError(err.message)
           }
        }
        else if(value==="2"&&logIn===false){
            try{
                if(username.current.childNodes[1].childNodes[0].value&&password.current.childNodes[1].childNodes[0].value&&firstName.current.childNodes[1].childNodes[0].value&&lastName.current.childNodes[1].childNodes[0].value&&values.textmask){
                    addLibrarian({variables:{
                      username:username.current.childNodes[1].childNodes[0].value,
                      password:password.current.childNodes[1].childNodes[0].value,
                      firstName:firstName.current.childNodes[1].childNodes[0].value,
                      lastName:lastName.current.childNodes[1].childNodes[0].value,
                      librarianPhone:values.textmask,
                      library:lib||null
                  }})
                    setError("")
                }
                else{
                  setError("fill required fields")
                }
            }
            catch(err){
                console.log(err)
                setError(err.message)
            }
        }
		
      
    }
	return (<>
		{
			!logIn ?
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign up
						</Typography>
						{err? <div className="login-error">{err}</div>: <></>}
							<form className={classes.form} autoComplete="off" onSubmit={e=>e.preventDefault()} >
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
										<TextField
											name="username"
											variant="outlined"
											required
											fullWidth
											ref={username}
											label="Username"
										/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										ref={password}
										required
										fullWidth
										name="password"
										label="Password"
										type="password"                    
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<FormLabel component="legend">Login as:</FormLabel>
										<RadioGroup aria-label="gender" name="gender1" value={value} required onChange={handleChange}>
											<FormControlLabel value="3" control={<Radio />} label="Reader" />
											<FormControlLabel value="2" control={<Radio />} label="Librarian" />
											<FormControlLabel value="1" disabled control={<Radio />} label="Admin" />
										</RadioGroup>
									</FormControl>
								</Grid>
								{
									value==="2"? 
									<>
										<Grid item xs={12} sm={6}>
											<TextField
												autoComplete="fname"
												name="firstName"
												variant="outlined"
												required
												fullWidth
												ref={firstName}
												label="First Name"
												autoFocus
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												variant="outlined"
												required
												fullWidth
												ref={lastName}
												label="Last Name"
												name="lastName"
												autoComplete="lname"
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl className={classes.formControl}>
												<Select
												value={lib}
												onChange={libChange}
												fullWidth
												>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{
													lib_data&&lib_data.lib ? 
														lib_data.lib.map((element, index)=>
															<MenuItem key={index} value={element.libraryId}>{element.libraryName}</MenuItem>
															)
														:null
												}
												</Select>
												<FormHelperText>Library</FormHelperText>
											</FormControl>
										</Grid>
									
			
									</>:<>
										<Grid item xs={12}>
											<TextField
												variant="outlined"
												required
												fullWidth
												ref={email}
												label="Email Address"
												name="email"
												autoComplete="email"
											/>
											
										</Grid>
										<Grid item xs={6}>
											<FormControl className={classes.formControl}>
												<Select
												labelId="demo-simple-select-autowidth-label"
												value={role}
												onChange={roleChange}
												fullWidth
												>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{
													lib_data&&lib_data.readerRoles ? 
														lib_data.readerRoles.map((element, index)=>
															<MenuItem key={index} value={element.roleId}>{element.roleName}</MenuItem>
														)
													:null
												}
												</Select>
												<FormHelperText>Reader Role</FormHelperText>
											</FormControl>
										</Grid>
									</>
								}
								<FormControl>
									<InputLabel htmlFor="formatted-text-mask-input">phone number</InputLabel>
									<Input
									value={values.textmask}
									onChange={phoneChange}
									name="textmask"
									id="formatted-text-mask-input"
									required
									/>
								</FormControl>
							
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={createUser}
							>
								Sign Up
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<Button onClick={()=>setLogin(true)} variant="body2">
										Already have an account? Sign in
									</Button>
								</Grid>
							</Grid>
							</form>
					</div>
					<Box mt={5}>
					<Copyright />
					</Box>
				</Container>:
				 <Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						{err? <div className="login-error">{err}</div>: <></>}
							<form className={classes.form} autoComplete="off" onSubmit={e=>e.preventDefault()} >
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
										<TextField
											name="username"
											variant="outlined"
											required
											fullWidth
											ref={usernameLogin}
											label="Username"
										/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										ref={passwordLogin}
										required
										fullWidth
										name="password"
										label="Password"
										type="password"                    
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<FormLabel component="legend">Login as:</FormLabel>
										<RadioGroup aria-label="gender" name="gender1" value={value} required onChange={handleChange}>
											<FormControlLabel value="3" control={<Radio />} label="Reader" />
											<FormControlLabel value="2" control={<Radio />} label="Librarian" />
											<FormControlLabel value="1" control={<Radio />} label="Admin" />
										</RadioGroup>
									</FormControl>
								</Grid>
								
							
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={loginUser}
							>
								Sign In
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
								<Button onClick={()=>setLogin(false)}>
									 Sign up 
								</Button>
								</Grid>
							</Grid>
							</form>
					</div>
					<Box mt={5}>
					<Copyright />
					</Box>
				</Container>
		}

	
	</>);
}
