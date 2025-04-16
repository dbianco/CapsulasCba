import React, { useState, useEffect } from 'react';
import { WorkGroupStatus } from '../typings/API/WorkGroupStatus';
import { WorkGroupRole } from '../typings/API/WorkGroupRole';
import Validation from '../utils/Validation';
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
} from '@coreui/react';
import { CMultiSelect, useDebouncedCallback } from '@coreui/react-pro';
import WorkGroupService from '../services/WorkGroupService';

interface Option {
  value: string | number;
  label: string;
  role?: WorkGroupRole;
  selected?: boolean;
}

interface WorkGroupEditPageProps {}

const WorkGroupEditPage: React.FC<WorkGroupEditPageProps> = () => {
  // Basic Info State
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<WorkGroupStatus>(WorkGroupStatus.ACTIVE);
  const [nameError, setNameError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  // Tab State
  const [activeTab, setActiveTab] = useState<string>('basicInfo');

  // Members State
  const [selectedMembers, setSelectedMembers] = useState<Option[]>([]);
  const [memberOptions, setMemberOptions] = useState<Option[]>([]);
  const [memberLoading, setMemberLoading] = useState(false);

  // Assignments State
  const [selectedAssignments, setSelectedAssignments] = useState<Option[]>([]);
  const [assignmentOptions, setAssignmentOptions] = useState<Option[]>([]);
  const [assignmentLoading, setAssignmentLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    fetchInitialMembers();
    fetchInitialAssignments();
  }, []);

  const fetchInitialMembers = async () => {
    setMemberLoading(true);
    try {
      const data = await WorkGroupService.searchMembers('', 10);
      setMemberOptions(data.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
        role: WorkGroupRole.PARTICIPANT
      })));
    } catch (error) {
      console.error('Error fetching members:', error);
      setMemberOptions([]);
    } finally {
      setMemberLoading(false);
    }
  };

  const fetchInitialAssignments = async () => {
    setAssignmentLoading(true);
    try {
      const data = await WorkGroupService.searchAssignments('', 10);
      setAssignmentOptions(data.map(assignment => ({
        value: assignment.id,
        label: assignment.title
      })));
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignmentOptions([]);
    } finally {
      setAssignmentLoading(false);
    }
  };

  const handleMemberSearch = async (query = '') => {
    setMemberLoading(true);
    try {
      const data = await WorkGroupService.searchMembers(query, 10);
      setMemberOptions(data.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
        role: WorkGroupRole.PARTICIPANT
      })));
    } catch (error) {
      console.error('Error searching members:', error);
      setMemberOptions([]);
    } finally {
      setMemberLoading(false);
    }
  };

  const handleAssignmentSearch = async (query = '') => {
    setAssignmentLoading(true);
    try {
      const data = await WorkGroupService.searchAssignments(query, 10);
      setAssignmentOptions(data.map(assignment => ({
        value: assignment.id,
        label: assignment.title
      })));
    } catch (error) {
      console.error('Error searching assignments:', error);
      setAssignmentOptions([]);
    } finally {
      setAssignmentLoading(false);
    }
  };

  const debouncedMemberSearch = useDebouncedCallback(handleMemberSearch, 300);
  const debouncedAssignmentSearch = useDebouncedCallback(handleAssignmentSearch, 300);

  const handleBasicInfoSubmit = () => {
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
      console.log('Basic Info:', { name, description, status });
    }
  };

  const handleMembersSubmit = () => {
    console.log('Selected Members:', selectedMembers);
  };

  const handleAssignmentsSubmit = () => {
    console.log('Selected Assignments:', selectedAssignments);
  };

  const handleSelectedMembersChange = (options: Option[]) => {
    const updatedOptions = memberOptions.map(option => ({
      ...option,
      selected: options.some(selected => selected.value === option.value)
    }));
    setMemberOptions(updatedOptions);
    setSelectedMembers(updatedOptions.filter(option => option.selected));
  };

  const handleSelectedAssignmentsChange = (options: Option[]) => {
    const updatedOptions = assignmentOptions.map(option => ({
      ...option,
      selected: options.some(selected => selected.value === option.value)
    }));
    setAssignmentOptions(updatedOptions);
    setSelectedAssignments(updatedOptions.filter(option => option.selected));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as WorkGroupStatus);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Work Group Edit Page</h1>

      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            active={activeTab === 'basicInfo'}
            onClick={() => setActiveTab('basicInfo')}
          >
            Basic Information
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'members'}
            onClick={() => setActiveTab('members')}
          >
            Members Management
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'assignments'}
            onClick={() => setActiveTab('assignments')}
          >
            Assignments Management
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent className="p-4">
        <CTabPane visible={activeTab === 'basicInfo'}>
          <h2 className="mb-4">Basic Information</h2>
          <CForm>
            <div className="mb-3">
              <CFormLabel>Name</CFormLabel>
              <CFormInput
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                invalid={!!nameError}
                feedback={nameError}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError('');
                }}
                invalid={!!descriptionError}
                feedback={descriptionError}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Status</CFormLabel>
              <CFormSelect
                value={status}
                onChange={handleStatusChange}
              >
                <option value={WorkGroupStatus.ACTIVE}>Active</option>
                <option value={WorkGroupStatus.INACTIVE}>Inactive</option>
              </CFormSelect>
            </div>
            <CButton color="primary" onClick={handleBasicInfoSubmit}>
              Save Changes
            </CButton>
          </CForm>
        </CTabPane>

        <CTabPane visible={activeTab === 'members'}>
          <h2 className="mb-4">Members Management</h2>
          <div className="mb-3">
            <CFormLabel>Search and Select Members</CFormLabel>
            <CMultiSelect
              options={memberOptions}
              selectionType="tags"
              onChange={handleSelectedMembersChange}
              onFilterChange={debouncedMemberSearch}
              onShow={() => handleMemberSearch()}
              loading={memberLoading}
              search={{
                external: true,
                global: true
              }}
              placeholder="Search members..."
            />
          </div>
          <CButton color="primary" onClick={handleMembersSubmit}>
            Save Members
          </CButton>
        </CTabPane>

        <CTabPane visible={activeTab === 'assignments'}>
          <h2 className="mb-4">Assignments Management</h2>
          <div className="mb-3">
            <CFormLabel>Search and Select Assignments</CFormLabel>
            <CMultiSelect
              options={assignmentOptions}
              selectionType="tags"
              onChange={handleSelectedAssignmentsChange}
              onFilterChange={debouncedAssignmentSearch}
              onShow={() => handleAssignmentSearch()}
              loading={assignmentLoading}
              search={{
                external: true,
                global: true
              }}
              placeholder="Search assignments..."
            />
          </div>
          <CButton color="primary" onClick={handleAssignmentsSubmit}>
            Save Assignments
          </CButton>
        </CTabPane>
      </CTabContent>
    </div>
  );
};

export default WorkGroupEditPage;
