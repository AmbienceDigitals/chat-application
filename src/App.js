import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Chats from './components/Chats';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component ={LoginForm}></Route>
                    <Route path='/chats' exact component={Chats}></Route>
                    <Route path='/Register' exact component={RegistrationForm}></Route>
                    <Route>
                        <div>
                            <h1 align='center'> There is nothing here</h1>
                            <div align="center">
                                <button type='submit' className='button'>
                                    <Link to='/'><span> Login</span></Link>
                                </button>
                        </div>
                        </div>  </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
