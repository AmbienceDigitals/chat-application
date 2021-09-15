import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        // authenticating
        const authObject = {'Project-ID': "07b488b1-b00e-42ca-88a1-52ffe93814aa",
                            'User-Name': username,
                            'User-Secret': password};

        try {
            // getting messages from chatengine
            await axios.get('https://api.chatengine.io/chats', {headers: authObject})

            // passing username and password into localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();

        } catch (err) {
            if(username !== authObject['User-Name'] || password !== authObject['User-Secret']) {
                setError(`Oops,  the following error occurred: error in login credentials`)
            }
            else {
                setError(`Oops,  the following error occurred: ${err}`)
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
                </form>
            </div>
        </div>
    )
}

export default LoginForm
