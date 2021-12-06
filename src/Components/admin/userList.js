import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {apiAdress} from '../config.json'
import EditUser from './editUser'

const UserList = () => {

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [id, setId] = useState('')
    const [shown, setShown] = useState('hidden')

    useEffect(()=>{
        getAllItems()
    },[])

    const getAllItems = () => {
        let req = {
            type:'get',
            getType:'allUsers'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log(res.data);
            setUsers(res.data)
        })
    }

    const list = users.map(i =>{
        const click = () =>{
            setShown('editCard')
            setMail(i.epost)
            setName(i.navn)
            setUser(i)
            setId(i._id)
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
        window.location.href = "/registrer"
    }

    return (
        <div className="bigCard">
            <div className="topControl">
                <h2>Brukere oversikt</h2>
                <div className="filters">
                    <div className="wrap">
                        <button className="shadow" onClick={reg} id="red-gradient">Ny Bruker</button>
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
            <EditUser name={name} email={mail} shown={shown} _id={id} user={user} refresh={getAllItems} setShown={setShown}/>
        </div>
    )
}

export default UserList
