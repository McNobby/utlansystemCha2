import { useLogin, useUpdateLogin } from '../loginContext'
import React from 'react'


export default function TopBar() {

    const loggedIn = useLogin()

    const upateLogin = useUpdateLogin()

    const loggutinn = () => {
        if(loggedIn.navn){
            localStorage.removeItem('elevID')
            localStorage.removeItem('elevNavn')
            localStorage.removeItem('utlant')
            upateLogin("")
            setTimeout(() =>{
                window.location.reload()
            }, 1)
            return
        }
        window.location.href = "/login"

    }

    const home = () =>{
        window.location.href = "/"
    }


    return(
        <div className="navBar" style={loggedIn.navn ? {justifyContent: 'space-around'} : {justifyContent: 'center'}}>
            <h1 onClick={home}  ><span id="blue">Cha</span>media utlån [Beta]</h1>

            <div className="wrap">
                <h2>{loggedIn.navn}</h2>
                {loggedIn.navn ? <button onClick={loggutinn}>Logg ut</button> : "" }
            </div>
           
        </div>
    )
}