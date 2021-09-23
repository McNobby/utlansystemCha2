import axios from 'axios'
import React, { useState } from 'react'
import Sucsess from './Sucsess'

const Innlevering = () => {

    const [sucsess, setSucsess] = useState(false)

    const handleInput = (e) => {

        let regex = /\d+ZX$/
        let check = regex.test(e.target.value)

        if(check) {
            const req = {
                type: 'get',
                getType: 'utlaan',
                _id: e.target.value
            }
            //get scanned item in utlånt db
            axios.post('http://172.31.100.69:6969/api', req)
            .then(res =>{
                

                if (res.data === 'not found'){
                    e.target.value = ""
                    alert('Ikke utlevert!')
                    return
                }
                
                const data = res.data[0]
                const req = {
                    type: 'get',
                    getType: 'user',
                    userID: data.user
                }

                axios.post('http://172.31.100.69:6969/api', req)
                .then(res2 =>{
                    const user = res2.data
                    
                    const utlant = user.utlant
                    const nyUtlant = utlant.filter(obj => obj.bCode !== data._id )
                    
                    const req = {
                        type: 'rmUtlan',
                        nyUtlant: nyUtlant,
                        bCode: data._id,
                        userID: data.user
                    }
                    
                    axios.post('http://172.31.100.69:6969/api', req)
                    setSucsess(true)
                    setTimeout(()=>{
                        setSucsess(false)
                    }, 2500)

                })

                e.target.value = ""
            })
        }
    }

    const back = () =>{
        window.history.back()
    }

    return (
        <div className="card">
            <h1>Innlevering</h1>
            {sucsess ? <Sucsess type="Innlevert" /> : ""}
            <input autoFocus onKeyUp={handleInput} type="text" />
            <button id="red-gradient" onClick={back}>Tilbake</button>
        </div>
    )
}

export default Innlevering
