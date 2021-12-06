import React, { useState } from 'react'
import sendToBackend from '../lib/sendToBackend'

const UsrReg = () => {

    const [elevID, setElevID] = useState("")
    const [navn, setNavn] = useState("")
    const [email, setEmail] = useState("")

    const elevIDSave = (e) =>{
        setElevID(e.target.value)
    }

    const navnSave = (e) => {
        setNavn(e.target.value)
    }

    const emailSave = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {

        if(elevID && navn && email){
            const user = {
                _id: elevID,
                navn: navn,
                epost: email,
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
            <div className="btn-group">
                <button onClick={handleSubmit} className="submit-btn">Registrer</button>
                <button onClick={back} className="submit-btn">Tilbake</button>
            </div>
        </div>
    )
}

export default UsrReg
