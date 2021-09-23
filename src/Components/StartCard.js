import { useLogin, useUpdateLogin } from "../loginContext"

export default function StartCard() {

    const login = useLogin()
    const updateLogin = useUpdateLogin()

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
                <h1>Hei {login.teacher}!</h1>
            <div id="main-menu">
                <button onClick={handleClick} className="shadow"><h4>Utlån</h4></button>
                <button onClick={innlevering} className="shadow"><h4>Innlevering</h4></button>
                <button onClick={avslutt} id="red-gradient" className="shadow"><h4>Avslutt</h4></button>
                
            </div>
           


        </div>
    
    )
}