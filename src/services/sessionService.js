import { apiCall } from "../hooks/axiosInterface";


export const getSessionData = async (data1) => {
    try {
      const data = await apiCall('api/v1/session'+data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}



