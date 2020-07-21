import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialValues = {
    username: '',
    password: ''
}

const SingIn = (props) => {
    

const [formValues, setFormValues] = useState(initialValues)

const history = useHistory()

const postExistingUser = user => {
    axiosWithAuth()
        .post('/login', user)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
 
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

    const user = {
        username: formValues.username,
        password: formValues.password,
        department: formValues.department
    }

    postExistingUser(user)
}

    return(
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

            <button>Submit</button>
        </form>

<Link to='/signup'>Don't have an accout? Click to sign up!</Link>
</>
    )
}

export default SingIn