import { apiCall } from "../hooks/axiosInterface";


export const getSessionData = async (data1) => {
    try {
      const data = await apiCall('/api/session/getbyid/'+data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}

export const getAllSessionData = async () => {
    try {
      const data = await apiCall('/api/session/all/');
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}


export const getParticipantData = async (data1) => {
    try {
      const data = await apiCall('/api/session/getparticipantcount/'+data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}

export const createSessionData = async (data1) => {
    try {
      const data = await apiCall('/api/session/create','POST',data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}


export const enrollSessionData = async (data1) => {
    try {
      const data = await apiCall('/api/session/enroll','POST',data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}


export const leaveSessionData = async (data1) => {
    try {
      const data = await apiCall('/api/session/leave','PUT',data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}


export const getSessionDetailsData = async (data1) => {
    try {
      const data = await apiCall('/api/session/session-details/'+data1);
      return data;
      // Process the received data
    } catch (error) {
      // Handle error here
      return error;
    }
}