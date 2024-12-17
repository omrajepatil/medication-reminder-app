import axios from 'axios';

export const addData = async (data: { name: string, dosage: string, scheduleTime: string }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/medicine/create', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error while adding medicine');
  }
};




export const fetchAllMedicalData = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) throw new Error('Authorization token not found');

    const response = await axios.get('http://localhost:3000/api/medicine/get', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to headers
      },
    });
    console.log(response.data);
    
    return response.data.data; // Return the data received from API
  } catch (error) {
    console.error('Error while fetching data:');
    throw new Error('Failed to fetch medical data'); // Throw user-friendly error
  }
};
