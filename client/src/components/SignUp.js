import React, { useState } from 'react'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory, Link } from 'react-router-dom'

const initialValues = {
    username: '',
    password: '',
    department: ''
}

const SingUp = (props) => {
    const {setUserLoggedIn} = props

    const [formValues, setFormValues] = useState(initialValues)

    const history = useHistory()

    const postNewUser = newUser => {
        axiosWithAuth()
            .post('/register', newUser)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                setUserLoggedIn(true)
                history.push('/users')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleInputChange = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const newUser = {
            username: formValues.username,
            password: formValues.password,
            department: formValues.department
        }

        postNewUser(newUser)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    name='username'
                    type='text'
                    value={formValues.username}
                    onChange={handleInputChange}
                    placeholder='username'
                    required
                />
            </label>
            <label>
                <input
                    name='password'
                    type='password'
                    value={formValues.password}
                    onChange={handleInputChange}
                    placeholder='password'
                    required
                />
            </label>
            <label>
                <input
                    name='department'
                    type='text'
                    value={formValues.department}
                    onChange={handleInputChange}
                    placeholder='department'
                    required
                />
            </label>

            <button>Submit</button>
        </form>

<Link to='/sigin'>Have an accout? Click to sign in!</Link>
</>
    )
}

export default SingUp