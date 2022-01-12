import React, {useState} from 'react'
import { useUpdateLogin, useLogin } from '../loginContext'
import axios from 'axios'
import {apiAdress} from './config.json'


export default function LoginCard() {

    const isLoggedIn = useLogin()

    return(
        <div className="narrow-card">
            {isLoggedIn.navn ? <LoggedIn /> : <LoginForm />}
        </div>
    )
}

const LoggedIn = () => {
    const handleClick = () =>{
        window.location.href = "/"
    }
    return(
        <div>
            <h2>Du er allerede logget inn!</h2>
            <button onClick={handleClick} className="submit-btn"><h4>Send meg til rett plass</h4></button>
        </div>

    )
}

const LoginForm = () => {

    const updateLogin = useUpdateLogin()

    const [input, setInput] = useState("")

    const handleClick = (e) =>{
        setInput(e.target.value)
        
        if (e.key === 'Enter'){
            handleSubmit()
        }
    }

    const handleSubmit = async () => {


        const req = {
            type: 'get',
            getType: 'user',
            userID: input
        }
        axios.post(apiAdress, req)
        .then((res)=>{
            const user = res.data
            console.log(res, user);
            if(user.navn){
                updateLogin(user)
                window.location.href = "/"
                return
            }
            alert('error')
        })
    
    }

    const regButtonClick = () =>{
        window.location.href="/registrer"
    }
    const back = () => {
        window.history.back()
    }

    return(
        
        <>
            <h2>Logg inn elev</h2>
            <input type="password"autoFocus onKeyUp={handleClick} />

            <div className="btn-group">
            <button onClick={handleSubmit}>Logg inn</button>
            <button onClick={regButtonClick} >Registrer</button>
            <button onClick={back}>Tilbake</button>
            </div>
            
        </>
        
    )
}