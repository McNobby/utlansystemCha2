import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {apiAdress} from '../config.json'
import sendToBackend from '../../lib/sendToBackend'

const TeacherList = () => {

    const [users, setUsers] = useState([])

    useEffect(()=>{
        getAllItems()
    },[])

    const getAllItems = () => {
        let req = {
            type:'get',
            getType:'allTeachers'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log(res.data);
            setUsers(res.data)
        })
    }

    const list = users.map(i =>{
        const click = () =>{

        }
        return(
            <div className="listItem" onClick={click} key={i._id}>
                <p>{i.navn}</p>
                <p>{i.epost}</p>
                <p>{i.utlant.length}</p> 
            </div>
        )
    })

    const tilbake = () => {
        window.history.back()
    }

    const reg = () => {
        window.location.href = "/admin/nylaerer"
    }

    return (
        <div className="bigCard">
            <div className="topControl">
                <h2>Brukere oversikt</h2>
                <div className="filters">
                    <div className="wrap">
                        <button className="shadow" onClick={reg} id="red-gradient">Ny Lærer</button>
                    </div>
                    <div className="wrap">
                        <button className="shadow" onClick={tilbake} id="red-gradient">Tilbake</button>
                    </div>

                </div>
            </div>
            <div className="top">
                <p>Navn</p>
                <p>Epost</p>
                <p>Antall utlånte</p>
                </div>
            <div className="list">
                {list}
            </div>
        </div>
    )
}

export default TeacherList
