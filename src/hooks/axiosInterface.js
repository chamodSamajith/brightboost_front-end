import { baseURL} from "../environment/environment.js"

const api = axios.create({
    baseURL: base_url,
  });

  export const apiCall = async (url, method = 'GET', data = null) => {

    const headers = {
    'Content-Type': 'application/json',
    };
  
    try {
      const response = await api.request({
        url,
        method,
        data,
        headers,
      });
      return response.data;
   
    } catch (error) {
      // Handle error here
      if (error.response && error.response.status === 401) {
        // Redirect to "/" on 403 error
        window.location.href = '/';
      } else {
        throw error;
      }
    }
  };