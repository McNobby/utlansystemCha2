import React, {useContext, useState} from 'react'

const LoginContext = React.createContext()
const UpdateLoginContext = React.createContext()

export function useLogin() {
    return useContext(LoginContext)
    
}

export function useUpdateLogin() {
    return useContext(UpdateLoginContext)
}

export function LoginProvider({ children }) {
    const elevID = localStorage.getItem('elevID')
    const elevNavn = localStorage.getItem('elevNavn')
    const teacher = localStorage.getItem('teacher')
    const plassering = localStorage.getItem('plassering')
    const utlant = localStorage.getItem('utlant')

    const login = {navn: elevNavn, id: elevID, teacher: teacher, plassering: plassering, utlant: utlant}
    console.log(login, 'start');
    const [loginState, setLoginState] = useState(login) //expecting {name: "", id:""}
    



    function updateLogin(obj) {
        setLoginState(obj)

        if (obj.navn){
            localStorage.setItem('elevID', obj._id)
            localStorage.setItem('elevNavn', obj.navn)
            localStorage.setItem('utlant', JSON.stringify(obj.utlant))
            const plassering = localStorage.getItem('plassering')
            const teacher = localStorage.getItem('teacher')

            setLoginState({...obj, teacher: teacher, plassering: plassering,})
            return
        }
        if (obj.teacher){
            localStorage.setItem('teacher', obj.teacher)
            const plassering = localStorage.getItem('plassering')
            

            console.log(loginState);
            setLoginState({...obj, plassering: plassering})
            return
        }
        if(obj.plassering){
            localStorage.setItem('plassering', obj.plassering)
        }

    }

    return(
        <LoginContext.Provider value={loginState}>
            <UpdateLoginContext.Provider value={updateLogin}>
                {children}
            </UpdateLoginContext.Provider>
        </LoginContext.Provider>
    )
}
