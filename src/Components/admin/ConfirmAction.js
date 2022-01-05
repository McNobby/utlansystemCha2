import {React, useState} from 'react'

const ConfirmAction = ({confirmWord, description, shown, setShown, setConfrimed}) => {

    const [input, setInput] = useState('')

    const keyUp = (e) => {
        setInput(e.target.value)
    }

    const close = () =>  {
        setShown("hidden")
    }
    
    const slett = () => {
        if (input === confirmWord){
            setConfrimed(true)
            return
        }
        alert("Du skrev feil!")
    }

    return (
        <div className={shown}>
            <h1>Er du sikker?</h1>
            <h2>{description}</h2>
            <h2>Skriv inn {confirmWord} for å bekrefte</h2>
            <input id="input" onKeyUp={keyUp} type="text" placeholder={confirmWord} />
            <div className="btn-group">
                <button onClick={close} id="red-gradient">Lukk</button>
                <button onClick={slett} id="red-gradient">Slett</button>
            </div>


        </div>
    )
}

export default ConfirmAction
