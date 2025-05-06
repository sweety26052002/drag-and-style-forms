
import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionsList from './QuestionsList';
import FormPreview from './FormPreview';
import StyleEditor from './StyleEditor';
import { useFormContext } from '@/contexts/FormContext';

const FormBuilder = () => {
  const [styleEditorOpen, setStyleEditorOpen] = useState(false);
  const [globalStyleEditorOpen, setGlobalStyleEditorOpen] = useState(false);
  const { questions } = useFormContext();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">Form Builder</Typography>
        <Button 
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={() => setGlobalStyleEditorOpen(true)}
        >
          Global Styles
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ height: 'calc(100vh - 150px)' }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <FormPreview onStyleClick={() => setStyleEditorOpen(true)} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <QuestionsList title="Available Questions" questions={questions} />
          </Paper>
        </Grid>
      </Grid>

      <StyleEditor 
        open={styleEditorOpen}
        onClose={() => setStyleEditorOpen(false)}
        isGlobal={false}
      />

      <StyleEditor 
        open={globalStyleEditorOpen}
        onClose={() => setGlobalStyleEditorOpen(false)}
        isGlobal={true}
      />
    </Box>
  );
};

export default FormBuilder;
