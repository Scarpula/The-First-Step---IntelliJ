import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({
        userId: '',
        userPw: '',
        userName: '',
        userBirthdate: '',
        investmentType: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/users/register', user);
            console.log(response.data);
            alert('회원가입 성공!');
        } catch (error) {
            console.error('Registration error', error.response.data);
            alert('회원가입 실패: ' + error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="userId" placeholder="User ID" onChange={handleChange} required />
            <input type="password" name="userPw" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="userName" placeholder="Name" onChange={handleChange} required />
            <input type="date" name="userBirthdate" onChange={handleChange} required />
            <input type="text" name="investmentType" placeholder="Investment Type" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;