import React, {useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(username.length > 0 && password.length > 0)) return;
        
        // authenticating
        const authObject = {'Project-ID': "07b488b1-b00e-42ca-88a1-52ffe93814aa",
                            'User-Name': username,
                            'User-Secret': password};

        try {
            // getting users from chatengine
            const users = await axios.get('https://api.chatengine.io/users/', 
            {headers: {'PRIVATE-KEY': '{{c5a99d40-df00-41b2-91ec-6129f01306c3}}'}});

            const  userExist = await axios.get('https://api.chatengine.io/users/me', 
            {headers: authObject})

            // users.data.map(user => console.log(user))
            // mapping through the user array from chat engine to check if user exist
            users.data.map((user) => {
                // if user exists and password and username match
                if (userExist.status === 200) {
                    // getting chats from chat engine
                    axios.get('https://api.chatengine.io/chats', {headers: authObject})
                    // checking to see if username exist in localStorage
                    if(localStorage.getItem('username') && localStorage.getItem('username')===username) {
                        history.push('/chats');
                    }
                    else {
                    // clearing localStorage
                    localStorage.clear();
                    // passing username and password into localStorage if user exists
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    history.push('/chats')}
                }
            })

        } 
        catch (err) {
            if (err.message === 'Request failed with status code 403') {
                setError(`Oops, Invalid username or password, if you do not have an account kindly register`)
            }
            }
    }

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'> Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input
                    value={username}
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    className='input'
                    placeholder='Username' required>
                    </input>

                    <input
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='input'
                    placeholder='Password' required>
                    </input>

                    <div align="center">
                        <button type='submit' className='button'>
                            <span> Login</span>
                        </button>
                    </div>

                    {/* error div */}
                    <h2 className='error'> {error}</h2>

                    <div align="center">
                        <button type='submit' className='button'>
                            <Link to='/register'><span> Register</span></Link>
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default LoginForm
