import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/persons';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};

const remove = async (id) => {
  if (!id) {
    throw new Error('ID is required for deletion');
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

export default { getAll, create, update, remove };
