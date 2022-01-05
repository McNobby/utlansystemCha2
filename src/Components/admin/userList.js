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
    const [classes, setClasses] = useState([])

    useEffect(()=>{
        getAllClasses()
    },[])

    const getAllClasses = () => {
        let req = {
            type:'get',
            getType:'allClasses'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log('classes fetched');
            setClasses(res.data)
            getAllItems(res.data) //this function depends on the classes array
        })
    }

    const getAllItems = (classes) => {
        let req = {
            type:'get',
            getType:'allUsers'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log(classes, res);
            let usersWithClasses = []
            res.data.forEach(e => {
                if(!e.class){
                    //if there is no class on the user
                    usersWithClasses = [...usersWithClasses, {...e, class: {shortName: "Mangler klasse"}}]
                    return;
                }
                const foundClass = classes.find(c => c._id === e.class._id)
                usersWithClasses = [...usersWithClasses, {...e, class: {
                    shortName: foundClass.shortName,
                    _id: foundClass._id
                }}]
            })

            console.log(usersWithClasses);
            setUsers(usersWithClasses)
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
                <p>{i.class.shortName}</p> 
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
                <p>Klasse</p>
                </div>
            <div className="list">
                {list}
            </div>
            <EditUser name={name} email={mail} shown={shown} _id={id} classes={classes} user={user} refresh={getAllItems} setShown={setShown}/>
        </div>
    )
}

export default UserList
