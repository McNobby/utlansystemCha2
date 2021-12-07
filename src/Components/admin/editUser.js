import React, { useState } from 'react'
import sendToBackend from '../../lib/sendToBackend'

const EditUser = ({name, email, shown, _id, setShown, refresh, user, classes}) => {
    if (!user.class) {
        user.class = {}
    }

    const [newName, setNewName] = useState('')
    const [newMail, setNewMail] = useState('')
    const [newClass, setNewClass] = useState('')

    const close = () => {
        setShown('hidden')
    }

    const saveToDB = () => {

        //set newly inputted values
        let nameToSave = newName
        let mailToSave = newMail
        let classToSave = newClass
        //if there aren't any new values
        if(newName === ''){
            nameToSave = name
        }
        if(newMail === ''){
            mailToSave = email
        }
        if(newClass === ''){
            classToSave = user.class._id
        }


        sendToBackend('usrUpdate',{
            _id: _id,
            navn: nameToSave,
            epost: mailToSave,
            teacher: user.teacher,
            class: {
                _id: classToSave
            }
        })
        setShown('hidden')
        refresh()
    }

    const keyUp = (e) => {
        if(e.target.id === 'name'){
            setNewName(e.target.value)
            return
        }
        if(e.target.id === 'email'){
            setNewMail(e.target.value)
            return
        }
        setNewClass(e.target.value)
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
            {user.teacher ? "" : <EditClass user={user} keyUp={keyUp} classes={classes}/>}
            <div className="btn-group">
                <button onClick={close} id="red-gradient">Lukk</button>
                <button onClick={saveToDB} id="red-gradient">Lagre</button>
            </div>
        </div>
    )
}

export default EditUser

export function EditClass ({user, classes, keyUp}) {
        
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
            <option value="" disabled defaultValue>{user.class.shortName}</option>
            {classesOptionsList}
        </select>
    </div>
    )
}