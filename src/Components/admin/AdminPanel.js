import React from 'react'


const AdminPanel = () => {

    const utstyrReg = () =>{
        window.location.href ="/admin/regutstyr"
    }
    const avslutt = () =>{
        window.location.href ="/"
    }

    const regTeacher = () => {
        window.location.href = "/admin/nylaerer"
    }

    const inventory = () => {
        window.location.href = "/admin/inventory"
    }

    
    const classIndex = () => {
        window.location.href = "/admin/allclasses"
    }

    return (
        <div className="card">
            <div className="btn-grid">
                <button className="shadow" onClick={utstyrReg} >Registrer utstyr</button>
                <button className="shadow" onClick={regTeacher} >Registrer Lærer</button>
                <button className="shadow" onClick={inventory} >Overiskt</button>
                <button className="shadow" onClick={classIndex} >Klasser</button>
            </div>
            <button className="shadow" onClick={avslutt} id="red-gradient">Gå ut</button>

        </div>
    )
}

export default AdminPanel
