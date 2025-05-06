
import React from 'react';
import { useDrop } from 'react-dnd';
import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Divider, 
  Radio, 
  Checkbox, 
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { useFormContext, Question, Section } from '@/contexts/FormContext';

const FormQuestion = ({ 
  question, 
  index, 
  onStyleClick 
}) => {
  const { removeQuestionFromForm, selectQuestion, globalStyle } = useFormContext();

  // Apply global styles unless overridden by question-specific styles
  const questionStyle = {
    color: question.style?.fontColor || globalStyle.questionStyle.fontColor,
    fontSize: question.style?.fontSize || globalStyle.questionStyle.fontSize,
    fontWeight: question.style?.fontWeight || globalStyle.questionStyle.fontWeight,
    textAlign: question.style?.textAlign || globalStyle.questionStyle.textAlign,
    ...(question.style?.isBold || globalStyle.questionStyle.isBold ? { fontWeight: 'bold' } : {})
  };

  const optionStyle = {
    color: globalStyle.optionStyle.fontColor,
    fontSize: globalStyle.optionStyle.fontSize,
    fontWeight: globalStyle.optionStyle.fontWeight,
    textAlign: globalStyle.optionStyle.textAlign,
    ...(globalStyle.optionStyle.isBold ? { fontWeight: 'bold' } : {})
  };

  const handleRemove = () => {
    removeQuestionFromForm(question.id);
  };

  const handleStyleClick = () => {
    selectQuestion(question.id);
    onStyleClick();
  };

  return (
    <Paper sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography sx={questionStyle}>
          <span style={{ marginRight: '8px', color: '#8B5CF6' }}>{index + 1}.</span>
          {question.text}
        </Typography>
        <Box>
          <IconButton size="small" onClick={handleStyleClick}>
            <SettingsIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleRemove} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {question.options.length > 0 && (
        <Box sx={{ pl: 3, mt: 1 }}>
          {question.type === 'multiChoice' && question.options.map((option) => (
            <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }} style={optionStyle}>
              <Radio disabled size="small" sx={{ mr: 0.5 }} />
              {option.text}
            </Box>
          ))}
          
          {question.type === 'checkbox' && question.options.map((option) => (
            <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }} style={optionStyle}>
              <Checkbox disabled size="small" sx={{ mr: 0.5 }} />
              {option.text}
            </Box>
          ))}
          
          {question.type === 'dropdown' && (
            <FormControl fullWidth size="small">
              <Select disabled value="" displayEmpty>
                <MenuItem value="" disabled>Select an option</MenuItem>
                {question.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      )}
    </Paper>
  );
};

const SectionContainer = ({
  section,
  questions,
  onStyleClick
}) => {
  const { globalStyle } = useFormContext();

  const sectionStyle = {
    display: 'flex',
    flexDirection: section.style?.flexDirection || globalStyle.sectionStyle.flexDirection,
    backgroundColor: section.style?.backgroundColor || globalStyle.sectionStyle.backgroundColor,
    borderColor: section.style?.borderColor || globalStyle.sectionStyle.borderColor,
    borderWidth: section.style?.borderWidth || globalStyle.sectionStyle.borderWidth,
    borderRadius: section.style?.borderRadius || globalStyle.sectionStyle.borderRadius,
    padding: section.style?.padding || globalStyle.sectionStyle.padding,
  };

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        mb: 2,
        overflow: 'hidden', 
        ...sectionStyle
      }}
    >
      <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2">{section.title}</Typography>
          <IconButton 
            size="small"
            onClick={onStyleClick}
          >
            <SettingsIcon fontSize="small" />
            <Typography variant="caption" sx={{ ml: 0.5 }}>Section Style</Typography>
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: section.style?.flexDirection, 
        gap: 2 
      }}>
        {questions.map((question, index) => (
          <Box 
            key={question.id} 
            sx={{ flex: section.style?.flexDirection === 'row' ? 1 : 'unset' }}
          >
            <FormQuestion 
              question={question} 
              index={questions.findIndex(q => q.id === question.id)} 
              onStyleClick={onStyleClick} 
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const FormPreview = ({ onStyleClick }) => {
  const { formQuestions, sections, addQuestionToForm } = useFormContext();
  
  // Get questions that are not in any section
  const nonSectionQuestions = formQuestions.filter(
    question => !sections.some(section => section.questionIds.includes(question.id))
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'QUESTION',
    drop: (item: Question) => {
      addQuestionToForm(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Form Preview</Typography>
      <Box 
        ref={drop} 
        sx={{ 
          minHeight: '400px', 
          maxHeight: 'calc(100vh - 200px)', 
          overflow: 'auto',
          p: 2,
          border: isOver ? '2px dashed #8B5CF6' : '2px dashed #e0e0e0',
          bgcolor: isOver ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
          borderRadius: 1,
          transition: 'all 0.3s'
        }}
      >
        {formQuestions.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '150px',
            color: 'text.secondary'
          }}>
            <Typography>Drag questions here to build your form</Typography>
          </Box>
        ) : (
          <>
            {sections.map((section) => {
              const sectionQuestions = formQuestions.filter(
                question => section.questionIds.includes(question.id)
              );
              return (
                <SectionContainer 
                  key={section.id} 
                  section={section} 
                  questions={sectionQuestions}
                  onStyleClick={onStyleClick}
                />
              );
            })}
            
            {nonSectionQuestions.map((question, index) => (
              <FormQuestion 
                key={question.id} 
                question={question} 
                index={index} 
                onStyleClick={onStyleClick} 
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FormPreview;
