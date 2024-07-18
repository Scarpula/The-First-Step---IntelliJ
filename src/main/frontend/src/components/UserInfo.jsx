import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position : relative;
  top : 150px;
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
    investmentStyle: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/session', { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setUser({
            email: response.data.user.email,
            name: response.data.user.name,
            password: '********', // 비밀번호는 보통 ***로 표시
            birthdate: response.data.user.birthdate,
            investmentStyle: response.data.user.investmentStyle,
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
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // 여기서 수정된 데이터를 서버로 보낼 수 있습니다.
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <UserInfoContainer>
      <h2>내 정보</h2>
      <UserInfoForm onSubmit={handleSave}>
        <UserInfoInput
          type="email"
          name="email"
          value={user.email}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <UserInfoInput
          type="text"
          name="name"
          value={user.name}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <UserInfoInput
          type="password"
          name="password"
          value={user.password}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <UserInfoInput
          type="text"
          name="birthdate"
          value={user.birthdate}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <UserInfoInput
          type="text"
          name="investmentStyle"
          value={user.investmentStyle}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        {!isEditing && <EditButton type="button" onClick={handleEdit}>수정</EditButton>}
        {isEditing && <EditButton type="submit">저장</EditButton>}
      </UserInfoForm>
    </UserInfoContainer>
  );
};

export default UserInfo;
