import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState();

    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // getting users from chatengine
            if (password === confirmPassword && password.length > 0 && username.length > 0) {
            let body = {
                    "username": username,
                    "secret": password,
                    "email": email,
                    "first_name": firstName,
                    "last_name": lastName,
                    "avatar": avatar
                }
            await axios.post('https://api.chatengine.io/users/', body,
            {headers: {'PRIVATE-KEY': 'c5a99d40-df00-41b2-91ec-6129f01306c3'}})
            history.push('/')
        }
            else {
                setError(`check the credentials you provided`)
            }

        } catch (err) {
            setError(`we encountered the following ${err}`)
        }
    }

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'> Register </h1>
                <form onSubmit={handleSubmit}>
                    <input
                    value={username}
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    className='input2'
                    placeholder='Username' required>
                    </input>

                    <input
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='input2'
                    placeholder='Password' required>
                    </input>

                    <input
                    value={confirmPassword}
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='input2'
                    placeholder='Password' required>
                    </input>

                    <input
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='input2'
                    placeholder='email' required>
                    </input>

                    <input
                    value={firstName}
                    type='text'
                    onChange={(e) => setFirstName(e.target.value)}
                    className='input2'
                    placeholder='first name' required>
                    </input>

                    <input
                    value={lastName}
                    type='text'
                    onChange={(e) => setLastName(e.target.value)}
                    className='input2'
                    placeholder='last name' required>
                    </input>

                    <input
                    value={avatar}
                    type='file'
                    onChange={(e) => setAvatar(e.target.file)}
                    className='input2'>
                    </input>

                    <div align="center">
                        <button type='submit' className='button'>
                            <span> Register</span>
                        </button>
                    </div>

                    {/* error div */}
                    <h2 className='error'> {error}</h2>
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm
