import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const UsersList = (props) => {
    const [users, setUsers] = useState([])
    const [department, setDepartment] = useState('')

    useEffect(() => {
        axiosWithAuth()
            .get('/users')
            .then(res => {
                console.log(res)
                setUsers(res.data.data)
                setDepartment(res.data.data[0].department)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
 
    return (
        <div>
             <h2>User List for deparment of {department}: </h2>
            {users.map(user => {
                return (
                    <div key={user.id}>
                      <p>user_id: {user.id}</p>  
                       <p>username: {user.username}</p> 
                       <p>department: {user.department}</p> 
                       _____________________________________
                    </div>
                )
            })}
        </div>
    )
}

export default UsersList