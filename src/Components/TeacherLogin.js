import React, { useState } from 'react'
import { useUpdateLogin } from '../loginContext'
import axios from 'axios'
import {apiAdress} from './config.json'


const TeacherLogin = () => {

    const updateLogin = useUpdateLogin()

    const [input, setInput] = useState("")

    const handleInput = (e) =>{
        setInput(e.target.value)
        if(e.key === 'Enter'){
            handleSubmit()
        }
    }

    const handleSubmit = () =>{
        
        const req = {
            type: 'get',
            getType: 'user',
            userID: input
        }
        axios.post(apiAdress, req)
        .then((res)=>{
            const user = res.data
            console.log(res, user);
            if(user.teacher){

                updateLogin({teacher: JSON.stringify({name: user.navn, _id: user._id})})
                window.location.href = "/"
                return
            }
            alert('Fant deg ikke som en lærer')
        })

    }

    return (
        <div className="narrow-card">
            <h2>Scan ditt kort</h2>
            <input type="password" onKeyUp={handleInput} placeholder="Scan kortet ditt" autoFocus />
            <button onClick={handleSubmit} className="submit-btn">Logg inn</button>
        </div>
    )
}

export default TeacherLogin
