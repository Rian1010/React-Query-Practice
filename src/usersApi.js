import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

// Return users' data
const getUsers = () => api.get('/users').then((res) => res.data);

// Return user's data
const getUser = (id) => api.get(`/users/${id}`).then((res) => res.data);

// Return user passing in the ID and updated user details
const updateUser = ({ id, ...updateUser }) =>
  api.put(`/users/${id}`, updateUser).then((res) => res.data);

export { getUsers, getUser, updateUser };
