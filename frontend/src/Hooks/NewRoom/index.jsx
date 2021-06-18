import React from 'react'
import { useContext,useState,createContext } from 'react'
const RoomContext = createContext(null)

const RoomProvider = ({children})=>{
    const [room, setRoom]= useState({})
        
    return(
         <RoomContext.Provider value= {{room, setRoom}}>
             <RoomContext.Consumer>
                 {()=>children}
             </RoomContext.Consumer>
          </RoomContext.Provider>
    )
 }
 const useRoom = (setternOnly)=>{
     const {room, setRoom} = useContext(RoomContext)
     return setternOnly ? [setRoom] : [room, setRoom]
 }
 export{
     useRoom,
     RoomProvider
 }