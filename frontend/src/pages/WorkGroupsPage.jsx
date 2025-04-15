import React, { useState, useEffect } from 'react';
import WorkGroupCard from '../components/WorkGroupCard';
import WorkGroupService from '../services/WorkGroupService';
import { useTranslation } from 'react-i18next';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Container, Grid, Typography } from '@mui/material';

const WorkGroupsPage = () => {
  const { t } = useTranslation();
  const [workGroups, setWorkGroups] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newWorkGroup, setNewWorkGroup] = useState({
    name: '',
    description: '',
  });
  const [editWorkGroup, setEditWorkGroup] = useState(null);

  useEffect(() => {
    const fetchWorkGroups = async () => {
      try {
        const data = await WorkGroupService.getAllWorkGroups();
        setWorkGroups(data);
      } catch (error) {
        console.error('Error fetching work groups:', error);
      }
    };

    fetchWorkGroups();
  }, []);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleEditWorkGroup = (workGroup) => {
    setEditWorkGroup(workGroup);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleInputChange = (e) => {
    setNewWorkGroup({ ...newWorkGroup, [e.target.name]: e.target.value });
  };

  const handleCreateWorkGroup = async () => {
    try {
      const createdWorkGroup = await WorkGroupService.createWorkGroup(newWorkGroup);
      setWorkGroups(prevWorkGroups => {
        return [...prevWorkGroups, createdWorkGroup];
      });
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating work group:', error);
    }
  };

  const handleUpdateWorkGroup = async () => {
    try {
      await WorkGroupService.updateWorkGroup(editWorkGroup.id, editWorkGroup);
      // Refresh work groups after updating one
      const data = await WorkGroupService.getAllWorkGroups();
      setWorkGroups(data);
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating work group:', error);
    }
  };

  const handleEditInputChange = (e) => {
    setEditWorkGroup({ ...editWorkGroup, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('workgroups.title')}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClickOpenCreate}>
            {t('workgroups.addNew')}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {workGroups.map(workGroup => (
            <Grid item xs={12} sm={6} md={4} key={workGroup.id}>
              <WorkGroupCard workGroup={workGroup} onEdit={handleEditWorkGroup} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle>{t('workgroups.addNew')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label={t('workgroups.nameLabel')}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label={t('workgroups.descriptionLabel')}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>{t('common.cancel')}</Button>
          <Button onClick={handleCreateWorkGroup}>{t('workgroups.create')}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>{t('workgroups.editTitle')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label={t('workgroups.nameLabel')}
            type="text"
            fullWidth
            variant="standard"
            value={editWorkGroup ? editWorkGroup.name : ''}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label={t('workgroups.descriptionLabel')}
            type="text"
            fullWidth
            variant="standard"
            value={editWorkGroup ? editWorkGroup.description : ''}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>{t('common.cancel')}</Button>
          <Button onClick={handleUpdateWorkGroup}>{t('workgroups.saveChanges')}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkGroupsPage;
