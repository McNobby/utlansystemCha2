import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {apiAdress} from '../config.json'

const ClassIndex = () => {

    const [classes, setClasses] = useState([])

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
    }

    const list = classes.map(i =>{


        const click = (e) =>{
            
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
        </div>
    )
}

export default ClassIndex
