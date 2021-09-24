import React, {useState, useEffect} from "react"
import Sucsess from "./Sucsess"
import axios from "axios"
import sendToBackend from "../lib/sendToBackend"
import { useLogin } from "../loginContext"

export default function Utlaan() {
    const loginState = useLogin()
    const [scanned, setScanned] = useState([])
    const [sucsess, setSucsess] = useState(false)

    useEffect(()=>{
        const utlant = JSON.parse(loginState.utlant)
        setScanned(utlant)
    },[loginState])

    const handleInput = (e) =>{

        let regex = /\d+ZX$/
        let check = regex.test(e.target.value)
        
        if(check){

            sendToDB(e.target.value)
            setTimeout(()=>{
                e.target.value = ""
            },100)
        }
    }

    const sendToDB = (e) =>{
        console.log(e);
        const req = {
            type: 'get',
            getType: 'laanut',
            _id: e
        }
        axios.post('http://172.31.100.69:6969/api', req)
        .then(res =>{
            console.log(res);
            //checks if scanned object was found and is not loaned out
            if(res.data === 'Det du skannet er ikke registrert!' || res.data === 'allerede lånt ut!'){
                alert(res.data)
                e = ""
                return
            }
            //rest of code is if there was a suscessful response
            const data = res.data[0]
            const newScanned = [...scanned, {
                id: scanned.length,
                name: data.item,
                bCode: data.barcode,
                info: data.info,
                plassering: data.plassering
            }]
            setScanned(newScanned)
            
            //saves new scanned item to db
            sendToBackend('utlanUpdate', {
            _id: localStorage.getItem('elevID'), 
            utlant: newScanned, 
            elevNavn: localStorage.getItem('elevNavn') })

            e = ""
            //shows the sucsess message for 2seconds
            setSucsess(true)
            setTimeout(()=>{
                setSucsess(false)
            }, 3000)
        })
    }

    const scannedList = scanned.map(i =>{
        return(
            <div className="listItem" key={i.id}>
            <p>{i.name}</p>
            <p>{i.info}</p>
            <p> {i.bCode} </p>
            <p> {i.plassering} </p>
            
        </div>
        )
    })

    return(
        <div className="card">
            {sucsess ? <Sucsess type="Sucsess"/> : ""}
            <h2>Utlån</h2>
            <input type="text" onInput={handleInput} className="wideInput" autoFocus />
                     
            <div className="list">
                <ul>{scannedList}</ul>
            </div>

        </div>
    )
}