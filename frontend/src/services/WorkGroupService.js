const BASE_URL = '/api';

export const WorkGroupService = {
  // List
  getAllWorkGroups: async () => {
    const response = await fetch(`${BASE_URL}/workgroups`);
    return response.json();
  },

  createWorkGroup: async (data) => {
    const response = await fetch(`${BASE_URL}/workgroups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Basic Info
  getWorkGroup: async (id) => {
    const response = await fetch(`${BASE_URL}/workgroups/${id}`);
    return response.json();
  },

  updateWorkGroup: async (id, data) => {
    const response = await fetch(`${BASE_URL}/workgroups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Members
  getMembers: async (workGroupId, limit = 10) => {
    const response = await fetch(`${BASE_URL}/workgroups/${workGroupId}/members?limit=${limit}`);
    return response.json();
  },

  searchMembers: async (query, limit = 10) => {
    const response = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.json();
  },

  updateMembers: async (workGroupId, members) => {
    const response = await fetch(`${BASE_URL}/workgroups/${workGroupId}/members`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ members }),
    });
    return response.json();
  },

  // Assignments
  getAssignments: async (workGroupId, limit = 10) => {
    const response = await fetch(`${BASE_URL}/workgroups/${workGroupId}/assignments?limit=${limit}`);
    return response.json();
  },

  searchAssignments: async (query, limit = 10) => {
    const response = await fetch(`${BASE_URL}/assignments/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.json();
  },

  updateAssignments: async (workGroupId, assignments) => {
    const response = await fetch(`${BASE_URL}/workgroups/${workGroupId}/assignments`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assignments }),
    });
    return response.json();
  },
};

export default WorkGroupService;
