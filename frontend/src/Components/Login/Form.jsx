import React, {useEffect, useState } from 'react';
import {useMutation} from'@apollo/client'
import{LOGIN_READER} from '../../Graphql/Mutation'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useUser} from '../../Hooks/User'

export default function BasicTextFields() {

    const [ addReader, { data }] = useMutation(LOGIN_READER)
    const [setUser] = useUser(true)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const [blured, setBlur] = useState(false)
    const [err, setError] = useState(null)
    const [value, setValue] = React.useState("3");
        
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    async function logIn(e){ 
        console.log("clicked")
       if(value==="3"){
            try{
                addReader({ variables: {username, password } }) 
            }
            catch(err){
                setError(err.message)
                console.log("error", err.message)
            }
       }
       
    }
    useEffect(()=>{
        (async()=>{
            try{
                
                
                let token = await data.loginReader.token
                let readerId = await data.loginReader.data.reader_id

                if(token.length){
                    localStorage.setItem('token', token)
                    localStorage.setItem('usertype', value)
                    localStorage.setItem('readerId', readerId)
    
                    console.log("token", await data.loginReader.data)
    
                    setUser({reader: await data.loginReader.data})
                }
                else{
                    localStorage.removeItem('token')
                    localStorage.removeItem('userType')
                }
            }
                
            catch(err){
                setError(err.message)
                console.log("error data", err.message)
            }
        })()
    },[data,setUser, value])

  return (
        <>
            <div className="loggin-text">Log In</div>
            {err? <div className="login-error">{err}</div>: <></>}
            <FormControl  className="login-form"  noValidate autoComplete="off">
                <input type="text" onChange= {(e)=>setUsername(e.target.value)}  placeholder="username" className="login-form-input" required={true} /> 
                    <br />
                <input type="text" onChange= {(e)=>setPassword(e.target.value)}  placeholder="password" className="login-form-input" minLength="6" required={true} onBlur={()=>setBlur(true)}/>  
                    <br />  
                {blured&&password&&!(password.length>5&& password.length<13) ? <label className="login-password-error-label"> min length for password 6 and max length 16</label> :null}
                    <br />
                <FormLabel component="legend">Login as:</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} required onChange={handleChange}>
                    <FormControlLabel value="3" control={<Radio />} label="Reader" />
                    <FormControlLabel value="2" control={<Radio />} label="Librarian" />
                    <FormControlLabel value="1" control={<Radio />} label="Admin" />
                </RadioGroup>
                <input type="submit" className="login-form-submit" onClick={logIn} disabled={username && blured&&password&&password.length>5&& password.length<13 ? false :true} value="Log in"/>
            </FormControl>
        </>
  );
}
