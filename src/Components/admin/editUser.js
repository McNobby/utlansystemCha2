import React, { useState } from 'react'
import sendToBackend from '../../lib/sendToBackend'

const EditUser = ({name, email, shown, _id, setShown, refresh, user}) => {

    const [newName, setNewName] = useState('')
    const [newMail, setNewMail] = useState('')

    const close = () => {
        setShown('hidden')
    }

    const saveToDB = () => {
        let nameToSave = ""
        let mailToSave = ""

        //set newly inputted values
        nameToSave = newName
        mailToSave = newMail
        //if there aren't any new values
        if(newName === ''){
            nameToSave = name
        }
        if(newMail === ''){
            mailToSave = email
        }

        sendToBackend('usrUpdate',{
            _id: _id,
            navn: nameToSave,
            epost: mailToSave,
            teacher: user.teacher
        })
        setShown('hidden')
        refresh()
    }

    const keyUp = (e) => {
        if(e.target.id === 'name'){
            setNewName(e.target.value)
            return
        }
        setNewMail(e.target.value)
    }

    return (
        <div className={shown}>
            <h1>{name}</h1>
            <p>{_id}</p>
            <div className="wrap">
                <h2>Navn:</h2>
                <input type="text" placeholder={name} id="name" onKeyUp={keyUp} />
            </div>
            <div className="wrap">
                <h2>Epost:</h2>
                <input type="text" placeholder={email} id="email" onKeyUp={keyUp} />
            </div>
            <div className="btn-group">
                <button onClick={close} id="red-gradient">Lukk</button>
                <button onClick={saveToDB} id="red-gradient">Lagre</button>
            </div>
        </div>
    )
}

export default EditUser
