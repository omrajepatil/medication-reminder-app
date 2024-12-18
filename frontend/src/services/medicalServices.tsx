import axios from 'axios';
// const id = localStorage.getItem('id');

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
    if (!token) {
      throw new Error('Authorization token not found'); // Throw meaningful error
    }

    const userId = localStorage.getItem('id'); // Retrieve the user ID
    if (!userId) {
      throw new Error('User ID not found in localStorage'); // Handle missing ID
    }

    // Make the GET request to the API
    const response = await axios.get(`http://localhost:3000/api/medicine/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to headers
      },
    });

    if (response.data && response.data.status) {
      // Return the data only if the status is true
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch data');
    }
  } catch (error: any) {
    console.error('Error while fetching data:', error.message || error);
    throw new Error('Failed to fetch medical data. Please try again.');
  }
};






// Function to handle deleting a medicine
export const deleteMedicine = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/medicine/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error deleting medicine');
  }
};

// Function to log the acknowledgment of a medicine being taken
export const logAcknowledgment = async (userId: number, medicineId: number, status: string) => {
  try {
    console.log(userId,medicineId,status);
    
    const response = await axios.post(
      'http://localhost:3000/api/log/create',
      { userId, medicineId, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error logging acknowledgment');
  }
};




export const fetchAcknowledgmentData = async () => {
  try {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    // Make the GET request with the Authorization header
    const response = await axios.get('http://localhost:3000/api/log/get', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Add token to the Authorization header
      },
    });

    if (response.data && response.data.status) {
      console.log(response);
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch acknowledgment data');
    }
  } catch (error: any) {
    console.error('Error fetching acknowledgment data:', error.message || error);
    throw new Error('Failed to fetch acknowledgment data. Please try again.');
  }
};

