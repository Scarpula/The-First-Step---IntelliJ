import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  top: 150px;
`;

const UserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const UserInfoInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${(props) => (props.readOnly ? '#f0f0f0' : '#fff')};
`;

const EditButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserInfo = () => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    birthdate: '',
    investmentType: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/session', { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setUser({
            email: response.data.user.email,
            name: response.data.user.name,
            password: '********',
            birthdate: response.data.user.birthdate,
            investmentType: response.data.user.investmentType,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setNewPassword('');
    setMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/update-password', { newPassword }, { withCredentials: true });
      if (response.status === 200) {
        setUser({ ...user, password: '********' });
        setIsEditing(false);
        setMessage('Password updated successfully');
      }
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An error occurred while updating the password';
      setMessage('Password update failed: ' + errorMsg);
    }
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <UserInfoContainer>
      <h2>내 정보</h2>
      <UserInfoForm onSubmit={handleSave}>
        <UserInfoInput
          type="email"
          name="email"
          value={user.email}
          readOnly={true}
        />
        <UserInfoInput
          type="text"
          name="name"
          value={user.name}
          readOnly={true}
        />
        <UserInfoInput
          type="password"
          name="password"
          value={isEditing ? newPassword : user.password}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <UserInfoInput
          type="text"
          name="birthdate"
          value={user.birthdate}
          readOnly={true}
        />
        <UserInfoInput
          type="text"
          name="investmentType"
          value={user.investmentType}
          readOnly={true}
        />
        {!isEditing && <EditButton type="button" onClick={handleEdit}>수정</EditButton>}
        {isEditing && <EditButton type="submit">저장</EditButton>}
      </UserInfoForm>
      {message && <p>{message}</p>}
    </UserInfoContainer>
  );
};

export default UserInfo;
