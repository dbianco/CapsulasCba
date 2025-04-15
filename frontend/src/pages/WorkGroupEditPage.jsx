import React, { useState } from 'react';
import { WorkGroupStatus } from '../typings/API/WorkGroupStatus.js';
import Validation from '../utils/Validation';

const WorkGroupEditPage = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(WorkGroupStatus.ACTIVE);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError('');
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError('');
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSaveChanges = () => {
    let isValid = true;

    if (Validation.isNullOrEmpty(name)) {
      setNameError('Name is required');
      isValid = false;
    } else if (Validation.containsScriptInjection(name)) {
      setNameError('Name contains invalid characters');
      isValid = false;
    }

    if (Validation.containsScriptInjection(description)) {
      setDescriptionError('Description contains invalid characters');
      isValid = false;
    }

    if (isValid) {
      // Save changes logic here
      console.log('Name:', name);
      console.log('Description:', description);
      console.log('Status:', status);
    }
  };

  return (
    <div>
      <h1>Work Group Edit Page</h1>
      <nav>
        <ul>
          <li onClick={() => setActiveTab('basicInfo')}>
            <a href="#">Basic Information</a>
          </li>
          <li onClick={() => setActiveTab('members')}>
            <a href="#">Members Management</a>
          </li>
          <li onClick={() => setActiveTab('assignments')}>
            <a href="#">Assignments Management</a>
          </li>
        </ul>
      </nav>

      {activeTab === 'basicInfo' && (
        <div>
          <h2>Basic Information</h2>
          {/* Form fields for name and description */}
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p>{nameError}</p>}
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
            />
            {descriptionError && <p>{descriptionError}</p>}
          </label>
          {/* Status selection dropdown (using WorkGroupStatus enum) */}
          <label>
            Status:
            <select value={status} onChange={handleStatusChange}>
              <option value={WorkGroupStatus.ACTIVE}>Active</option>
              <option value={WorkGroupStatus.INACTIVE}>Inactive</option>
            </select>
          </label>
          {/* Save changes button */}
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}

      {activeTab === 'members' && (
        <div>
          <h2>Members Management</h2>
          {/* List of current members with their roles */}
          {/* User search functionality with autocomplete */}
          {/* Add member with role selection (ORGANIZER/MEMBER) */}
          {/* Ability to change member roles */}
          {/* Remove member functionality */}
          {/* Indication of active/inactive status */}
        </div>
      )}

      {activeTab === 'assignments' && (
        <div>
          <h2>Assignments Management</h2>
          {/* List of current capsule assignments */}
          {/* Search/filter functionality for content capsules */}
          {/* Assignment creation form with: */}
          {/* Capsule selection */}
          {/* Version selection */}
          {/* Date range picker (start/end dates) */}
          {/* Collaboration toggle */}
          {/* Edit existing assignments */}
          {/* Delete assignments */}
        </div>
      )}
    </div>
  );
};

export default WorkGroupEditPage;
