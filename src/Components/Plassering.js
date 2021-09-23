import React, { useState } from 'react'
import { useUpdateLogin } from '../loginContext'

const Plassering = () => {

    const [input, setInput] = useState("velg")

    const updateLogin = useUpdateLogin()

    const handleInput = (e) => {
        setInput(e.target.value)
        console.log(e.target.value);
    }

    const handleSubmit = () => {
        if(input !== 'velg'){
            updateLogin({plassering: input})
            return
        }
        alert('Du må velge en plass!')
    }

    return (
        <div className="narrow-card" id="plassering">
            <h2>Hvor er denne maskinen?</h2>
            <select name="plassering" onClick={handleInput}>
                <option value="velg">Velg</option>  
                <option value="kameralager">kameralager</option>
                <option value="utstyrlager">utstyrlager</option>
                <option value="IM lager">IM lager</option>
            </select>

            <button onClick={handleSubmit} className="innlevering">Lagre</button>
        </div>
    )
}

export default Plassering
