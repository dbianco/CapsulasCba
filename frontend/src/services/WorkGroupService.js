import axios from 'axios';

const API_URL = '/api/workgroups';

const getAllWorkGroups = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching work groups:', error);
    throw error;
  }
};

const createWorkGroup = async (workGroup) => {
  try {
    const response = await axios.post(API_URL, {
      name: workGroup.name,
      description: workGroup.description
    });
    return response.data;
  } catch (error) {
    console.error('Error creating work group:', error);
    throw error;
  }
};

const WorkGroupService = {
  getAllWorkGroups,
  createWorkGroup
};

export default WorkGroupService;
