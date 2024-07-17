import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082/api', // 백엔드 서버 주소
    withCredentials: true // 세션 쿠키를 포함시킴
});

export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.get('/logout');
    return response.data;
};

export const getSession = async () => {
    const response = await api.get('/session');
    return response.data;
};
