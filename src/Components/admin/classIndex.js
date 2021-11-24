import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {apiAdress} from '../config.json'
import EditClass from './editClass'

const ClassIndex = () => {

    const [classes, setClasses] = useState([])
    const [chosenClass, setChosenClass] = useState({
        className: "hidden",
        classInfo: {teacher:""}
    })
    const [teachers, setTeachers] = useState([])

    useEffect(()=>{
        getAllItems()
    },[])

    const getAllItems = () => {
        let req = {
            type:'get',
            getType:'allClasses'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log(res.data);
            setClasses(res.data)
        })

        req = {
            type:'get',
            getType:'allTeachers'
        }
        axios.post(apiAdress, req)
        .then(res =>{
            //saves all teachers in state
            setTeachers(res.data)

        })
    }

    //goes back in history, expected to go back to admin panel
    const tilbake = () =>{
        window.history.back()
    }
    //goes to the addclass page
    const newClass = () => {
        window.location.href = "/admin/addclass"
    }

    const list = classes.map(i =>{
        const click = () =>{
            setChosenClass({
                className: "editCard",
                classInfo: i,
            })
        }
        return(
            <div className="listItem" onClick={click} key={i._id}>
                <p>{i.name}</p>
                <p>{i.shortName}</p>
                <p>{i.teacher.navn}</p>
                <p>{i.students.length}</p>  
            </div>
        )
    })


    return (
        <div className="bigCard">
            <div className="topControl">
                <h2>Klasser oversikt</h2>
                <div className="filters">
                    <div className="wrap">
                        <button className="shadow" onClick={newClass} id="red-gradient">Ny klasse</button>
                    </div>
                    <div className="wrap">
                        <button className="shadow" onClick={tilbake} id="red-gradient">Tilbake</button>
                    </div>

                </div>
            </div>
            <div className="top">
                <p>Klassenavn</p>
                <p>Kort navn</p>
                <p>Kontaktlærer</p>
                <p>Antall elever</p>
                <p>Antall utlånt</p>
                </div>
            <div className="list">
                {list}
            </div>
            <EditClass props={chosenClass} teachers={teachers} refresh={getAllItems} setChosenClass={setChosenClass} />
        </div>
    )
}

export default ClassIndex
