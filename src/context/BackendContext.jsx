import React, { createContext, useEffect, useReducer, useState } from 'react'

export const BackendContext = createContext()


const reducerFunc = (state,action) => {
    switch (action.type) {
        case "LOGIN":
            return {user:action.payload}
        case "LOGOUT":
            return {user:null}
        default:
            return state        
    }
}





const BackendContextProvider = ({children}) =>{
          const [state,dispatch] = useReducer(reducerFunc,{user:null})
          const [loading,setloading] = useState(true)
          useEffect(()=>{
            const token = localStorage.getItem('token')
            if(token){
                dispatch({
                    type:'LOGIN',
                    payload:token
                })
            }
            setloading(false)
          },[])

     if(!loading)
    return(
        <BackendContext.Provider value={{...state,dispatch}}>
            {children}
        </BackendContext.Provider>
    )

}

export default BackendContextProvider