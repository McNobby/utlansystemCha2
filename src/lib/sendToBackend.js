import axios from "axios"

const sendToBackend = (type, obj) => {
    

    if (type === 'usrUpdate'){
        //sends inputted user info for registration or user update
        
        const user = {...obj, type: type}

        axios.post('http://127.0.0.1:6969/api', user)
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
        axios.post('http://127.0.0.1:6969/api', user)
        .then((res)=>{
            console.log(res);
        })
        return
    }
    
}
export default sendToBackend