import {React, useState} from 'react'
import sendToBackend from '../../lib/sendToBackend'

const EditClass = (props) => {
    const classInfo = props.props.classInfo
    const {teachers, setChosenClass, refresh} = props

    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [teacher, setTeacher] = useState('')



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
        let teacherSet = {}
        let nameVar = {}
        let shortNameVar = {}
        //theese if satements checks if there is set a new value
        //and sets the old value if none is choosen
        if(name === ''){
            nameVar = classInfo.name
        }else{
            nameVar = name  
        }

        if(shortName === ''){
            shortNameVar = classInfo.shortName
        }else{
            shortNameVar = shortName  
        }

        if(teacher === ''){
            teacherSet = classInfo.teacher
        }else{//if there is a teacher chosen, find the teacher by id
            teacherSet = teachers.find(i => i._id === teacher)
        }

        console.log(nameVar, shortNameVar, teacherSet);
        sendToBackend('updateClass', {
            _id: classInfo._id,
            name: nameVar,
            shortName: shortNameVar,
            teacher: teacherSet
        })

        setChosenClass({
            className: "hidden",
            classInfo: {teacher: ""}
           })
        refresh()
    }

    const teachersOptions = teachers.map(i =>{
        return(
            <option onClick={stateSave} key={i._id} value={i._id}>{i.navn}</option>
        )
    })

    const close = () => {
        //just resets chosenclass state to hidden to hide the element
        //classInfo: {teacher: ""} is because react expects it and crashes witout it
        setChosenClass({
        className: "hidden",
        classInfo: {teacher: ""}
       })
    }
    return (
        <div className={props.props.className}>
            <h1>Rediger klasse:  {classInfo.shortName}</h1>
            <div className="wrap">
                <h3>Klassenavn:</h3>
                <input type="text" id="klasse" placeholder={classInfo.name} onKeyUp={stateSave} /> 
            </div>
            <div className="wrap">
                <h3>Forkortelse:</h3>
                <input type="text" id="kort" placeholder={classInfo.shortName} onKeyUp={stateSave} />
            </div>
            <div className="wrap">
            <h3>Lærer:</h3>
                <select name="laerer" id="laerer">
                    <option value="standard" id="teacher" disabled selected >{classInfo.teacher.navn}</option>
                    {teachersOptions}
                </select>
            </div>

            <button onClick={saveToDB} id="red-gradient">Lagre</button>
            <button onClick={close} id="red-gradient">Lukk</button>
            
        </div>
    )
}

export default EditClass
