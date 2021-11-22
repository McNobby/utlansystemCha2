import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
import NotFound from './404';

const Routes = () => {

  const loggedIn = useLogin()


    return (
        
            <Router>
                <Switch>
                {loggedIn.navn ? <Route path="/" exact component={Utlaan}/> : <Route path="/" exact component={StartCard} />}
                <Route exact path="/login" component={LoginCard} />
                <Route exact path="/registrer" component={UsrReg}/>
                <Route exact path="/innlevering" component={Innlevering}/>

                <Route exact path="/admin" component={AdminPanel}/>
                <Route exact path="/admin/regutstyr" component={UtstyrReg}/>
                <Route exact path="/admin/nylaerer" component={NewTeacher} />
                <Route exact path="/admin/inventory" component={Inventory} />
                <Route component={NotFound} />
                </Switch>
            </Router>
        
    )
}

export default Routes
