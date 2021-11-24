import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {apiAdress} from '../config.json'
import sendToBackend from '../../lib/sendToBackend'

 
const AddClassCard = () => {

    const [teachers, setTeachers] = useState([])
    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [teacher, setTeacher] = useState('')

    //runs when component is loaded, one time
    useEffect(()=>{
        getAll()
    },[])

    const getAll = () =>{
        //request sendt for getting all classes saved so no duplicates are made
        let req = {
            type:'get',
            getType:'allTeachers'
        }
        axios.post(apiAdress, req)
        .then(res =>{
            //saves all teachers in state
            setTeachers(res.data)

        })
    }

    const tilbake = () => {
        window.history.back()
    }

    const stateSave = (e) => {
        //this function saves inputs to states
        if(e.target.id === 'klasse') {
            setName(e.target.value)
            return
        }
        if(e.target.id === 'kort') {
            setShortName(e.target.value)
            return
        }
        setTeacher(e.target.value)
    }

    const saveToDB = () => {
        //sends info to db
        const teacherSet = teachers.find(i => i._id === teacher)
        //checks if every field is filled out
        if (name === '' || shortName === '' || teacher === ''){
            alert('Du må fylle ut alle feltene')
            return
        }
        console.log('sendt to DB');
        sendToBackend('updateClass', {
            _id: shortName,
            name: name,
            shortName: shortName,
            teacher: teacherSet
        })
    }
    const teachersOptions = teachers.map(i =>{
        return(
            <option onClick={stateSave} key={i._id} value={i._id}>{i.navn}</option>
        )
    })

    return (
        <div className="card">
            <h1>Ny klasse</h1>
            <h3>Klassenavn:</h3>
            <input type="text" id="klasse" placeholder="klassenavn" onKeyUp={stateSave} /> 
            <h3>Forkortelse:</h3>
            <input type="text" id="kort" placeholder="Forkortelse (1MK, 2IT)" onKeyUp={stateSave} />
            <h3>Lærer:</h3>
            <select name="laerer" id="laerer" >
                <option value="standard" id="teacher" >Velg lærer</option>
                {teachersOptions}
            </select>
            <button className="shadow" onClick={saveToDB} >Lagre</button>
            <button className="shadow" onClick={tilbake} >Tilbake</button>
        </div>
    )
}

export default AddClassCard
