import React from 'react'


const AdminPanel = () => {


    const avslutt = () =>{
        window.location.href ="/"
    }

    const regTeacher = () => {
        window.location.href = "/admin/allteachers"
    }

    const inventory = () => {
        window.location.href = "/admin/inventory"
    }

    const users = () => {
        window.location.href = "/admin/allusers"
    }
    
    const classIndex = () => {
        window.location.href = "/admin/allclasses"
    }

    return (
        <div className="card">
            <div className="btn-grid">
                <button className="shadow" onClick={regTeacher}>Lærere</button>
                <button className="shadow" onClick={users}>Brukere</button>
                <button className="shadow" onClick={inventory}>Utstyr</button>
                <button className="shadow" onClick={classIndex}>Klasser</button>
            </div>
            <button className="shadow" onClick={avslutt} id="red-gradient">Gå ut</button>

        </div>
    )
}

export default AdminPanel
