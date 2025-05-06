
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import FormDisplay from '@/components/FormBuilder/FormDisplay';
import { FormProvider } from '@/contexts/FormContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
        Form Creator
      </Typography>
      
      <FormProvider>
        <DndProvider backend={HTML5Backend}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
              <Tabs value={activeTab} onChange={handleChange} aria-label="form builder tabs">
                <Tab label="Form Builder" />
                <Tab label="Form Preview" />
              </Tabs>
            </Box>
            <TabPanel value={activeTab} index={0}>
              <FormBuilder />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <FormDisplay />
            </TabPanel>
          </Box>
        </DndProvider>
      </FormProvider>
    </Box>
  );
};

export default Index;
