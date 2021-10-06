import axios from "axios"
import {apiAdress} from '../Components/config.json'


const sendToBackend = (type, obj) => {
    

    if (type === 'usrUpdate'){
        //sends inputted user info for registration or user update
        
        const user = {...obj, type: type}

        axios.post(apiAdress, user)
        .then((res)=>{
            window.history.back()
            console.log(res);
        })
        return
    }
    if (type === 'utlanUpdate'){
        //sends inputted user info for registration or user update
        
        const user = {...obj, type: type}
        console.log('hello world');
        axios.post(apiAdress, user)
        .then((res)=>{
            console.log(res);
        })
        return
    }
    
}
export default sendToBackend