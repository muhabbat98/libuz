import React from 'react'
import { useContext,useState,createContext } from 'react'
const UserContext = createContext(null)

const UserProvider = ({children})=>{
    const [user, setUser]= useState({token:localStorage.getItem('token')||'', userType:localStorage.getItem('usertype')||'', id:localStorage.getItem('readerId')||''})
    return(
         <UserContext.Provider value= {{user, setUser}}>
             <UserContext.Consumer>
                 {()=>children}
             </UserContext.Consumer>
          </UserContext.Provider>
    )
 }
 const useUser = (setternOnly)=>{
     const {user, setUser} = useContext(UserContext)
     return setternOnly ? [setUser] : [user, setUser]
 }
 export{
     useUser,
     UserProvider
 }