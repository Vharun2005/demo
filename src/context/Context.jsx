import React, { createContext, useState } from 'react'
import run from '../config/gemini'

 export const Context = createContext()


 

 const ContextProvider = (props) =>{
    const [input,setInput] = useState('')
    const [loading,setloading] = useState(false)
    const [showResult,setShowresult] = useState(false) 
    const [resultData,setResultdata] = useState('')
    const [prevPrompt,setPrevprompt] = useState([])
    const [recentPrompt,setRecentPrompt] = useState('') 

    const delayPara = (index,nextword) => {
        setTimeout(function () {
            setResultdata(prev => prev + " " + nextword)
        },50*index)
    }



    const onsent = async(msg) =>{
        const upper = input.toUpperCase()
        setRecentPrompt(upper)
        setShowresult(true)
        setResultdata('')
        setloading(true)
        const response =  await run(msg)
        const resArray = response.split('**')
        let newRes = "";
        for(let i=0;i<resArray.length;i++){
            if(i === 0 ||i%2 === 0){
                newRes+=resArray[i]
            }else{
                newRes+=`<br>${resArray[i]}</br>`
            }
        }
        const newRestwo = newRes.split(" ")
        for(let i=0;i<newRestwo.length;i++){
            const nextword = newRestwo[i]
            delayPara(i,nextword)
        }
        setloading(false)
        setInput('')
    }
    
    const ContextValue = {
        input,
        setInput,
        resultData,
        setResultdata,
        recentPrompt,
        setRecentPrompt,
        loading,
        setloading,
        showResult,
        setShowresult,
        prevPrompt,
        setPrevprompt,
        onsent
    }


    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
 }

 export default ContextProvider