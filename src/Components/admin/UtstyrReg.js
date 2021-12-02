import axios from 'axios'
import React, { useState } from 'react'
import { useLogin } from '../../loginContext'
import Sucsess from '../Sucsess'
import {apiAdress} from '../config.json'


const UtstyrReg = () => {

    const [sucsess, setSucsess] = useState(false)

    const clear = (e) =>{
        e.target.value = ""
    }

    const login = useLogin()

    const [bCode, setBCode] = useState("")
    const [id, setId] = useState("")
    const [info, setInfo] = useState("")

    const handleBcode = (e) => {
        setBCode(e.target.value)
    }
    const handleID = (e) => {
        setId(e.target.value)
    }
    const handleInfo = (e) => {
        setInfo(e.target.value)
    }

    const clearField = (e) =>{
        e.target.value = ""
    }

    const tilbake = () =>{
        window.history.back()
    }

    const handleSubmit = () =>{
        const utstyr = {
            type: 'utstyrRegistrering',
            _id: bCode,
            barcode: bCode,
            item: id,
            plassering: login.plassering,
            info: info
        }

        if(bCode && id && info){
            axios.post(apiAdress, utstyr)
            .then((res)=>{
                if(res.data === 'sendt to db'){
                    //sucsess
                    console.log('yeyy');

                    setSucsess(true)
                    const bCodeInput = document.querySelector('#bCodeInput')
                    bCodeInput.focus()
                    
                    setTimeout(()=>{
                        setSucsess(false)
                    }, 3000)
                }
            })
            return
        }
        alert("Du må fylle inn alle feltene!")

    }

    return (
        <div className="card">
            {sucsess ? <Sucsess type="Registrert!"/> : ""}

            <input onClick={clearField} onKeyUp={handleBcode} onFocus={clear} type="text" id="bCodeInput" placeholder="barcode"/>
            <input onClick={clearField} onKeyUp={handleID} type="text" placeholder="ID (f.eks: K10)" />
            <input onClick={clearField} onKeyUp={handleInfo} type="text" placeholder="tilbehør/innhold (batteri, xlr kabel...)"/>

            <div className="wrapRow">
                <button onClick={handleSubmit}>Lagre</button>
                <button onClick={tilbake} id="red-gradient">Tilbake</button>
            </div>

        </div>
    )
}

export default UtstyrReg
