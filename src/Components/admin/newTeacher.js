import React, {useState} from 'react'
import sendToBackend from '../../lib/sendToBackend'

const NewTeacher = () => {
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
                teacher: true,
            }
    
            sendToBackend('usrUpdate', user)

            return
        }
        alert("Du mangler noe!")
    }

    return (
        <div className="narrow-card">
            <h1>Lærer registrering</h1>
            <input onKeyUp={elevIDSave} autoFocus type="text" placeholder="Scan ditt kort her" />
            <input onKeyUp={navnSave} type="text" placeholder="Fult navn" />
            <input onKeyUp={emailSave} type="text" placeholder="E-post" />
            <button onClick={handleSubmit} className="submit-btn">Registrer</button>
        </div>
    )
}

export default NewTeacher
