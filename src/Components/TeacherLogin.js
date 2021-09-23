import React, { useState } from 'react'
import { useUpdateLogin } from '../loginContext'
import axios from 'axios'

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
        axios.post('http://127.0.0.1:6969/api', req)
        .then((res)=>{
            const user = res.data
            console.log(res, user);
            if(user.teacher){

                updateLogin({teacher: user.navn})
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
