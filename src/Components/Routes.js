import {BrowserRouter as Router, Route} from 'react-router-dom'
import React from 'react'
import { useLogin } from '../loginContext';

import LoginCard from './loginCard';
import StartCard from './StartCard';
import Utlaan from './utlaan';
import UsrReg from './usrReg';
import UtstyrReg from './admin/UtstyrReg';
import AdminPanel from './admin/AdminPanel';
import NewTeacher from './admin/newTeacher';
import Innlevering from './Innlevering';
import Inventory from './admin/inventory';

const Routes = () => {

  const loggedIn = useLogin()


    return (
        
            <Router>
                
                {loggedIn.navn ? <Route path="/" exact component={Utlaan}/> : <Route path="/" exact component={StartCard} />}
                <Route path="/login" component={LoginCard} />
                <Route path="/registrer" component={UsrReg}/>
                <Route path="/innlevering" component={Innlevering}/>

                <Route path="/admin" exact component={AdminPanel}/>
                <Route path="/admin/regutstyr" component={UtstyrReg}/>
                <Route path="/admin/nylaerer" component={NewTeacher} />
                <Route path="/admin/inventory" component={Inventory} />
            </Router>
        
    )
}

export default Routes
