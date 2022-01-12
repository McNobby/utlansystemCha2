import { useLogin, useUpdateLogin } from "../loginContext"

export default function StartCard() {

    const login = useLogin()
    const updateLogin = useUpdateLogin()
    const teacher = JSON.parse(login.teacher)
    const handleClick = () => {
           window.location.href = "/login" 
    }

    const innlevering = () => {
        window.location.href = "/innlevering"
    }

    const avslutt = () => {
        localStorage.removeItem('teacher')
        updateLogin("")
        setTimeout(()=>{
            window.location.reload()
        }, 1)
    }

    return(

        <div className="card">
                <h1>Hei {teacher.name}!</h1>
      
                <div className="btn-grid">
                    <button onClick={handleClick} className="shadow">Utlån</button>
                    <button onClick={innlevering} className="shadow">Innlevering</button>
                    <a href="/admin"> <button className="shadow"> Admin </button> </a> 
                    <button onClick={avslutt} id="red-gradient" className="shadow">Avslutt</button>
                </div>
           


        </div>
    
    )
}