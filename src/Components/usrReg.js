import React, { useState, useEffect } from 'react'
import sendToBackend from '../lib/sendToBackend'
import axios from 'axios'
import {apiAdress} from './config.json'

const UsrReg = () => {

    const [elevID, setElevID] = useState("")
    const [navn, setNavn] = useState("")
    const [email, setEmail] = useState("")
    const [classes, setClasses] = useState([])
    const [chosenClass, setChosenClass] = useState({})


    useEffect(()=>{
        getAllClasses()
    },[])

    const getAllClasses = () => {
        let req = {
            type:'get',
            getType:'allClasses'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log('classes fetched');
            setClasses(res.data)
        })
    }

    const elevIDSave = (e) =>{
        setElevID(e.target.value)
    }

    const navnSave = (e) => {
        setNavn(e.target.value)
    }

    const emailSave = (e) => {
        setEmail(e.target.value)
    }

    const classSave = (e) =>{
        setChosenClass({_id: e.target.value})
    }

    const handleSubmit = () => {

        if(elevID && navn && email && chosenClass){
            const user = {
                _id: elevID,
                navn: navn,
                epost: email,
                class: chosenClass,
                teacher: false,
            }
    
            sendToBackend('usrUpdate', user)
            
            return
        }
        alert("Du mangler noe!")
    }

    const back = () => {
        window.history.back()
    }

    return (
        <div className="narrow-card">
            <h1>Registrering</h1>
            <input onKeyUp={elevIDSave} type="text" placeholder="elevID (ikke feide inlogging)" />
            <input onKeyUp={navnSave} type="text" placeholder="Fornavn" />
            <input onKeyUp={emailSave} type="text" placeholder="E-post" />
            <SelectClass keyUp={classSave} classes={classes}/>
            <div className="btn-group">
                <button onClick={handleSubmit} className="submit-btn">Registrer</button>
                <button onClick={back} className="submit-btn">Tilbake</button>
            </div>
        </div>
    )
}

export default UsrReg

//classes selection component
export function SelectClass ({ classes, keyUp }) {
        
    if(!classes){
        classes=[]
    }
    
    const classesOptionsList = classes.map(i=>{

        return(
            <option key={i._id} value={i._id} onClick={keyUp}>{i.shortName}</option>
        )
    })

    return(
        <div className="wrap">
        <h2>Klasse:</h2>
        <select name="classes" id="classes">
            <option value={null} disabled selected>Velg klasse</option>
            {classesOptionsList}
        </select>
    </div>
    )
}