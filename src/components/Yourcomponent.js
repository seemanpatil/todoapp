// src/components/YourComponent.js

import axiosInstance from '../axiosConfig'; // Adjust the path as per your file structure

async function fetchTodos() {
    try {
        const response = await axiosInstance.get('/api/todos');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        if (error.response) {
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

export default fetchTodos;
