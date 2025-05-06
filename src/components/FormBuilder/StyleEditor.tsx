
import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  TextField, 
  Slider, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Switch, 
  FormControlLabel,
  Tabs,
  Tab
} from '@mui/material';
import { useFormContext } from '@/contexts/FormContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`style-tabpanel-${index}`}
      aria-labelledby={`style-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyleEditor = ({ open, onClose, isGlobal }) => {
  const { 
    selectedQuestion, 
    updateQuestionStyle, 
    updateGlobalStyle, 
    globalStyle, 
    updateSectionStyle 
  } = useFormContext();
  
  const [activeTab, setActiveTab] = React.useState(0);
  
  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleColorChange = (e, styleType) => {
    const { name, value } = e.target;
    
    if (isGlobal) {
      updateGlobalStyle({
        [styleType]: {
          ...globalStyle[styleType],
          [name]: value
        }
      });
    } else if (selectedQuestion) {
      updateQuestionStyle(selectedQuestion.id, {
        [name]: value
      });
    }
  };

  const handleSwitchChange = (e, styleType) => {
    const { name, checked } = e.target;
    
    if (isGlobal) {
      updateGlobalStyle({
        [styleType]: {
          ...globalStyle[styleType],
          [name]: checked
        }
      });
    } else if (selectedQuestion) {
      updateQuestionStyle(selectedQuestion.id, {
        [name]: checked
      });
    }
  };

  const handleSectionStyleChange = (e) => {
    const { name, value } = e.target;
    updateGlobalStyle({
      sectionStyle: {
        ...globalStyle.sectionStyle,
        [name]: value
      }
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>
        {isGlobal ? "Global Styles" : "Question Styles"}
      </DialogTitle>
      <DialogContent>
        {isGlobal ? (
          <Box>
            <Tabs 
              value={activeTab} 
              onChange={handleChangeTab}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Questions" />
              <Tab label="Options" />
              <Tab label="Sections" />
            </Tabs>
            
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                  label="Font Color" 
                  name="fontColor" 
                  value={globalStyle.questionStyle.fontColor} 
                  onChange={(e) => handleColorChange(e, 'questionStyle')} 
                  type="color"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: globalStyle.questionStyle.fontColor, 
                        mr: 1, 
                        borderRadius: 1 
                      }} />
                    )
                  }}
                />
                <TextField 
                  label="Font Size" 
                  name="fontSize" 
                  value={globalStyle.questionStyle.fontSize} 
                  onChange={(e) => handleColorChange(e, 'questionStyle')} 
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Text Alignment</InputLabel>
                  <Select
                    name="textAlign"
                    value={globalStyle.questionStyle.textAlign}
                    onChange={(e) => handleColorChange(e, 'questionStyle')}
                    label="Text Alignment"
                  >
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="center">Center</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={globalStyle.questionStyle.isBold} 
                      onChange={(e) => handleSwitchChange(e, 'questionStyle')} 
                      name="isBold" 
                    />
                  }
                  label="Bold Text"
                />
              </Box>
            </TabPanel>
            
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                  label="Font Color" 
                  name="fontColor" 
                  value={globalStyle.optionStyle.fontColor} 
                  onChange={(e) => handleColorChange(e, 'optionStyle')} 
                  type="color"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: globalStyle.optionStyle.fontColor, 
                        mr: 1, 
                        borderRadius: 1 
                      }} />
                    )
                  }}
                />
                <TextField 
                  label="Font Size" 
                  name="fontSize" 
                  value={globalStyle.optionStyle.fontSize} 
                  onChange={(e) => handleColorChange(e, 'optionStyle')} 
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Text Alignment</InputLabel>
                  <Select
                    name="textAlign"
                    value={globalStyle.optionStyle.textAlign}
                    onChange={(e) => handleColorChange(e, 'optionStyle')}
                    label="Text Alignment"
                  >
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="center">Center</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={globalStyle.optionStyle.isBold} 
                      onChange={(e) => handleSwitchChange(e, 'optionStyle')} 
                      name="isBold" 
                    />
                  }
                  label="Bold Text"
                />
              </Box>
            </TabPanel>
            
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Layout Direction</InputLabel>
                  <Select
                    name="flexDirection"
                    value={globalStyle.sectionStyle.flexDirection}
                    onChange={handleSectionStyleChange}
                    label="Layout Direction"
                  >
                    <MenuItem value="row">Row</MenuItem>
                    <MenuItem value="column">Column</MenuItem>
                  </Select>
                </FormControl>
                <TextField 
                  label="Background Color" 
                  name="backgroundColor" 
                  value={globalStyle.sectionStyle.backgroundColor} 
                  onChange={handleSectionStyleChange} 
                  type="color"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: globalStyle.sectionStyle.backgroundColor, 
                        mr: 1, 
                        borderRadius: 1 
                      }} />
                    )
                  }}
                />
                <TextField 
                  label="Border Color" 
                  name="borderColor" 
                  value={globalStyle.sectionStyle.borderColor} 
                  onChange={handleSectionStyleChange} 
                  type="color"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: globalStyle.sectionStyle.borderColor, 
                        mr: 1, 
                        borderRadius: 1 
                      }} />
                    )
                  }}
                />
                <TextField 
                  label="Border Width" 
                  name="borderWidth" 
                  value={globalStyle.sectionStyle.borderWidth} 
                  onChange={handleSectionStyleChange} 
                  fullWidth
                />
                <TextField 
                  label="Border Radius" 
                  name="borderRadius" 
                  value={globalStyle.sectionStyle.borderRadius} 
                  onChange={handleSectionStyleChange} 
                  fullWidth
                />
                <TextField 
                  label="Padding" 
                  name="padding" 
                  value={globalStyle.sectionStyle.padding} 
                  onChange={handleSectionStyleChange} 
                  fullWidth
                />
              </Box>
            </TabPanel>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {selectedQuestion && (
              <>
                <TextField 
                  label="Font Color" 
                  name="fontColor" 
                  value={selectedQuestion.style?.fontColor || ''} 
                  onChange={(e) => handleColorChange(e, '')} 
                  type="color"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: selectedQuestion.style?.fontColor || '#000000', 
                        mr: 1, 
                        borderRadius: 1 
                      }} />
                    )
                  }}
                />
                <TextField 
                  label="Font Size" 
                  name="fontSize" 
                  value={selectedQuestion.style?.fontSize || ''} 
                  onChange={(e) => handleColorChange(e, '')} 
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Text Alignment</InputLabel>
                  <Select
                    name="textAlign"
                    value={selectedQuestion.style?.textAlign || 'left'}
                    onChange={(e) => handleColorChange(e, '')}
                    label="Text Alignment"
                  >
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="center">Center</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={selectedQuestion.style?.isBold || false} 
                      onChange={(e) => handleSwitchChange(e, '')} 
                      name="isBold" 
                    />
                  }
                  label="Bold Text"
                />
              </>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StyleEditor;
